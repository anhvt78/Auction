"use client";

import React, { useState } from "react";
import {
  Camera,
  Package,
  Clock,
  Truck,
  ShieldCheck,
  Info,
  AlertCircle,
  Save,
  X,
  Plus,
} from "lucide-react";

export default function CreateAuctionForm({ lang, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    condition: "Used",
    description: "",
    specs: [{ key: "", value: "" }],
    startingPrice: "",
    bidStep: "",
    startTime: "",
    endTime: "",
    dispatchTime: "48 giờ",
    deliveryTime: "3 - 5 ngày",
    mediator: "VIAC",
  });

  const handleAddSpec = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, { key: "", value: "" }],
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header Form */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-[#003366] font-bold uppercase tracking-tight flex items-center gap-2">
          <Plus size={18} />{" "}
          {lang === "vi"
            ? "Khởi tạo lô hàng đấu giá"
            : "Create New Auction Lot"}
        </h2>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* PHẦN 1: HÌNH ẢNH HÀNG HÓA */}
        <section>
          <label className="text-[11px] font-bold text-slate-500 uppercase mb-3 block">
            Hình ảnh sản phẩm (Tối đa 5 ảnh)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="aspect-square border-2 border-dashed border-slate-200 rounded-sm flex flex-col items-center justify-center text-slate-400 hover:border-[#3498db] hover:text-[#3498db] cursor-pointer transition-all">
              <Camera size={24} />
              <span className="text-[10px] mt-2 font-bold uppercase">
                Tải ảnh lên
              </span>
            </div>
            {/* Placeholder cho ảnh đã tải */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square bg-slate-50 border border-slate-100 rounded-sm relative group"
              >
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-[10px]">
                  Preview {i}
                </div>
                <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CỘT TRÁI: THÔNG TIN CƠ BẢN */}
          <div className="space-y-6">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block tracking-wider">
                Tên lô hàng / Sản phẩm
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Lô 10 màn hình Dell Ultrasharp..."
                className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">
                  Tình trạng
                </label>
                <select className="w-full border border-slate-200 p-3 rounded-sm text-sm outline-none focus:border-[#3498db]">
                  <option value="New">Mới (New)</option>
                  <option value="Used">Đã sử dụng (Used)</option>
                  <option value="Salvage">Thanh lý/Lấy linh kiện</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">
                  Giá khởi điểm (BBD)
                </label>
                <input
                  type="number"
                  placeholder="100"
                  className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">
                Mô tả chi tiết
              </label>
              <textarea
                rows="4"
                placeholder="Mô tả rõ tình trạng sản phẩm, các lỗi nếu có..."
                className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm italic"
              />
            </div>

            {/* Thông số kỹ thuật (Dynamic Fields) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Thông số kỹ thuật
                </label>
                <button
                  onClick={handleAddSpec}
                  className="text-[#3498db] text-[10px] font-bold uppercase hover:underline"
                >
                  + Thêm dòng
                </button>
              </div>
              <div className="space-y-2">
                {formData.specs.map((spec, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Tên (VD: RAM)"
                      className="flex-1 border border-slate-100 p-2 text-[12px] rounded-sm outline-none focus:border-blue-300"
                    />
                    <input
                      type="text"
                      placeholder="Giá trị (VD: 16GB)"
                      className="flex-1 border border-slate-100 p-2 text-[12px] rounded-sm outline-none focus:border-blue-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: THỜI GIAN, GIAO HÀNG & TRUNG GIAN */}
          <div className="space-y-6">
            {/* Thời gian */}
            <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
              <h3 className="text-[11px] font-bold text-[#003366] uppercase mb-4 flex items-center gap-2">
                <Clock size={14} /> Thời gian phiên đấu giá
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                    Bắt đầu
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                    Kết thúc dự kiến
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Giao hàng */}
            <div className="bg-blue-50/50 p-4 rounded-sm border border-blue-100">
              <h3 className="text-[11px] font-bold text-blue-700 uppercase mb-4 flex items-center gap-2">
                <Truck size={14} /> Chính sách giao hàng
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                    Thời gian chuẩn bị (Sau thanh toán)
                  </label>
                  <select className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none">
                    <option>24 giờ</option>
                    <option>48 giờ</option>
                    <option>72 giờ</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                    Thời gian vận chuyển dự kiến
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 3 - 5 ngày làm việc"
                    className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Trung gian giải quyết tranh chấp */}
            <div className="bg-green-50/50 p-4 rounded-sm border border-green-100">
              <h3 className="text-[11px] font-bold text-green-700 uppercase mb-4 flex items-center gap-2">
                <ShieldCheck size={14} /> Bảo mật & Trung gian
              </h3>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                  Đơn vị trọng tài
                </label>
                <select className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none font-bold text-slate-700">
                  <option value="VIAC">VIAC - Trọng tài Quốc tế</option>
                  <option value="ESCROW_ADG">adgCloud Escrow Service</option>
                </select>
                <div className="mt-3 flex gap-2 items-start bg-white p-2 border border-green-100 rounded-sm">
                  <Info size={14} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-green-700 leading-relaxed italic">
                    Tiền của người mua sẽ được đơn vị này giữ ký quỹ (Escrow) để
                    đảm bảo quyền lợi cho cả hai bên.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-200">
        <button
          onClick={onCancel}
          className="px-6 py-2 text-xs font-bold text-slate-500 uppercase hover:bg-slate-100 transition-all rounded-sm"
        >
          Hủy bỏ
        </button>
        <button className="bg-[#003366] text-white px-8 py-2 text-xs font-bold uppercase flex items-center gap-2 rounded-sm shadow-lg hover:bg-[#002855] transition-all">
          <Save size={16} /> Lưu & Công khai
        </button>
      </div>
    </div>
  );
}
