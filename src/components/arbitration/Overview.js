"use client";
import React from "react";
import { UserCheck, TrendingUp, MessageSquare, Clock, ExternalLink, Scale } from "lucide-react";

export default function Overview({ lang, isArbitrator, navigateToCase }) {
  const urgentCases = [
    { id: "001", title: "Tranh chấp tên miền blockchain .eth", deadline: "1h 20m", type: "Tài sản số" },
    { id: "002", title: "Vi phạm hợp đồng cung cấp thanh khoản", deadline: "5h 45m", type: "DeFi" },
  ];

  if (!isArbitrator) {
    return (
      <div className="py-20 text-center space-y-6 animate-in fade-in">
        <Scale size={64} className="mx-auto text-slate-200" />
        <p className="text-slate-500 italic">
          {lang === "vi" ? "Chào mừng bạn đến với Hội đồng Trọng tài Gia Phả Việt." : "Welcome to the Arbitration Council."}
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-sm text-white relative overflow-hidden shadow-lg">
            <TrendingUp className="absolute right-[-10px] bottom-[-10px] size-24 text-white/5" />
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
              <UserCheck size={14} /> {lang === "vi" ? "Chỉ số uy tín" : "Reputation Score"}
            </h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-black text-blue-400">98</span>
              <span className="text-slate-500 font-bold mb-1">/ 100</span>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
              <MessageSquare size={14} /> {lang === "vi" ? "Thông báo" : "Alerts"}
            </h3>
            <div className="p-3 bg-amber-50 border-l-2 border-amber-400 text-amber-800 text-[11px] font-semibold">
              {lang === "vi" ? "Cần cập nhật chữ ký số bảo mật trước ngày 30/03." : "Security signature update required."}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
            <Clock size={14} /> {lang === "vi" ? "Vụ việc khẩn cấp" : "Urgent Cases"}
          </h3>
          <div className="space-y-3">
            {urgentCases.map((c) => (
              <div key={c.id} onClick={() => navigateToCase(c.id)} className="p-4 border border-slate-200 rounded-sm hover:bg-blue-50 cursor-pointer transition-all bg-white group shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-bold text-blue-600 uppercase">{c.type}</span>
                  <ExternalLink size={12} className="text-slate-300 group-hover:text-blue-500" />
                </div>
                <p className="text-sm font-bold text-slate-800">{c.title}</p>
                <p className="text-[10px] text-red-500 font-bold mt-2 uppercase italic">
                  {lang === "vi" ? "Hết hạn trong:" : "Due in:"} {c.deadline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}