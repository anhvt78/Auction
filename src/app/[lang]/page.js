import { getDictionary } from "@/lib/get-dictionary";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import {
  Gavel,
  Home,
  UserPlus,
  LogIn,
  Globe,
  Package,
  Clock,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default async function AuctionPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Dữ liệu mẫu mô phỏng từ Smart Contract
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
    {
      id: 4,
      location: "Bridgetown, BB",
      date: "MARCH 9, 2026, 23:00",
      lots: 62,
      time: "6 Hours",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans">
      {/* Top Navbar màu Navy */}
      {/* <nav className="bg-[#003366] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Gavel size={24} className="text-slate-300" />
            <span>U.S. Embassy Online Auction</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <button className="flex items-center gap-1 hover:text-slate-300">
              <Home size={16} /> Home
            </button>
            <button className="flex items-center gap-1 hover:text-slate-300">
              <UserPlus size={16} /> Register
            </button>
            <button className="flex items-center gap-1 hover:text-slate-300">
              <LogIn size={16} /> Login
            </button>
          </div>

        </div>
      </nav> */}

      <nav className="bg-[#003366] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Gavel size={24} className="text-slate-300" />
            <span>U.S. Embassy Online Auction</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            {/* Menu điều hướng */}
            <div className="hidden md:flex items-center gap-6">
              <button className="flex items-center gap-1 hover:text-slate-300">
                <Home size={16} /> Home
              </button>
              <button className="flex items-center gap-1 hover:text-slate-300">
                <UserPlus size={16} /> Register
              </button>
              <button className="flex items-center gap-1 hover:text-slate-300">
                <LogIn size={16} /> Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. MỤC LỰA CHỌN NGÔN NGỮ NẰM DƯỚI NAVBAR VÀ CĂN PHẢI */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-end">
        <div className="relative group">
          <button className="flex items-center gap-1 text-slate-600 text-[13px] hover:text-slate-900 transition-colors">
            <UserPlus size={14} className="text-slate-500 fill-slate-500" />{" "}
            {/* Icon người dùng nhỏ */}
            <span>
              {lang === "vi" ? "Tiếng Việt" : "English (United States)"}
            </span>
            <ChevronDown size={12} />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white text-slate-800 shadow-xl rounded-sm border border-slate-200 hidden group-hover:block z-50">
            <Link
              href="/en"
              className={`block px-4 py-2 text-sm hover:bg-slate-100 border-b border-slate-100 ${lang === "en" ? "font-bold text-blue-700" : ""}`}
            >
              English (United States)
            </Link>
            <Link
              href="/vi"
              className={`block px-4 py-2 text-sm hover:bg-slate-100 ${lang === "vi" ? "font-bold text-blue-700" : ""}`}
            >
              Tiếng Việt
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto my-4 bg-white shadow-sm border border-slate-200 rounded-sm">
        <div className="px-6 py-8">
          {/* Banner giới thiệu */}
          <section className="bg-white border border-slate-200 rounded-sm shadow-sm mb-8">
            <div className="bg-[#004a99] text-white px-4 py-2 font-bold text-lg">
              U.S. Embassy Online Auction
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 text-slate-700 text-sm leading-relaxed">
                <p className="mb-4">
                  The U.S. Embassies are selling surplus movable property (SMP)
                  via a Web Based Electronic Auction...
                </p>
                <p>
                  During this period you can actively take part and submit your
                  bid for the surplus property.
                </p>
              </div>
              <div className="w-64 h-40 bg-slate-100 rounded flex items-center justify-center overflow-hidden border">
                <Globe size={80} className="text-blue-200" />
              </div>
            </div>
          </section>

          {/* Tiêu đề danh sách */}
          <div className="mb-4">
            <h2 className="text-[#004a99] text-2xl font-light border-b border-blue-200 pb-2">
              All Auctions
            </h2>
            <div className="bg-[#d9edf7] text-[#31708f] p-3 text-sm mt-4 rounded-sm border border-[#bce8f1]">
              Here you can see all available auctions.
            </div>
          </div>

          {/* Lưới các thẻ Đấu giá */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auctions.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex justify-between items-start p-4">
                  <span className="bg-[#77b300] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                    <Gavel size={10} /> {item.status}
                  </span>
                  <div className="text-right">
                    <h3 className="text-[#003366] text-xl font-bold group-hover:underline">
                      {item.location}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">
                      SCHEDULED CLOSURE DATE: {item.date}
                    </p>
                    <p className="text-[9px] text-blue-500 font-bold tracking-tighter">
                      GMT+0700 (INDOCHINA TIME)
                    </p>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-blue-500" />
                </div>

                <div className="grid grid-cols-2 border-t border-slate-100 text-center divide-x divide-slate-100">
                  <div className="py-4">
                    <p className="text-2xl text-slate-700">{item.lots}</p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold flex items-center justify-center gap-1">
                      <Package size={12} /> Lots in auction
                    </p>
                  </div>
                  <div className="py-4">
                    <p className="text-2xl text-slate-700">
                      {item.time.split(" ")[0]}
                    </p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold flex items-center justify-center gap-1">
                      <Clock size={12} /> {item.time.split(" ")[1]} to Closure
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer / Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#2c3e50] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-slate-700 transition-colors">
        <span className="bg-white text-slate-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          ?
        </span>
        Help
      </button>
    </div>
  );
}
