"use client";

import React from "react";
import {
  ArrowLeft,
  Gavel,
  History,
  AlertTriangle,
  TrendingUp,
  Clock,
  ExternalLink,
  Eye,
  Users,
  CalendarDays,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function MyBidDetail({ data, onBack, lang }) {
  // Đảm bảo dữ liệu luôn an toàn để không bị lỗi map
  const bidInfo = {
    ...data,
    id: data?.id || "4",
    startingPrice: data?.startingPrice || 100,
    myLastBid: data?.myLastBid || 180,
    currentPrice: data?.currentPrice || 210,
    totalParticipants: data?.totalParticipants || 15,
    startTime: data?.startTime || "01/03/2026 08:00",
    endTime: data?.endTime || "15/03/2026 20:00",
    timeLeft: data?.timeLeft || "05 Ngày : 12:44:00",
    history: data?.history || [],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#ffffff] font-bold uppercase transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {lang === "vi" ? "Quay lại lịch sử" : "Back to history"}
        </button>

        <Link
          href={`/${lang}/pages/auctionDetail?id=${bidInfo.id}`}
          className="flex items-center gap-2 text-[10px] font-bold text-[#3498db] border border-[#3498db] px-3 py-1.5 rounded-sm hover:bg-[#3498db] hover:text-white transition-all uppercase tracking-wider"
        >
          <Eye size={14} />{" "}
          {lang === "vi" ? "Xem trang sản phẩm đầy đủ" : "View Full Product"}
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        {/* Header & Thống kê nhanh */}
        <div className="p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#003366] uppercase tracking-tight">
                {bidInfo.title || "Chi tiết trả giá"}
              </h2>

              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-sm">
                  <Users size={14} className="text-slate-500" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase">
                    {bidInfo.totalParticipants}{" "}
                    {lang === "vi" ? "Người tham gia" : "Participants"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-sm">
                  <Clock size={14} className="text-blue-600" />
                  <span className="text-[11px] font-bold text-blue-700 uppercase">
                    {bidInfo.timeLeft}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-sm flex items-center gap-3 border border-red-100 animate-pulse">
              <AlertTriangle size={20} />
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-wider">
                  Bạn đã bị vượt mặt!
                </span>
                <span className="text-[9px] uppercase font-bold opacity-80">
                  Nâng giá để dẫn đầu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cột trái: So sánh giá và Form đặt giá */}
          <div className="lg:col-span-7 space-y-8">
            {/* Hệ thống so sánh 3 mốc giá */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* MỐC 1: GIÁ KHỞI ĐIỂM (Màu trung tính, trầm) */}
              <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-sm text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">
                  Giá khởi điểm
                </p>
                <p className="text-xl font-bold text-slate-400/80">
                  {bidInfo.startingPrice} BBD
                </p>
              </div>

              {/* MỐC 2: GIÁ CỦA BẠN (Màu xám, gạch ngang) */}
              <div className="bg-slate-50 p-4 border border-slate-100 rounded-sm text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">
                  Giá của bạn
                </p>
                <p className="text-xl font-bold text-slate-400 line-through italic">
                  {bidInfo.myLastBid} BBD
                </p>
              </div>

              {/* MỐC 3: GIÁ HIỆN TẠI (Màu đỏ, cực kỳ nổi bật) */}
              <div className="bg-red-50 p-4 border border-red-200 text-center shadow-sm rounded-sm ring-2 ring-red-100 relative overflow-hidden">
                <p className="text-[9px] font-bold text-red-500 uppercase mb-1 tracking-widest">
                  Giá cao nhất
                </p>
                <p className="text-2xl font-black text-red-600">
                  {bidInfo.currentPrice} BBD
                </p>
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[7px] font-bold px-1 py-0.5 uppercase">
                  Top
                </div>
              </div>
            </div>

            {/* Form đặt giá nhanh */}
            <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 shadow-inner">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-[#3498db]" />
                <label className="text-xs font-bold text-slate-600 uppercase">
                  Đưa ra mức giá mới
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={`Tối thiểu ${(bidInfo.currentPrice || 0) + 5} BBD`}
                  className="flex-1 p-3 text-lg font-bold border-2 border-slate-200 outline-none focus:border-[#3498db] transition-all rounded-sm"
                />
                <button className="bg-[#003366] text-white px-8 py-3 font-black uppercase text-xs rounded-sm shadow-md hover:bg-blue-900 transition-all">
                  Đặt giá
                </button>
              </div>
            </div>
          </div>

          {/* Cột phải: Lịch trình chi tiết */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 p-5 rounded-sm border border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                <CalendarDays size={16} /> Lịch trình phiên đấu
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">
                    Bắt đầu:
                  </span>
                  <span className="font-bold text-slate-700">
                    {bidInfo.startTime}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">
                    Kết thúc:
                  </span>
                  <span className="font-bold text-slate-700">
                    {bidInfo.endTime}
                  </span>
                </div>
                <div className="mt-4 p-3 bg-white rounded-sm border border-slate-100 flex items-start gap-2">
                  <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 leading-relaxed italic">
                    Thời gian có thể gia hạn nếu có lượt đặt giá ở phút chót.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lịch sử trả giá cá nhân */}
        <div className="px-8 pb-8">
          <h3 className="text-[10px] font-bold uppercase text-slate-400 mb-4 flex items-center gap-2 tracking-[0.2em]">
            <History size={16} /> Nhật ký của bạn tại lô hàng này
          </h3>
          <div className="border border-slate-100 rounded-sm overflow-hidden">
            {bidInfo.history.length > 0 ? (
              bidInfo.history.map((h, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                >
                  <span className="font-black text-slate-700">
                    {h.amount}.00 BBD
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    {h.time || "N/A"}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs italic text-slate-400 bg-slate-50/30">
                Chưa có lịch sử trả giá cá nhân
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
