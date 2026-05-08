// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AuctionHouse
 * @notice Sàn đấu giá phi tập trung trên LUKSO.
 *         Tiền người thắng được giữ làm escrow trong contract cho đến khi
 *         người mua xác nhận nhận hàng hoặc trọng tài giải quyết tranh chấp.
 *
 * Luồng cơ bản:
 *  1. Người bán gọi createAuction()
 *  2. Người mua gọi placeBid() kèm LYX
 *  3. Khi hết giờ, bất kỳ ai gọi endAuction()
 *  4. Người mua nhận hàng → gọi confirmReceipt() → tiền đến người bán
 *  5. Nếu có tranh chấp → openDispute() → trọng tài resolveDispute()
 */
contract AuctionHouse {

    // ─────────────────────────────────────────────────────────────
    //  Enums
    // ─────────────────────────────────────────────────────────────

    enum AuctionStatus {
        Pending,    // 0 chờ bắt đầu
        Active,     // 1 đang diễn ra
        Ended,      // 2 kết thúc – chờ xác nhận giao hàng
        Completed,  // 3 hoàn tất – tiền đã giải phóng
        Disputed,   // 4 đang tranh chấp
        Resolved,   // 5 tranh chấp đã giải quyết
        Cancelled   // 6 huỷ (không ai trả giá)
    }

    enum DisputeStatus { Open, UnderReview, Resolved, Appealed }

    enum DisputeRuling {
        None,       // 0
        BuyerWins,  // 1 hoàn tiền người mua
        SellerWins, // 2 giải phóng tiền cho người bán
        Split       // 3 chia đôi
    }

    // ─────────────────────────────────────────────────────────────
    //  Structs
    // ─────────────────────────────────────────────────────────────

    struct Bid {
        address bidder;
        uint256 amount;
        uint256 timestamp;
    }

    struct Auction {
        uint256 id;
        address seller;
        string  title;
        string  description;
        string  ipfsHash;       // CID ảnh IPFS hoặc URL
        uint256 startPrice;     // wei
        uint256 bidStep;        // wei – bước giá tối thiểu
        uint256 currentPrice;   // wei – giá cao nhất hiện tại
        uint256 startTime;      // unix timestamp
        uint256 endTime;        // unix timestamp
        address highestBidder;
        uint256 highestBid;     // wei
        uint8   status;         // AuctionStatus
        address arbitrator;     // 0x0 = không chọn trọng tài
        uint256 disputeId;      // 0 = không có tranh chấp; >0 = index+1
        bool    fundsReleased;
    }

    struct Dispute {
        uint256 id;
        uint256 auctionId;
        address openedBy;
        string  reason;
        uint256 openedAt;
        uint8   status;     // DisputeStatus
        uint8   ruling;     // DisputeRuling
        string  resolution;
        address arbitrator;
    }

    struct ArbitratorInfo {
        address addr;
        string  name;
        uint256 feeBps;           // phí, basis points (100 = 1%)
        uint256 casesHandled;
        uint256 reputationScore;  // 0-100
        bool    active;
        uint256 stakedAmount;     // wei cọc
    }

    // ─────────────────────────────────────────────────────────────
    //  Storage
    // ─────────────────────────────────────────────────────────────

    Auction[] public auctions;
    Dispute[] public disputes;

    mapping(uint256 => Bid[])                       public bids;
    mapping(address => uint256[])                   public sellerAuctions;
    mapping(address => uint256[])                   public bidderAuctions;
    mapping(uint256 => mapping(address => uint256)) public pendingReturns;
    mapping(address => ArbitratorInfo)              public arbitrators;
    address[] public arbitratorAddresses;

    address public owner;
    uint256 public platformFeeBps;
    uint256 public minArbitratorStake;

    // ─────────────────────────────────────────────────────────────
    //  Events
    // ─────────────────────────────────────────────────────────────

    event AuctionCreated(
        uint256 indexed id,
        address indexed seller,
        string  title,
        uint256 startPrice,
        uint256 endTime
    );
    event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed id, address indexed winner, uint256 finalPrice);
    event FundsReleased(uint256 indexed auctionId, address indexed recipient, uint256 amount);
    event DisputeOpened(uint256 indexed disputeId, uint256 indexed auctionId, address indexed openedBy);
    event DisputeResolved(uint256 indexed disputeId, uint8 ruling);
    event ArbitratorRegistered(address indexed arbitrator, string name);

    // ─────────────────────────────────────────────────────────────
    //  Modifiers
    // ─────────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier auctionExists(uint256 _id) {
        require(_id < auctions.length, "Auction not found");
        _;
    }

    // ─────────────────────────────────────────────────────────────
    //  Constructor
    // ─────────────────────────────────────────────────────────────

    constructor(uint256 _platformFeeBps, uint256 _minArbitratorStake) {
        owner              = msg.sender;
        platformFeeBps     = _platformFeeBps;     // vd: 250 = 2.5%
        minArbitratorStake = _minArbitratorStake; // vd: 10 LYX = 10e18
    }

    // ─────────────────────────────────────────────────────────────
    //  Tạo đấu giá
    // ─────────────────────────────────────────────────────────────

    function createAuction(
        string  calldata _title,
        string  calldata _description,
        string  calldata _ipfsHash,
        uint256 _startPrice,
        uint256 _bidStep,
        uint256 _startTime,
        uint256 _endTime,
        address _arbitrator
    ) external returns (uint256 auctionId) {
        require(_endTime > block.timestamp, "End time in past");
        require(_endTime > _startTime,      "End before start");
        require(_startPrice > 0,            "Invalid start price");
        require(_bidStep > 0,               "Invalid bid step");
        require(
            _arbitrator == address(0) || arbitrators[_arbitrator].active,
            "Invalid arbitrator"
        );

        auctionId = auctions.length;

        uint8 initStatus = block.timestamp >= _startTime
            ? uint8(AuctionStatus.Active)
            : uint8(AuctionStatus.Pending);

        auctions.push(Auction({
            id:            auctionId,
            seller:        msg.sender,
            title:         _title,
            description:   _description,
            ipfsHash:      _ipfsHash,
            startPrice:    _startPrice,
            bidStep:       _bidStep,
            currentPrice:  _startPrice,
            startTime:     _startTime,
            endTime:       _endTime,
            highestBidder: address(0),
            highestBid:    0,
            status:        initStatus,
            arbitrator:    _arbitrator,
            disputeId:     0,
            fundsReleased: false
        }));

        sellerAuctions[msg.sender].push(auctionId);
        emit AuctionCreated(auctionId, msg.sender, _title, _startPrice, _endTime);
    }

    // ─────────────────────────────────────────────────────────────
    //  Đặt giá thầu
    // ─────────────────────────────────────────────────────────────

    function placeBid(uint256 _auctionId) external payable auctionExists(_auctionId) {
        Auction storage a = auctions[_auctionId];

        require(a.status == uint8(AuctionStatus.Active), "Auction not active");
        require(block.timestamp >= a.startTime,          "Not started yet");
        require(block.timestamp <  a.endTime,            "Already ended");
        require(msg.sender != a.seller,                  "Seller cannot bid");
        require(msg.value > 0,                           "Zero value");

        uint256 minBid = a.highestBid == 0 ? a.startPrice : a.highestBid + a.bidStep;
        require(msg.value >= minBid, "Bid too low");

        // Hoàn tiền cho người trả giá trước
        if (a.highestBidder != address(0)) {
            pendingReturns[_auctionId][a.highestBidder] += a.highestBid;
        }

        if (!_hasBid(msg.sender, _auctionId)) {
            bidderAuctions[msg.sender].push(_auctionId);
        }

        a.highestBidder = msg.sender;
        a.highestBid    = msg.value;
        a.currentPrice  = msg.value;

        bids[_auctionId].push(Bid({
            bidder:    msg.sender,
            amount:    msg.value,
            timestamp: block.timestamp
        }));

        emit BidPlaced(_auctionId, msg.sender, msg.value);
    }

    function _hasBid(address _bidder, uint256 _auctionId) private view returns (bool) {
        uint256[] storage ids = bidderAuctions[_bidder];
        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] == _auctionId) return true;
        }
        return false;
    }

    /// @notice Rút tiền hoàn khi bị outbid.
    function withdrawRefund(uint256 _auctionId) external {
        uint256 amount = pendingReturns[_auctionId][msg.sender];
        require(amount > 0, "Nothing to withdraw");
        pendingReturns[_auctionId][msg.sender] = 0;
        _safeTransfer(msg.sender, amount);
    }

    // ─────────────────────────────────────────────────────────────
    //  Kết thúc phiên & giải phóng tiền
    // ─────────────────────────────────────────────────────────────

    function endAuction(uint256 _auctionId) external auctionExists(_auctionId) {
        Auction storage a = auctions[_auctionId];
        require(a.status == uint8(AuctionStatus.Active), "Not active");
        require(block.timestamp >= a.endTime,            "Not finished yet");
        require(msg.sender == a.seller || msg.sender == owner, "Not authorized");

        if (a.highestBidder == address(0)) {
            a.status = uint8(AuctionStatus.Cancelled);
        } else {
            a.status = uint8(AuctionStatus.Ended);
            emit AuctionEnded(_auctionId, a.highestBidder, a.highestBid);
        }
    }

    /// @notice Người mua xác nhận nhận hàng – tiền tự động đến người bán.
    function confirmReceipt(uint256 _auctionId) external auctionExists(_auctionId) {
        Auction storage a = auctions[_auctionId];
        require(a.status == uint8(AuctionStatus.Ended), "Not in Ended state");
        require(!a.fundsReleased,                       "Already released");
        require(msg.sender == a.highestBidder,          "Only winner can confirm");
        _releaseFundsToSeller(_auctionId);
    }

    function _releaseFundsToSeller(uint256 _auctionId) private {
        Auction storage a   = auctions[_auctionId];
        uint256 total       = a.highestBid;
        uint256 platformFee = (total * platformFeeBps) / 10_000;
        uint256 toSeller    = total - platformFee;

        a.fundsReleased = true;
        a.status        = uint8(AuctionStatus.Completed);

        _safeTransfer(a.seller, toSeller);
        if (platformFee > 0) _safeTransfer(owner, platformFee);

        emit FundsReleased(_auctionId, a.seller, toSeller);
    }

    // ─────────────────────────────────────────────────────────────
    //  Tranh chấp
    // ─────────────────────────────────────────────────────────────

    function openDispute(uint256 _auctionId, string calldata _reason)
        external
        auctionExists(_auctionId)
        returns (uint256 disputeId)
    {
        Auction storage a = auctions[_auctionId];
        require(
            a.status == uint8(AuctionStatus.Ended) ||
            a.status == uint8(AuctionStatus.Active),
            "Cannot dispute in this state"
        );
        require(
            msg.sender == a.highestBidder || msg.sender == a.seller,
            "Not a party"
        );
        require(a.disputeId == 0,              "Dispute already exists");
        require(bytes(_reason).length > 0,     "Reason required");

        disputeId = disputes.length;

        disputes.push(Dispute({
            id:         disputeId,
            auctionId:  _auctionId,
            openedBy:   msg.sender,
            reason:     _reason,
            openedAt:   block.timestamp,
            status:     uint8(DisputeStatus.Open),
            ruling:     uint8(DisputeRuling.None),
            resolution: "",
            arbitrator: a.arbitrator
        }));

        a.status    = uint8(AuctionStatus.Disputed);
        a.disputeId = disputeId + 1;

        emit DisputeOpened(disputeId, _auctionId, msg.sender);
    }

    /// @param _ruling 1=BuyerWins, 2=SellerWins, 3=Split
    function resolveDispute(
        uint256 _disputeId,
        uint8   _ruling,
        string  calldata _resolution
    ) external {
        require(_disputeId < disputes.length, "Dispute not found");
        Dispute storage d = disputes[_disputeId];
        Auction storage a = auctions[d.auctionId];

        require(
            d.status == uint8(DisputeStatus.Open) ||
            d.status == uint8(DisputeStatus.UnderReview),
            "Dispute not open"
        );
        require(msg.sender == d.arbitrator || msg.sender == owner, "Not arbitrator");
        require(_ruling >= 1 && _ruling <= 3, "Invalid ruling");

        d.status     = uint8(DisputeStatus.Resolved);
        d.ruling     = _ruling;
        d.resolution = _resolution;
        a.status     = uint8(AuctionStatus.Resolved);

        uint256 total = a.highestBid;

        if (_ruling == uint8(DisputeRuling.BuyerWins)) {
            pendingReturns[d.auctionId][a.highestBidder] += total;
            a.fundsReleased = true;

        } else if (_ruling == uint8(DisputeRuling.SellerWins)) {
            uint256 platformFee   = (total * platformFeeBps) / 10_000;
            uint256 arbitratorFee = d.arbitrator != address(0)
                ? (total * arbitrators[d.arbitrator].feeBps) / 10_000 : 0;
            uint256 toSeller = total - platformFee - arbitratorFee;

            _safeTransfer(a.seller, toSeller);
            if (platformFee   > 0) _safeTransfer(owner, platformFee);
            if (arbitratorFee > 0 && d.arbitrator != address(0)) {
                _safeTransfer(d.arbitrator, arbitratorFee);
                arbitrators[d.arbitrator].casesHandled++;
            }
            a.fundsReleased = true;

        } else {
            // Split 50/50
            uint256 half = total / 2;
            _safeTransfer(a.seller, half);
            pendingReturns[d.auctionId][a.highestBidder] += (total - half);
            a.fundsReleased = true;
        }

        emit DisputeResolved(_disputeId, _ruling);
    }

    // ─────────────────────────────────────────────────────────────
    //  Trọng tài
    // ─────────────────────────────────────────────────────────────

    function registerArbitrator(string calldata _name, uint256 _feeBps) external payable {
        require(msg.value >= minArbitratorStake, "Insufficient stake");
        require(!arbitrators[msg.sender].active, "Already registered");
        require(_feeBps <= 500,                  "Fee max 5%");
        require(bytes(_name).length > 0,         "Name required");

        arbitrators[msg.sender] = ArbitratorInfo({
            addr:            msg.sender,
            name:            _name,
            feeBps:          _feeBps,
            casesHandled:    0,
            reputationScore: 50,
            active:          true,
            stakedAmount:    msg.value
        });
        arbitratorAddresses.push(msg.sender);

        emit ArbitratorRegistered(msg.sender, _name);
    }

    function deregisterArbitrator() external {
        require(arbitrators[msg.sender].active, "Not registered");
        uint256 stake = arbitrators[msg.sender].stakedAmount;
        arbitrators[msg.sender].active       = false;
        arbitrators[msg.sender].stakedAmount = 0;
        _safeTransfer(msg.sender, stake);
    }

    // ─────────────────────────────────────────────────────────────
    //  Views
    // ─────────────────────────────────────────────────────────────

    function getAuctionCount() external view returns (uint256) {
        return auctions.length;
    }

    function getAuction(uint256 _id) external view auctionExists(_id) returns (Auction memory) {
        return auctions[_id];
    }

    function getAuctions(uint256 _offset, uint256 _limit)
        external view returns (Auction[] memory result)
    {
        uint256 total = auctions.length;
        if (_offset >= total || _limit == 0) return result;
        uint256 end = _offset + _limit > total ? total : _offset + _limit;
        result = new Auction[](end - _offset);
        for (uint256 i = _offset; i < end; i++) result[i - _offset] = auctions[i];
    }

    function getBids(uint256 _auctionId) external view returns (Bid[] memory) {
        return bids[_auctionId];
    }

    function getSellerAuctions(address _seller) external view returns (uint256[] memory) {
        return sellerAuctions[_seller];
    }

    function getBidderAuctions(address _bidder) external view returns (uint256[] memory) {
        return bidderAuctions[_bidder];
    }

    function getArbitratorCount() external view returns (uint256) {
        return arbitratorAddresses.length;
    }

    function getArbitratorList() external view returns (address[] memory) {
        return arbitratorAddresses;
    }

    function getArbitrator(address _addr) external view returns (ArbitratorInfo memory) {
        return arbitrators[_addr];
    }

    function getDisputeCount() external view returns (uint256) {
        return disputes.length;
    }

    function getDispute(uint256 _id) external view returns (Dispute memory) {
        require(_id < disputes.length, "Dispute not found");
        return disputes[_id];
    }

    function getPendingReturn(uint256 _auctionId, address _bidder) external view returns (uint256) {
        return pendingReturns[_auctionId][_bidder];
    }

    // ─────────────────────────────────────────────────────────────
    //  Admin
    // ─────────────────────────────────────────────────────────────

    function setPlatformFee(uint256 _bps) external onlyOwner {
        require(_bps <= 1000, "Max 10%");
        platformFeeBps = _bps;
    }

    function setMinArbitratorStake(uint256 _amount) external onlyOwner {
        minArbitratorStake = _amount;
    }

    // ─────────────────────────────────────────────────────────────
    //  Internal
    // ─────────────────────────────────────────────────────────────

    function _safeTransfer(address _to, uint256 _amount) private {
        (bool ok,) = payable(_to).call{value: _amount}("");
        require(ok, "Transfer failed");
    }

    receive() external payable {}
}
