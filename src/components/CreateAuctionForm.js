"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCreateAuction } from "@/hooks/useAuctions";
import { useArbitratorList, useArbitrator } from "@/hooks/useAuctions";
import { shortAddr, formatLYX, AUCTION_HOUSE_ADDRESS } from "@/lib/contracts";
import {
  Camera, Package, Clock, Truck, ShieldCheck,
  Info, AlertCircle, Save, X, Plus, Loader2, CheckCircle2,
} from "lucide-react";

export default function CreateAuctionForm({ lang, onCancel }) {
  const { address: wallet } = useAccount();
  const { createAuction, isPending, isConfirming, isSuccess, error } = useCreateAuction();
  const { addresses: arbitratorAddrs } = useArbitratorList();

  const [form, setForm] = useState({
    title:        "",
    description:  "",
    ipfsHash:     "",
    startPriceLYX: "0.1",
    bidStepLYX:    "0.01",
    startTime:    "",
    endTime:      "",
    arbitrator:   "0x0000000000000000000000000000000000000000",
    specs:        [{ key: "", value: "" }],
  });
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const vi = lang === "vi";

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const addSpec = () => set("specs", [...form.specs, { key: "", value: "" }]);
  const updateSpec = (i, field, val) => {
    const next = [...form.specs];
    next[i] = { ...next[i], [field]: val };
    set("specs", next);
  };
  const removeSpec = (i) => set("specs", form.specs.filter((_, idx) => idx !== i));

  const validate = () => {
    if (!form.title.trim())       return vi ? "Nhập tên lô hàng" : "Enter auction title";
    if (!form.startPriceLYX || parseFloat(form.startPriceLYX) <= 0)
      return vi ? "Giá khởi điểm phải > 0 LYX" : "Start price must be > 0 LYX";
    if (!form.bidStepLYX || parseFloat(form.bidStepLYX) <= 0)
      return vi ? "Bước giá phải > 0 LYX" : "Bid step must be > 0 LYX";
    if (!form.startTime) return vi ? "Chọn thời gian bắt đầu" : "Set start time";
    if (!form.endTime)   return vi ? "Chọn thời gian kết thúc" : "Set end time";
    if (new Date(form.endTime) <= new Date(form.startTime))
      return vi ? "Thời gian kết thúc phải sau bắt đầu" : "End must be after start";
    if (new Date(form.endTime) <= new Date())
      return vi ? "Thời gian kết thúc phải trong tương lai" : "End time must be in the future";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setFormError(err); return; }
    setFormError("");
    try {
      await createAuction({
        title:        form.title,
        description:  form.description,
        ipfsHash:     form.ipfsHash,
        startPriceLYX: form.startPriceLYX,
        bidStepLYX:   form.bidStepLYX,
        startTime:    form.startTime,
        endTime:      form.endTime,
        arbitrator:   form.arbitrator !== "0x0000000000000000000000000000000000000000"
                        ? form.arbitrator : undefined,
      });
      setSubmitted(true);
    } catch (e) {
      setFormError(e?.shortMessage || e?.message || "Transaction failed");
    }
  };

  if (isSuccess || submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-sm shadow-md p-12 text-center animate-in fade-in">
        <CheckCircle2 size={48} className="mx-auto mb-4 text-green-500" />
        <h2 className="text-lg font-bold text-slate-800 mb-2">
          {vi ? "Tạo phiên đấu giá thành công!" : "Auction created successfully!"}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {vi ? "Giao dịch đã được xác nhận trên LUKSO." : "Transaction confirmed on LUKSO."}
        </p>
        <button onClick={onCancel} className="bg-[#003366] text-white px-6 py-2 text-sm font-bold rounded-sm">
          {vi ? "Đóng" : "Close"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-sm shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-[#003366] font-bold uppercase tracking-tight flex items-center gap-2">
          <Plus size={18} />
          {vi ? "Khởi tạo lô hàng đấu giá" : "Create New Auction Lot"}
        </h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <X size={20} />
        </button>
      </div>

      {/* No wallet warning */}
      {!wallet && (
        <div className="px-6 pt-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm flex items-center gap-3">
            <AlertCircle size={16} className="text-amber-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-800">
                {vi ? "Bạn cần kết nối ví để tạo đấu giá" : "Connect your wallet to create an auction"}
              </p>
            </div>
            <ConnectButton label={vi ? "Kết nối ví" : "Connect"} showBalance={false} />
          </div>
        </div>
      )}

      <div className="p-6 space-y-8">

        {/* Image upload placeholder */}
        <section>
          <label className="text-[11px] font-bold text-slate-500 uppercase mb-3 block">
            {vi ? "Hình ảnh sản phẩm (URL hoặc IPFS CID)" : "Product image (URL or IPFS CID)"}
          </label>
          <input
            type="text"
            value={form.ipfsHash}
            onChange={(e) => set("ipfsHash", e.target.value)}
            placeholder="https://... hoặc ipfs://Qm..."
            className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm"
          />
          <p className="text-[10px] text-slate-400 mt-1 italic">
            {vi
              ? "Có thể upload ảnh lên IPFS (pinata.cloud) rồi dán CID vào đây."
              : "You can upload to IPFS (pinata.cloud) then paste the CID here."}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left: basic info */}
          <div className="space-y-6">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block tracking-wider">
                {vi ? "Tên lô hàng / Sản phẩm *" : "Auction title *"}
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder={vi ? "Ví dụ: Lô 10 màn hình Dell Ultrasharp..." : "e.g. Lot of 10 Dell Ultrasharp monitors..."}
                className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">
                  {vi ? "Giá khởi điểm (LYX) *" : "Start price (LYX) *"}
                </label>
                <input
                  type="number"
                  min="0.0001"
                  step="0.0001"
                  value={form.startPriceLYX}
                  onChange={(e) => set("startPriceLYX", e.target.value)}
                  className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">
                  {vi ? "Bước giá (LYX) *" : "Bid step (LYX) *"}
                </label>
                <input
                  type="number"
                  min="0.0001"
                  step="0.0001"
                  value={form.bidStepLYX}
                  onChange={(e) => set("bidStepLYX", e.target.value)}
                  className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 block">
                {vi ? "Mô tả chi tiết" : "Description"}
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder={vi ? "Mô tả tình trạng sản phẩm, lỗi nếu có..." : "Describe the item condition, any defects..."}
                className="w-full border border-slate-200 p-3 rounded-sm focus:border-[#3498db] outline-none text-sm"
              />
            </div>

            {/* Specs (off-chain display only, stored in description) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {vi ? "Thông số kỹ thuật" : "Specifications"}
                </label>
                <button onClick={addSpec} className="text-[#3498db] text-[10px] font-bold uppercase hover:underline">
                  + {vi ? "Thêm" : "Add"}
                </button>
              </div>
              <div className="space-y-2">
                {form.specs.map((spec, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => updateSpec(i, "key", e.target.value)}
                      placeholder={vi ? "Tên (VD: RAM)" : "Key (e.g. RAM)"}
                      className="flex-1 border border-slate-100 p-2 text-[12px] rounded-sm outline-none focus:border-blue-300"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => updateSpec(i, "value", e.target.value)}
                      placeholder={vi ? "Giá trị (VD: 16GB)" : "Value (e.g. 16GB)"}
                      className="flex-1 border border-slate-100 p-2 text-[12px] rounded-sm outline-none focus:border-blue-300"
                    />
                    {form.specs.length > 1 && (
                      <button onClick={() => removeSpec(i)} className="text-slate-300 hover:text-red-400">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: time, shipping, arbitrator */}
          <div className="space-y-6">

            {/* Time */}
            <div className="bg-slate-50 p-4 rounded-sm border border-slate-100">
              <h3 className="text-[11px] font-bold text-[#003366] uppercase mb-4 flex items-center gap-2">
                <Clock size={14} /> {vi ? "Thời gian phiên đấu giá *" : "Auction timing *"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                    {vi ? "Bắt đầu" : "Start"}
                  </label>
                  <input
                    type="datetime-local"
                    value={form.startTime}
                    onChange={(e) => set("startTime", e.target.value)}
                    className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                    {vi ? "Kết thúc *" : "End *"}
                  </label>
                  <input
                    type="datetime-local"
                    value={form.endTime}
                    onChange={(e) => set("endTime", e.target.value)}
                    className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Arbitrator */}
            <div className="bg-green-50/50 p-4 rounded-sm border border-green-100">
              <h3 className="text-[11px] font-bold text-green-700 uppercase mb-4 flex items-center gap-2">
                <ShieldCheck size={14} /> {vi ? "Trọng tài & Escrow" : "Arbitrator & Escrow"}
              </h3>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">
                  {vi ? "Chọn trọng tài (tuỳ chọn)" : "Select arbitrator (optional)"}
                </label>
                <select
                  value={form.arbitrator}
                  onChange={(e) => set("arbitrator", e.target.value)}
                  className="w-full border border-slate-200 p-2 text-sm rounded-sm outline-none font-bold text-slate-700"
                >
                  <option value="0x0000000000000000000000000000000000000000">
                    {vi ? "Không chọn trọng tài" : "No arbitrator"}
                  </option>
                  {arbitratorAddrs.map((addr) => (
                    <option key={addr} value={addr}>{shortAddr(addr)}</option>
                  ))}
                </select>
                <div className="mt-3 flex gap-2 items-start bg-white p-2 border border-green-100 rounded-sm">
                  <Info size={14} className="text-green-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-green-700 leading-relaxed italic">
                    {vi
                      ? "Tiền người mua được giữ bởi smart contract (escrow) cho đến khi xác nhận giao hàng hoặc tranh chấp được giải quyết."
                      : "Buyer funds are held by the smart contract (escrow) until delivery confirmed or dispute resolved."}
                  </p>
                </div>
              </div>
            </div>

            {/* Contract address info */}
            {AUCTION_HOUSE_ADDRESS !== "0x0000000000000000000000000000000000000000" && (
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <ShieldCheck size={11} className="text-green-500" />
                Contract: <span className="font-mono">{shortAddr(AUCTION_HOUSE_ADDRESS)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-6 py-4 flex flex-col gap-3 border-t border-slate-200">
        {formError && (
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
            <AlertCircle size={14} /> {formError}
          </div>
        )}
        {(error) && (
          <div className="flex items-center gap-2 text-red-600 text-xs">
            <AlertCircle size={14} />
            {error?.shortMessage || error?.message || "Transaction error"}
          </div>
        )}
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-6 py-2 text-xs font-bold text-slate-500 uppercase hover:bg-slate-100 rounded-sm">
            {vi ? "Huỷ bỏ" : "Cancel"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || isConfirming || !wallet}
            className="bg-[#003366] text-white px-8 py-2 text-xs font-bold uppercase flex items-center gap-2 rounded-sm shadow-lg hover:bg-[#002855] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {(isPending || isConfirming) ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {isPending
              ? (vi ? "Chờ ký giao dịch..." : "Waiting for signature...")
              : isConfirming
              ? (vi ? "Đang xác nhận..." : "Confirming...")
              : (vi ? "Lưu & Công khai" : "Save & Publish")}
          </button>
        </div>
      </div>
    </div>
  );
}
