import React, { useState } from "react";
import { 
  ChevronLeft, ShieldCheck, Clock, ExternalLink, 
  Scale, AlertOctagon, CheckCircle2, XCircle, Info 
} from "lucide-react";
import Link from "next/link"; 

const AppealsDetail = ({ data, lang, onBack }) => {
  const [isVoting, setIsVoting] = useState(false);

  if (!data) return null;

  // Giả định dữ liệu kinh tế cho trọng tài trong hệ thống đấu giá
  const economicInfo = {
    reward: "150 LYX",    // Thù lao dự kiến
    penalty: "300 LYX",   // Phí phạt nếu phán quyết ngược số đông
    collateral: "500 LYX" // Tiền ký quỹ
  };

  // ID cụ thể của phiên đấu giá để điều hướng
  const auctionId = data.auctionId || "4";

  return (
    <div className="animate-in zoom-in-95 duration-300">
      {/* Header điều hướng */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <button 
          onClick={onBack} 
          className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={14} /> {lang === "vi" ? "Quay lại danh sách" : "Back to List"}
        </button>
        
        {/* Link điều hướng đến trang chi tiết đấu giá cụ thể */}
        <Link 
          href={`/${lang}/pages/auctionDetail?id=${auctionId}`} 
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-sm text-[10px] font-black uppercase border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
          <ExternalLink size={12} /> {lang === "vi" ? "Xem chi tiết giao dịch gốc" : "View Original Auction"}
        </Link>
      </div>

      {/* Thông tin vụ việc đang thụ lý */}
      <div className="p-6 border border-slate-200 bg-white rounded-sm mb-8 shadow-sm border-l-4 border-l-blue-600">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic mb-2">{data.title}</h2>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black px-2 py-0.5 bg-slate-900 text-white rounded-full">{data.id}</span>
              <span className="text-xs text-slate-500 uppercase font-bold tracking-widest italic">{data.status}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase">{lang === "vi" ? "Thời hạn biểu quyết" : "Voting Deadline"}</p>
            <div className="flex items-center gap-2 text-red-600 font-black italic">
              <Clock size={16} /> 14:20:05
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Tóm tắt khiếu nại */}
          <div className="p-5 border border-slate-100 rounded-sm bg-white">
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
              <Info size={14} /> {lang === "vi" ? "Tóm tắt khiếu nại" : "Appeal Summary"}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              {lang === "vi" 
                ? "Bên thắng cuộc khiếu nại rằng sản phẩm nhận được không đúng với mô tả ban đầu về tình trạng vật lý. Yêu cầu xem xét hoàn lại tiền đặt cọc." 
                : "The winner claims the item received does not match the original physical description. Requests a deposit refund review."}
            </p>
          </div>

          {/* Bảng điều khiển phán quyết */}
          <div className="p-6 border-2 border-dashed border-blue-100 rounded-sm bg-blue-50/30">
            <h4 className="text-sm font-black uppercase text-blue-900 mb-4 flex items-center gap-2">
              <Scale size={18} /> {lang === "vi" ? "Thực hiện phán quyết" : "Execute Judgment"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                className="flex items-center justify-center gap-3 p-4 bg-white border border-green-200 text-green-700 rounded-sm hover:bg-green-600 hover:text-white transition-all group shadow-sm"
                disabled={isVoting}
              >
                <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase">{lang === "vi" ? "Chấp nhận" : "Accept"}</p>
                  <p className="text-[9px] font-medium opacity-80">{lang === "vi" ? "Đồng ý với khiếu nại" : "Valid appeal"}</p>
                </div>
              </button>
              <button 
                className="flex items-center justify-center gap-3 p-4 bg-white border border-red-200 text-red-700 rounded-sm hover:bg-red-600 hover:text-white transition-all group shadow-sm"
                disabled={isVoting}
              >
                <XCircle size={20} className="group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase">{lang === "vi" ? "Bác bỏ" : "Reject"}</p>
                  <p className="text-[9px] font-medium opacity-80">{lang === "vi" ? "Giữ nguyên kết quả gốc" : "Uphold original result"}</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Cột thông tin kinh tế */}
        <div className="space-y-6">
          <div className="p-5 border border-slate-100 rounded-sm bg-white shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4">{lang === "vi" ? "Phí & Thù lao" : "Fees & Rewards"}</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">{lang === "vi" ? "Thù lao dự kiến" : "Estimated Reward"}</span>
                <span className="text-sm font-black text-green-600">+{economicInfo.reward}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 text-red-700 rounded-sm border border-red-100">
                <div className="flex items-center gap-2">
                  <AlertOctagon size={14} />
                  <span className="text-[10px] font-black uppercase">{lang === "vi" ? "Rủi ro phạt" : "Penalty Risk"}</span>
                </div>
                <span className="text-sm font-black">-{economicInfo.penalty}</span>
              </div>
              <p className="text-[9px] text-slate-400 italic leading-relaxed">
                * {lang === "vi" 
                  ? "Bạn sẽ bị phạt nếu biểu quyết sai lệch với quyết định của đa số hội đồng." 
                  : "You will be penalized if your vote contradicts the majority council decision."}
              </p>
            </div>
          </div>

          <div className="p-5 bg-slate-900 text-white rounded-sm shadow-xl">
            <h5 className="text-[11px] font-black uppercase mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-400" /> {lang === "vi" ? "Hội đồng thụ lý" : "Council Status"}
            </h5>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] text-blue-300 font-bold italic">
                <CheckCircle2 size={12} /> {lang === "vi" ? "Trọng tài 1: Đã xong" : "Arbitrator 1: Done"}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold italic">
                <Clock size={12} /> {lang === "vi" ? "Bạn: Đang chờ..." : "You: Pending..."}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold italic">
                <Clock size={12} /> {lang === "vi" ? "Trọng tài 3: Đang chờ..." : "Arbitrator 3: Pending..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppealsDetail;