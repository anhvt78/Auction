"use client";
import React, { useState, useEffect } from "react";
import { X, Save, LayoutGrid, BadgeDollarSign, Info, Edit3 } from "lucide-react";

export default function EditProfileModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState(initialData);

  // Đồng bộ dữ liệu khi mở modal
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-sm font-black uppercase text-slate-800 flex items-center gap-2">
            <Edit3 size={16} className="text-blue-600" />
            Cập nhật hồ sơ & Biểu phí
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Section 1: Thông tin hiển thị */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <LayoutGrid size={16} />
              <span className="text-[10px] font-black uppercase tracking-wider">Thông tin hiển thị</span>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Slogan</label>
              <input
                type="text"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-sm text-sm focus:ring-1 focus:ring-blue-500 outline-none italic"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tech Stack (Chuyên môn)</label>
              <input
                type="text"
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-sm text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2: Biểu phí & Hoa hồng */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <BadgeDollarSign size={16} />
              <span className="text-[10px] font-black uppercase tracking-wider">Cài đặt tài chính</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Phí (LYX)</label>
                <input
                  type="text"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-sm text-sm font-black text-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hoa hồng (%)</label>
                <input
                  type="text"
                  name="commission"
                  value={formData.commission}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-sm text-sm font-black text-blue-600 outline-none"
                />
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-sm border border-blue-100 flex gap-3">
              <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-700 leading-relaxed">
                Thông tin này sẽ được cập nhật lên hệ thống. Hãy đảm bảo các con số là chính xác trước khi lưu.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-[10px] font-black uppercase text-slate-500">Hủy</button>
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase rounded-sm hover:bg-blue-700 shadow-md"
          >
            <Save size={14} /> Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}