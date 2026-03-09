"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Gavel,
  Clock,
  Info,
  User,
  Settings,
  Home,
  Globe,
  ChevronDown,
} from "lucide-react";

export default function AuctionDetailPage({ params }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const lang = params.lang;

  // Giả định tiêu đề dựa trên ID giống như hình ảnh bạn gửi
  const title = id === "4" ? "CPU'S & MONITORS" : `AUCTION ITEM #${id}`;

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans">
      {/* 1. Top Navbar màu Navy */}
      <nav className="bg-[#003366] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
          <div className="flex items-center gap-2 font-semibold">
            <Gavel size={20} />
            <span>Bridgetown Online Auction</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href={`/${lang}`}
              className="flex items-center gap-1 hover:text-slate-300"
            >
              <Home size={16} /> Home
            </Link>
            <div className="flex items-center gap-1 bg-[#004a99] px-3 py-1 rounded-sm border border-blue-400">
              <User size={16} /> <span>Trần</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Thanh thông tin phụ (Closure Date & Countdown) */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="text-[11px] font-bold">
            <p className="text-slate-500 uppercase">
              Closure Date: March 9, 2026, 23:00
            </p>
            <p className="text-[#77b300]">GMT+0700 (INDOCHINA TIME)</p>
          </div>

          {/* Bộ đếm ngược Countdown */}
          <div className="flex gap-1">
            {[
              { v: "00", l: "DAYS" },
              { v: "05", l: "HOURS" },
              { v: "28", l: "MINS" },
              { v: "57", l: "SECS" },
            ].map((t, i) => (
              <div
                key={i}
                className="border border-slate-200 bg-slate-50 rounded px-2 py-1 min-w-[55px] text-center shadow-inner"
              >
                <div className="text-xl font-mono font-medium leading-none text-slate-700">
                  {t.v}
                </div>
                <div className="text-[8px] text-slate-400 font-bold mt-1 uppercase">
                  {t.l}
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-right">
            <p className="text-slate-500 font-bold mb-1">Prices in BBD (BBD)</p>
            <div className="flex items-center justify-end gap-1 text-slate-700 font-bold">
              <User size={14} className="text-slate-500 fill-slate-500" />
              <span>English (United States)</span>
              <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Nội dung chính */}
      <main className="max-w-6xl mx-auto my-6 bg-white shadow-sm border border-slate-200 rounded-sm overflow-hidden p-6">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1 text-[12px] font-bold text-slate-600 border border-slate-300 px-3 py-1 rounded-sm hover:bg-slate-50 mb-6 transition-colors"
        >
          <ChevronLeft size={14} /> Return to Auction
        </Link>

        <div className="flex justify-between items-center border-b border-blue-100 pb-4 mb-8">
          <h1 className="text-[#004a99] text-3xl font-light uppercase tracking-tight">
            {title}
          </h1>
          <span className="bg-[#77b300] text-white text-[11px] font-bold px-3 py-1 rounded-sm flex items-center gap-1 uppercase shadow-sm">
            <Gavel size={12} /> Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cột trái: Hình ảnh */}
          <div>
            <div className="bg-black aspect-video rounded-sm overflow-hidden flex items-center justify-center relative shadow-md">
              <img
                src="/api/placeholder/800/600"
                alt="Item"
                className="object-contain w-full h-full"
              />
              <div className="absolute top-3 right-3 bg-slate-200/90 text-slate-700 text-[11px] px-3 py-1 rounded-sm font-bold shadow-sm">
                LOT 1
              </div>
            </div>
            <div className="mt-3 w-24 h-20 border-2 border-blue-500 rounded-sm overflow-hidden shadow-sm">
              <img
                src="/api/placeholder/100/100"
                alt="Thumbnail"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Cột phải: Form Đấu giá */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[12px] font-bold text-slate-500 block mb-2 uppercase tracking-wide">
                  Bids
                </label>
                <div className="border border-slate-200 rounded-sm flex items-center px-4 py-2 bg-slate-50 text-slate-500 shadow-inner">
                  <User
                    size={16}
                    className="mr-3 fill-slate-300 text-slate-300"
                  />
                  <span className="text-lg font-medium">3</span>
                </div>
              </div>
              <div>
                <label className="text-[12px] font-bold text-slate-500 block mb-2 uppercase tracking-wide">
                  Current price
                </label>
                <div className="flex border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                  <span className="bg-slate-100 px-4 py-2 text-[12px] font-bold border-r border-slate-200 text-slate-600">
                    BBD
                  </span>
                  <div className="flex-1 px-4 py-2 text-right font-bold text-lg text-slate-800">
                    200
                  </div>
                  <span className="bg-slate-50 px-3 py-2 text-[12px] font-bold border-l border-slate-200 text-slate-400">
                    .00
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-blue-800 pt-4">
              <h3 className="text-blue-900 font-bold text-[13px] flex items-center gap-2 mb-6 uppercase tracking-wider">
                <Info
                  size={16}
                  className="bg-blue-900 text-white rounded-full p-0.5"
                />{" "}
                Bid Information
              </h3>

              <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-[11px] font-bold uppercase text-slate-500">
                <div>
                  <p className="mb-2">Minimum increase</p>
                  <div className="flex border border-slate-200 rounded-sm bg-slate-50 p-3 shadow-inner">
                    <span className="flex-1 italic text-slate-400">BBD</span>
                    <span className="text-slate-700">10 .00</span>
                  </div>
                </div>
                <div>
                  <p className="mb-2">Maximum increase</p>
                  <div className="flex border border-slate-200 rounded-sm bg-slate-50 p-3 shadow-inner">
                    <span className="flex-1 italic text-slate-400">BBD</span>
                    <span className="text-slate-700">50 .00</span>
                  </div>
                </div>
                <div>
                  <p className="mb-2">My last bid</p>
                  <div className="flex border border-slate-200 rounded-sm bg-slate-50 p-3 shadow-inner">
                    <span className="flex-1 italic text-slate-400">BBD</span>
                    <span className="text-slate-700">0 .00</span>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-red-600 font-black">Your offer</p>
                  <div className="flex border-2 border-red-100 rounded-sm p-0 overflow-hidden focus-within:border-red-300 transition-colors">
                    <span className="bg-slate-100 px-3 py-2 border-r italic text-slate-500">
                      BBD
                    </span>
                    <input
                      type="number"
                      className="flex-1 px-3 py-2 text-right text-red-600 font-bold outline-none text-lg"
                      placeholder="210"
                    />
                    <span className="bg-slate-50 px-2 py-2 border-l text-slate-400 font-bold">
                      .00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#3498db] hover:bg-blue-600 text-white font-bold py-4 rounded-sm transition-all shadow-md active:transform active:scale-[0.99] uppercase tracking-widest mt-4">
              Submit
            </button>
          </div>
        </div>

        {/* Thông tin điều kiện và mô tả */}
        <div className="mt-12 space-y-6">
          <div className="bg-[#f0f9ff] border border-blue-200 p-3 rounded-sm text-blue-600 text-[13px] flex items-center gap-3 shadow-sm">
            <div className="w-5 h-5 border-2 border-blue-400 rounded-full flex items-center justify-center text-[10px] font-black">
              ○
            </div>
            <span className="font-bold uppercase tracking-tight">
              You did not bid this Lot
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <p className="font-bold text-slate-500 text-[11px] uppercase mb-2 tracking-wider">
                Condition
              </p>
              <div className="flex border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                <span className="bg-slate-100 p-3 border-r border-slate-200 text-slate-500">
                  <Settings size={18} />
                </span>
                <span className="flex-1 p-3 text-sm font-medium text-slate-700">
                  Salvage
                </span>
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="font-bold text-slate-500 text-[11px] uppercase mb-2 tracking-wider">
                Description
              </p>
              <div className="flex items-start border border-slate-200 rounded-sm bg-slate-50 p-5 text-[14px] leading-relaxed text-slate-600 shadow-inner italic">
                <Info
                  size={20}
                  className="mr-4 mt-0.5 text-slate-400 shrink-0"
                />
                <p>
                  USED---- AS IS----- NO REFUNDS------ NO EXCHANGES--- NO POWER
                  CORDS---- NO HARD DRIVE---- NO LEGS---- NO OPERATING
                  SYSTEM---- USE FOR PARTS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer của Main Content */}
        <div className="mt-12 pt-4 border-t border-slate-100 flex justify-center gap-10 text-[13px] text-slate-500 font-medium">
          <button className="hover:text-blue-600 transition-colors uppercase">
            How it works
          </button>
          <button className="hover:text-blue-600 transition-colors uppercase">
            User Agreement and Privacy Notice
          </button>
        </div>
      </main>

      {/* Nút Help cố định */}
      <button className="fixed bottom-6 right-6 bg-[#2c3e50] text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl hover:bg-slate-700 transition-all z-50">
        <span className="bg-white text-[#2c3e50] rounded-full w-5 h-5 flex items-center justify-center text-xs font-black">
          ?
        </span>
        <span className="font-bold text-sm uppercase tracking-wider">Help</span>
      </button>

      {/* Bản quyền dưới cùng */}
      <div className="pb-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
          <span>Online Auction, powered by</span>
          <span className="font-bold text-blue-900/50 italic text-sm">
            adgCloud
          </span>
        </div>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
          v1.10.4 - Release Notes
        </p>
      </div>
    </div>
  );
}
