"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getDictionary } from "@/lib/get-dictionary";
import BidConfirmModal from "./BidConfirmModal";
import {
  ChevronLeft,
  Gavel,
  Home,
  Info,
  Clock,
  AlertCircle,
  History,
  User,
  Package,
  List,
  Camera,
  ShieldCheck,
  Truck,
  ShieldAlert,
} from "lucide-react";

export default function AuctionDetailPage({ params }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { lang } = React.use(params);
  const [dict, setDict] = useState(null);

  const [auctionData] = useState({
    title: "CPU'S & MONITORS - LÔ THIẾT BỊ VĂN PHÒNG #04",
    condition: "Used",
    lotNumber: "LOT-2026-004",
    quantity: "15 Units",
    startingPrice: 100,
    bidStep: 10,
    currentPrice: 150,
    startTime: "2026-03-01 08:00",
    endTime: "2026-03-15 18:00",
    description:
      "Lô hàng bao gồm 10 màn hình Dell 24 inch và 5 thùng máy CPU HP. Đã được kiểm tra ngoại quan.",
    // --- THÔNG TIN BỔ SUNG MỚI ---
    shippingInfo: {
      dispatchTime: "48 giờ", // Thời gian chuẩn bị hàng sau khi thanh toán
      deliveryTime: "3 - 5 ngày làm việc", // Thời gian vận chuyển dự kiến
      carrier: "Giao Hàng Nhanh (GHN)",
    },
    mediator: {
      name: "Trung tâm Trọng tài Quốc tế (VIAC)",
      type: "Bên trung gian độc lập",
      description:
        "Đảm bảo giữ tiền ký quỹ và giải quyết tranh chấp về tình trạng hàng hóa.",
    },
    // ----------------------------
    specs: [
      { key: "Thương hiệu", value: "Dell / HP" },
      { key: "Năm sản xuất", value: "2021" },
      { key: "Cân nặng", value: "85 kg" },
    ],
    history: [
      { id: 1, user: "0x71...a2", amount: 150, time: "2 giờ trước" },
      { id: 2, user: "0x12...f4", amount: 140, time: "5 giờ trước" },
    ],
  });

  const [activeImg, setActiveImg] = useState(0);
  const images = ["/api/placeholder/800/600", "/api/placeholder/801/601"];

  const [bidValue, setBidValue] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const minValidBid = auctionData.currentPrice + auctionData.bidStep;

  useEffect(() => {
    getDictionary(lang).then(setDict);
  }, [lang]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBidValue(value);
    if (value !== "" && parseFloat(value) < minValidBid) {
      setError(
        lang === "vi"
          ? `Tối thiểu ${minValidBid} BBD`
          : `Min ${minValidBid} BBD`,
      );
    } else {
      setError("");
    }
  };

  const handleConfirmBid = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSuccess(false);
    }, 2000);
  };

  if (!dict) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9] font-sans">
      <nav className="sticky top-0 z-50 bg-[#003366] text-white shadow-md h-14 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-semibold">
            <Gavel size={18} /> <span>{dict.nav?.title}</span>
          </div>
          <Link
            href={`/${lang}`}
            className="hover:text-slate-300 transition-colors flex items-center gap-1 text-sm"
          >
            <Home size={16} /> {dict.nav?.home}
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="mx-auto my-6 max-w-6xl px-4">
          <Link
            href={`/${lang}`}
            className="mb-6 inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-1 text-[12px] font-bold text-slate-600 hover:bg-slate-50 uppercase rounded-sm shadow-sm"
          >
            <ChevronLeft size={14} /> {lang === "vi" ? "Quay lại" : "Back"}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* CỘT TRÁI (7/12): Ảnh, Mô tả, Vận chuyển, Trung gian */}
            <div className="lg:col-span-7 space-y-6">
              {/* Thư viện ảnh */}
              <div className="bg-white p-2 rounded-sm border border-slate-200 shadow-sm">
                <div className="aspect-video bg-slate-100 rounded-sm overflow-hidden flex items-center justify-center">
                  <img
                    src={images[activeImg]}
                    alt="Product"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`w-20 h-16 border-2 rounded-sm overflow-hidden ${activeImg === idx ? "border-[#3498db]" : "border-transparent opacity-60"}`}
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* KHỐI THÔNG TIN VẬN CHUYỂN & TRUNG GIAN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vận chuyển */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 text-[#003366]">
                    <Truck size={16} />
                    <h3 className="text-[11px] font-bold uppercase tracking-wider">
                      Thông tin giao hàng
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Xuất kho sau:</span>
                      <span className="font-bold text-slate-700">
                        {auctionData.shippingInfo.dispatchTime}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Thời gian vận chuyển:
                      </span>
                      <span className="font-bold text-slate-700 text-right">
                        {auctionData.shippingInfo.deliveryTime}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic mt-2">
                      * Sau khi người mua hoàn tất thủ tục thanh toán và ký quỹ.
                    </p>
                  </div>
                </div>

                {/* Trung gian giải quyết tranh chấp */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 text-green-700">
                    <ShieldCheck size={16} />
                    <h3 className="text-[11px] font-bold uppercase tracking-wider">
                      Bên trung gian bảo mật
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-slate-800 mb-1">
                      {auctionData.mediator.name}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {auctionData.mediator.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase">
                      <ShieldAlert size={12} /> Hỗ trợ tranh chấp 24/7
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết sản phẩm */}
              <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-6">
                <h3 className="text-sm font-bold uppercase mb-4 flex items-center gap-2">
                  <Package size={16} className="text-slate-400" /> Mô tả chi
                  tiết
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {auctionData.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                  {auctionData.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-b border-slate-50 py-2 text-sm"
                    >
                      <span className="text-slate-400">{spec.key}</span>
                      <span className="font-medium text-slate-700">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CỘT PHẢI (5/12): Đấu giá */}
            <div className="lg:col-span-5 space-y-6 sticky top-20">
              <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-6">
                <h1 className="text-xl font-bold text-[#003366] uppercase mb-4">
                  {auctionData.title}
                </h1>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-sm">
                    <p className="text-[9px] uppercase font-bold text-red-400 mb-1 flex items-center gap-1">
                      <Clock size={12} /> Kết thúc sau
                    </p>
                    <p className="text-sm font-black text-red-600 animate-pulse uppercase">
                      05 Ngày : 12:44
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm">
                    <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">
                      Mã lô hàng
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {auctionData.lotNumber}
                    </p>
                  </div>
                </div>

                <div className="bg-[#003366] text-white p-5 rounded-sm mb-6 flex justify-between items-center shadow-inner">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-300 mb-1">
                      Giá hiện tại
                    </p>
                    <p className="text-4xl font-black">
                      {auctionData.currentPrice}{" "}
                      <span className="text-sm font-normal opacity-70">
                        BBD
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-300 mb-1">
                      Bước giá
                    </p>
                    <p className="text-lg font-bold">+{auctionData.bidStep}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="number"
                    value={bidValue}
                    onChange={handleInputChange}
                    placeholder={`Tối thiểu ${minValidBid}...`}
                    className={`w-full p-4 text-2xl font-bold outline-none border-2 transition-all ${error ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#3498db]"}`}
                  />
                  {error && (
                    <p className="text-red-600 text-[10px] font-bold flex items-center gap-1 uppercase tracking-tighter">
                      <AlertCircle size={12} /> {error}
                    </p>
                  )}

                  <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={!!error || !bidValue}
                    className="w-full bg-[#3498db] hover:bg-blue-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                  >
                    {lang === "vi" ? "Gửi giá thầu" : "Submit Bid"}
                  </button>
                </div>
              </div>

              {/* Lịch sử trả giá rút gọn */}
              <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                  <History size={14} className="text-slate-400" />
                  <h3 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    Lịch sử trả giá
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {auctionData.history.map((bid) => (
                    <div
                      key={bid.id}
                      className="px-4 py-3 flex justify-between items-center text-xs transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-slate-300" />
                        <span className="font-mono text-slate-500">
                          {bid.user}
                        </span>
                      </div>
                      <span className="font-bold text-[#003366]">
                        {bid.amount} BBD
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
          Online Auction System © 2026
        </p>
      </footer>

      <BidConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBid}
        isProcessing={isProcessing}
        isSuccess={isSuccess}
        bidValue={bidValue}
        lang={lang}
      />
    </div>
  );
}
