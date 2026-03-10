"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  History,
  Settings,
  Gavel,
  ArrowLeft,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Import các component con
import Overview from "./Overview";
import CreateAuctionForm from "./CreateAuctionForm";
import MyAuctionDetail from "./MyAuctionDetail";
import MyBidDetail from "./MyBidDetail";
import SettingsForm from "./SettingsForm";

export default function UserDashboard({ lang }) {
  // Trạng thái điều hướng
  const [activeTab, setActiveTab] = useState("overview"); // overview, my-auctions, history, settings
  const [viewMode, setViewMode] = useState("list"); // list, create, auction-detail, bid-detail
  const [selectedItem, setSelectedItem] = useState(null);

  // Thống kê giả lập
  const stats = [
    {
      label: lang === "vi" ? "Đang đấu giá" : "Active Bids",
      value: 3,
      icon: <Gavel size={20} />,
    },
    {
      label: lang === "vi" ? "Đã trúng thầu" : "Won Items",
      value: 1,
      icon: <Package size={20} />,
    },
    {
      label: lang === "vi" ? "Số dư ký quỹ" : "Escrow Balance",
      value: "450 BBD",
      icon: <ShieldCheck size={20} />,
    },
  ];

  // Hàm quay lại danh sách
  const handleBack = () => {
    setViewMode("list");
    setSelectedItem(null);
  };

  // Render nội dung chính
  const renderMainContent = () => {
    // Chế độ tạo mới
    if (viewMode === "create") {
      return <CreateAuctionForm lang={lang} onCancel={handleBack} />;
    }

    // Chế độ chi tiết lô hàng (người bán)
    if (viewMode === "auction-detail") {
      return (
        <MyAuctionDetail data={selectedItem} lang={lang} onBack={handleBack} />
      );
    }

    // Chế độ chi tiết trả giá (người mua)
    if (viewMode === "bid-detail") {
      return (
        <MyBidDetail data={selectedItem} lang={lang} onBack={handleBack} />
      );
    }

    // Chế độ danh sách mặc định (Tabs)
    return (
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
              id: "my-auctions",
              label: lang === "vi" ? "Đấu giá của tôi" : "My Auctions",
              icon: <Package size={18} />,
            },
            {
              id: "history",
              label: lang === "vi" ? "Lịch sử trả giá" : "Bid History",
              icon: <History size={18} />,
            },
            {
              id: "settings",
              label: lang === "vi" ? "Cài đặt" : "Settings",
              icon: <Settings size={18} />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-sm ${activeTab === tab.id ? "bg-[#003366] text-white shadow-md" : "text-slate-500 hover:bg-slate-100"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </aside>

        {/* Tab Content Area */}
        <div className="lg:col-span-9">
          <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6">
            <h2 className="font-bold text-[#003366] uppercase tracking-tight border-b border-slate-100 pb-4 mb-6">
              {activeTab === "overview" &&
                (lang === "vi" ? "Tổng quan hoạt động" : "Activity Overview")}
              {activeTab === "my-auctions" &&
                (lang === "vi"
                  ? "Lô hàng bạn đang đăng bán"
                  : "My Selling Lots")}
              {activeTab === "history" &&
                (lang === "vi"
                  ? "Các lô hàng bạn đang đấu giá"
                  : "Your Bidding History")}
              {activeTab === "settings" &&
                (lang === "vi" ? "Thiết lập tài khoản" : "Account Settings")}
            </h2>

            <div className="space-y-4">
              {/* COMPONENT TỔNG QUAN */}
              {activeTab === "overview" && (
                <Overview
                  lang={lang}
                  setActiveTab={setActiveTab}
                  setViewMode={setViewMode}
                  setSelectedItem={setSelectedItem}
                />
              )}

              {/* TAB ĐẤU GIÁ CỦA TÔI (Người bán) */}
              {activeTab === "my-auctions" && (
                <div className="group border border-slate-100 p-4 hover:border-blue-300 transition-all rounded-sm flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center text-slate-400 font-bold text-[10px]">
                      IMAGE
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm uppercase">
                        Lô thiết bị văn phòng #04
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Trạng thái:{" "}
                        <span className="text-green-600 font-bold uppercase tracking-tighter">
                          Đang đấu giá
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setViewMode("auction-detail");
                      setSelectedItem({
                        title: "Lô thiết bị văn phòng #04",
                        currentPrice: 500,
                      });
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:underline uppercase flex items-center gap-1"
                  >
                    {lang === "vi" ? "Quản lý" : "Manage"}{" "}
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {/* TAB LỊCH SỬ TRẢ GIÁ (Người mua) */}
              {activeTab === "history" && (
                <div className="group border border-slate-100 p-4 hover:border-red-300 transition-all rounded-sm flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center text-slate-400 font-bold text-[10px]">
                      IMAGE
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm uppercase">
                        Màn hình Dell Ultrasharp
                      </h4>
                      <p className="text-[10px] text-red-500 mt-1 font-bold uppercase tracking-tighter italic">
                        ! Bạn đã bị vượt mức giá
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setViewMode("bid-detail");
                      setSelectedItem({
                        id: "4",
                        title: "Màn hình Dell Ultrasharp",
                        startingPrice: 100,
                        myLastBid: 180,
                        currentPrice: 210,
                        history: [
                          { amount: 180, time: "10:00" },
                          { amount: 150, time: "09:00" },
                        ],
                      });
                    }}
                    className="text-[11px] font-bold text-red-600 hover:underline uppercase flex items-center gap-1"
                  >
                    {lang === "vi" ? "Kiểm tra" : "Check Bid"}{" "}
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}

              {activeTab === "settings" && <SettingsForm lang={lang} />}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans pb-20">
      {/* Header */}
      <div className="bg-[#003366] text-white pt-8 pb-12 shadow-inner">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link
                href={`/${lang}`}
                className="text-blue-300 hover:text-white flex items-center gap-1 text-xs mb-4 transition-colors"
              >
                <ArrowLeft size={14} />{" "}
                {lang === "vi" ? "Quay lại trang chủ" : "Back to Home"}
              </Link>
              <h1 className="text-3xl font-light tracking-tight uppercase tracking-widest">
                {lang === "vi" ? "Tài khoản của tôi" : "My Account"}
              </h1>
            </div>

            {viewMode === "list" && (
              <button
                onClick={() => setViewMode("create")}
                className="bg-[#77b300] hover:bg-[#669900] text-white px-6 py-3 rounded-sm font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95 uppercase tracking-wider text-sm"
              >
                <PlusCircle size={20} />
                {lang === "vi" ? "Tạo phiên đấu giá mới" : "Create New Auction"}
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-8">
        {/* Stats bar */}
        {viewMode === "list" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-[#003366]">
                    {stat.value}
                  </p>
                </div>
                <div className="text-blue-100">{stat.icon}</div>
              </div>
            ))}
          </div>
        )}

        {/* Main Content Area */}
        {renderMainContent()}
      </main>
    </div>
  );
}
