import React from "react";
import { ShieldCheck, ArrowUpCircle, Gavel } from "lucide-react";

const AppealsList = ({ lang, onViewDetail }) => {
  const appealCases = [
    { id: "APL-102", title: "Tranh chấp hợp đồng Web3 Service", status: "Chờ xét duyệt", fee: "500 LYX", date: "2026-03-25" },
    { id: "APL-105", title: "Khiếu nại phán quyết lô hàng điện tử", status: "Đang xử lý", fee: "1,200 LYX", date: "2026-03-28" }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-800 italic flex items-center gap-2">
            <ShieldCheck className="text-blue-600" /> 
            {lang === "vi" ? "Danh sách khiếu nại phán quyết" : "Judgment Appeals List"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === "vi" ? "Cấp xét xử cao nhất do cộng đồng giám sát." : "The highest adjudication level supervised by the community."}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {appealCases.map((appeal) => (
          <div key={appeal.id} className="p-5 border border-slate-100 bg-slate-50/50 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-200 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                <Gavel size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 bg-slate-900 text-white rounded-full">{appeal.id}</span>
                  <h4 className="font-bold text-sm text-slate-800">{appeal.title}</h4>
                </div>
                <div className="flex items-center gap-4 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Ngày gửi: {appeal.date}</span>
                  <span>Phí kháng cáo: {appeal.fee}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase rounded-full">
                {appeal.status}
              </span>
              <button 
                onClick={() => onViewDetail(appeal)}
                className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all"
              >
                {lang === "vi" ? "Xem hồ sơ" : "View Dossier"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppealsList;