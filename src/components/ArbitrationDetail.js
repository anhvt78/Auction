"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Scale,
  User,
  Package,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function ArbitrationDetail({ data, onBack, lang }) {
  // Dữ liệu giả định chi tiết cho một vụ tranh chấp
  const caseData = {
    id: data?.id || "AR-04",
    lotTitle: data?.title || "Lô thiết bị văn phòng #04",
    status: "In Review",
    txHash: "0x8823...f12a",
    plaintiff: {
      name: "Buyer_Pro_99",
      address: "0x1234...5678",
      reason:
        lang === "vi"
          ? "Hàng không đúng mô tả, 3 màn hình bị vỡ"
          : "Items not as described, 3 monitors broken",
      evidence: ["img_broken_1.jpg", "video_unboxing.mp4"],
    },
    defendant: {
      name: "Global_Supplier_Inc",
      address: "0xB997...fafc",
      statement:
        lang === "vi"
          ? "Hàng đã được kiểm tra kỹ trước khi đóng gói, có thể do vận chuyển"
          : "Goods were thoroughly checked before packing, likely damaged during transit",
      evidence: ["packing_receipt.pdf", "qc_photo_before_shipping.jpg"],
    },
  };

  const [decision, setDecision] = useState(null); // 'buyer', 'seller', or 'split'

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Nút quay lại */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors"
      >
        <ArrowLeft size={14} />{" "}
        {lang === "vi" ? "Quay lại danh sách" : "Back to Cases"}
      </button>

      {/* Header Vụ việc */}
      <div className="bg-[#0f172a] text-white p-8 rounded-sm shadow-xl flex flex-col md:flex-row justify-between gap-6 border-l-4 border-blue-500">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-600 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
              {lang === "vi" ? "Đang thẩm định" : "Under Review"}
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              {caseData.txHash}
            </span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight">
            {caseData.lotTitle}
          </h2>
          <p className="text-slate-400 text-xs mt-1 uppercase font-bold tracking-widest">
            Case ID: {caseData.id}
          </p>
        </div>
        <div className="flex flex-col items-end justify-center border-l border-slate-700 pl-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
            {lang === "vi" ? "Giá trị ký quỹ" : "Escrow Value"}
          </p>
          <p className="text-2xl font-black text-blue-400">500 BBD</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bên Nguyên (Người mua) */}
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-2">
            <ShieldAlert className="text-red-600" size={18} />
            <h3 className="font-black text-xs text-red-900 uppercase tracking-widest">
              {lang === "vi"
                ? "Bên Khiếu Nại (Người mua)"
                : "Plaintiff (Buyer)"}
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {caseData.plaintiff.name}
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  {caseData.plaintiff.address}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-sm border-l-2 border-red-500">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 italic tracking-tighter">
                {lang === "vi" ? "Lý do khiếu nại:" : "Claim Reason:"}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                "{caseData.plaintiff.reason}"
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="border border-slate-200 p-3 rounded-sm flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                <ImageIcon size={14} className="text-blue-500" />
                <span className="text-[9px] font-bold text-slate-600 uppercase">
                  Evidence_1.jpg
                </span>
              </div>
              <div className="border border-slate-200 p-3 rounded-sm flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                <FileText size={14} className="text-red-500" />
                <span className="text-[9px] font-bold text-slate-600 uppercase">
                  Unboxing_Video.mp4
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bên Bị (Người bán) */}
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={18} />
            <h3 className="font-black text-xs text-blue-900 uppercase tracking-widest">
              {lang === "vi"
                ? "Bên Bị Khiếu Nại (Người bán)"
                : "Defendant (Seller)"}
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {caseData.defendant.name}
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  {caseData.defendant.address}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-sm border-l-2 border-blue-500">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 italic tracking-tighter">
                {lang === "vi" ? "Phản hồi:" : "Response:"}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                "{caseData.defendant.statement}"
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="border border-slate-200 p-3 rounded-sm flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                <FileText size={14} className="text-green-600" />
                <span className="text-[9px] font-bold text-slate-600 uppercase">
                  Shipping_Docs.pdf
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Khu vực đưa ra phán quyết */}
      <div className="bg-slate-100 p-8 rounded-sm border-2 border-dashed border-slate-300">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          <div className="bg-white p-3 rounded-full shadow-sm text-blue-600">
            <Scale size={32} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">
              {lang === "vi"
                ? "Bảng điều khiển phán quyết"
                : "Judgment Dashboard"}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium uppercase mt-2 leading-relaxed">
              {lang === "vi"
                ? "Lưu ý: Phán quyết của bạn sẽ được ghi lại vĩnh viễn trên mạng lưới Blockchain. Tiền ký quỹ sẽ được giải ngân ngay lập tức sau khi giao dịch này hoàn tất."
                : "Note: Your judgment will be permanently recorded on the Blockchain. Escrow funds will be disbursed immediately upon completion."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <button
              onClick={() => setDecision("buyer")}
              className={`p-4 border-2 rounded-sm transition-all flex flex-col items-center gap-2 uppercase tracking-tighter font-black text-[10px] ${decision === "buyer" ? "bg-red-600 border-red-600 text-white shadow-lg" : "bg-white border-slate-200 text-slate-600 hover:border-red-400"}`}
            >
              <XCircle size={20} />
              {lang === "vi"
                ? "Hoàn tiền (Thắng cho Người mua)"
                : "Refund (Win for Buyer)"}
            </button>
            <button
              onClick={() => setDecision("split")}
              className={`p-4 border-2 rounded-sm transition-all flex flex-col items-center gap-2 uppercase tracking-tighter font-black text-[10px] ${decision === "split" ? "bg-amber-500 border-amber-500 text-white shadow-lg" : "bg-white border-slate-200 text-slate-600 hover:border-amber-400"}`}
            >
              <AlertTriangle size={20} />
              {lang === "vi" ? "Chia sẻ rủi ro (50/50)" : "Risk Split (50/50)"}
            </button>
            <button
              onClick={() => setDecision("seller")}
              className={`p-4 border-2 rounded-sm transition-all flex flex-col items-center gap-2 uppercase tracking-tighter font-black text-[10px] ${decision === "seller" ? "bg-green-600 border-green-600 text-white shadow-lg" : "bg-white border-slate-200 text-slate-600 hover:border-green-400"}`}
            >
              <CheckCircle2 size={20} />
              {lang === "vi"
                ? "Giải ngân (Thắng cho Người bán)"
                : "Release (Win for Seller)"}
            </button>
          </div>

          {decision && (
            <button className="bg-[#003366] hover:bg-blue-800 text-white w-full py-4 rounded-sm font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
              <ShieldCheck size={18} />
              {lang === "vi"
                ? "Ký và Thực thi phán quyết"
                : "Sign & Execute Judgment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
