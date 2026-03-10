"use client";
import React from "react";
import { Gavel, AlertTriangle, Search, Filter } from "lucide-react";

export default function ViolationManagement({ lang, onViewDetail }) {
  const violations = [
    {
      id: "TX-882",
      item: "Màn hình Dell Ultrasharp",
      reason: "Hàng vỡ vỏ",
      date: "2026-03-09",
      severity: "High",
    },
    {
      id: "TX-885",
      item: "Lô máy tính cũ",
      reason: "Sai mô tả cấu hình",
      date: "2026-03-08",
      severity: "Medium",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search & Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-slate-50 p-4 rounded-sm border border-slate-200">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-2.5 text-slate-400"
            size={16}
          />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-sm text-xs outline-none focus:border-[#003366]"
            placeholder={
              lang === "vi" ? "Tìm mã giao dịch..." : "Search TXID..."
            }
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[10px] font-bold uppercase hover:bg-slate-100 transition-all">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Table List */}
      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#003366] text-white text-[10px] uppercase tracking-widest">
            <tr>
              <th className="p-4 font-black">
                {lang === "vi" ? "Mã GD" : "TXID"}
              </th>
              <th className="p-4 font-black">
                {lang === "vi" ? "Sản phẩm" : "Item"}
              </th>
              <th className="p-4 font-black">
                {lang === "vi" ? "Lý do vi phạm" : "Reason"}
              </th>
              <th className="p-4 font-black text-center">
                {lang === "vi" ? "Mức độ" : "Severity"}
              </th>
              <th className="p-4 font-black text-right">
                {lang === "vi" ? "Thao tác" : "Action"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {violations.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-[11px] font-mono font-bold text-blue-600">
                  {v.id}
                </td>
                <td className="p-4 text-xs font-bold text-slate-700">
                  {v.item}
                </td>
                <td className="p-4 text-xs text-slate-500 italic">
                  {v.reason}
                </td>
                <td className="p-4 text-center">
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-sm uppercase ${v.severity === "High" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}
                  >
                    {v.severity}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => onViewDetail(v)}
                    className="bg-slate-900 text-white px-3 py-1.5 rounded-sm text-[9px] font-bold uppercase hover:bg-blue-900 transition-all flex items-center gap-1 ml-auto"
                  >
                    <Gavel size={12} /> {lang === "vi" ? "Xử lý" : "Resolve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
