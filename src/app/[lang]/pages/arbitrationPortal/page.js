"use client";

import React, { useState, Suspense } from "react";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
  PauseCircle,
  PlayCircle,
  UserPlus,
  Clock,
  MessageSquare,
  TrendingUp,
  ExternalLink,
  ShieldAlert,
  Gavel,
  BadgeDollarSign,
  BookOpen
} from "lucide-react";
import Link from "next/link";

// Import các component liên quan
import ArbitratorList from "@/components/arbitration/ArbitratorList";
import ArbitrationDetail from "@/components/ArbitrationDetail";
import ArtritrationList from "@/components/ArtritrationList";

function ArbitrationPortalContent({ params }) {
  const { lang } = React.use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isArbitrator, setIsArbitrator] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Giả lập dữ liệu vụ việc khẩn cấp để xử lý chuyển tab
  const urgentCases = [
    { id: "001", title: "Tranh chấp tên miền blockchain .eth", deadline: "1h 20m", type: "Tài sản số" },
    { id: "002", title: "Vi phạm hợp đồng cung cấp thanh khoản", deadline: "5h 45m", type: "DeFi" },
  ];

  // Hàm bổ trợ để chuyển nhanh tới vụ việc cụ thể
  const navigateToCase = (caseId) => {
    setSelectedItem({ id: caseId }); // Giả lập chọn item
    setActiveTab("arbitrations");
    setViewMode("arbitration-detail");
  };

  const adminStats = [
    { label: lang === "vi" ? "Vụ việc đang mở" : "Active Disputes", value: "03", icon: <AlertTriangle size={20} />, color: "text-red-500" },
    { label: lang === "vi" ? "Giá trị đang xử lý" : "Locked Value", value: "1,250 BBD", icon: <Scale size={20} />, color: "text-blue-600" },
    { label: lang === "vi" ? "Đã hoàn thành" : "Total Resolved", value: "142", icon: <CheckCircle2 size={20} />, color: "text-green-600" },
    { label: lang === "vi" ? "Điểm uy tín" : "Reputation Score", value: "98/100", icon: <UserCheck size={20} />, color: "text-amber-600" },
  ];

  const tabs = [
    { id: "overview", label: lang === "vi" ? "Tổng quan" : "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "active-cases", label: lang === "vi" ? "Đội ngũ trọng tài" : "The Arbitrators", icon: <ShieldAlert size={18} /> },
    ...(isArbitrator ? [{ id: "arbitrations", label: lang === "vi" ? "Xử lý tranh chấp" : "Dispute Resolution", icon: <Scale size={18} /> }] : []),
    { id: "rules", label: lang === "vi" ? "Quy định" : "Rules", icon: <ShieldCheck size={18} /> },
  ];

  // Nội dung quy định bổ sung
  const rulesContent = [
    {
      title: lang === "vi" ? "Quy trình xử lý" : "Standard Procedure",
      desc: lang === "vi" ? "Sơ đồ các bước từ khi tiếp nhận hồ sơ đến khi ban hành phán quyết cuối cùng." : "Step-by-step workflow from filing to final verdict.",
      icon: <Gavel className="text-blue-500" size={24} />
    },
    {
      title: lang === "vi" ? "Tiêu chuẩn đạo đức" : "Code of Ethics",
      desc: lang === "vi" ? "Quy định về tính độc lập, khách quan và bảo mật thông tin tranh chấp." : "Rules on independence, objectivity, and data confidentiality.",
      icon: <ShieldCheck className="text-green-500" size={24} />
    },
    {
      title: lang === "vi" ? "Biểu phí & Thù lao" : "Fee Schedule",
      desc: lang === "vi" ? "Cách tính phí trọng tài dựa trên giá trị tranh chấp và thời gian xử lý." : "Arbitration fee calculation based on dispute value and time.",
      icon: <BadgeDollarSign className="text-amber-500" size={24} />
    },
    {
      title: lang === "vi" ? "Điểm uy tín (Reputation)" : "Reputation System",
      desc: lang === "vi" ? "Cơ chế đánh giá trọng tài dựa trên tốc độ xử lý và tính chính xác." : "Scoring mechanism based on resolution speed and accuracy.",
      icon: <UserCheck className="text-purple-500" size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans pb-20">
      {/* Header */}
      <div className="bg-[#0f172a] text-white pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link href={`/${lang}`} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs mb-4">
                <ArrowLeft size={14} /> {lang === "vi" ? "Quay lại trang chủ" : "Back to Home"}
              </Link>
              <h1 className="text-3xl font-light uppercase tracking-widest flex items-center gap-3">
                <Scale className="text-blue-400" />
                {lang === "vi" ? "Hội đồng trọng tài" : "Arbitration Council"}
              </h1>
            </div>

            {!isArbitrator ? (
<button 
  onClick={() => setIsArbitrator(true)} 
  className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95"
>
  <UserPlus size={18} />
  <span>{lang === "vi" ? "Trở thành trọng tài" : "Become an Arbitrator"}</span>
</button>
            ) : (
              <div className={`p-4 rounded-sm border flex items-center gap-4 ${isAvailable ? "bg-slate-800/50 border-slate-700" : "bg-red-950/40 border-red-900/50"}`}>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-500 uppercase">{lang === "vi" ? "Trạng thái" : "Status"}</p>
                  <p className={`text-[11px] font-bold uppercase ${isAvailable ? "text-green-400" : "text-red-400"}`}>{isAvailable ? "Đang trực" : "Tạm nghỉ"}</p>
                </div>
                <button onClick={() => setIsAvailable(!isAvailable)} className={`px-3 py-2 rounded-sm text-[10px] font-black uppercase ${isAvailable ? "bg-red-600" : "bg-green-600"} text-white`}>
                  {isAvailable ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-8">
        {/* Stats bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {adminStats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{stat.label}</p>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
              <div className="text-slate-100">{stat.icon}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-1">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setViewMode("list"); }} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase rounded-sm ${activeTab === tab.id ? "bg-blue-600 text-white" : "text-slate-500 bg-white border border-slate-100"}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </aside>

          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6 min-h-[500px]">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="font-bold text-[#0f172a] uppercase">
                  {activeTab === "overview" ? (lang === "vi" ? "Bảng điều khiển chung" : "Dashboard") : tabs.find(t => t.id === activeTab)?.label}
                </h2>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  {isArbitrator ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Cột 1: Thông tin nhanh & Hiệu suất */}
                      <div className="space-y-6">
                        <div className="p-5 bg-slate-900 rounded-sm text-white relative overflow-hidden group">
                          <TrendingUp className="absolute right-[-10px] bottom-[-10px] size-24 text-white/5 group-hover:text-blue-500/10 transition-colors" />
                          <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
                            <UserCheck size={14} /> {lang === "vi" ? "Chỉ số uy tín cá nhân" : "Your Reputation"}
                          </h3>
                          <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-black text-blue-400">98</span>
                            <span className="text-slate-500 font-bold mb-1">/ 100</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed italic">
                            {lang === "vi" ? "Bạn nằm trong top 5% trọng tài xử lý nhanh nhất tháng này." : "You are in the top 5% of fastest arbitrators this month."}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                            <MessageSquare size={14} /> {lang === "vi" ? "Thông báo hệ thống" : "System Alerts"}
                          </h3>
                          <div className="text-[11px] space-y-3">
                            <div className="p-3 bg-amber-50 border-l-2 border-amber-400 text-amber-800">
                              <b>{lang === "vi" ? "Nhắc nhở:" : "Reminder:"}</b> {lang === "vi" ? "Cần cập nhật chữ ký số để tiếp tục biểu quyết." : "Digital signature update required."}
                            </div>
                            <div className="p-3 bg-slate-50 border-l-2 border-slate-300 text-slate-600">
                              <b>Hội đồng:</b> Phiên họp toàn thể sẽ diễn ra vào ngày 30/03.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cột 2: Lối tắt hành động nhanh */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                          <Clock size={14} /> {lang === "vi" ? "Lối tắt xử lý nhanh" : "Quick Action Shortcuts"}
                        </h3>
                        {urgentCases.map((c) => (
                          <div key={c.id} onClick={() => navigateToCase(c.id)} className="group p-4 border border-slate-200 rounded-sm cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold text-blue-600 uppercase">{c.type}</span>
                              <ExternalLink size={12} className="text-slate-300 group-hover:text-blue-500" />
                            </div>
                            <p className="text-sm font-bold text-slate-800 mb-2">{c.title}</p>
                            <div className="flex items-center gap-2 text-[10px] text-red-500 font-bold uppercase">
                              <AlertTriangle size={12} /> {lang === "vi" ? "Hết hạn trong:" : "Expires in:"} {c.deadline}
                            </div>
                          </div>
                        ))}
                        <button onClick={() => setActiveTab("arbitrations")} className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors border border-dashed border-slate-200 hover:border-blue-200">
                          {lang === "vi" ? "Xem toàn bộ hồ sơ" : "View all cases"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-6">
                      <Scale size={64} className="mx-auto text-slate-200" />
                      <p className="text-slate-500 italic">{lang === "vi" ? "Vui lòng đăng ký để xem các số liệu thống kê." : "Please register to view statistics."}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "active-cases" && <ArbitratorList lang={lang} onViewDetail={() => {}} />}

              {isArbitrator && activeTab === "arbitrations" && (
                viewMode === "arbitration-detail" 
                  ? <ArbitrationDetail data={selectedItem} lang={lang} onBack={() => setViewMode("list")} />
                  : <ArtritrationList lang={lang} onViewDetail={(item) => { setSelectedItem(item); setViewMode("arbitration-detail"); }} />
              )}

                              {activeTab === "rules" && (
                  <div className="animate-in fade-in duration-500">
                    <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-sm">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        {lang === "vi" 
                          ? "Mục này chứa các văn bản quy phạm và hướng dẫn dành cho cả Trọng tài viên và các bên tranh chấp. Vui lòng đọc kỹ để đảm bảo quy trình diễn ra minh bạch." 
                          : "This section contains regulatory documents and guidelines for both Arbitrators and disputing parties."}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rulesContent.map((rule, idx) => (
                        <div key={idx} className="p-5 border border-slate-100 rounded-sm hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">
                          <div className="mb-4">{rule.icon}</div>
                          <h4 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{rule.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{rule.desc}</p>
                          <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                            {lang === "vi" ? "Xem chi tiết" : "View Details"} <BookOpen size={12} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ArbitrationPortalPage({ params }) {
  return (
    <Suspense fallback={<div className="p-20 text-center text-xs uppercase tracking-widest text-slate-400">Loading...</div>}>
      <ArbitrationPortalContent params={params} />
    </Suspense>
  );
}