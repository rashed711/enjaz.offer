
import React, { useState, useMemo, useEffect } from 'react';
import { QuotationHeader } from './components/QuotationHeader';
import { ClientSection } from './components/ClientSection';
import { ServiceTable } from './components/ServiceTable';
import { PricingSummary } from './components/PricingSummary';
import { TermsSection } from './components/TermsSection';
import { QuotationData } from './types';

const App: React.FC = () => {
  const [quotation, setQuotation] = useState<QuotationData>({
    number: "QT-2024-001",
    date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    client: {
      name: "م/ محمد عبد الرحمن",
      company: "شركة النيل للخدمات اللوجستية",
      phone: "01001234567",
      email: "contact@nile-services.com"
    },
    items: [
      {
        id: "1",
        name: "حجز الدومين (النطاق)",
        description: "تسجيل النطاق الرسمي للشركة (.com) لمدة عام شامل لوحة تحكم كاملة.",
        duration: "سنة واحدة",
        cost: 650
      },
      {
        id: "2",
        name: "استضافة بريد إلكتروني أعمال",
        description: "إعداد 20 حساب بريد إلكتروني احترافي مع حماية ضد الفيروسات والرسائل المزعجة.",
        duration: "سنة واحدة",
        cost: 3500
      },
      {
        id: "3",
        name: "تطوير موقع تعريفي (Corporate Site)",
        description: "تصميم وبرمجة موقع متوافق مع جميع الشاشات مع لوحة تحكم باللغتين العربية والإنجليزية.",
        duration: "مرة واحدة",
        cost: 12500
      }
    ],
    vatRate: 0.14,
    terms: [
      "يسري عرض السعر لمدة 10 أيام عمل من تاريخ الإصدار.",
      "طريقة الدفع: 50% دفعة مقدمة عند التعاقد، و 50% عند الاستلام.",
      "الأسعار المذكورة لا تشمل أي مصاريف إضافية غير مذكورة.",
      "تلتزم شركة إنجاز بتقديم الدعم الفني مجاناً لمدة 3 أشهر."
    ]
  });

  const totals = useMemo(() => {
    const subtotal = quotation.items.reduce((sum, item) => sum + item.cost, 0);
    const vat = subtotal * quotation.vatRate;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  }, [quotation.items, quotation.vatRate]);

  useEffect(() => {
    document.title = `عرض سعر - إنجاز للحلول الذكية - ${quotation.number}`;
  }, [quotation.number]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-12 bg-[#f0f4f2]">
      {/* Navbar Control */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <img src="https://enjaz.app/assets/img/enjaz-logo-main.webp" alt="Enjaz" className="h-10" />
          <div className="h-8 w-px bg-gray-200"></div>
          <span className="text-green-900 font-bold">بوابة عروض الأسعار</span>
        </div>
        
        <button 
          onClick={handlePrint}
          className="bg-[#1b4332] hover:bg-[#081c15] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          طباعة / PDF
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-8 mb-20 bg-white shadow-2xl print-shadow-none overflow-hidden rounded-3xl border border-gray-100">
        <QuotationHeader 
          quotationNumber={quotation.number} 
          date={quotation.date} 
        />
        
        <div className="px-12 py-8 print-px-6 print-py-4">
          <ClientSection client={quotation.client} />
          
          <div className="mt-8 print-tight">
            <h3 className="text-xl font-extrabold text-[#1b4332] mb-4 border-r-4 border-[#1b4332] pr-3 print-tight">
              بنود العرض الفني والمالي
            </h3>
            <ServiceTable items={quotation.items} />
          </div>

          <div className="mt-8 flex justify-end print-tight">
            <PricingSummary 
              subtotal={totals.subtotal} 
              vat={totals.vat} 
              total={totals.total} 
              vatRate={quotation.vatRate * 100}
            />
          </div>

          <TermsSection terms={quotation.terms} />
        </div>

        {/* Footer Area with Egyptian Branding */}
        <div className="bg-[#f8fbfa] border-t-2 border-green-50 px-12 py-6 print-py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <img src="https://enjaz.app/assets/img/enjaz-logo-main.webp" alt="Enjaz" className="h-10" />
              <p className="text-gray-500 text-[11px] font-medium leading-relaxed">
                شريككم الاستراتيجي للتحول الرقمي والحلول التقنية المبتكرة في قلب القاهرة.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[#1b4332] font-black text-xs uppercase tracking-widest border-b border-green-100 pb-1">الاتصال</h5>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-700 text-xs font-semibold">
                  info@enjaz.app
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-xs font-bold" dir="ltr">
                  01225251888
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-[#1b4332] font-black text-xs uppercase tracking-widest border-b border-green-100 pb-1">الموقع</h5>
              <div className="flex items-start gap-2 text-gray-700">
                <p className="font-bold leading-relaxed text-[11px]">
                  مكرم عبيد - مدينة نصر، القاهرة
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[9px] text-gray-400 font-bold">
            <p>© {new Date().getFullYear()} إنجاز للحلول الذكية.</p>
            <p className="tracking-[0.1em]">ENJAZ SMART SOLUTIONS | CAIRO, EGYPT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
