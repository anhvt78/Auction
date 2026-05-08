'use client';

// ─────────────────────────────────────────────────────────────────────────────
// ABI – tự động sync với contracts/AuctionHouse.sol
// Sau khi chạy `npx hardhat compile`, ABI chính xác nằm ở:
//   artifacts/contracts/AuctionHouse.sol/AuctionHouse.json
// File này dùng ABI hard-coded để frontend chạy ngay cả khi chưa compile.
// ─────────────────────────────────────────────────────────────────────────────

export const AUCTION_HOUSE_ABI = [
  // Constructor
  {
    "type": "constructor",
    "inputs": [
      { "name": "_platformFeeBps",     "type": "uint256" },
      { "name": "_minArbitratorStake", "type": "uint256" }
    ]
  },

  // ── createAuction ──────────────────────────────────────────────
  {
    "type": "function", "name": "createAuction",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "_title",       "type": "string"  },
      { "name": "_description", "type": "string"  },
      { "name": "_ipfsHash",    "type": "string"  },
      { "name": "_startPrice",  "type": "uint256" },
      { "name": "_bidStep",     "type": "uint256" },
      { "name": "_startTime",   "type": "uint256" },
      { "name": "_endTime",     "type": "uint256" },
      { "name": "_arbitrator",  "type": "address" }
    ],
    "outputs": [{ "name": "auctionId", "type": "uint256" }]
  },

  // ── placeBid ───────────────────────────────────────────────────
  {
    "type": "function", "name": "placeBid",
    "stateMutability": "payable",
    "inputs": [{ "name": "_auctionId", "type": "uint256" }],
    "outputs": []
  },

  // ── withdrawRefund ─────────────────────────────────────────────
  {
    "type": "function", "name": "withdrawRefund",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "_auctionId", "type": "uint256" }],
    "outputs": []
  },

  // ── endAuction ─────────────────────────────────────────────────
  {
    "type": "function", "name": "endAuction",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "_auctionId", "type": "uint256" }],
    "outputs": []
  },

  // ── confirmReceipt ─────────────────────────────────────────────
  {
    "type": "function", "name": "confirmReceipt",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "_auctionId", "type": "uint256" }],
    "outputs": []
  },

  // ── openDispute ────────────────────────────────────────────────
  {
    "type": "function", "name": "openDispute",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "_auctionId", "type": "uint256" },
      { "name": "_reason",    "type": "string"  }
    ],
    "outputs": [{ "name": "disputeId", "type": "uint256" }]
  },

  // ── resolveDispute ─────────────────────────────────────────────
  {
    "type": "function", "name": "resolveDispute",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "_disputeId",  "type": "uint256" },
      { "name": "_ruling",     "type": "uint8"   },
      { "name": "_resolution", "type": "string"  }
    ],
    "outputs": []
  },

  // ── registerArbitrator ─────────────────────────────────────────
  {
    "type": "function", "name": "registerArbitrator",
    "stateMutability": "payable",
    "inputs": [
      { "name": "_name",   "type": "string"  },
      { "name": "_feeBps", "type": "uint256" }
    ],
    "outputs": []
  },

  // ── deregisterArbitrator ───────────────────────────────────────
  {
    "type": "function", "name": "deregisterArbitrator",
    "stateMutability": "nonpayable",
    "inputs": [],
    "outputs": []
  },

  // ── View: getAuctionCount ──────────────────────────────────────
  {
    "type": "function", "name": "getAuctionCount",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },

  // ── View: getAuction ───────────────────────────────────────────
  {
    "type": "function", "name": "getAuction",
    "stateMutability": "view",
    "inputs": [{ "name": "_id", "type": "uint256" }],
    "outputs": [{
      "name": "", "type": "tuple",
      "components": [
        { "name": "id",            "type": "uint256" },
        { "name": "seller",        "type": "address" },
        { "name": "title",         "type": "string"  },
        { "name": "description",   "type": "string"  },
        { "name": "ipfsHash",      "type": "string"  },
        { "name": "startPrice",    "type": "uint256" },
        { "name": "bidStep",       "type": "uint256" },
        { "name": "currentPrice",  "type": "uint256" },
        { "name": "startTime",     "type": "uint256" },
        { "name": "endTime",       "type": "uint256" },
        { "name": "highestBidder", "type": "address" },
        { "name": "highestBid",    "type": "uint256" },
        { "name": "status",        "type": "uint8"   },
        { "name": "arbitrator",    "type": "address" },
        { "name": "disputeId",     "type": "uint256" },
        { "name": "fundsReleased", "type": "bool"    }
      ]
    }]
  },

  // ── View: getAuctions (paginated) ─────────────────────────────
  {
    "type": "function", "name": "getAuctions",
    "stateMutability": "view",
    "inputs": [
      { "name": "_offset", "type": "uint256" },
      { "name": "_limit",  "type": "uint256" }
    ],
    "outputs": [{
      "name": "result", "type": "tuple[]",
      "components": [
        { "name": "id",            "type": "uint256" },
        { "name": "seller",        "type": "address" },
        { "name": "title",         "type": "string"  },
        { "name": "description",   "type": "string"  },
        { "name": "ipfsHash",      "type": "string"  },
        { "name": "startPrice",    "type": "uint256" },
        { "name": "bidStep",       "type": "uint256" },
        { "name": "currentPrice",  "type": "uint256" },
        { "name": "startTime",     "type": "uint256" },
        { "name": "endTime",       "type": "uint256" },
        { "name": "highestBidder", "type": "address" },
        { "name": "highestBid",    "type": "uint256" },
        { "name": "status",        "type": "uint8"   },
        { "name": "arbitrator",    "type": "address" },
        { "name": "disputeId",     "type": "uint256" },
        { "name": "fundsReleased", "type": "bool"    }
      ]
    }]
  },

  // ── View: getBids ──────────────────────────────────────────────
  {
    "type": "function", "name": "getBids",
    "stateMutability": "view",
    "inputs": [{ "name": "_auctionId", "type": "uint256" }],
    "outputs": [{
      "name": "", "type": "tuple[]",
      "components": [
        { "name": "bidder",    "type": "address" },
        { "name": "amount",    "type": "uint256" },
        { "name": "timestamp", "type": "uint256" }
      ]
    }]
  },

  // ── View: getSellerAuctions ────────────────────────────────────
  {
    "type": "function", "name": "getSellerAuctions",
    "stateMutability": "view",
    "inputs": [{ "name": "_seller", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256[]" }]
  },

  // ── View: getBidderAuctions ────────────────────────────────────
  {
    "type": "function", "name": "getBidderAuctions",
    "stateMutability": "view",
    "inputs": [{ "name": "_bidder", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256[]" }]
  },

  // ── View: getArbitratorCount ───────────────────────────────────
  {
    "type": "function", "name": "getArbitratorCount",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },

  // ── View: getArbitratorList ────────────────────────────────────
  {
    "type": "function", "name": "getArbitratorList",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address[]" }]
  },

  // ── View: getArbitrator ────────────────────────────────────────
  {
    "type": "function", "name": "getArbitrator",
    "stateMutability": "view",
    "inputs": [{ "name": "_addr", "type": "address" }],
    "outputs": [{
      "name": "", "type": "tuple",
      "components": [
        { "name": "addr",            "type": "address" },
        { "name": "name",            "type": "string"  },
        { "name": "feeBps",          "type": "uint256" },
        { "name": "casesHandled",    "type": "uint256" },
        { "name": "reputationScore", "type": "uint256" },
        { "name": "active",          "type": "bool"    },
        { "name": "stakedAmount",    "type": "uint256" }
      ]
    }]
  },

  // ── View: getDisputeCount ──────────────────────────────────────
  {
    "type": "function", "name": "getDisputeCount",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },

  // ── View: getDispute ───────────────────────────────────────────
  {
    "type": "function", "name": "getDispute",
    "stateMutability": "view",
    "inputs": [{ "name": "_id", "type": "uint256" }],
    "outputs": [{
      "name": "", "type": "tuple",
      "components": [
        { "name": "id",         "type": "uint256" },
        { "name": "auctionId",  "type": "uint256" },
        { "name": "openedBy",   "type": "address" },
        { "name": "reason",     "type": "string"  },
        { "name": "openedAt",   "type": "uint256" },
        { "name": "status",     "type": "uint8"   },
        { "name": "ruling",     "type": "uint8"   },
        { "name": "resolution", "type": "string"  },
        { "name": "arbitrator", "type": "address" }
      ]
    }]
  },

  // ── View: getPendingReturn ─────────────────────────────────────
  {
    "type": "function", "name": "getPendingReturn",
    "stateMutability": "view",
    "inputs": [
      { "name": "_auctionId", "type": "uint256" },
      { "name": "_bidder",    "type": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256" }]
  },

  // ── View: owner / platformFeeBps / minArbitratorStake ─────────
  {
    "type": "function", "name": "owner",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "type": "function", "name": "platformFeeBps",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "type": "function", "name": "minArbitratorStake",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },

  // ── Admin ──────────────────────────────────────────────────────
  {
    "type": "function", "name": "setPlatformFee",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "_bps", "type": "uint256" }],
    "outputs": []
  },
  {
    "type": "function", "name": "setMinArbitratorStake",
    "stateMutability": "nonpayable",
    "inputs": [{ "name": "_amount", "type": "uint256" }],
    "outputs": []
  },

  // ── Events ─────────────────────────────────────────────────────
  {
    "type": "event", "name": "AuctionCreated",
    "inputs": [
      { "name": "id",         "type": "uint256", "indexed": true  },
      { "name": "seller",     "type": "address", "indexed": true  },
      { "name": "title",      "type": "string",  "indexed": false },
      { "name": "startPrice", "type": "uint256", "indexed": false },
      { "name": "endTime",    "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event", "name": "BidPlaced",
    "inputs": [
      { "name": "auctionId", "type": "uint256", "indexed": true  },
      { "name": "bidder",    "type": "address", "indexed": true  },
      { "name": "amount",    "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event", "name": "AuctionEnded",
    "inputs": [
      { "name": "id",         "type": "uint256", "indexed": true  },
      { "name": "winner",     "type": "address", "indexed": true  },
      { "name": "finalPrice", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event", "name": "FundsReleased",
    "inputs": [
      { "name": "auctionId",  "type": "uint256", "indexed": true  },
      { "name": "recipient",  "type": "address", "indexed": true  },
      { "name": "amount",     "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event", "name": "DisputeOpened",
    "inputs": [
      { "name": "disputeId",  "type": "uint256", "indexed": true  },
      { "name": "auctionId",  "type": "uint256", "indexed": true  },
      { "name": "openedBy",   "type": "address", "indexed": true  }
    ]
  },
  {
    "type": "event", "name": "DisputeResolved",
    "inputs": [
      { "name": "disputeId", "type": "uint256", "indexed": true  },
      { "name": "ruling",    "type": "uint8",   "indexed": false }
    ]
  },
  {
    "type": "event", "name": "ArbitratorRegistered",
    "inputs": [
      { "name": "arbitrator", "type": "address", "indexed": true  },
      { "name": "name",       "type": "string",  "indexed": false }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Địa chỉ contract
// Sau khi deploy, cập nhật giá trị này hoặc set NEXT_PUBLIC_CONTRACT_ADDRESS
// trong .env.local
// ─────────────────────────────────────────────────────────────────────────────
export const AUCTION_HOUSE_ADDRESS =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CONTRACT_ADDRESS) ||
  "0x0000000000000000000000000000000000000000";

// ─────────────────────────────────────────────────────────────────────────────
// Enum helpers (đồng bộ với Solidity)
// ─────────────────────────────────────────────────────────────────────────────
export const AUCTION_STATUS = {
  0: "Pending",
  1: "Active",
  2: "Ended",
  3: "Completed",
  4: "Disputed",
  5: "Resolved",
  6: "Cancelled",
};

export const AUCTION_STATUS_VI = {
  0: "Chờ bắt đầu",
  1: "Đang diễn ra",
  2: "Đã kết thúc",
  3: "Hoàn tất",
  4: "Đang tranh chấp",
  5: "Đã giải quyết",
  6: "Đã huỷ",
};

export const DISPUTE_STATUS_VI = {
  0: "Đang mở",
  1: "Đang xem xét",
  2: "Đã giải quyết",
  3: "Kháng cáo",
};

export const RULING_VI = {
  0: "Chưa phán quyết",
  1: "Người mua thắng",
  2: "Người bán thắng",
  3: "Chia đôi",
};

// ─────────────────────────────────────────────────────────────────────────────
// Formatting helpers
// ─────────────────────────────────────────────────────────────────────────────
import { formatEther, parseEther } from "viem";

/** BigInt wei → chuỗi "1.23 LYX" */
export function formatLYX(wei) {
  if (wei === undefined || wei === null) return "0 LYX";
  return parseFloat(formatEther(BigInt(wei))).toFixed(4) + " LYX";
}

/** unix timestamp → chuỗi ngày giờ Việt Nam */
export function formatTimestamp(ts) {
  if (!ts) return "—";
  return new Date(Number(ts) * 1000).toLocaleString("vi-VN");
}

/** Tính thời gian còn lại từ endTime (unix) */
export function timeLeft(endTimeSec) {
  const diff = Number(endTimeSec) - Math.floor(Date.now() / 1000);
  if (diff <= 0) return "Đã kết thúc";
  const d = Math.floor(diff / 86400);
  const h = Math.floor((diff % 86400) / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;
  if (d > 0) return `${d} ngày ${h} giờ`;
  if (h > 0) return `${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  return `${m}:${String(s).padStart(2,"0")}`;
}

/** Rút ngắn địa chỉ: 0x1234...abcd */
export function shortAddr(addr) {
  if (!addr || addr === "0x0000000000000000000000000000000000000000") return "—";
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

export { parseEther, formatEther };
