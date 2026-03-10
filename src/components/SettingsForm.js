"use client";

import React, { useState } from "react";
import {
  User,
  Bell,
  Wallet,
  Save,
  MapPin,
  Edit3,
  CheckCircle2,
  XCircle,
  Mail,
  Smartphone,
} from "lucide-react";

export default function SettingsDetail({ lang }) {
  // State quản lý riêng cho việc chỉnh sửa địa chỉ
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [address, setAddress] = useState(
    "TDP Xuân Lộc 4, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội",
  );
  const [tempAddress, setTempAddress] = useState(address);

  const handleSaveAddress = () => {
    setAddress(tempAddress);
    setIsEditingAddress(false);
  };

  const handleCancelAddress = () => {
    setTempAddress(address);
    setIsEditingAddress(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* 1. HỒ SƠ CÁ NHÂN */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 tracking-widest">
          <User size={16} />{" "}
          {lang === "vi" ? "Thông tin hồ sơ" : "Profile Information"}
        </h3>
        <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              Họ và Tên
            </label>
            <input
              type="text"
              defaultValue="Vu Tuan Anh"
              className="w-full p-2.5 border border-slate-200 rounded-sm text-sm focus:border-[#003366] outline-none transition-all bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">
              Email liên hệ
            </label>
            <input
              type="email"
              placeholder="example@domain.com"
              className="w-full p-2.5 border border-slate-200 rounded-sm text-sm focus:border-[#003366] outline-none transition-all bg-white"
            />
          </div>
        </div>
      </section>

      {/* 2. ĐỊA CHỈ GIAO NHẬN (Cập nhật riêng) */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 tracking-widest">
            <MapPin size={16} />{" "}
            {lang === "vi" ? "Địa chỉ giao nhận" : "Shipping Address"}
          </h3>
          {!isEditingAddress && (
            <button
              onClick={() => setIsEditingAddress(true)}
              className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline uppercase"
            >
              <Edit3 size={12} /> {lang === "vi" ? "Thay đổi" : "Change"}
            </button>
          )}
        </div>

        <div className="bg-slate-50 p-6 rounded-sm border border-slate-200">
          {isEditingAddress ? (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              <textarea
                rows="3"
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                className="w-full p-3 border-2 border-blue-200 rounded-sm text-sm focus:border-[#003366] outline-none transition-all bg-white shadow-inner resize-none"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancelAddress}
                  className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold text-slate-500 hover:bg-slate-200 rounded-sm uppercase transition-colors"
                >
                  <XCircle size={14} /> {lang === "vi" ? "Hủy" : "Cancel"}
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold bg-[#003366] text-white rounded-sm uppercase shadow-sm hover:bg-blue-900 transition-colors"
                >
                  <CheckCircle2 size={14} />{" "}
                  {lang === "vi" ? "Xác nhận" : "Confirm"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-full border border-slate-100 shadow-sm">
                <MapPin size={16} className="text-slate-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {address}
                </p>
                <p className="text-[10px] text-slate-400 italic font-medium uppercase tracking-tighter">
                  {lang === "vi"
                    ? "Địa chỉ mặc định cho các đơn hàng thắng thầu"
                    : "Default shipping address for won bids"}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. THIẾT LẬP BLOCKCHAIN */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 tracking-widest">
          <Wallet size={16} />{" "}
          {lang === "vi" ? "Blockchain & Ví" : "Web3 Settings"}
        </h3>
        <div className="bg-white border border-slate-200 rounded-sm divide-y divide-slate-100 shadow-sm">
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-tighter">
                Địa chỉ ví hiện tại
              </p>
              <p className="text-[11px] font-mono text-blue-600">
                0xB997a568...fafc2b1
              </p>
            </div>
            <span className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-1 rounded-sm uppercase">
              Đã kết nối
            </span>
          </div>
        </div>
      </section>

      {/* 4. CẤU HÌNH THÔNG BÁO (Đã khôi phục và cập nhật đầy đủ) */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 tracking-widest">
          <Bell size={16} />{" "}
          {lang === "vi" ? "Lựa chọn thông báo" : "Notification Preferences"}
        </h3>
        <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-slate-700 font-bold">
                {lang === "vi"
                  ? "Thông báo khi bị vượt giá"
                  : "Outbid Notifications"}
              </p>
              <p className="text-[10px] text-slate-400 italic uppercase font-medium tracking-tight">
                Nhận cảnh báo ngay lập tức khi giá thầu của bạn không còn dẫn
                đầu
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-[#003366] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="space-y-1">
              <p className="text-sm text-slate-700 font-bold">
                {lang === "vi"
                  ? "Cảnh báo phiên đấu sắp đóng"
                  : "Auction Ending Soon"}
              </p>
              <p className="text-[10px] text-slate-400 italic uppercase font-medium tracking-tight">
                Thông báo trước 60 phút khi phiên đấu giá bạn tham gia sắp kết
                thúc
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 accent-[#003366] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="space-y-1">
              <p className="text-sm text-slate-700 font-bold">
                {lang === "vi"
                  ? "Bản tin cập nhật thị trường"
                  : "Weekly Market Newsletter"}
              </p>
              <p className="text-[10px] text-slate-400 italic uppercase font-medium tracking-tight">
                Tóm tắt các phiên đấu giá nổi bật hàng tuần qua Email
              </p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#003366] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* NÚT LƯU TỔNG THỂ */}
      <div className="pt-6 border-t border-slate-200 flex justify-end">
        <button className="bg-[#003366] text-white px-10 py-3.5 rounded-sm font-black uppercase text-xs flex items-center gap-2 shadow-lg hover:bg-blue-900 transition-all active:scale-95">
          <Save size={18} />{" "}
          {lang === "vi" ? "Lưu tất cả thay đổi" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
