"use client";
import React from "react";
import { 
  ShieldCheck, Star, CheckCircle2, Clock, 
  Award, ChevronLeft, ExternalLink, BadgeDollarSign, ShieldAlert 
} from "lucide-react";

export default function ArbitratorProfile({ data, lang, onBack }) {
  if (!data) return null;

  // Giả định dữ liệu biểu phí
  const feeData = {
    base: "50 LYX",
    commission: "2%",
    collateral: "500 LYX"
  };

  const specialties = lang === "vi" 
    ? ["Hợp đồng thông minh", "Tài sản số", "Gia phả & Di chúc số"] 
    : ["Smart Contracts", "Digital Assets", "Genealogy & Digital Wills"];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header hồ sơ */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-sm">
            <ShieldCheck size={40} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">{data.name}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-500" /> 
              {lang === "vi" ? "Đơn vị đã xác thực" : "Verified Entity"}
            </p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-sm text-[10px] font-black uppercase hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={14} /> {lang === "vi" ? "Quay lại danh sách" : "Back to List"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cột trái: Chỉ số & Biểu phí */}
        <div className="space-y-6">
          {/* BẢNG BIỂU PHÍ MỚI */}
          <div className="bg-slate-900 text-white p-6 rounded-sm shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10"><BadgeDollarSign size={60} /></div>
             <h4 className="text-[10px] font-black text-blue-400 uppercase mb-4 tracking-widest">
               {lang === "vi" ? "Biểu phí dịch vụ" : "Service Fees"}
             </h4>
             <div className="space-y-4 relative z-10">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-xs text-slate-400">{lang === "vi" ? "Phí cố định" : "Fixed Fee"}</span>
                  <span className="font-black text-sm">{feeData.base}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-xs text-slate-400">{lang === "vi" ? "Hoa hồng" : "Commission"}</span>
                  <span className="font-black text-sm">{feeData.commission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    {lang === "vi" ? "Bảo lãnh" : "Collateral"} <ShieldAlert size={10} className="text-orange-400" />
                  </span>
                  <span className="font-black text-sm text-orange-400">{feeData.collateral}</span>
                </div>
             </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-sm border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">
              {lang === "vi" ? "Thống kê hiệu suất" : "Performance Stats"}
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{lang === "vi" ? "Vụ việc thành công" : "Resolved Cases"}</span>
                <span className="font-black text-slate-800">{data.resolved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{lang === "vi" ? "Đánh giá trung bình" : "Avg Rating"}</span>
                <span className="font-black text-amber-500 flex items-center gap-1">
                  {data.rating} <Star size={12} fill="currentColor" />
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">{lang === "vi" ? "Thời gian phản hồi" : "Response Time"}</span>
                <span className="font-black text-blue-600">~2.4h</span>
              </div>
            </div>
          </div>

          <div className="p-6 border border-dashed border-slate-200 rounded-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">
              {lang === "vi" ? "Lĩnh vực chuyên môn" : "Specialties"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 rounded-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Cột phải: Thông tin chi tiết & Lịch sử */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase mb-4 flex items-center gap-2">
              <Award size={16} className="text-blue-500" />
              {lang === "vi" ? "Giới thiệu năng lực" : "Professional Bio"}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              {lang === "vi" 
                ? `"${data.name} - Minh bạch, Công bằng, Nhanh chóng. Chúng tôi là đơn vị trọng tài có kinh nghiệm lâu năm trong việc giải quyết các tranh chấp liên quan đến số hóa tư liệu và tài sản blockchain."`
                : `"${data.name} - Transparent, Fair, Fast. We are an experienced arbitration unit specializing in digital records and blockchain asset disputes."`}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase mb-4 flex items-center gap-2">
              <Clock size={16} className="text-blue-500" />
              {lang === "vi" ? "Các vụ việc gần đây" : "Recent Activity"}
            </h4>
            <div className="space-y-3">
              {[1, 2].map((item) => (
                <div key={item} className="p-4 border border-slate-100 rounded-sm flex justify-between items-center group hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="text-xs font-bold text-slate-800">#CASE-00{item + 120} - {lang === "vi" ? "Tranh chấp bản quyền số" : "Digital Copyright Dispute"}</p>
                    <p className="text-[10px] text-slate-400 mt-1">20/03/2026 • {lang === "vi" ? "Hoàn thành" : "Completed"}</p>
                  </div>
                  <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}