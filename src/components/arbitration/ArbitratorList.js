"use client";
import React, { useState } from "react";
import { Star, ShieldCheck, ArrowRight, BadgeDollarSign, Edit3, Heart } from "lucide-react";
import EditProfileModal from "./EditProfileModal"; // Đảm bảo đúng đường dẫn file

export default function ArbitratorList({ lang, onViewDetail }) {
  // Nhận diện đơn vị của bạn
  const MY_UNIT_NAME = "Gia Phả Việt - Legal Unit";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([3]);
  
  // Dữ liệu ban đầu
  const [arbitrators, setArbitrators] = useState([
    { id: 2, name: "Blockchain Mediator Group", resolved: 89, rating: 4.7, status: "Active", fee: "75 LYX", commission: "1.5%", slogan: "Trust in Code", stack: "Solidity, Next.js" },
    { id: 1, name: "Gia Phả Việt - Legal Unit", resolved: 124, rating: 4.9, status: "Active", fee: "50 LYX", commission: "2%", slogan: "Minh bạch trên Blockchain", stack: "LUKSO, Web3, Smart Contract" },
    { id: 3, name: "Nguyen Family Council", resolved: 45, rating: 5.0, status: "Busy", fee: "100 LYX", commission: "1%", slogan: "Tiên Tổ là gốc", stack: "Genealogy, Traditional Law" },
  ]);

  // Logic: Ghim hồ sơ cá nhân lên đầu
  const sortedArbs = [...arbitrators].sort((a, b) => (a.name === MY_UNIT_NAME ? -1 : 1));

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleSaveProfile = (newData) => {
    // Cập nhật lại danh sách với dữ liệu mới
    setArbitrators(prev => prev.map(item => item.name === MY_UNIT_NAME ? { ...item, ...newData } : item));
    setIsModalOpen(false);
    console.log("Đã lưu dữ liệu mới:", newData);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedArbs.map((arb) => {
          const isMe = arb.name === MY_UNIT_NAME;
          const isFavorite = favorites.includes(arb.id);

          return (
            <div key={arb.id} className={`bg-white p-5 rounded-sm transition-all group relative border-2 flex flex-col ${isMe ? "border-blue-500 shadow-md ring-1 ring-blue-100" : "border-slate-200 hover:border-blue-200"}`}>
              
              {!isMe && (
                <button onClick={(e) => toggleFavorite(e, arb.id)} className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-red-50">
                  <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : "text-slate-300"} />
                </button>
              )}

              {isMe && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black px-3 py-1 uppercase">
                  {lang === "vi" ? "Hồ sơ của bạn" : "Your Profile"}
                </div>
              )}

              <div className="mb-4">
                <div className={`w-fit p-2 rounded-sm ${isMe ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}>
                  <ShieldCheck size={24} />
                </div>
              </div>

              <h4 className="font-bold text-slate-800 uppercase text-sm mb-1">{arb.name}</h4>
              <p className="text-[11px] italic text-slate-500 mb-3 line-clamp-1">"{arb.slogan}"</p>
              
              <div className="flex items-center gap-2 mt-2 px-2 py-1 bg-slate-50 rounded-sm w-fit border border-slate-100">
                <BadgeDollarSign size={12} className="text-blue-600" />
                <span className="text-[10px] font-black text-slate-600 uppercase">
                  {lang === "vi" ? "Phí:" : "Fee:"} {arb.fee} + {arb.commission}
                </span>
              </div>
              
              <div className="flex items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-100 flex-grow">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase font-black">Resolved</span>
                    <span className="text-sm font-black text-slate-800">{arb.resolved}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase font-black">Rating</span>
                    <span className="text-sm font-black text-amber-500 flex items-center gap-1">{arb.rating} <Star size={12} fill="currentColor" /></span>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-full uppercase ${arb.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{arb.status}</span>
              </div>

              <div className="mt-5">
                {isMe ? (
                  <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase rounded-sm hover:bg-blue-700">
                    <Edit3 size={12} /> {lang === "vi" ? "Sửa hồ sơ & Biểu phí" : "Edit Profile & Fees"}
                  </button>
                ) : (
                  <button onClick={() => onViewDetail(arb)} className="w-full flex items-center justify-center gap-1 py-2.5 bg-slate-800 text-white text-[10px] font-black uppercase rounded-sm hover:bg-blue-600">
                    {lang === "vi" ? "Xem chi tiết" : "View Details"} <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Chỉnh sửa hồ sơ */}
      <EditProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialData={arbitrators.find(a => a.name === MY_UNIT_NAME)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}