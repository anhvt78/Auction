"use client";

import React, { useState, Suspense } from "react"; // Thêm Suspense để dự phòng cho các logic Client sau này
import {
  Gavel,
  ShieldAlert,
  BarChart3,
  History,
  Search,
  Bell,
  Scale,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import ViolationManagement from "@/components/arbitration/ViolationManagement";

// 1. Component chứa logic chính của trang
function ArbitrationPortalContent({ params }) {
  // Giải nén params bằng React.use() để đảm bảo tương thích với Next.js 15+
  const { lang } = React.use(params);
  const [activeTab, setActiveTab] = useState("active-cases");

  // Thống kê dành riêng cho thực thể Trọng tài
  const adminStats = [
    {
      label: lang === "vi" ? "Vụ việc đang mở" : "Active Disputes",
      value: "03",
      icon: <AlertTriangle size={20} />,
      color: "text-red-500",
    },
    {
      label: lang === "vi" ? "Giá trị đang khóa" : "Locked Value",
      value: "1,250 BBD",
      icon: <Scale size={20} />,
      color: "text-blue-600",
    },
    {
      label: lang === "vi" ? "Đã phân xử (tháng)" : "Resolved (Month)",
      value: "28",
      icon: <CheckCircle2 size={20} />,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR QUẢN TRỊ */}
      <aside className="w-64 bg-[#0f172a] text-slate-400 p-6 flex flex-col border-r border-slate-800 fixed h-full">
        <div className="mb-10 flex items-center gap-2 text-white">
          <Gavel className="text-blue-400" size={24} />
          <span className="font-black text-lg uppercase tracking-tighter">
            Auction <span className="text-blue-400">Judge</span>
          </span>
        </div>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab("active-cases")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-sm transition-all ${
              activeTab === "active-cases"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "hover:bg-slate-800"
            }`}
          >
            <ShieldAlert size={18} />{" "}
            {lang === "vi" ? "Vụ việc cần xử lý" : "Active Cases"}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-sm transition-all ${
              activeTab === "history"
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <History size={18} />{" "}
            {lang === "vi" ? "Lịch sử phán quyết" : "History"}
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 italic">
            Node Status: Connected
          </p>
          <div className="flex items-center gap-2 text-[10px] text-blue-400 font-mono">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Mainnet v1.0.4
          </div>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">
              {lang === "vi"
                ? "Hệ thống thực thi giao dịch"
                : "Transaction Enforcement"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-900 uppercase">
                Arbitrator_Unit_01
              </p>
              <p className="text-[9px] text-blue-600 font-mono">
                0xB997...fafc2b1
              </p>
            </div>
            <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600">
              <Scale size={16} />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {adminStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-black ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="text-slate-100">{stat.icon}</div>
              </div>
            ))}
          </div>

          {/* Table Area */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm min-h-[500px]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xs font-black text-[#003366] uppercase tracking-widest">
                {activeTab === "active-cases"
                  ? "Danh sách tranh chấp hiện tại"
                  : "Lịch sử lưu trữ"}
              </h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search
                    className="absolute left-2.5 top-2 text-slate-400"
                    size={14}
                  />
                  <input
                    className="pl-8 pr-4 py-1.5 bg-slate-50 border border-slate-200 text-[10px] rounded-sm outline-none focus:border-blue-500 w-48"
                    placeholder="Tìm TXID..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Load component danh sách vi phạm tại đây */}
              <ViolationManagement lang={lang} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 2. Export mặc định bao bọc bởi Suspense
export default function ArbitrationPortalPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans text-xs uppercase tracking-widest text-slate-400">
          Loading Portal...
        </div>
      }
    >
      <ArbitrationPortalContent params={params} />
    </Suspense>
  );
}
