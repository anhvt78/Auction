"use client";
import React, { useState } from "react";
import { ShieldCheck, FileText, Send, AlertCircle } from "lucide-react";

export default function ArbitratorRegistration({ lang }) {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
      <div className="bg-[#003366] p-6 text-white">
        <h2 className="text-xl font-light uppercase tracking-widest flex items-center gap-3">
          <ShieldCheck size={24} className="text-blue-300" />
          {lang === "vi"
            ? "Đăng ký Đơn vị Trọng tài"
            : "Arbitrator Registration"}
        </h2>
        <p className="text-[10px] text-blue-200 mt-2 uppercase tracking-tighter">
          {lang === "vi"
            ? "Hệ thống xác thực danh tính và chuyên môn dựa trên Blockchain"
            : "Blockchain-based identity and expertise verification"}
        </p>
      </div>

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Tên đơn vị */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === "vi"
                ? "Tên tổ chức/Cá nhân"
                : "Organization/Individual Name"}
            </label>
            <input
              type="text"
              className="w-full p-3 border border-slate-200 rounded-sm focus:border-[#003366] outline-none text-sm transition-all"
              placeholder="e.g. Vietnam Arbitration Center"
            />
          </div>

          {/* Hồ sơ năng lực */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === "vi"
                ? "Hồ sơ năng lực (Link PDF/Docs)"
                : "Portfolio/Credentials Link"}
            </label>
            <div className="relative">
              <FileText
                className="absolute left-3 top-3 text-slate-300"
                size={18}
              />
              <input
                type="text"
                className="w-full p-3 pl-10 border border-slate-200 rounded-sm focus:border-[#003366] outline-none text-sm transition-all"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Địa chỉ ví */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {lang === "vi"
                ? "Địa chỉ ví thực hiện phân xử"
                : "Arbitration Wallet Address"}
            </label>
            <input
              type="text"
              readOnly
              value="0xB997...fafc2b1"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-sm text-xs font-mono text-blue-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-sm border-l-4 border-amber-400 flex gap-3">
          <AlertCircle className="text-amber-600 shrink-0" size={20} />
          <p className="text-[11px] text-amber-800 leading-relaxed">
            {lang === "vi"
              ? "Việc đăng ký yêu cầu ký số bằng ví cá nhân. Hồ sơ của bạn sẽ được Ban quản trị hệ thống phê duyệt trước khi có quyền phân xử các giao dịch vi phạm."
              : "Registration requires digital signing with your wallet. Your profile will be reviewed by the System Admin before gaining arbitration rights."}
          </p>
        </div>

        <button className="w-full bg-[#77b300] hover:bg-[#669900] text-white py-4 rounded-sm font-black uppercase text-xs tracking-[0.2em] shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
          <Send size={18} />{" "}
          {lang === "vi" ? "Gửi hồ sơ đăng ký" : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
