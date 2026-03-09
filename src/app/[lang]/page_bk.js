import { getDictionary } from "@/lib/get-dictionary";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Hammer, Clock, TrendingUp } from "lucide-react";

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Hammer size={24} />
            <span>AuctionDApp</span>
          </div>
          <ConnectButton label={dict.nav.connect} />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Ảnh sản phẩm đấu giá */}
          <div className="relative group overflow-hidden rounded-3xl bg-slate-200 shadow-2xl">
            <div className="aspect-square flex items-center justify-center text-slate-400">
              {/* Placeholder cho NFT/Sản phẩm */}
              [Product Image Area]
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              Live Auction
            </div>
          </div>

          {/* Thông tin đấu giá */}
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Blockchain Genealogy Item #01
            </h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-sm mb-1 flex items-center gap-1">
                  <TrendingUp size={16} /> {dict.auction.highest_bid}
                </p>
                <p className="text-3xl font-black text-indigo-600">1.50 LYX</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-500 text-sm mb-1 flex items-center gap-1">
                  <Clock size={16} /> {dict.auction.ends_in}
                </p>
                <p className="text-xl font-bold">12:30:15</p>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                placeholder={dict.auction.placeholder}
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
                {dict.auction.place_bid}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
