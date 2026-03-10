"use client";
import React from "react";
import { Star, ShieldCheck, ExternalLink, Activity } from "lucide-react";

export default function ArbitratorList({ lang }) {
  const arbitrators = [
    {
      id: 1,
      name: "Gia Phả Việt - Legal Unit",
      resolved: 124,
      rating: 4.9,
      status: "Active",
    },
    {
      id: 2,
      name: "Blockchain Mediator Group",
      resolved: 89,
      rating: 4.7,
      status: "Active",
    },
    {
      id: 3,
      name: "Nguyen Family Council",
      resolved: 45,
      rating: 5.0,
      status: "Busy",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#003366] uppercase tracking-tight">
            {lang === "vi" ? "Đội ngũ Trọng tài" : "Arbitrator Pool"}
          </h3>
          <p className="text-[10px] text-slate-400 uppercase font-medium">
            {lang === "vi"
              ? "Các đơn vị đã được xác thực trên mạng lưới"
              : "Verified entities on the network"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {arbitrators.map((arb) => (
          <div
            key={arb.id}
            className="bg-white border border-slate-200 p-5 rounded-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 text-[#003366] rounded-sm">
                <ShieldCheck size={24} />
              </div>
              <span
                className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${arb.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
              >
                {arb.status}
              </span>
            </div>

            <h4 className="font-bold text-slate-800 uppercase text-sm mb-1">
              {arb.name}
            </h4>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 uppercase font-bold">
                  {lang === "vi" ? "Đã xử lý" : "Resolved"}
                </span>
                <span className="text-sm font-black text-[#003366]">
                  {arb.resolved}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 uppercase font-bold">
                  {lang === "vi" ? "Đánh giá" : "Rating"}
                </span>
                <span className="text-sm font-black text-amber-500 flex items-center gap-1">
                  {arb.rating} <Star size={12} fill="currentColor" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
