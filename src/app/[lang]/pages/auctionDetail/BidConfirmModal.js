"use client";

import React from "react";
import { AlertTriangle, Loader2, CheckCircle2, X, ShieldCheck } from "lucide-react";

export default function BidConfirmModal({ 
  isOpen, onClose, onConfirm, isProcessing, isSuccess, bidValue, lang 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => !isProcessing && onClose()}></div>

      <div className="relative bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {!isProcessing && !isSuccess && (
          <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        )}

        {!isSuccess ? (
          <>
            <div className="p-6">
              <div className="flex items-center gap-3 text-amber-600 mb-4">
                <AlertTriangle size={24} />
                <h3 className="text-lg font-bold uppercase tracking-tight">Xác nhận đặt giá</h3>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-3 rounded-sm mb-6 flex items-start gap-3">
                <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Tiền của bạn sẽ được giữ bởi <strong>Bên trung gian (VIAC)</strong>. Người bán chỉ nhận được tiền sau khi bạn xác nhận đã nhận đúng hàng.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-5 rounded-sm mb-6 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Giá thầu của bạn</p>
                <p className="text-3xl font-black text-[#003366]">{bidValue}.00 <span className="text-sm italic font-normal text-slate-400">BBD</span></p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 flex gap-3">
              <button disabled={isProcessing} onClick={onClose} className="flex-1 px-4 py-3 border border-slate-300 text-slate-600 font-bold text-xs uppercase hover:bg-white rounded-sm">Hủy</button>
              <button disabled={isProcessing} onClick={onConfirm} className="flex-1 px-4 py-3 bg-[#004a99] text-white font-bold text-xs uppercase hover:bg-[#003366] rounded-sm flex items-center justify-center gap-2">
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : 'Xác nhận'}
              </button>
            </div>
          </>
        ) : (
          <div className="p-10 text-center animate-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Đặt giá thành công!</h3>
            <p className="text-slate-500 text-sm mt-2">Hệ thống đang cập nhật lượt trả giá của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
}