
import React from 'react';

interface Props {
  subtotal: number;
  vat: number;
  total: number;
  vatRate: number;
}

export const PricingSummary: React.FC<Props> = ({ subtotal, vat, total, vatRate }) => {
  return (
    <div className="w-full max-w-[400px] space-y-3 bg-[#fdfdfd] p-4 rounded-3xl border border-gray-100 shadow-inner">
      <div className="flex justify-between items-center px-4">
        <span className="text-gray-500 font-bold text-sm">الإجمالي قبل الضريبة:</span>
        <span className="text-gray-800 font-black text-lg">
          {subtotal.toLocaleString('ar-EG')} <span className="text-[10px] text-gray-400">جنية مصري</span>
        </span>
      </div>
      
      <div className="flex justify-between items-center px-4">
        <span className="text-gray-500 font-bold text-sm">ضريبة القيمة المضافة ({vatRate}%):</span>
        <span className="text-gray-800 font-black text-lg">
          {vat.toLocaleString('ar-EG')} <span className="text-[10px] text-gray-400">جنية مصري</span>
        </span>
      </div>

      <div className="bg-[#1b4332] text-white p-6 rounded-2xl flex justify-between items-center shadow-xl shadow-green-900/20 transform transition hover:scale-[1.02]">
        <div className="space-y-1">
          <span className="text-xs font-bold opacity-70 uppercase tracking-widest">المبلغ الإجمالي</span>
          <p className="text-lg font-black">صافي القيمة</p>
        </div>
        <div className="text-left">
          <span className="text-4xl font-black tracking-tighter">
            {total.toLocaleString('ar-EG')}
          </span>
          <span className="mr-2 text-xs font-extrabold bg-white/20 px-2 py-1 rounded">ج.م</span>
        </div>
      </div>
    </div>
  );
};
