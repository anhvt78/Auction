"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import UserDashboard from "@/components/UserDashboard";
import {
  Gavel,
  Home,
  LogIn,
  Globe,
  Package,
  Clock,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Scale,
} from "lucide-react";

// Component chứa nội dung chính của trang (đã chuyển thành Client Component)
export default function ClientAuctionContent({ lang, params }) { // Nhận 'lang' từ props
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [dict, setDict] = useState(null);

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  // Hàm xử lý đóng menu khi nhấn vào link điều hướng
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  if (!dict) {
    return (
      <div className="min-h-screen bg-[#f4f7f9] flex items-center justify-center font-sans text-slate-500">
        Loading...
      </div>
    );
  }

  // Chuyển đổi hiển thị giữa Dashboard và Danh sách đấu giá
  if (id === "dashboard") {
    return <UserDashboard lang={lang} />;
  }

  // Dữ liệu mẫu (Giả lập từ Smart Contract)
  const auctions = [
    {
      id: 1,
      location: "Riga, LV",
      date: "MARCH 9, 2026, 17:00",
      lots: 1,
      time: "3 Minutes",
      status: "ACTIVE",
    },
    {
      id: 2,
      location: "Kolonia, FM",
      date: "MARCH 10, 2026, 13:00",
      lots: 41,
      time: "20 Hours",
      status: "ACTIVE",
    },
    {
      id: 3,
      location: "Guangzhou, CN",
      date: "MARCH 15, 2026, 20:00",
      lots: 51,
      time: "6 Days",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans relative">
      {/* 1. Top Navbar */}
      <nav className="bg-[#003366] text-white shadow-md sticky top-0 z-[100]">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Gavel size={24} className="text-slate-300" />
            <span className="truncate max-w-[180px] md:max-w-none">
              {dict?.nav?.title || "U.S. Embassy Online Auction"}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center gap-1 text-slate-300 text-[13px] font-medium hover:text-white"
              >
                <Globe size={14} />
                <span>{lang === "vi" ? "Tiếng Việt" : "English (US)"}</span>
                <ChevronDown size={12} />
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white shadow-xl border border-slate-200 block z-50">
                  <Link
                    href="/en"
                    className="block px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    English (US)
                  </Link>
                  <Link
                    href="/vi"
                    className="block px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    Tiếng Việt
                  </Link>
                </div>
              )}

            {id && (
              <Link
                href={`/${lang}`}
                onClick={handleNavigation}
                className="flex items-center gap-2 p-2 hover:text-slate-300 transition-colors"
              >
                <Home size={16} /> {dict?.nav?.home}
              </Link>
            )}

            {isLoggedIn && (
              <Link
                href={`/${lang}?id=dashboard`}
                onClick={handleNavigation}
                className="flex items-center gap-2 p-2 hover:text-slate-300 transition-colors"
              >
                <LayoutDashboard size={16} />
                <span>
                  {lang === "vi" ? "Tài khoản của tôi" : "My Account"}
                </span>
              </Link>
            )}

            <Link
              href={`/${lang}/pages/arbitrationPortal`}
              onClick={handleNavigation}
              className="flex items-center gap-2 p-2 hover:text-slate-300 transition-colors"
            >
              <Scale size={16} />
              {lang === "vi" ? "Hội đồng Trọng tài" : "Arbitration Hub"}
            </Link>

            <button
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
                handleNavigation();
              }}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              <LogIn size={16} />
              {isLoggedIn
                ? lang === "vi"
                  ? "Thoát"
                  : "Logout"
                : dict?.nav?.login}
            </button>
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#002855] border-t border-blue-900 absolute w-full shadow-2xl p-4 flex flex-col gap-2 text-sm">
            {id && (
              <Link
                href={`/${lang}`}
                onClick={handleNavigation}
                className="flex items-center gap-2 p-2"
              >
                <Home size={18} /> {dict?.nav?.home}
              </Link>
            )}

             {isLoggedIn && (
              <Link
                href={`/${lang}?id=dashboard`}
                onClick={handleNavigation}
                className="flex items-center gap-2 p-2"
              >
                <LayoutDashboard size={16} />
                <span>
                  {lang === "vi" ? "Tài khoản của tôi" : "My Account"}
                </span>
              </Link>
            )}
            <Link
              href={`/${lang}/pages/arbitrationPortal`}
              onClick={handleNavigation}
              className="flex items-center gap-2 p-2"
            >
              <Scale size={18} />{" "}
              {lang === "vi" ? "Trung tâm Trọng tài" : "Arbitration Hub"}
            </Link>
            <button
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
                handleNavigation();
              }}
              className="flex items-center gap-2 p-2"
            >
              <LogIn size={18} />{" "}
              {isLoggedIn
                ? lang === "vi"
                  ? "Thoát"
                  : "Logout"
                : dict?.nav?.login}
            </button>
          </div>
        )}
      </nav>

      {/* 3. Main Content */}
      <main className="max-w-6xl mx-auto my-4 bg-white shadow-sm border border-slate-200 rounded-sm overflow-hidden">
        <div className="px-6 py-8">
          <section className="bg-white border border-slate-200 mb-8 overflow-hidden">
            <div className="bg-[#004a99] text-white px-4 py-2 font-bold">
              {dict?.banner?.title}
            </div>
            <div className="p-6 text-sm text-slate-700 leading-relaxed">
              {dict?.banner?.description}
            </div>
          </section>

          <h2 className="text-[#004a99] text-2xl font-light border-b border-blue-200 pb-2 mb-6 uppercase">
            {dict?.auction?.all_auctions}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auctions.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/pages/auctionDetail?id=${item.id}`}
                className="group"
              >
                <div className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                  <div className="flex justify-between p-4">
                    <span className="bg-[#77b300] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <Gavel size={10} /> {item.status}
                    </span>
                    <div className="text-right px-4">
                      <h3 className="text-[#003366] text-xl font-bold group-hover:text-blue-700">
                        {item.location}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
                        {item.date}
                      </p>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className=\"grid grid-cols-2 border-t border-slate-100 text-center divide-x divide-slate-100\">\
                    <div className="py-4 bg-slate-50/50">
                      <p className="text-2xl text-slate-700 font-light">
                        {item.lots}
                      </p>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        {dict?.auction?.lots_in_auction}
                      </p>
                    </div>
                    <div className="py-4">
                      <p className="text-2xl text-slate-700 font-light">
                        {item.time.split(" ")[0]}
                      </p>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        {item.time.split(" ")[1]} {dict?.auction?.to_closure}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#2c3e50] text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl hover:bg-slate-700 z-40 transition-all">
        <span className="bg-white text-slate-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black">
          ?
        </span>
        <span className="font-bold text-sm uppercase tracking-wider">Help</span>
      </button>
    </div>
  );
}
