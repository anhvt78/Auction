"use client";

import React from "react";
import { 
  AlertTriangle, 
  Clock, 
  History, 
  TrendingUp, 
  Wallet,
  ArrowUpRight
} from "lucide-react";

export default function Overview({ lang, setActiveTab, setViewMode, setSelectedItem }) {
  // Dữ liệu giả lập cho biểu đồ số dư ký quỹ 7 ngày gần nhất
  const balanceHistory = [
    { day: "04/03", amount: 300 },
    { day: "05/03", amount: 350 },
    { day: "06/03", amount: 450 },
    { day: "07/03", amount: 400 },
    { day: "08/03", amount: 420 },
    { day: "09/03", amount: 480 },
    { day: "10/03", amount: 450 },
  ];

  const maxAmount = Math.max(...balanceHistory.map(d => d.amount));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. KHU VỰC CẢNH BÁO NHANH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-100 p-4 rounded-sm flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 text-white p-2 rounded-full animate-pulse">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black text-red-700 uppercase tracking-tighter">Bị vượt mức giá</p>
              <p className="text-[10px] text-red-600 italic">Màn hình Dell Ultrasharp...</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setActiveTab("history");
              setViewMode("bid-detail");
              setSelectedItem({ 
                id: "4",
                title: "Màn hình Dell Ultrasharp", 
                startingPrice: 100, 
                myLastBid: 180, 
                currentPrice: 210,
                history: [{amount: 180, time: "10:00"}, {amount: 150, time: "09:00"}]
              });
            }}
            className="text-[9px] bg-red-600 text-white px-3 py-1.5 font-bold uppercase hover:bg-red-700 transition-colors"
          >
            {lang === 'vi' ? 'Nâng giá ngay' : 'Bid Now'}
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-sm flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black text-blue-700 uppercase tracking-tighter">Sắp kết thúc</p>
              <p className="text-[10px] text-blue-600 italic">Lô thiết bị văn phòng #04 còn 45 phút</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab("my-auctions")}
            className="text-[9px] bg-blue-600 text-white px-3 py-1.5 font-bold uppercase hover:bg-blue-700 transition-colors"
          >
            {lang === 'vi' ? 'Kiểm tra' : 'Check'}
          </button>
        </div>
      </div>

      {/* 2. BIỂU ĐỒ BIẾN ĐỘNG SỐ DƯ (MINI CHART) */}
      <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
            <Wallet size={16} className="text-[#003366]" /> {lang === 'vi' ? 'Biến động số dư ký quỹ (7 ngày)' : 'Escrow Balance Trend'}
          </h3>
          <span className="text-xl font-black text-[#003366]">450 BBD</span>
        </div>
        
        <div className="flex items-end justify-between h-32 gap-2 px-2">
          {balanceHistory.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-slate-100 group-hover:bg-blue-500 transition-all rounded-t-sm relative"
                style={{ height: `${(data.amount / maxAmount) * 100}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.amount}
                </span>
              </div>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. NHẬT KÝ HOẠT ĐỘNG GẦN ĐÂY */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
          <History size={16} className="text-slate-400" /> {lang === 'vi' ? 'Nhật ký hệ thống' : 'System Logs'}
        </h3>
        <div className="border border-slate-100 rounded-sm divide-y divide-slate-50 bg-white">
          {[
            { time: "14:20", action: "Bạn đã đặt giá", target: "Màn hình Dell Ultrasharp", amount: "+20 BBD" },
            { time: "13:05", action: "Có người trả giá mới cho", target: "Lô thiết bị văn phòng #04", amount: "500 BBD" },
            { time: "09/03", action: "Nạp tiền ký quỹ thành công", target: "Ví adgCloud", amount: "+100 BBD" },
          ].map((log, idx) => (
            <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
              <div className="flex gap-4 items-center">
                <span className="text-[10px] font-bold text-slate-300 font-mono w-10">{log.time}</span>
                <span className="text-xs text-slate-600 italic">
                  <span className="font-bold text-slate-800 not-italic">{log.action}</span>: {log.target}
                </span>
              </div>
              <span className="text-[10px] font-black text-[#003366] bg-slate-100 px-2 py-1 rounded-sm">{log.amount}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}