
import React from 'react';

interface Props {
  quotationNumber: string;
  date: string;
}

export const QuotationHeader: React.FC<Props> = ({ quotationNumber, date }) => {
  return (
    <div className="relative bg-white pt-8 pb-6 px-12 overflow-hidden border-b-2 border-green-50 print-py-4">
      {/* عناصر زخرفية تقنية خفيفة */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full -ml-32 -mt-32 opacity-20 no-print"></div>
      <div className="absolute -bottom-10 right-0 w-48 h-48 bg-green-50/50 rounded-full -mr-24 opacity-20 no-print"></div>
      
      <div className="relative flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-32 h-auto print:w-28">
            <img 
              src="https://enjaz.app/assets/img/enjaz-logo-main.webp" 
              alt="Enjaz Logo" 
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block mx-1"></div>
          <div className="hidden md:block">
            <h2 className="text-xl font-bold text-green-900 leading-tight">إنجاز للحلول الذكية</h2>
            <p className="text-green-600 font-medium uppercase text-[9px]">Enjaz Smart Solutions</p>
          </div>
        </div>

        <div className="text-left flex flex-col items-end">
          <div className="bg-green-50/80 backdrop-blur-sm p-3 rounded-xl border border-green-100 min-w-[180px] shadow-sm print:p-2">
            <h2 className="text-green-800 font-bold text-base mb-2 text-center border-b border-green-200 pb-1">عرض سعر</h2>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-500 font-medium">رقم العرض:</span>
                <span className="text-green-900 font-bold font-mono">{quotationNumber}</span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-gray-500 font-medium">التاريخ:</span>
                <span className="text-green-900 font-semibold">{date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
