function ArbitratorOverview({ lang }) {
  const kpis = [
    {
      label: "Tổng phán quyết",
      value: "1,248",
      delta: "+12%",
      color: "text-blue-600",
    },
    {
      label: "Tỷ lệ hoàn tiền",
      value: "24%",
      delta: "-2%",
      color: "text-red-600",
    },
    {
      label: "Thời gian xử lý TB",
      value: "4.2h",
      delta: "-15%",
      color: "text-green-600",
    },
    {
      label: "Điểm uy tín",
      value: "99.8",
      delta: "Stable",
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
              {kpi.label}
            </p>
            <div className="flex items-end gap-3">
              <span className={`text-2xl font-black ${kpi.color}`}>
                {kpi.value}
              </span>
              <span className="text-[10px] font-bold text-slate-400 mb-1">
                {kpi.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Thêm biểu đồ hoặc danh sách vụ việc khẩn cấp tại đây */}
      <div className="bg-white border border-slate-200 p-6 rounded-sm min-h-[400px]">
        <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-6">
          Biểu đồ xu hướng tranh chấp
        </h3>
        <div className="flex items-center justify-center h-full text-slate-300 italic text-sm">
          [Biểu đồ thống kê sẽ hiển thị tại đây]
        </div>
      </div>
    </div>
  );
}
