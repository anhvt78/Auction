"use client";

import React, { useState, Suspense } from "react";
import {
  Gavel,
  ShieldAlert,
  History,
  Search,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";

// ĐÃ CẬP NHẬT: Import chính xác tên file ArbitratorList.js bạn vừa thay đổi
import ArbitratorList from "@/components/arbitration/ArbitratorList";

function ArbitrationPortalContent({ params }) {
  // Giải nén params theo chuẩn Next.js mới
  const { lang } = React.use(params);
  const [activeTab, setActiveTab] = useState("overview");

  // Trạng thái tạm dừng cấp cá nhân
  const [isAvailable, setIsAvailable] = useState(true);
  const [isArbitratorRegistered, setIsArbitratorRegistered] = useState(false); // Trạng thái mẫu

  // Thống kê dành cho Hội đồng trọng tài
  const adminStats = [
    {
      label: lang === "vi" ? "Vụ việc đang mở" : "Active Disputes",
      value: "03",
      icon: <AlertTriangle size={20} />,
      color: "text-red-500",
    },
    {
      label: lang === "vi" ? "Giá trị đang xử lý" : "Locked Value",
      value: "1,250 BBD",
      icon: <Scale size={20} />,
      color: "text-blue-600",
    },
    {
      label: lang === "vi" ? "Đã hoàn thành" : "Total Resolved",
      value: "142",
      icon: <CheckCircle2 size={20} />,
      color: "text-green-600",
    },
    {
      label: lang === "vi" ? "Điểm uy tín" : "Reputation Score",
      value: "98/100",
      icon: <UserCheck size={20} />,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans pb-20">
      {/* Header Hội đồng */}
      <div className="bg-[#0f172a] text-white pt-8 pb-12 shadow-inner">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link
                href={`/${lang}`}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-xs mb-4 transition-colors"
              >
                <ArrowLeft size={14} />{" "}
                {lang === "vi" ? "Quay lại trang chủ" : "Back to Home"}
              </Link>
              <h1 className="text-3xl font-light tracking-tight uppercase tracking-widest flex items-center gap-3">
                <Scale className="text-blue-400" />
                {lang === "vi" ? "Hội đồng trọng tài" : "Arbitration Council"}
              </h1>
            </div>

            {/* Điều khiển Trạng thái Cá nhân */}
            <div
              className={`p-4 rounded-sm border flex items-center gap-4 transition-all duration-500 ${isAvailable ? "bg-slate-800/50 border-slate-700" : "bg-red-950/40 border-red-900/50"}`}
            >
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                  {lang === "vi" ? "Trạng thái tiếp nhận" : "Intake Status"}
                </p>
                <p
                  className={`text-[11px] font-bold uppercase ${isAvailable ? "text-green-400" : "text-red-400"}`}
                >
                  {isAvailable
                    ? lang === "vi"
                      ? "Đang trực"
                      : "Available"
                    : lang === "vi"
                      ? "Đang nghỉ"
                      : "Busy/Paused"}
                </p>
              </div>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${
                  isAvailable
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg"
                    : "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                }`}
              >
                {isAvailable ? (
                  <PauseCircle size={14} />
                ) : (
                  <PlayCircle size={14} />
                )}
                {isAvailable
                  ? lang === "vi"
                    ? "Tạm nghỉ"
                    : "Go Pause"
                  : lang === "vi"
                    ? "Tiếp nhận"
                    : "Go Active"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-8">
        {/* Banner cảnh báo trạng thái nghỉ */}
        {!isAvailable && (
          <div className="mb-4 bg-red-600 text-white p-3 rounded-sm flex items-center justify-center gap-3 animate-pulse shadow-lg">
            <ShieldAlert size={16} />
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">
              {lang === "vi"
                ? dict?.arbitration?.no_new_cases_alert
                : dict?.arbitration?.no_new_cases_alert}
            </p>
          </div>
        )}

        {/* Stats bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {adminStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex items-center justify-between"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-3 space-y-1">
            {[
              {
                id: "overview",
                label: lang === "vi" ? "Tổng quan" : "Overview",
                icon: <LayoutDashboard size={18} />,
              },
              {
                id: "active-cases",
                label: lang === "vi" ? "Vụ việc xử lý" : "Active Cases",
                icon: <ShieldAlert size={18} />,
              },
              {
                id: "history",
                label: lang === "vi" ? "Lịch sử phán quyết" : "History",
                icon: <History size={18} />,
              },
              {
                id: "rules",
                label: lang === "vi" ? "Quy định" : "Rules",
                icon: <ShieldCheck size={18} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-sm ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-500 bg-white border border-slate-100 hover:bg-slate-50"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </aside>

          {/* Nội dung Tab */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6 min-h-[500px]">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                <h2 className="font-bold text-[#0f172a] uppercase tracking-tight">
                  {activeTab === "overview" &&
                    (lang === "vi"
                      ? "Bảng điều khiển chung"
                      : "General Dashboard")}
                  {activeTab === "active-cases" &&
                    (lang === "vi" ? "Hồ sơ chờ phán quyết" : "Active Files")}
                  {activeTab === "history" &&
                    (lang === "vi" ? "Lịch sử phán quyết" : "Judgment History")}
                </h2>
              </div>

              <div className="space-y-4">
                {activeTab === "active-cases" && (
                  <ArbitratorList
                    lang={lang}
                    onViewDetail={(item) => console.log("Detail for:", item)}
                  />
                )}

                {activeTab === "overview" && (
                  <div className="py-20 text-center space-y-4">
                    <Scale size={48} className="mx-auto text-slate-200" />
                    <p className="text-slate-500 text-sm italic">
                      {lang === "vi"
                        ? "Chào mừng trở lại Hội đồng Trọng tài."
                        : "Welcome back to the Arbitration Council."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ArbitrationPortalPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center text-xs uppercase tracking-widest text-slate-400">
          Loading Council Portal...
        </div>
      }
    >
      <ArbitrationPortalContent params={params} />
    </Suspense>
  );
}
ze={48} className="mx-auto text-slate-200" />
                    <p className="text-slate-500 text-sm italic">
                      {lang === "vi"
                        ? "Chào mừng trở lại Hội đồng Trọng tài."
                        : "Welcome back to the Arbitration Council."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ArbitrationPortalPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="p-20 text-center text-xs uppercase tracking-widest text-slate-400">
          Loading Council Portal...
        </div>
      }
    >
      <ArbitrationPortalContent params={params} />
    </Suspense>
  );
}
