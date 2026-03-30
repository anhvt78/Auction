"use client";

import React, { useState, Suspense } from "react";
import {
  Scale, CheckCircle2, AlertTriangle, ArrowLeft, LayoutDashboard, ShieldCheck,
  UserCheck, PauseCircle, PlayCircle, UserPlus, ShieldAlert, Gavel
} from "lucide-react";
import Link from "next/link";

// Import các component con
import Overview from "@/components/arbitration/Overview";
import ArbitratorList from "@/components/arbitration/ArbitratorList";
import ArbitratorProfile from "@/components/arbitration/ArbitratorProfile";
import ArbitrationDetail from "@/components/ArbitrationDetail";
import ArtritrationList from "@/components/ArtritrationList";
import AppealsList from "@/components/arbitration/AppealsList";
import AppealsDetail from "@/components/arbitration/AppealsDetail";
import Rules from "@/components/arbitration/Rules";

function ArbitrationPortalContent({ params }) {
  const { lang } = React.use(params);
  
  // -- STATES --
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isArbitrator, setIsArbitrator] = useState(false); // Trạng thái vai trò người dùng
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedArbitrator, setSelectedArbitrator] = useState(null);
  const [selectedAppeal, setSelectedAppeal] = useState(null); 

  // -- TABS CONFIG --
  // Điều chỉnh: Chỉ hiển thị các tab tác nghiệp (Appeals/Arbitrations) khi là Trọng tài
  const tabs = [
    { id: "overview", label: lang === "vi" ? "Tổng quan" : "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "active-cases", label: lang === "vi" ? "Đội ngũ trọng tài" : "Arbitrators", icon: <UserCheck size={18} /> },
    
    // Các tab dành riêng cho Trọng tài thực hiện nhiệm vụ phán quyết
    ...(isArbitrator ? [
      { 
        id: "arbitrations", 
        label: lang === "vi" ? "Xử lý tranh chấp" : "Dispute Cases", 
        icon: <Scale size={18} /> 
      },
      { 
        id: "appeals", 
        label: lang === "vi" ? "Hội đồng phúc thẩm" : "Appellate Council", 
        icon: <Gavel size={18} /> 
      }
    ] : []),
    
    { id: "rules", label: lang === "vi" ? "Quy định" : "Rules", icon: <ShieldAlert size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-slate-900 pb-20">
      
      {/* HEADER */}
      <div className="bg-[#0f172a] text-white pt-8 pb-12 shadow-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link href={`/${lang}`} className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-bold uppercase mb-4 tracking-widest transition-colors">
                <ArrowLeft size={14} /> {lang === "vi" ? "Quay lại" : "Back Home"}
              </Link>
              <h1 className="text-3xl font-light uppercase tracking-widest flex items-center gap-3">
                <Scale className="text-blue-400" /> {lang === "vi" ? "Hệ thống Trọng tài" : "Arbitration System"}
              </h1>
            </div>

            {!isArbitrator ? (
              <button
                onClick={() => setIsArbitrator(true)}
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
              >
                <UserPlus size={18} />
                {lang === "vi" ? "Đăng ký Trọng tài" : "Join as Arbitrator"}
              </button>
            ) : (
              <div className={`p-4 rounded-sm border flex items-center gap-4 transition-all duration-500 ${isAvailable ? "bg-slate-800/50 border-slate-700" : "bg-red-950/40 border-red-900/50"}`}>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{lang === "vi" ? "Trạng thái trực" : "Online Status"}</p>
                  <p className={`text-[11px] font-bold uppercase ${isAvailable ? "text-green-400" : "text-red-400"}`}>{isAvailable ? (lang === "vi" ? "Sẵn sàng" : "Available") : (lang === "vi" ? "Đang nghỉ" : "On Break")}</p>
                </div>
                <button onClick={() => setIsAvailable(!isAvailable)} className={`flex items-center gap-2 px-3 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${isAvailable ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white shadow-lg`}>
                  {isAvailable ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                  {isAvailable ? (lang === "vi" ? "Tạm nghỉ" : "Pause") : (lang === "vi" ? "Tiếp nhận" : "Active")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-8">
        {/* STATS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Vụ việc đang mở", value: "03", color: "#ef4444", icon: <AlertTriangle size={20} /> },
            { label: "Tổng giá trị xử lý", value: "1,250 LYX", color: "#2563eb", icon: <Scale size={20} /> },
            { label: "Phán quyết thành công", value: "142", color: "#10b981", icon: <CheckCircle2 size={20} /> },
            { label: "Điểm uy tín hội đồng", value: "98/100", color: "#d97706", icon: <UserCheck size={20} /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex items-center justify-between">
              <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{stat.label}</p><p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p></div>
              <div className="text-slate-100">{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-1">
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => {setActiveTab(tab.id); setViewMode("list");}} 
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase rounded-sm transition-all ${activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-slate-500 bg-white border border-slate-100 hover:bg-slate-50"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </aside>

          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-8 min-h-[600px]">
              
              {activeTab === "overview" && (
                <Overview lang={lang} isArbitrator={isArbitrator} navigateToCase={(id) => {setSelectedItem({id}); setActiveTab("arbitrations"); setViewMode("arbitration-detail");}} />
              )}

              {activeTab === "active-cases" && (
                selectedArbitrator 
                  ? <ArbitratorProfile data={selectedArbitrator} lang={lang} onBack={() => setSelectedArbitrator(null)} />
                  : <ArbitratorList lang={lang} onViewDetail={(arb) => setSelectedArbitrator(arb)} />
              )}

              {/* TÁC NGHIỆP TRỌNG TÀI: CHỈ HIỆN KHI ISARBITRATOR = TRUE */}
              {isArbitrator && activeTab === "arbitrations" && (
                <div className="animate-in fade-in">
                  {viewMode === "arbitration-detail" 
                    ? <ArbitrationDetail data={selectedItem} lang={lang} onBack={() => setViewMode("list")} />
                    : <ArtritrationList lang={lang} onViewDetail={(item) => { setSelectedItem(item); setViewMode("arbitration-detail"); }} />
                  }
                </div>
              )}

              {isArbitrator && activeTab === "appeals" && (
                selectedAppeal 
                  ? <AppealsDetail data={selectedAppeal} lang={lang} onBack={() => setSelectedAppeal(null)} />
                  : <AppealsList lang={lang} onViewDetail={(appeal) => setSelectedAppeal(appeal)} />
              )}

              {activeTab === "rules" && <Rules lang={lang} />}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="p-20 text-center text-xs uppercase tracking-widest text-slate-400 italic">Đang tải dữ liệu Portal...</div>}>
      <ArbitrationPortalContent params={params} />
    </Suspense>
  );
}