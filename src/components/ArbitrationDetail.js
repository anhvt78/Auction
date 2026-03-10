"use client";
import React from "react";
import {
  ArrowLeft,
  Scale,
  ShieldCheck,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

export default function ArbitrationDetail({ data, lang, onBack }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase mb-4"
      >
        <ArrowLeft size={14} />{" "}
        {lang === "vi" ? "Quay lại danh sách" : "Back to list"}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Bằng chứng & Thông tin */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-slate-200 p-6 rounded-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
              <AlertCircle size={16} />{" "}
              {lang === "vi" ? "Lý do khiếu nại" : "Dispute Reason"}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-sm border-l-4 border-amber-400">
              "Người mua khiếu nại rằng lô thiết bị văn phòng có 2 máy in bị
              hỏng vỏ nhựa do đóng gói không cẩn thận, không đúng như mô tả 'mới
              95%'. Yêu cầu hoàn trả 100 BBD phí sửa chữa."
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

        {/* Cột phải: Bảng điều khiển Trọng tài (Smart Contract Actions) */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-sm shadow-xl border-t-4 border-blue-500">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-blue-400">
              <Scale size={16} />{" "}
              {lang === "vi" ? "Phán quyết trọng tài" : "Arbitration Decision"}
            </h4>

            <div className="space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-sm text-[10px] font-black uppercase shadow-md transition-all flex flex-col items-center gap-1">
                <span>
                  {lang === "vi"
                    ? "Giải phóng tiền cho Người bán"
                    : "Release to Seller"}
                </span>
                <span className="text-[8px] opacity-70 font-normal lowercase">
                  (Hợp lệ - Không vi phạm)
                </span>
              </button>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-sm text-[10px] font-black uppercase shadow-md transition-all flex flex-col items-center gap-1">
                <span>
                  {lang === "vi"
                    ? "Hoàn tiền cho Người mua"
                    : "Refund to Buyer"}
                </span>
                <span className="text-[8px] opacity-70 font-normal lowercase">
                  (Vi phạm nghiêm trọng)
                </span>
              </button>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-[9px] text-slate-400 uppercase font-bold mb-2">
                  {lang === "vi" ? "Phân bổ lại số dư" : "Custom Split"}
                </p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Seller %"
                    className="w-1/2 bg-slate-800 border border-slate-600 p-2 text-xs outline-none focus:border-blue-400"
                  />
                  <input
                    type="number"
                    placeholder="Buyer %"
                    className="w-1/2 bg-slate-800 border border-slate-600 p-2 text-xs outline-none focus:border-blue-400"
                  />
                </div>
                <button className="w-full mt-2 bg-slate-700 hover:bg-slate-600 py-2 text-[10px] font-bold uppercase transition-all">
                  {lang === "vi" ? "Xác nhận chia tiền" : "Confirm Split"}
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-[9px] font-mono text-slate-500 tracking-tighter">
                <span>GAS FEE:</span>
                <span>~0.002 LYX</span>
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500 tracking-tighter">
                <span>CONTRACT:</span>
                <span>0xB997...c2b1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
