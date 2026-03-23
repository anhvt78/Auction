"use client";
import React from "react";
import {
  ArrowLeft,
  Scale,
  ShieldCheck,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

export default function DisputeDetail({ data, lang, onBack }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase mb-4"
      >
        <ArrowLeft size={14} />{" "}
        {lang === "vi" ? "Quay lại danh sách" : "Back to list"}
      </button>

      <div className="lg:col-span-2 space-y-6">
        <section className="bg-white border border-slate-200 p-6 rounded-sm">
          <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
            <AlertCircle size={16} />{" "}
            {lang === "vi" ? "Lý do khiếu nại" : "Dispute Reason"}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-sm border-l-4 border-amber-400">
            "Người mua khiếu nại rằng lô thiết bị văn phòng có 2 máy in bị hỏng
            vỏ nhựa do đóng gói không cẩn thận, không đúng như mô tả 'mới 95%'.
            Yêu cầu hoàn trả 100 BBD phí sửa chữa."
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="aspect-square bg-slate-100 rounded-sm flex items-center justify-center text-slate-400 text-[10px] border border-dashed border-slate-300 italic">
              <ImageIcon size={18} /> Evidence_1.jpg
            </div>
            <div className="aspect-square bg-slate-100 rounded-sm flex items-center justify-center text-slate-400 text-[10px] border border-dashed border-slate-300 italic">
              <ImageIcon size={18} /> Evidence_2.jpg
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
