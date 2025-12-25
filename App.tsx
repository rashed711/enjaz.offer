
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
    vatRate: 0.14, // ضريبة القيمة المضافة في مصر 14%
    terms: [
      "يسري عرض السعر لمدة 10 أيام عمل من تاريخ الإصدار.",
      "طريقة الدفع: 50% دفعة مقدمة عند التعاقد، و 50% عند الاستلام والتشغيل.",
      "الأسعار المذكورة لا تشمل أي مصاريف إضافية غير مذكورة في الوصف.",
      "تلتزم شركة إنجاز بتقديم الدعم الفني مجاناً لمدة 3 أشهر بعد التسليم."
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
        
        <div className="px-12 py-12">
          <ClientSection client={quotation.client} />
          
          <div className="mt-14">
            <h3 className="text-2xl font-extrabold text-[#1b4332] mb-8 border-r-8 border-[#1b4332] pr-4">
              بنود العرض الفني والمالي
            </h3>
            <ServiceTable items={quotation.items} />
          </div>

          <div className="mt-12 flex justify-end">
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
        <div className="bg-[#f8fbfa] border-t-2 border-green-50 px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <img src="https://enjaz.app/assets/img/enjaz-logo-main.webp" alt="Enjaz" className="h-12" />
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                شريككم الاستراتيجي للتحول الرقمي والحلول التقنية المبتكرة في قلب القاهرة.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="text-[#1b4332] font-black text-sm uppercase tracking-widest border-b border-green-100 pb-2">بيانات الاتصال</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-gray-700 font-semibold">
                  <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center text-green-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  info@enjaz.app
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-bold" dir="ltr">
                  <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center text-green-700">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  01225251888
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-[#1b4332] font-black text-sm uppercase tracking-widest border-b border-green-100 pb-2">مقر الشركة</h5>
              <div className="flex items-start gap-3 text-gray-700">
                <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center text-green-700 shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <p className="font-bold leading-relaxed text-sm">
                  مكرم عبيد - مدينة نصر<br />القاهرة، مصر
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold">
            <p>© {new Date().getFullYear()} إنجاز للحلول الذكية. جميع الحقوق محفوظة.</p>
            <p className="tracking-[0.2em]">ENJAZ SMART SOLUTIONS | CAIRO, EGYPT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
