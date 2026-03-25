"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft, Scale, ShieldCheck, AlertCircle, Image as ImageIcon,
  Truck, Clock, MessageSquare, UploadCloud, Gavel, CheckCircle2,
  ExternalLink, DollarSign, Info, User, ShieldAlert, Timer, AlertTriangle
} from "lucide-react";

export default function DisputeDetail({ lang = "vi", onBack }) {
  const isVi = lang === "vi";

  // --- KHO DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
  const [d, setD] = useState({
    disputeId: "DS-8829",
    createdAt: "20/03/2026",
    status: isVi ? "Yêu cầu bằng chứng" : "Evidence Required",
    
    // THÔNG TIN THỜI HẠN (MỚI)
    deadline: {
      isYourTurn: true, // Trạng thái xác định người dùng hiện tại phải hành động
      actionRequired: isVi ? "Cung cấp video đóng gói hàng" : "Provide packaging video",
      expiresAt: "2026-03-25T14:30:00", // Thời mốc hết hạn
      consequence: isVi ? "Tự động xử thua & hoàn tiền" : "Auto-lose & Refund"
    },

    auction: {
      id: "AUC-10293",
      title: isVi ? "Lô thiết bị văn phòng Dell Precision - 10 món" : "Dell Precision Office Set - 10 items",
      finalBid: "2,500 BBD",
      seller: "TechMarket_Official",
      buyer: "HoangNguyen_90",
      link: "#"
    },

    financials: {
      claimAmount: "100 BBD",
      disputeFee: "15 BBD",
      escrowAmount: "2,500 BBD",
      feePolicy: isVi 
        ? "Phí trọng tài sẽ do bên thua kiện chi trả sau khi có phán quyết cuối cùng." 
        : "Arbitration fee will be paid by the losing party after the final verdict."
    },

    shipping: {
      carrier: "GHN Express",
      trackingCode: "VN-SHIP-9921",
      status: isVi ? "ĐÃ GIAO HÀNG" : "DELIVERED",
      history: [
        { time: "19/03/2026 15:40", note: isVi ? "Giao hàng thành công" : "Delivered successfully" },
        { time: "17/03/2026 10:20", note: isVi ? "Đã lấy hàng từ người bán" : "Picked up from seller" }
      ]
    },

    messages: [
      {
        id: 1,
        sender: "HoangNguyen_90",
        role: "buyer",
        content: isVi ? "Tôi nhận hàng thấy 2 máy in bị nứt vỏ nhựa." : "I received items with cracked casings.",
        time: "20/03/2026 09:15"
      },
      {
        id: 2,
        sender: "Arbitrator_04",
        role: "admin",
        content: isVi 
          ? "Yêu cầu Người bán cung cấp video quay lại quá trình đóng gói để xác định trách nhiệm." 
          : "Seller is requested to provide a video of the packaging process.",
        time: "20/03/2026 14:00"
      }
    ]
  });

  // Kiểm tra an toàn dữ liệu
  if (!d || !d.shipping || !d.auction) {
    return <div className="p-10 text-center opacity-50 italic">Loading data...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20 px-4 pt-4 bg-slate-50/50 min-h-screen">
      
      {/* 1. BANNER CẢNH BÁO THỜI HẠN (ACTION REQUIRED) */}
      {d.deadline.isYourTurn && (
        <div className="bg-red-600 text-white p-4 rounded-sm shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-full">
              <Timer size={28} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider">
                {isVi ? "HÀNH ĐỘNG CỦA BẠN LÀ BẮT BUỘC" : "YOUR ACTION IS REQUIRED"}
              </h3>
              <p className="text-[11px] opacity-90 font-medium italic">
                {isVi ? `Nhiệm vụ: ${d.deadline.actionRequired}` : `Task: ${d.deadline.actionRequired}`}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end border-l border-white/20 pl-6">
            <p className="text-[10px] uppercase font-bold opacity-80">{isVi ? "Thời gian còn lại" : "Time Remaining"}</p>
            <div className="text-2xl font-black font-mono tracking-tighter">
              23:59:59
            </div>
            <p className="text-[9px] font-bold bg-black/20 px-2 py-0.5 mt-1 rounded-sm text-red-100">
              * {isVi ? `Quá hạn: ${d.deadline.consequence}` : `Expired: ${d.deadline.consequence}`}
            </p>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 border border-slate-200 rounded-sm shadow-sm">
        <div className="space-y-1">
          <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase transition-colors">
            <ArrowLeft size={14} /> {isVi ? "Quay lại danh sách" : "Back to list"}
          </button>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <Scale className="text-amber-500" size={28} />
            {isVi ? `TRANH CHẤP #${d.disputeId}` : `DISPUTE #${d.disputeId}`}
          </h2>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Clock size={14}/> {d.createdAt}</span>
            <span className="flex items-center gap-1"><User size={14}/> {isVi ? "Người mua:" : "Buyer:"} {d.auction.buyer}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="px-4 py-1.5 bg-amber-500 text-white text-[11px] font-bold uppercase rounded-sm shadow-sm">
            {d.status}
          </div>
          <div className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 border border-blue-100 flex items-center gap-2 italic">
            <ShieldCheck size={14} /> {isVi ? "Tiền đang tạm giữ:" : "Escrow:"} {d.financials.escrowAmount}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* CỘT TRÁI: CHI TIẾT & ĐỐI CHẤT (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tóm tắt phiên đấu giá gốc */}
          <section className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
              <h3 className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Info size={14} className="text-blue-400" /> {isVi ? "Thông tin đấu giá gốc" : "Auction Reference"}
              </h3>
              <a href={d.auction.link} className="text-[10px] font-bold text-blue-400 flex items-center gap-1 hover:text-white transition-colors">
                {isVi ? "CHI TIẾT PHIÊN" : "VIEW AUCTION"} <ExternalLink size={12} />
              </a>
            </div>
            <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">{isVi ? "Sản phẩm" : "Item"}</p>
                <p className="text-sm font-bold text-slate-700 leading-tight">{d.auction.title}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">{isVi ? "Giá thắng thầu" : "Final Price"}</p>
                <p className="text-sm font-black text-slate-900">{d.auction.finalBid}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">{isVi ? "Người bán" : "Seller"}</p>
                <p className="text-sm font-bold text-blue-600 underline cursor-pointer">@{d.auction.seller}</p>
              </div>
            </div>
          </section>

          {/* NHẬP LIỆU BẰNG CHỨNG (DÀNH CHO NGƯỜI CÓ TRÁCH NHIỆM) */}
          {d.deadline.isYourTurn && (
            <section className="bg-white border-2 border-red-100 p-6 rounded-sm shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 text-red-600">
                <AlertTriangle size={120} />
              </div>
              <h3 className="text-xs font-black text-red-600 uppercase mb-4 flex items-center gap-2 tracking-widest border-b pb-4">
                <Gavel size={18} /> {isVi ? "Yêu cầu giải trình & Bằng chứng" : "Submission Required"}
              </h3>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 border border-slate-200 rounded-sm">
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-3">{isVi ? "Tải lên tệp bằng chứng (Video/Ảnh)" : "Upload Evidence"}</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-sm p-10 flex flex-col items-center justify-center hover:bg-white hover:border-blue-400 transition-all cursor-pointer group">
                     <UploadCloud size={40} className="text-slate-300 group-hover:text-blue-500 mb-2" />
                     <p className="text-xs font-bold text-slate-500 group-hover:text-blue-600 underline uppercase">{isVi ? "Chọn tệp hoặc kéo thả" : "Drag & Drop Files"}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-500 mb-2">{isVi ? "Nội dung giải trình chi tiết" : "Detailed Explanation"}</label>
                  <textarea 
                    className="w-full p-4 text-sm border border-slate-200 focus:ring-1 focus:ring-blue-500 outline-none min-h-[120px]"
                    placeholder={isVi ? "Mô tả rõ ràng về bằng chứng bạn cung cấp..." : "Describe your evidence clearly..."}
                  />
                </div>
                <button className="w-full bg-red-600 text-white font-black py-4 uppercase tracking-[0.3em] text-xs hover:bg-red-700 shadow-xl transition-all">
                  {isVi ? "Xác nhận gửi bằng chứng" : "Confirm Evidence Submission"}
                </button>
              </div>
            </section>
          )}

          {/* Lịch sử đối chất (Messages) */}
          <section className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm opacity-90">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-8 flex items-center gap-2 tracking-widest border-b pb-4">
              <MessageSquare size={16} className="text-blue-500" /> 
              {isVi ? "Lịch sử đối chất" : "Dispute History"}
            </h3>
            <div className="space-y-8 relative">
              {d.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'admin' ? 'justify-center' : msg.role === 'buyer' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`relative max-w-[85%] p-4 rounded-sm border ${
                    msg.role === 'admin' 
                      ? 'bg-amber-50 border-amber-200 text-amber-900 w-full italic shadow-sm' 
                      : msg.role === 'buyer' 
                        ? 'bg-slate-50 border-slate-200 border-l-4 border-l-blue-500' 
                        : 'bg-blue-50 border-blue-100 border-r-4 border-r-blue-600 text-right'
                  }`}>
                    <div className={`flex items-center gap-3 mb-2 text-[10px] font-bold uppercase tracking-tighter ${msg.role === 'admin' ? 'justify-center' : 'justify-between'}`}>
                       <span className={msg.role === 'admin' ? 'text-amber-700' : 'text-slate-500'}>
                        {msg.role === 'admin' && <Gavel size={12} className="inline mr-1"/>}
                        {msg.sender} 
                       </span>
                       <span className="opacity-50">{msg.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CỘT PHẢI: TÀI CHÍNH & VẬN CHUYỂN (1/3) */}
        <div className="space-y-6">
          
          {/* TÀI CHÍNH & CẢNH BÁO TRÁCH NHIỆM */}
          <section className="bg-white border-2 border-red-600 p-6 rounded-sm shadow-sm">
            <h4 className="text-[11px] font-black uppercase text-red-600 mb-5 flex items-center gap-2 tracking-widest">
              <ShieldAlert size={16} /> 
              {isVi ? "Cảnh báo tài chính" : "Financial Notice"}
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b pb-2">
                <span className="text-xs text-slate-400 font-bold">{isVi ? "Giá trị khiếu nại:" : "Claim Amount:"}</span>
                <span className="text-lg font-black text-red-600">{d.financials.claimAmount}</span>
              </div>
              <div className="p-3 bg-red-50 border border-red-100 rounded-sm">
                <p className="text-[10px] text-red-700 leading-relaxed font-bold italic">
                  {isVi 
                    ? `* Nếu bạn không phản hồi trước mốc thời gian, số tiền ${d.financials.claimAmount} sẽ được hoàn trả ngay lập tức cho người mua.` 
                    : `* If you fail to respond, ${d.financials.claimAmount} will be auto-refunded.`}
                </p>
              </div>
            </div>
          </section>

          {/* THÔNG TIN VẬN CHUYỂN */}
          <section className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm">
            <h4 className="text-[11px] font-black uppercase text-slate-500 mb-5 flex items-center gap-2 tracking-widest">
              <Truck size={16} className="text-blue-500" /> 
              {isVi ? "Logistic" : "Logistics"}
            </h4>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Carrier:</span>
                <span className="font-bold text-slate-700">{d.shipping.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Tracking:</span>
                <span className="font-mono font-bold text-blue-600 underline decoration-dotted">{d.shipping.trackingCode}</span>
              </div>
              <div className="mt-6 space-y-4 relative before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
                {d.shipping.history.map((step, i) => (
                  <div key={i} className="relative pl-5">
                    <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-200" />
                    <p className="font-bold text-slate-700 leading-none mb-1">{step.note}</p>
                    <p className="text-[10px] text-slate-400 italic">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* QUY ĐỊNH HỆ THỐNG */}
          <section className="bg-slate-900 text-white p-6 rounded-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <ShieldCheck size={80} />
            </div>
            <h4 className="text-[11px] font-black uppercase mb-4 flex items-center gap-2 tracking-[0.2em]">
              <CheckCircle2 size={16} className="text-green-400" /> {isVi ? "Quy tắc Trọng tài" : "Arbitration Rules"}
            </h4>
            <ul className="text-[10px] space-y-3 opacity-80 leading-relaxed font-medium">
              <li className="flex gap-2">
                <span className="text-green-400">01.</span>
                {isVi ? "Quyết định của trọng tài là cuối cùng." : "Arbitrator's decision is final."}
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">02.</span>
                {isVi ? "Bằng chứng video phải nguyên vẹn." : "Video evidence must be intact."}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}