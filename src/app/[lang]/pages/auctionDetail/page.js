"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getDictionary } from "@/lib/get-dictionary";
import BidConfirmModal from "./BidConfirmModal";
import {
  useAuction,
  useAuctionBids,
  usePlaceBid,
  useEndAuction,
  useConfirmReceipt,
  useOpenDispute,
  useWithdrawRefund,
  usePendingReturn,
} from "@/hooks/useAuctions";
import {
  formatLYX,
  formatTimestamp,
  timeLeft,
  shortAddr,
  AUCTION_STATUS_VI,
  AUCTION_HOUSE_ADDRESS,
  parseEther,
} from "@/lib/contracts";
import {
  ChevronLeft,
  Gavel,
  Home,
  Clock,
  AlertCircle,
  History,
  User,
  Package,
  Truck,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";

// ── Helper ────────────────────────────────────────────────────────────────────

const STATUS = { Pending:0, Active:1, Ended:2, Completed:3, Disputed:4, Resolved:5, Cancelled:6 };

function statusBadge(s, lang) {
  const map = {
    0: ["bg-slate-400", AUCTION_STATUS_VI[0]],
    1: ["bg-[#77b300]", AUCTION_STATUS_VI[1]],
    2: ["bg-orange-500", AUCTION_STATUS_VI[2]],
    3: ["bg-green-600",  AUCTION_STATUS_VI[3]],
    4: ["bg-red-500",    AUCTION_STATUS_VI[4]],
    5: ["bg-purple-500", AUCTION_STATUS_VI[5]],
    6: ["bg-slate-500",  AUCTION_STATUS_VI[6]],
  };
  const [color, label] = map[s] || ["bg-slate-400", "—"];
  return (
    <span className={`${color} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>
      {label}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

function AuctionDetailContent({ params }) {
  const searchParams  = useSearchParams();
  const rawId         = searchParams.get("id");
  const auctionId     = rawId !== null ? Number(rawId) : null;

  const { lang } = React.use(params);
  const [dict, setDict] = useState(null);

  const { address: wallet } = useAccount();

  // Blockchain reads
  const { auction, isLoading, error, refetch } = useAuction(auctionId);
  const { bids,    isLoading: bidsLoading }     = useAuctionBids(auctionId);
  const { amount:  refundable }                 = usePendingReturn(auctionId, wallet);

  // Write hooks
  const { placeBid, isPending: isBidding, isSuccess: bidSuccess, error: bidError } = usePlaceBid();
  const { endAuction, isPending: isEnding }           = useEndAuction();
  const { confirmReceipt, isPending: isConfirming }   = useConfirmReceipt();
  const { openDispute, isPending: isDisputing }       = useOpenDispute();
  const { withdraw, isPending: isWithdrawing }        = useWithdrawRefund();

  // UI state
  const [bidValue,     setBidValue]     = useState("");
  const [bidError2,    setBidError2]    = useState("");
  const [isModalOpen,  setIsModalOpen]  = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [showDispute,  setShowDispute]  = useState(false);
  const [txMsg,        setTxMsg]        = useState("");

  useEffect(() => { getDictionary(lang).then(setDict); }, [lang]);

  // Phản hồi sau khi đặt giá thành công
  useEffect(() => {
    if (bidSuccess) {
      setIsSuccess(true);
      setTxMsg(lang === "vi" ? "Đặt giá thành công!" : "Bid placed successfully!");
      setTimeout(() => { setIsModalOpen(false); setIsSuccess(false); setTxMsg(""); refetch(); }, 3000);
    }
  }, [bidSuccess]);

  if (!dict) return (
    <div className="flex min-h-screen items-center justify-center text-slate-400 text-[10px] uppercase tracking-widest">
      Loading...
    </div>
  );

  const contractDeployed = AUCTION_HOUSE_ADDRESS !== "0x0000000000000000000000000000000000000000";

  // ── Bid validation ─────────────────────────────────────────────────────────
  const minBidWei = auction
    ? auction.highestBid === 0n
      ? auction.startPrice
      : auction.highestBid + auction.bidStep
    : 0n;

  const minBidLYX = auction
    ? parseFloat(minBidWei.toString()) / 1e18
    : 0;

  const handleBidInput = (e) => {
    const v = e.target.value;
    setBidValue(v);
    if (v !== "" && parseFloat(v) < minBidLYX) {
      setBidError2(lang === "vi" ? `Tối thiểu ${minBidLYX.toFixed(4)} LYX` : `Min ${minBidLYX.toFixed(4)} LYX`);
    } else {
      setBidError2("");
    }
  };

  const handleConfirmBid = async () => {
    if (!bidValue || bidError2) return;
    try {
      await placeBid(auctionId, bidValue);
    } catch (e) {
      setTxMsg(e?.shortMessage || e?.message || "Transaction failed");
    }
  };

  const handleEndAuction = async () => {
    try {
      await endAuction(auctionId);
      refetch();
    } catch (e) {
      alert(e?.shortMessage || e?.message);
    }
  };

  const handleConfirmReceipt = async () => {
    try {
      await confirmReceipt(auctionId);
      refetch();
    } catch (e) {
      alert(e?.shortMessage || e?.message);
    }
  };

  const handleOpenDispute = async () => {
    if (!disputeReason.trim()) return;
    try {
      await openDispute(auctionId, disputeReason);
      setShowDispute(false);
      refetch();
    } catch (e) {
      alert(e?.shortMessage || e?.message);
    }
  };

  const handleWithdraw = async () => {
    try {
      await withdraw(auctionId);
      refetch();
    } catch (e) {
      alert(e?.shortMessage || e?.message);
    }
  };

  // ── Status helpers ────────────────────────────────────────────────────────
  const isActive    = auction && Number(auction.status) === STATUS.Active;
  const isEnded     = auction && Number(auction.status) === STATUS.Ended;
  const isWinner    = wallet && auction && wallet.toLowerCase() === auction.highestBidder?.toLowerCase();
  const isSeller    = wallet && auction && wallet.toLowerCase() === auction.seller?.toLowerCase();
  const canBid      = isActive && wallet && !isSeller;
  const canEnd      = isActive && auction && Date.now() / 1000 >= Number(auction.endTime) && (isSeller);
  const canConfirm  = isEnded && isWinner && !auction?.fundsReleased;
  const canDispute  = (isActive || isEnded) && (isWinner || isSeller) && auction?.disputeId === 0n;
  const hasRefund   = refundable && refundable > 0n;

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9] font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#003366] text-white shadow-md h-14 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold">
            <Gavel size={18} /> <span>{dict.nav?.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/${lang}`} className="hover:text-slate-300 flex items-center gap-1 text-sm">
              <Home size={16} /> {dict.nav?.home}
            </Link>
            <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="mx-auto my-6 max-w-6xl px-4">
          <Link href={`/${lang}`} className="mb-6 inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1 text-[12px] font-bold text-slate-600 hover:bg-slate-50 uppercase rounded-sm shadow-sm">
            <ChevronLeft size={14} /> {lang === "vi" ? "Quay lại" : "Back"}
          </Link>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-24 text-slate-400">
              <Loader2 size={28} className="animate-spin mr-2" />
              <span>{lang === "vi" ? "Đang tải..." : "Loading..."}</span>
            </div>
          )}

          {/* Error */}
          {(error || !auction) && !isLoading && (
            <div className="text-center py-20 text-slate-400">
              <AlertCircle size={36} className="mx-auto mb-3 text-red-400" />
              <p>{lang === "vi" ? "Không tìm thấy phiên đấu giá." : "Auction not found."}</p>
              {!contractDeployed && (
                <p className="text-xs mt-2 text-amber-600">
                  Smart contract chưa deploy. Cập nhật{" "}
                  <code>NEXT_PUBLIC_CONTRACT_ADDRESS</code>.
                </p>
              )}
            </div>
          )}

          {/* Content */}
          {auction && !isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* ── Left column ── */}
              <div className="lg:col-span-7 space-y-6">

                {/* Image placeholder */}
                <div className="bg-white p-2 rounded-sm border border-slate-200 shadow-sm">
                  <div className="aspect-video bg-slate-100 rounded-sm overflow-hidden flex items-center justify-center">
                    {auction.ipfsHash ? (
                      <img src={auction.ipfsHash} alt={auction.title} className="w-full h-full object-contain" />
                    ) : (
                      <div className="text-slate-300 text-sm flex flex-col items-center gap-2">
                        <Package size={40} className="opacity-30" />
                        <span>{lang === "vi" ? "Không có ảnh" : "No image"}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping & Mediator */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 text-[#003366]">
                      <Truck size={16} />
                      <h3 className="text-[11px] font-bold uppercase tracking-wider">
                        {lang === "vi" ? "Thông tin giao hàng" : "Shipping Info"}
                      </h3>
                    </div>
                    <div className="p-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">{lang === "vi" ? "Người bán" : "Seller"}</span>
                        <span className="font-mono text-xs text-slate-700">{shortAddr(auction.seller)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">{lang === "vi" ? "Kết thúc" : "End time"}</span>
                        <span className="font-bold text-slate-700">{formatTimestamp(auction.endTime)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 text-green-700">
                      <ShieldCheck size={16} />
                      <h3 className="text-[11px] font-bold uppercase tracking-wider">
                        {lang === "vi" ? "Trọng tài / Escrow" : "Arbitrator / Escrow"}
                      </h3>
                    </div>
                    <div className="p-4 text-sm">
                      {auction.arbitrator && auction.arbitrator !== "0x0000000000000000000000000000000000000000" ? (
                        <>
                          <p className="font-mono text-xs text-slate-700">{shortAddr(auction.arbitrator)}</p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {lang === "vi"
                              ? "Tiền được giữ bởi smart contract – trọng tài giải quyết tranh chấp."
                              : "Funds held by smart contract – arbitrator resolves disputes."}
                          </p>
                        </>
                      ) : (
                        <p className="text-[11px] text-slate-500">
                          {lang === "vi"
                            ? "Tiền được giữ bởi smart contract cho đến khi xác nhận nhận hàng."
                            : "Funds held by smart contract until buyer confirms receipt."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-6">
                  <h3 className="text-sm font-bold uppercase mb-4 flex items-center gap-2">
                    <Package size={16} className="text-slate-400" />
                    {lang === "vi" ? "Mô tả chi tiết" : "Description"}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {auction.description || (lang === "vi" ? "(Không có mô tả)" : "(No description)")}
                  </p>
                </div>

                {/* Dispute section */}
                {canDispute && (
                  <div className="bg-white rounded-sm border border-red-200 shadow-sm p-6">
                    <h3 className="text-sm font-bold uppercase mb-3 flex items-center gap-2 text-red-700">
                      <AlertTriangle size={16} />
                      {lang === "vi" ? "Mở tranh chấp" : "Open Dispute"}
                    </h3>
                    {!showDispute ? (
                      <button onClick={() => setShowDispute(true)} className="text-xs font-bold text-red-600 underline">
                        {lang === "vi" ? "Tôi muốn khiếu nại về giao dịch này" : "I want to dispute this transaction"}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <textarea
                          rows={3}
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                          placeholder={lang === "vi" ? "Nêu lý do tranh chấp..." : "Describe the dispute reason..."}
                          className="w-full border border-red-200 p-2 text-sm rounded-sm outline-none focus:border-red-400"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleOpenDispute}
                            disabled={isDisputing || !disputeReason.trim()}
                            className="bg-red-600 text-white px-4 py-2 text-xs font-bold rounded-sm disabled:opacity-50 flex items-center gap-2"
                          >
                            {isDisputing && <Loader2 size={12} className="animate-spin" />}
                            {lang === "vi" ? "Gửi khiếu nại" : "Submit Dispute"}
                          </button>
                          <button onClick={() => setShowDispute(false)} className="text-xs text-slate-500 underline">
                            {lang === "vi" ? "Huỷ" : "Cancel"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Right column ── */}
              <div className="lg:col-span-5 space-y-6 sticky top-20">

                {/* Auction info card */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h1 className="text-lg font-bold text-[#003366] uppercase flex-1 pr-2">
                      {auction.title}
                    </h1>
                    {statusBadge(Number(auction.status), lang)}
                  </div>

                  {/* Timer */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-red-50 border border-red-100 rounded-sm">
                      <p className="text-[9px] uppercase font-bold text-red-400 mb-1 flex items-center gap-1">
                        <Clock size={12} /> {lang === "vi" ? "Còn lại" : "Time left"}
                      </p>
                      <p className="text-sm font-black text-red-600 uppercase">
                        {isActive ? timeLeft(auction.endTime) : AUCTION_STATUS_VI[Number(auction.status)]}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm">
                      <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">
                        {lang === "vi" ? "Bước giá" : "Bid step"}
                      </p>
                      <p className="text-sm font-bold text-slate-700">{formatLYX(auction.bidStep)}</p>
                    </div>
                  </div>

                  {/* Current price */}
                  <div className="bg-[#003366] text-white p-5 rounded-sm mb-6 flex justify-between items-center shadow-inner">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-300 mb-1">
                        {lang === "vi" ? "Giá hiện tại" : "Current price"}
                      </p>
                      <p className="text-3xl font-black">{formatLYX(auction.currentPrice)}</p>
                    </div>
                    {auction.highestBidder && auction.highestBidder !== "0x0000000000000000000000000000000000000000" && (
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-slate-300 mb-1">
                          {lang === "vi" ? "Người dẫn đầu" : "Leading"}
                        </p>
                        <p className="font-mono text-xs text-slate-200">{shortAddr(auction.highestBidder)}</p>
                        {isWinner && (
                          <p className="text-[10px] text-green-300 font-bold mt-1">
                            ← {lang === "vi" ? "Bạn" : "You"}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Refund available */}
                  {hasRefund && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-sm flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-green-800">
                          {lang === "vi" ? "Tiền hoàn đang chờ rút" : "Refund available"}
                        </p>
                        <p className="text-sm font-bold text-green-700">{formatLYX(refundable)}</p>
                      </div>
                      <button
                        onClick={handleWithdraw}
                        disabled={isWithdrawing}
                        className="bg-green-600 text-white px-3 py-1 text-xs font-bold rounded-sm disabled:opacity-50 flex items-center gap-1"
                      >
                        {isWithdrawing ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                        {lang === "vi" ? "Rút" : "Withdraw"}
                      </button>
                    </div>
                  )}

                  {/* Bid form */}
                  {canBid && (
                    <div className="space-y-3">
                      <input
                        type="number"
                        step="0.0001"
                        value={bidValue}
                        onChange={handleBidInput}
                        placeholder={`${lang === "vi" ? "Tối thiểu" : "Min"} ${minBidLYX.toFixed(4)} LYX`}
                        className={`w-full p-4 text-xl font-bold outline-none border-2 transition-all ${bidError2 ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#3498db]"}`}
                      />
                      {bidError2 && (
                        <p className="text-red-600 text-[10px] font-bold flex items-center gap-1 uppercase">
                          <AlertCircle size={12} /> {bidError2}
                        </p>
                      )}
                      <button
                        onClick={() => setIsModalOpen(true)}
                        disabled={!!bidError2 || !bidValue}
                        className="w-full bg-[#3498db] hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                      >
                        {lang === "vi" ? "Gửi giá thầu" : "Submit Bid"}
                      </button>
                    </div>
                  )}

                  {/* Wallet not connected */}
                  {isActive && !wallet && (
                    <div className="text-center">
                      <p className="text-xs text-slate-500 mb-3">
                        {lang === "vi" ? "Kết nối ví để đặt giá" : "Connect wallet to place a bid"}
                      </p>
                      <ConnectButton label={lang === "vi" ? "Kết nối ví" : "Connect Wallet"} />
                    </div>
                  )}

                  {/* Seller actions */}
                  {canEnd && (
                    <button
                      onClick={handleEndAuction}
                      disabled={isEnding}
                      className="w-full mt-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold py-3 rounded-sm text-sm uppercase flex items-center justify-center gap-2"
                    >
                      {isEnding ? <Loader2 size={14} className="animate-spin" /> : <Gavel size={14} />}
                      {lang === "vi" ? "Kết thúc phiên đấu giá" : "End Auction"}
                    </button>
                  )}

                  {/* Buyer confirm receipt */}
                  {canConfirm && (
                    <button
                      onClick={handleConfirmReceipt}
                      disabled={isConfirming}
                      className="w-full mt-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 rounded-sm text-sm uppercase flex items-center justify-center gap-2"
                    >
                      {isConfirming ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                      {lang === "vi" ? "Xác nhận đã nhận hàng → giải phóng tiền" : "Confirm Receipt → Release Funds"}
                    </button>
                  )}

                  {/* Completed */}
                  {Number(auction.status) === 3 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-sm text-center">
                      <CheckCircle2 size={20} className="mx-auto mb-1 text-green-600" />
                      <p className="text-sm font-bold text-green-800">
                        {lang === "vi" ? "Giao dịch hoàn tất!" : "Transaction completed!"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bid history */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                    <History size={14} className="text-slate-400" />
                    <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      {lang === "vi" ? "Lịch sử trả giá" : "Bid History"}
                    </h3>
                    <span className="ml-auto text-[10px] text-slate-400">{bids.length}</span>
                  </div>

                  {bidsLoading ? (
                    <div className="p-4 text-center text-slate-400">
                      <Loader2 size={16} className="animate-spin mx-auto" />
                    </div>
                  ) : bids.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 text-xs">
                      {lang === "vi" ? "Chưa có giá thầu" : "No bids yet"}
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                      {[...bids].reverse().map((bid, i) => (
                        <div key={i} className="px-4 py-3 flex justify-between items-center text-xs hover:bg-slate-50">
                          <div className="flex items-center gap-2">
                            <User size={12} className="text-slate-300" />
                            <span className="font-mono text-slate-500">
                              {shortAddr(bid.bidder)}
                              {wallet && bid.bidder?.toLowerCase() === wallet.toLowerCase() && (
                                <span className="ml-1 text-blue-500 font-bold">(bạn)</span>
                              )}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#003366]">{formatLYX(bid.amount)}</p>
                            <p className="text-[10px] text-slate-400">{formatTimestamp(bid.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
          Blockchain Auction System © 2026
        </p>
      </footer>

      <BidConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBid}
        isProcessing={isBidding}
        isSuccess={isSuccess}
        bidValue={`${bidValue} LYX`}
        lang={lang}
        txMsg={txMsg}
      />
    </div>
  );
}

export default function AuctionDetailPage({ params }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest">
        Loading...
      </div>
    }>
      <AuctionDetailContent params={params} />
    </Suspense>
  );
}
