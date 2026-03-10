"use client";

import React from "react";
import {
  ArrowLeft,
  Users,
  Truck,
  ShieldCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  BarChart3,
} from "lucide-react";

export default function MyAuctionDetail({ data, onBack, lang }) {
  const auction = {
    ...data,
    bidders: data?.bidders || [],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#003366] font-bold uppercase transition-colors"
      >
        <ArrowLeft size={16} />{" "}
        {lang === "vi" ? "Quay lại danh sách" : "Back to list"}
      </button>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        {/* Header: Chỉ xem, không tương tác giá */}
        <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Đang diễn ra
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Mã lô: {auction.lotNumber || "LOT-001"}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#003366] uppercase tracking-tight">
              {auction.title || "Chi tiết lô hàng"}
            </h2>
          </div>
          <div className="text-right bg-[#003366] text-white p-4 rounded-sm min-w-[200px] shadow-lg">
            <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">
              Doanh thu dự kiến hiện tại
            </p>
            <p className="text-3xl font-black">
              {auction.currentPrice || 0}{" "}
              <span className="text-sm font-normal text-blue-300">BBD</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* CỘT 1: DIỄN BIẾN ĐẤU GIÁ (Chỉ đọc) */}
          <div className="lg:col-span-4 p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
              <BarChart3 size={16} /> Lịch sử trả giá của khách
            </h3>
            <div className="space-y-3">
              {auction.bidders.length > 0 ? (
                auction.bidders.map((bid, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-sm"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] text-blue-600 font-bold">
                        {bid.address || "0x..."}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase">
                        {bid.time || "Vừa xong"}
                      </span>
                    </div>
                    <span className="font-black text-slate-700">
                      {bid.amount} BBD
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center border border-dashed border-slate-200 rounded-sm">
                  <p className="text-xs italic text-slate-400 font-medium">
                    Chưa có khách hàng trả giá
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CỘT 2: TRẠNG THÁI VẬN CHUYỂN & PHÁP LÝ */}
          <div className="lg:col-span-4 p-6 space-y-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
              <Truck size={16} /> Quy trình bàn giao
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 border border-slate-100 rounded-sm">
                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] shrink-0">
                  1
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase">
                    Khởi tạo & Ký quỹ
                  </p>
                  <p className="text-[10px] text-slate-400 italic">
                    Hệ thống đã xác nhận lô hàng hợp lệ.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-blue-100 bg-blue-50/30 rounded-sm">
                <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] shrink-0">
                  2
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase">
                    Đang đấu giá
                  </p>
                  <p className="text-[10px] text-blue-600 font-medium italic">
                    Khách hàng đang đặt giá cạnh tranh.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border border-slate-100 rounded-sm opacity-50">
                <div className="w-5 h-5 rounded-full bg-slate-300 text-white flex items-center justify-center text-[10px] shrink-0">
                  3
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase">
                    Bàn giao & Giải ngân
                  </p>
                  <p className="text-[10px] text-slate-400 italic">
                    Chờ phiên đấu giá kết thúc.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT 3: BẢNG ĐIỀU KHIỂN CỦA CHỦ LÔ HÀNG */}
          <div className="lg:col-span-4 p-6 bg-slate-50/50 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 text-center">
              Quản trị lô hàng
            </h3>

            <div className="p-4 bg-white border border-yellow-100 rounded-sm mb-4">
              <div className="flex gap-2 text-yellow-700 mb-2">
                <AlertCircle size={16} />
                <span className="text-[10px] font-bold uppercase">
                  Lưu ý quan trọng
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                Bạn không thể chỉnh sửa giá khởi điểm khi đã có người tham gia
                đặt giá. Mọi thay đổi về mô tả sẽ được thông báo đến tất cả
                người đấu giá.
              </p>
            </div>

            <button className="w-full bg-white border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 uppercase rounded-sm transition-all">
              Chỉnh sửa mô tả
            </button>
            <button className="w-full bg-white border border-red-100 py-3 text-xs font-bold text-red-500 hover:bg-red-50 uppercase rounded-sm transition-all">
              Dừng đấu giá khẩn cấp
            </button>

            <div className="pt-4 mt-4 border-t border-slate-200">
              <button
                disabled
                className="w-full bg-slate-200 text-slate-400 py-4 text-sm font-black uppercase rounded-sm cursor-not-allowed"
              >
                Xác nhận đã giao hàng
              </button>
              <p className="text-[9px] text-slate-400 mt-2 text-center">
                * Nút này sẽ kích hoạt sau khi phiên đấu giá kết thúc và người
                mua thanh toán.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
