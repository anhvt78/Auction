"use client";
import React from "react";
import { Star, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";

export default function ArbitratorList({ lang, onViewDetail }) {
  const arbitrators = [
    { id: 1, name: "Gia Phả Việt - Legal Unit", resolved: 124, rating: 4.9, status: "Active" },
    { id: 2, name: "Blockchain Mediator Group", resolved: 89, rating: 4.7, status: "Active" },
    { id: 3, name: "Nguyen Family Council", resolved: 45, rating: 5.0, status: "Busy" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {arbitrators.map((arb) => (
          <div
            key={arb.id}
            onClick={() => onViewDetail(arb)}
            className="bg-white border border-slate-200 p-5 rounded-sm hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>
              <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${arb.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                {arb.status}
              </span>
            </div>

            <h4 className="font-bold text-slate-800 uppercase text-sm mb-1 group-hover:text-blue-600 transition-colors">
              {arb.name}
            </h4>
            
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 uppercase font-black">{lang === "vi" ? "Đã xử lý" : "Resolved"}</span>
                <span className="text-sm font-black text-slate-800">{arb.resolved}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 uppercase font-black">{lang === "vi" ? "Đánh giá" : "Rating"}</span>
                <span className="text-sm font-black text-amber-500 flex items-center gap-1">
                  {arb.rating} <Star size={12} fill="currentColor" />
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-[10px] font-black text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              {lang === "vi" ? "Xem hồ sơ" : "View Profile"} <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}