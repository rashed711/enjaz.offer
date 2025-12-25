
import React from 'react';

interface Props {
  quotationNumber: string;
  date: string;
}

export const QuotationHeader: React.FC<Props> = ({ quotationNumber, date }) => {
  return (
    <div className="relative bg-white pt-10 pb-8 px-12 overflow-hidden border-b-2 border-green-50">
      {/* عناصر زخرفية تقنية خفيفة */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full -ml-32 -mt-32 opacity-20"></div>
      <div className="absolute -bottom-10 right-0 w-48 h-48 bg-green-50/50 rounded-full -mr-24 opacity-20"></div>
      
      <div className="relative flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-40 h-auto">
            <img 
              src="https://enjaz.app/assets/img/enjaz-logo-main.webp" 
              alt="Enjaz Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="h-12 w-px bg-gray-200 hidden md:block mx-2"></div>
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-green-900 tracking-tight leading-tight">إنجاز للحلول الذكية</h2>
            <p className="text-green-600 font-medium tracking-wide uppercase text-[10px]">Digital Transformation Excellence</p>
          </div>
        </div>

        <div className="text-left flex flex-col items-end">
          <h1 className="text-4xl font-black text-gray-50 uppercase tracking-tighter mb-2 pointer-events-none select-none">QUOTATION</h1>
          <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-2xl border border-green-100 min-w-[220px] shadow-sm">
            <h2 className="text-green-800 font-bold text-lg mb-3 text-center border-b border-green-200 pb-2">عرض سعر</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-500 font-medium text-xs">رقم العرض:</span>
                <span className="text-green-900 font-bold font-mono">{quotationNumber}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-500 font-medium text-xs">التاريخ:</span>
                <span className="text-green-900 font-semibold">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
