"use client";
import React from "react";
import { Gavel, Clock, ChevronRight, Scale } from "lucide-react";

export default function DisputeList({ lang, onViewDetail }) {
  const disputes = [
    {
      id: "DS-9921",
      title: "Lô thiết bị văn phòng #04",
      amount: "500 BBD",
      status: "pending",
      role: "seller", // Bạn là người bán trong vụ này
      time: "2 giờ trước",
    },
  ];

  return (
    <div className="space-y-4">
      {disputes.map((item) => (
        <div
          key={item.id}
          className="border border-amber-100 bg-amber-50/30 p-4 rounded-sm flex justify-between items-center group"
        >
          <div className="flex gap-4 items-center">
            <div className="bg-amber-100 p-3 rounded-full text-amber-600">
              <Scale size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-800 text-sm uppercase">
                  {item.title}
                </h4>
                <span className="text-[9px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                  {lang === "vi" ? "Đang phân xử" : "Arbitrating"}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">
                {lang === "vi" ? "Số tiền đang khóa" : "Locked Amount"}:{" "}
                <span className="font-bold text-[#003366]">{item.amount}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => onViewDetail(item)}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:underline uppercase transition-all"
          >
            {lang === "vi" ? "Xem hồ sơ" : "View Case"}{" "}
            <ChevronRight size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
