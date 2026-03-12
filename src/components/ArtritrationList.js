"use client";
import React, { useState } from "react";
import {
  Scale,
  Clock,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  History,
  ExternalLink,
} from "lucide-react";

export default function ArtritrationList({ lang, onViewDetail }) {
  const [subTab, setSubTab] = useState("pending"); // 'pending' hoặc 'history'

  // Dữ liệu giả định: Vụ việc cần xử lý
  const activeCases = [
    {
      id: "CASE-2026-04",
      title: "Lô thiết bị văn phòng #04",
      disputeType: lang === "vi" ? "Hàng hỏng hóc" : "Damaged Goods",
      amount: "500 BBD",
      status: "waiting_judge",
      deadline: "24h",
      parties: { buyer: "Buyer_Pro_99", seller: "Global_Supplier" },
    },
    {
      id: "CASE-2026-09",
      title: "Màn hình Dell Ultrasharp",
      disputeType: lang === "vi" ? "Sai mô tả" : "Wrong Description",
      amount: "210 BBD",
      status: "in_review",
      deadline: "48h",
      parties: { buyer: "TechMiner_01", seller: "Office_Depot_US" },
    },
  ];

  // Dữ liệu giả định: Lịch sử đã phân xử
  const resolvedHistory = [
    {
      id: "CASE-2025-88",
      title: "Laptop Macbook Pro 2021",
      amount: "1,500 BBD",
      result: lang === "vi" ? "Hoàn tiền cho Buyer" : "Refund to Buyer",
      date: "15/02/2026",
      txHash: "0x7a2d...33e1",
      feeEarned: "+15 BBD",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation để chuyển đổi giữa Đang chờ và Lịch sử */}
      <div className="flex gap-6 border-b border-slate-100 mb-2">
        <button
          onClick={() => setSubTab("pending")}
          className={`pb-3 text-[11px] font-black uppercase tracking-widest transition-all ${
            subTab === "pending"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="flex items-center gap-2">
            <AlertCircle size={14} />
            {lang === "vi" ? "Đang chờ xử lý" : "Pending Cases"}
            <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full text-[9px]">
              {activeCases.length}
            </span>
          </span>
        </button>
        <button
          onClick={() => setSubTab("history")}
          className={`pb-3 text-[11px] font-black uppercase tracking-widest transition-all ${
            subTab === "history"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="flex items-center gap-2">
            <History size={14} />
            {lang === "vi" ? "Lịch sử phán quyết" : "Judgment History"}
          </span>
        </button>
      </div>

      {/* DANH SÁCH ĐANG CHỜ XỬ LÝ */}
      {subTab === "pending" && (
        <div className="space-y-4">
          {activeCases.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 bg-white p-5 hover:border-blue-400 transition-all rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center group shadow-sm"
            >
              <div className="flex gap-4 items-start md:items-center">
                <div className="bg-slate-100 p-3 rounded-full text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <Scale size={20} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <span className="text-[9px] bg-[#003366] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                      {item.id}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    <p className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                      <ShieldAlert size={12} className="text-amber-500" />{" "}
                      {item.disputeType}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">
                      {lang === "vi" ? "Ký quỹ" : "Escrow"}:{" "}
                      <span className="text-blue-600">{item.amount}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} /> {lang === "vi" ? "Hạn:" : "Due:"}{" "}
                      <span className="text-red-500 font-bold">
                        {item.deadline}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onViewDetail(item)}
                className="mt-4 md:mt-0 w-full md:w-auto bg-[#003366] hover:bg-blue-800 text-white text-[11px] font-black px-6 py-2.5 rounded-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <Scale size={14} />{" "}
                {lang === "vi" ? "Thực thi phán quyết" : "Execute Judgment"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DANH SÁCH LỊCH SỬ PHÁN QUYẾT */}
      {subTab === "history" && (
        <div className="space-y-4">
          {resolvedHistory.map((item) => (
            <div
              key={item.id}
              className="border border-slate-100 bg-slate-50/50 p-5 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center opacity-80 hover:opacity-100 transition-opacity"
            >
              <div className="flex gap-4 items-center">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 text-sm uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] font-black text-green-700 uppercase">
                      {item.result}
                    </p>
                    <span className="text-[10px] text-slate-300">|</span>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">
                    {lang === "vi" ? "Phí thù lao" : "Arbitrator Fee"}
                  </p>
                  <p className="text-sm font-black text-blue-600">
                    {item.feeEarned}
                  </p>
                </div>
                <a
                  href={`https://explorer.lukso.network/tx/${item.txHash}`}
                  target="_blank"
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[9px] text-slate-400 italic text-center mt-6 uppercase tracking-wider">
        {lang === "vi"
          ? "* Mọi phán quyết của bạn sẽ ảnh hưởng trực tiếp đến uy tín trên hệ thống."
          : "* All judgments will directly impact your reputation score on the system."}
      </p>
    </div>
  );
}
