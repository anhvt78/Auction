"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import {
  ArrowUpRight,
  Trophy,
  Wallet,
  AlertCircle,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  History,
  ChevronLeft,
  Package,
} from "lucide-react";

/**
 * Component con: Thẻ thống kê (StatCard)
 */
const StatCard = ({ title, value, unit, colorClass, icon: Icon }) => (
  <div
    className={`bg-white p-5 rounded-sm border border-slate-200 shadow-sm border-t-4 ${colorClass} flex flex-col hover:shadow-md transition-shadow`}
  >
    <div className="flex justify-between items-start">
      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
        {title}
      </span>
      <Icon size={18} className="text-slate-300" />
    </div>
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-3xl font-light text-slate-800">{value}</span>
      <span className="text-xs font-bold text-slate-400 uppercase">{unit}</span>
    </div>
  </div>
);

/**
 * Component con: Dòng lịch sử hoạt động (ActivityItem)
 */
const ActivityItem = ({ type, status, item, amount, time, dict }) => {
  const typeConfig = {
    BID: {
      icon: <ArrowUpRight size={18} />,
      bg: "bg-blue-50",
      text: "text-blue-600",
      label: dict?.dashboard?.activity?.bid || "Đã đặt giá",
    },
    WIN: {
      icon: <Trophy size={18} />,
      bg: "bg-green-50",
      text: "text-green-600",
      label: dict?.dashboard?.activity?.win || "Thắng đấu giá",
    },
  };

  const statusConfig = {
    SUCCESS: {
      icon: <CheckCircle2 size={14} />,
      class: "text-green-600 bg-green-50",
      label: dict?.dashboard?.status?.success || "Thành công",
    },
    OUTBID: {
      icon: <AlertCircle size={14} />,
      class: "text-red-600 bg-red-50",
      label: dict?.dashboard?.status?.outbid || "Bị vượt giá",
    },
  };

  const config = typeConfig[type] || typeConfig.BID;
  const sStyle = statusConfig[status] || {
    class: "bg-slate-50",
    label: status,
  };

  return (
    <div className="flex items-center justify-between p-4 border border-slate-100 rounded-sm hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-full ${config.bg} ${config.text}`}>
          {config.icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-700 text-sm">
            {config.label}:{" "}
            <span className="text-[#004a99] uppercase">{item}</span>
          </h4>
          <div className="flex items-center mt-1 gap-3 text-[11px] text-slate-400 font-medium">
            <span>{time}</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            <span className="font-bold text-slate-600">{amount}</span>
          </div>
        </div>
      </div>
      <div
        className={`flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-tighter ${sStyle.class}`}
      >
        {sStyle.icon}
        <span className="ml-1">{sStyle.label}</span>
      </div>
    </div>
  );
};

export default function UserDashboard({ lang }) {
  const [dict, setDict] = useState(null);

  // 1. LOGIC LẤY TÊN NGƯỜI DÙNG
  // Trong thực tế, 'userName' sẽ được lấy từ Global State (Redux/Context) hoặc từ Wallet Profile.
  const [userData, setUserData] = useState({
    fullName: "Vu Tuan Anh", // Giả sử đây là dữ liệu lấy từ DB hoặc Wallet
    role: "User Account",
  });

  // Hàm xử lý hiển thị Avatar (Lấy các chữ cái đầu: "Vu Tuan Anh" -> "VA")
  const getAvatarName = (name) => {
    if (!name) return "U";
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  if (!dict) return null;

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans">
      {/* 1. Header Navigation */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-1 text-slate-600 hover:text-[#004a99] font-bold text-[12px] border border-slate-300 px-3 py-1.5 rounded-sm hover:bg-slate-50 transition-colors uppercase tracking-tight"
            >
              <ChevronLeft size={16} />
              {lang === "vi" ? "Quay lại" : "Back"}
            </Link>
            <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>
            <h1 className="text-[#003366] font-bold text-lg flex items-center gap-2">
              <LayoutDashboard size={20} className="text-blue-500" />
              <span className="uppercase tracking-tight text-sm">
                {lang === "vi" ? "Bảng điều khiển" : "Dashboard"}
              </span>
            </h1>
          </div>

          {/* <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block leading-none">
              <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">
                User Account
              </p>
              <p className="text-sm font-bold text-slate-700 uppercase">
                Vu Tuan Anh
              </p>
            </div>
            <div className="w-9 h-9 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
              VA
            </div>
          </div> */}

          {/* LOGIC HIỂN THỊ TÊN TỰ ĐỘNG */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block leading-none">
              <p className="text-[9px] text-slate-400 font-bold uppercase mb-1">
                {userData.role}
              </p>
              <p className="text-sm font-bold text-slate-700 uppercase">
                {userData.fullName}
              </p>
            </div>
            {/* Avatar tự động lấy chữ cái đầu */}
            <div className="w-9 h-9 bg-[#003366] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md ring-2 ring-white">
              {getAvatarName(userData.fullName)}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content với nền trắng */}
      <main className="max-w-6xl mx-auto my-6 md:my-10 bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden">
        {/* Nội dung bên trong được bọc padding để không sát mép nền trắng */}
        <div className="p-6 md:p-10 space-y-12">
          {/* Section 1: Thống kê nhanh */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title={lang === "vi" ? "Đang đấu giá" : "Active Bids"}
              value="03"
              unit={lang === "vi" ? "Sản phẩm" : "Items"}
              colorClass="border-t-blue-500"
              icon={Package}
            />
            <StatCard
              title={lang === "vi" ? "Đã chiến thắng" : "Auctions Won"}
              value="01"
              unit={lang === "vi" ? "Sản phẩm" : "Items"}
              colorClass="border-t-green-500"
              icon={Trophy}
            />
            <StatCard
              title={lang === "vi" ? "Tổng giá trị" : "Total Value"}
              value="2.50"
              unit="BBD"
              colorClass="border-t-purple-500"
              icon={Wallet}
            />
          </div>

          {/* Section 2: Đấu giá đang tham gia */}
          <section>
            <h2 className="text-[#003366] text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock size={16} className="text-blue-500" />
              {lang === "vi"
                ? "Đấu giá đang tham gia"
                : "Current Bidding Items"}
            </h2>
            <div className="border border-slate-100 rounded-sm overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-widest border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">
                        {lang === "vi" ? "Vật phẩm" : "Item Name"}
                      </th>
                      <th className="px-6 py-4">
                        {lang === "vi" ? "Giá hiện tại" : "Current Price"}
                      </th>
                      <th className="px-6 py-4">
                        {lang === "vi" ? "Trạng thái" : "Status"}
                      </th>
                      <th className="px-6 py-4 text-right">
                        {lang === "vi" ? "Hành động" : "Action"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 uppercase tracking-tighter">
                        CPU'S & MONITORS
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        210.00{" "}
                        <span className="text-[10px] text-slate-400">BBD</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 rounded-sm text-[10px] font-bold uppercase tracking-tighter">
                          <AlertCircle size={10} />
                          {lang === "vi" ? "Bị vượt giá" : "Outbid"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="bg-[#004a99] text-white px-4 py-1.5 rounded-sm text-[11px] font-bold hover:bg-blue-800 transition-all uppercase shadow-sm">
                          {lang === "vi" ? "Nâng giá ngay" : "Raise Bid"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: Lịch sử hoạt động */}
          <section className="pb-4">
            <h2 className="text-[#003366] text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <History size={16} className="text-blue-500" />
              {lang === "vi" ? "Hoạt động gần đây" : "Recent Activity"}
            </h2>
            <div className="space-y-3">
              <ActivityItem
                type="BID"
                status="OUTBID"
                item="CPU'S & MONITORS"
                amount="210.00 BBD"
                time={lang === "vi" ? "15 phút trước" : "15 mins ago"}
                dict={dict}
              />
              <ActivityItem
                type="WIN"
                status="SUCCESS"
                item="Office Furniture Set"
                amount="85.00 BBD"
                time={lang === "vi" ? "2 ngày trước" : "2 days ago"}
                dict={dict}
              />
            </div>
          </section>
        </div>
      </main>

      {/* 3. Footer / Help Button */}
      <footer className="max-w-6xl mx-auto pb-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
          <span>Online Auction, powered by</span>
          <span className="font-bold text-blue-900/50 italic text-sm">
            adgCloud
          </span>
        </div>
      </footer>

      <button className="fixed bottom-6 right-6 bg-[#2c3e50] text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl hover:bg-slate-700 transition-all z-50">
        <span className="bg-white text-slate-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black">
          ?
        </span>
        <span className="font-bold text-sm uppercase tracking-wider">Help</span>
      </button>
    </div>
  );
}
