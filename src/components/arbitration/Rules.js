import React, { useState } from "react";
import { 
  Gavel, ShieldCheck, BadgeDollarSign, Lock, 
  ChevronLeft, Clock, Download, ShieldAlert 
} from "lucide-react";
import jsPDF from "jspdf";

const Rules = ({ lang }) => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  const rulesContent = [
    { 
      id: "proc", 
      title: lang === "vi" ? "Quy trình xử lý" : "Standard Procedure", 
      icon: <Gavel className="text-blue-500" size={24} />, 
      desc: lang === "vi" ? "Các bước giải quyết tranh chấp." : "Dispute resolution steps.",
      detail: "1. Tiếp nhận hồ sơ: Các bên gửi đơn kiện và bằng chứng.\n2. Chỉ định Trọng tài: Hệ thống chọn ngẫu nhiên.\n3. Phiên điều trần: Xem xét bằng chứng trực tuyến.\n4. Ban hành phán quyết: Quyết định thực thi tự động."
    },
    { 
      id: "ethic", 
      title: lang === "vi" ? "Tiêu chuẩn đạo đức" : "Code of Ethics", 
      icon: <ShieldCheck className="text-green-500" size={24} />, 
      desc: lang === "vi" ? "Quy tắc ứng xử minh bạch." : "Arbitrator conduct rules.",
      detail: "• Độc lập: Không có lợi ích liên quan.\n• Khách quan: Phán quyết dựa trên sự thật.\n• Tận tâm: Xử lý đúng thời hạn."
    },
    { 
      id: "fee", 
      title: lang === "vi" ? "Biểu phí & Thù lao" : "Fee Schedule", 
      icon: <BadgeDollarSign className="text-amber-500" size={24} />, 
      desc: lang === "vi" ? "Quy định về chi phí." : "Rules on case costs.",
      detail: "• Phí khởi kiện: 5% giá trị tranh chấp.\n• Thù lao trọng tài: 80% phí thu được.\n• Phí hệ thống: 20% duy trì nền tảng."
    },
    { 
      id: "privacy", 
      title: lang === "vi" ? "Bảo mật thông tin" : "Data Privacy", 
      icon: <Lock className="text-indigo-500" size={24} />, 
      desc: lang === "vi" ? "Chính sách bảo vệ dữ liệu." : "Data protection policies.",
      detail: "• Mã hóa đầu cuối: Toàn bộ bằng chứng được mã hóa.\n• Quyền truy cập: Chỉ trọng tài chỉ định mới có quyền.\n• Xóa dữ liệu: Hủy thông tin sau khi đóng vụ việc."
    }
  ];

  const handleDownloadPDF = async (rule) => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(rule.title.toUpperCase(), 20, 25);
      const splitText = doc.splitTextToSize(rule.detail, 170);
      doc.text(splitText, 20, 45);
      doc.save(`Rules-${rule.id}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      {!selectedRule ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rulesContent.map(rule => (
            <div 
              key={rule.id} 
              onClick={() => setSelectedRule(rule)} 
              className="p-6 border border-slate-100 rounded-sm hover:border-blue-200 cursor-pointer group transition-all bg-white"
            >
              <div className="mb-4">{rule.icon}</div>
              <h4 className="font-bold text-slate-800 uppercase text-xs mb-2 group-hover:text-blue-600">
                {rule.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">{rule.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <button 
              onClick={() => setSelectedRule(null)} 
              className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors"
            >
              <ChevronLeft size={14} /> {lang === "vi" ? "Quay lại danh sách" : "Back to list"}
            </button>
            <button 
              onClick={() => handleDownloadPDF(selectedRule)}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-sm text-[10px] font-black uppercase disabled:opacity-50 hover:bg-slate-800 transition-all shadow-md"
            >
              {isExporting ? <Clock size={12} className="animate-spin" /> : <Download size={12} />} 
              {lang === "vi" ? "Tải PDF" : "Download PDF"}
            </button>
          </div>
          <div className="p-8 bg-slate-50 rounded-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight italic">
              {selectedRule.title}
            </h2>
            <div className="text-sm leading-[2] text-slate-700 whitespace-pre-line font-medium">
              {selectedRule.detail}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rules;