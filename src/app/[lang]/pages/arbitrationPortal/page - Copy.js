"use client";

import React, { useState, Suspense, useRef } from "react";
import {
  Scale, CheckCircle2, AlertTriangle, ArrowLeft, LayoutDashboard, ShieldCheck,
  UserCheck, PauseCircle, PlayCircle, UserPlus, Clock, ShieldAlert, Gavel, 
  BadgeDollarSign, ChevronLeft, Download, BookOpen, Lock, MessageSquare, TrendingUp, ExternalLink
} from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";

// Import các component con
import Overview from "@/components/arbitration/Overview";
import ArbitratorList from "@/components/arbitration/ArbitratorList";
import ArbitratorProfile from "@/components/arbitration/ArbitratorProfile";
import ArbitrationDetail from "@/components/ArbitrationDetail";
import ArtritrationList from "@/components/ArtritrationList";

function ArbitrationPortalContent({ params }) {
  const { lang } = React.use(params);
  
  // -- STATES --
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isArbitrator, setIsArbitrator] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedRule, setSelectedRule] = useState(null);
  const [selectedArbitrator, setSelectedArbitrator] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // -- DỮ LIỆU RULES (ĐỦ 4 MỤC) --
  const rulesContent = [
    { 
      id: "proc", 
      title: lang === "vi" ? "Quy trình xử lý" : "Standard Procedure", 
      icon: <Gavel style={{ color: '#3b82f6' }} size={24} />, 
      desc: lang === "vi" ? "Các bước giải quyết tranh chấp." : "Dispute resolution steps.",
      detail: "1. Tiếp nhận hồ sơ: Các bên gửi đơn kiện và bằng chứng lên hệ thống.\n2. Chỉ định Trọng tài: Hệ thống chọn ngẫu nhiên hoặc các bên thỏa thuận.\n3. Phiên điều trần: Xem xét bằng chứng trực tuyến qua cổng bảo mật.\n4. Ban hành phán quyết: Quyết định có hiệu lực ngay và thực thi tự động."
    },
    { 
      id: "ethic", 
      title: lang === "vi" ? "Tiêu chuẩn đạo đức" : "Code of Ethics", 
      icon: <ShieldCheck style={{ color: '#10b981' }} size={24} />, 
      desc: lang === "vi" ? "Quy tắc ứng xử minh bạch." : "Arbitrator conduct rules.",
      detail: "• Độc lập: Không có lợi ích liên quan đến các bên tranh chấp.\n• Khách quan: Phán quyết dựa trên sự thật và bằng chứng.\n• Tận tâm: Xử lý vụ việc đúng thời hạn và trách nhiệm cao nhất."
    },
    { 
      id: "fee", 
      title: lang === "vi" ? "Biểu phí & Thù lao" : "Fee Schedule", 
      icon: <BadgeDollarSign style={{ color: '#f59e0b' }} size={24} />, 
      desc: lang === "vi" ? "Quy định về chi phí." : "Rules on case costs.",
      detail: "• Phí khởi kiện: 5% giá trị tranh chấp.\n• Thù lao trọng tài: 80% tổng phí thu được.\n• Phí hệ thống: 20% dùng để duy trì nền tảng."
    },
    { 
      id: "privacy", 
      title: lang === "vi" ? "Bảo mật thông tin" : "Data Privacy", 
      icon: <Lock style={{ color: '#6366f1' }} size={24} />, 
      desc: lang === "vi" ? "Chính sách bảo vệ dữ liệu." : "Data protection policies.",
      detail: "• Mã hóa đầu cuối: Toàn bộ bằng chứng được mã hóa.\n• Quyền truy cập: Chỉ trọng tài được chỉ định mới có quyền xem.\n• Xóa dữ liệu: Hủy thông tin nhạy cảm sau khi hoàn thành vụ việc."
    }
  ];

  // -- HÀM XUẤT PDF (FIX LỖI FONT & OKLCH) --
  const handleDownloadPDF = async (rule) => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      // Vẽ thủ công để tránh oklch crash
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      // Ghi chú: Nếu vẫn lỗi font, hãy dùng .normalize("NFC")
      doc.text(rule.title.toUpperCase(), 20, 25);
      
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 30, 190, 30);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(rule.detail, 170);
      doc.text(splitText, 20, 45);

      doc.save(`HDTT-${rule.id}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  // -- TABS LOGIC --
  const tabs = [
    { id: "overview", label: lang === "vi" ? "Tổng quan" : "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "active-cases", label: lang === "vi" ? "Đội ngũ trọng tài" : "Arbitrators", icon: <ShieldAlert size={18} /> },
    ...(isArbitrator ? [{ id: "arbitrations", label: lang === "vi" ? "Xử lý tranh chấp" : "Dispute Cases", icon: <Scale size={18} /> }] : []),
    { id: "rules", label: lang === "vi" ? "Quy định" : "Rules", icon: <ShieldCheck size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-slate-900 pb-20">
      
      {/* 1. HEADER & TRẠNG THÁI NGHỈ/HOẠT ĐỘNG */}
      <div className="bg-[#0f172a] text-white pt-8 pb-12 shadow-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link href={`/${lang}`} className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-bold uppercase mb-4 tracking-widest transition-colors">
                <ArrowLeft size={14} /> {lang === "vi" ? "Quay lại" : "Back Home"}
              </Link>
              <h1 className="text-3xl font-light uppercase tracking-widest flex items-center gap-3">
                <Scale className="text-blue-400" /> {lang === "vi" ? "Hội đồng trọng tài" : "Arbitration Council"}
              </h1>
            </div>

            {/* Nút Trở thành trọng tài / Trạng thái tiếp nhận */}
            {!isArbitrator ? (
              <button
                onClick={() => setIsArbitrator(true)}
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
              >
                <UserPlus size={18} />
                {lang === "vi" ? "Trở thành trọng tài" : "Become an Arbitrator"}
              </button>
            ) : (
              <div
                className={`p-4 rounded-sm border flex items-center gap-4 transition-all duration-500 ${
                  isAvailable
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-red-950/40 border-red-900/50"
                }`}
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
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white shadow-lg`}
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
            )}
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
                ? "Hệ thống sẽ không phân phối vụ việc mới khi bạn đang ở trạng thái Tạm nghỉ"
                : "No new cases will be assigned while you are in Pause status"}
            </p>
          </div>
        )}
        {/* 2. STATS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Vụ việc đang mở", value: "03", color: "#ef4444", icon: <AlertTriangle size={20} /> },
            { label: "Giá trị tranh chấp", value: "1,250 BBD", color: "#2563eb", icon: <Scale size={20} /> },
            { label: "Đã hoàn thành", value: "142", color: "#10b981", icon: <CheckCircle2 size={20} /> },
            { label: "Uy tín hệ thống", value: "98/100", color: "#d97706", icon: <UserCheck size={20} /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex items-center justify-between">
              <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{stat.label}</p><p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p></div>
              <div className="text-slate-100">{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 3. SIDEBAR MENU */}
          <aside className="lg:col-span-3 space-y-1">
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => {setActiveTab(tab.id); setSelectedRule(null); setViewMode("list");}} 
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase rounded-sm transition-all ${activeTab === tab.id ? "bg-blue-600 text-white shadow-md" : "text-slate-500 bg-white border border-slate-100 hover:bg-slate-50"}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </aside>

          {/* 4. CONTENT AREA */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-8 min-h-[600px]">
              
              {/* TAB: TỔNG QUAN */}
              {activeTab === "overview" && (
                <Overview lang={lang} isArbitrator={isArbitrator} navigateToCase={(id) => {setSelectedItem({id}); setActiveTab("arbitrations"); setViewMode("arbitration-detail");}} />
              )}

              {/* TAB: DANH SÁCH TRỌNG TÀI */}
              {activeTab === "active-cases" && (
                selectedArbitrator 
                  ? <ArbitratorProfile data={selectedArbitrator} lang={lang} onBack={() => setSelectedArbitrator(null)} />
                  : <ArbitratorList lang={lang} onViewDetail={(arb) => setSelectedArbitrator(arb)} />
              )}

              {/* TAB: QUY ĐỊNH (PHỤC HỒI 4 MỤC & FIX PDF) */}
              {activeTab === "rules" && (
                <div className="animate-in fade-in duration-300">
                  {!selectedRule ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rulesContent.map(rule => (
                        <div key={rule.id} onClick={() => setSelectedRule(rule)} className="p-6 border border-slate-100 rounded-sm hover:border-blue-200 cursor-pointer group transition-all">
                          <div className="mb-4">{rule.icon}</div>
                          <h4 className="font-bold text-slate-800 uppercase text-xs mb-2 group-hover:text-blue-600">{rule.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{rule.desc}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="animate-in zoom-in-95 duration-300">
                      <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <button onClick={() => setSelectedRule(null)} className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors">
                          <ChevronLeft size={14} /> Quay lại danh sách
                        </button>
                        <button 
                          onClick={() => handleDownloadPDF(selectedRule)}
                          disabled={isExporting}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-sm text-[10px] font-black uppercase disabled:opacity-50 hover:bg-slate-800 transition-all shadow-md"
                        >
                          {isExporting ? <Clock size={12} className="animate-spin" /> : <Download size={12} />} Tải quy định (PDF)
                        </button>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-sm border border-slate-100">
                        <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight italic">{selectedRule.title}</h2>
                        <div className="text-sm leading-[2] text-slate-700 whitespace-pre-line font-medium">
                          {selectedRule.detail}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: XỬ LÝ TRANH CHẤP (DÀNH CHO TRỌNG TÀI) */}
              {isArbitrator && activeTab === "arbitrations" && (
                <div className="animate-in fade-in">
                  {viewMode === "arbitration-detail" 
                    ? <ArbitrationDetail data={selectedItem} lang={lang} onBack={() => setViewMode("list")} />
                    : <ArtritrationList lang={lang} onViewDetail={(item) => { setSelectedItem(item); setViewMode("arbitration-detail"); }} />
                  }
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="p-20 text-center text-xs uppercase tracking-widest text-slate-400 italic">Đang tải dữ liệu Hội đồng...</div>}>
      <ArbitrationPortalContent params={params} />
    </Suspense>
  );
}