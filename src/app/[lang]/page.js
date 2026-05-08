"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getDictionary } from "@/lib/get-dictionary";
import UserDashboard from "@/components/UserDashboard";
import { useAuctionList, useAuctionCount } from "@/hooks/useAuctions";
import {
  AUCTION_STATUS_VI,
  formatLYX,
  timeLeft,
  AUCTION_HOUSE_ADDRESS,
} from "@/lib/contracts";
import {
  Gavel,
  Home,
  Globe,
  Clock,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Scale,
  Loader2,
  AlertCircle,
} from "lucide-react";

const STATUS_COLOR = {
  1: "bg-[#77b300]",
  0: "bg-slate-400",
  2: "bg-orange-500",
  3: "bg-green-600",
  4: "bg-red-500",
  5: "bg-purple-500",
  6: "bg-slate-500",
};

function AuctionCard({ auction, lang }) {
  const remaining = timeLeft(auction.endTime);
  const status    = Number(auction.status);
  const price     = formatLYX(auction.currentPrice);
  const id        = Number(auction.id);

  return (
    <Link href={`/${lang}/pages/auctionDetail?id=${id}`} className="group">
      <div className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
        <div className="flex justify-between items-start p-4">
          <span className={`${STATUS_COLOR[status] || "bg-slate-400"} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1`}>
            <Gavel size={10} />
            {AUCTION_STATUS_VI[status] || "—"}
          </span>
          <div className="text-right flex-1 px-3">
            <h3 className="text-[#003366] font-bold text-sm group-hover:text-blue-700 line-clamp-2">
              {auction.title}
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
              {lang === "vi" ? "Kết thúc:" : "Ends:"}{" "}
              {new Date(Number(auction.endTime) * 1000).toLocaleString("vi-VN")}
            </p>
          </div>
          <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
        <div className="grid grid-cols-2 border-t border-slate-100 text-center divide-x divide-slate-100">
          <div className="py-4 bg-slate-50/50">
            <p className="text-lg text-slate-700 font-bold">{price}</p>
            <p className="text-[10px] uppercase text-slate-500 font-bold">
              {lang === "vi" ? "Giá hiện tại" : "Current price"}
            </p>
          </div>
          <div className="py-4">
            <p className="text-lg text-slate-700 font-bold flex items-center justify-center gap-1">
              <Clock size={14} className="text-red-400" /> {remaining}
            </p>
            <p className="text-[10px] uppercase text-slate-500 font-bold">
              {lang === "vi" ? "Còn lại" : "Time left"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function AuctionContent({ params }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const searchParams = useSearchParams();
  const id           = searchParams.get("id");
  const langRef      = useRef(null);

  const { lang }          = React.use(params);
  const [dict, setDict]   = useState(null);
  const { address: wallet } = useAccount();

  const { auctions, isLoading, error, refetch } = useAuctionList(0, 50);
  const { count } = useAuctionCount();

  useEffect(() => { getDictionary(lang).then(setDict); }, [lang]);

  useEffect(() => {
    const fn = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setIsLangOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const close = () => { setIsMenuOpen(false); setIsLangOpen(false); };

  if (!dict) return (
    <div className="min-h-screen bg-[#f4f7f9] flex items-center justify-center text-slate-500 text-sm">Loading...</div>
  );

  if (id === "dashboard") return <UserDashboard lang={lang} />;

  const liveAuctions     = auctions.filter((a) => Number(a.status) <= 2);
  const contractDeployed = AUCTION_HOUSE_ADDRESS !== "0x0000000000000000000000000000000000000000";

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans relative">

      {/* Navbar */}
      <nav className="bg-[#003366] text-white shadow-md sticky top-0 z-[100]">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Gavel size={24} className="text-slate-300" />
            <span className="truncate max-w-[160px] md:max-w-none text-sm md:text-base">
              {dict?.nav?.title || "Blockchain Auction"}
            </span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            {id && (
              <Link href={`/${lang}`} onClick={close} className="flex items-center gap-1 p-2 hover:text-slate-300">
                <Home size={16} /> {dict?.nav?.home}
              </Link>
            )}
            {wallet && (
              <Link href={`/${lang}?id=dashboard`} onClick={close} className="flex items-center gap-1 p-2 hover:text-slate-300">
                <LayoutDashboard size={16} />
                <span>{lang === "vi" ? "Tài khoản" : "My Account"}</span>
              </Link>
            )}
            <Link href={`/${lang}/pages/arbitrationPortal`} onClick={close} className="flex items-center gap-1 p-2 hover:text-slate-300">
              <Scale size={16} />
              {lang === "vi" ? "Trọng tài" : "Arbitration"}
            </Link>
            <ConnectButton
              label={dict?.nav?.login || "Kết nối ví"}
              showBalance={false}
              chainStatus="icon"
              accountStatus="avatar"
            />
          </div>

          <button className="md:hidden p-2 text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#002855] border-t border-blue-900 absolute w-full shadow-2xl p-4 flex flex-col gap-3 text-sm z-50">
            {id && <Link href={`/${lang}`} onClick={close} className="flex items-center gap-2 p-2"><Home size={18} /> {dict?.nav?.home}</Link>}
            {wallet && (
              <Link href={`/${lang}?id=dashboard`} onClick={close} className="flex items-center gap-2 p-2">
                <LayoutDashboard size={16} />{lang === "vi" ? "Tài khoản" : "My Account"}
              </Link>
            )}
            <Link href={`/${lang}/pages/arbitrationPortal`} onClick={close} className="flex items-center gap-2 p-2">
              <Scale size={18} /> {lang === "vi" ? "Trọng tài" : "Arbitration"}
            </Link>
            <div className="pt-1"><ConnectButton label={dict?.nav?.login || "Kết nối ví"} showBalance={false} /></div>
          </div>
        )}
      </nav>

      {/* Language selector */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-end">
        <div className="relative" ref={langRef}>
          <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 text-slate-600 text-[13px] hover:text-slate-900 font-medium">
            <Globe size={14} className="text-slate-500" />
            <span>{lang === "vi" ? "Tiếng Việt" : "English (US)"}</span>
            <ChevronDown size={12} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
          </button>
          {isLangOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white shadow-xl rounded-sm border border-slate-200 z-50">
              <Link href="/en" onClick={() => setIsLangOpen(false)} className={`block px-4 py-2 text-sm hover:bg-slate-100 ${lang === "en" ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-800"}`}>English (United States)</Link>
              <Link href="/vi" onClick={() => setIsLangOpen(false)} className={`block px-4 py-2 text-sm hover:bg-slate-100 ${lang === "vi" ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-800"}`}>Tiếng Việt</Link>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-6xl mx-auto my-4 bg-white shadow-sm border border-slate-200 rounded-sm">
        <div className="px-6 py-8">

          {/* Banner */}
          <section className="bg-white border border-slate-200 mb-8">
            <div className="bg-[#004a99] text-white px-4 py-2 font-bold">{dict?.banner?.title}</div>
            <div className="p-6 text-sm text-slate-700 leading-relaxed">{dict?.banner?.description}</div>
          </section>

          {/* Warning: contract not deployed */}
          {!contractDeployed && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-sm flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-800">
                  {lang === "vi" ? "Smart contract chưa được deploy" : "Smart contract not deployed yet"}
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Chạy <code className="bg-amber-100 px-1 rounded">npm run deploy:testnet</code> rồi cập nhật{" "}
                  <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_CONTRACT_ADDRESS</code> trong{" "}
                  <code className="bg-amber-100 px-1 rounded">.env.local</code>
                </p>
              </div>
            </div>
          )}

          {/* Section header */}
          <div className="flex items-center justify-between mb-6 border-b border-blue-200 pb-2">
            <h2 className="text-[#004a99] text-2xl font-light uppercase">
              {dict?.auction?.all_auctions || "Danh sách đấu giá"}
            </h2>
            {contractDeployed && (
              <span className="text-xs text-slate-500 font-bold bg-slate-100 px-2 py-1 rounded">
                {count} {lang === "vi" ? "phiên" : "total"}
              </span>
            )}
          </div>

          {/* Loading */}
          {isLoading && contractDeployed && (
            <div className="flex items-center justify-center py-16 text-slate-400">
              <Loader2 size={24} className="animate-spin mr-2" />
              <span className="text-sm">{lang === "vi" ? "Đang tải từ blockchain..." : "Loading from blockchain..."}</span>
            </div>
          )}

          {/* Error */}
          {error && contractDeployed && (
            <div className="text-center py-12">
              <AlertCircle size={32} className="mx-auto mb-2 text-red-400" />
              <p className="text-sm text-slate-500">{lang === "vi" ? "Lỗi kết nối blockchain" : "Blockchain connection error"}</p>
              <button onClick={refetch} className="mt-3 text-xs underline text-blue-600">
                {lang === "vi" ? "Thử lại" : "Retry"}
              </button>
            </div>
          )}

          {/* Auction list */}
          {!isLoading && !error && contractDeployed && (
            liveAuctions.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Gavel size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">{lang === "vi" ? "Chưa có phiên đấu giá nào." : "No auctions yet."}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveAuctions.map((a) => <AuctionCard key={Number(a.id)} auction={a} lang={lang} />)}
              </div>
            )
          )}

          {/* Placeholder before deploy */}
          {!contractDeployed && (
            <div className="text-center py-16 text-slate-400">
              <Gavel size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                {lang === "vi" ? "Deploy smart contract để hiện danh sách đấu giá." : "Deploy the smart contract to show auctions."}
              </p>
            </div>
          )}

        </div>
      </main>

      <button className="fixed bottom-6 right-6 bg-[#2c3e50] text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-2xl hover:bg-slate-700 z-40 transition-all">
        <span className="bg-white text-slate-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-black">?</span>
        <span className="font-bold text-sm uppercase tracking-wider">Help</span>
      </button>
    </div>
  );
}

export default function AuctionPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading Application...</div>}>
      <AuctionContent params={params} />
    </Suspense>
  );
}
