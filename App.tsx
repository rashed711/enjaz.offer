
import React, { useState, useMemo, useEffect } from 'react';
import { QuotationHeader } from './components/QuotationHeader';
import { ClientSection } from './components/ClientSection';
import { ServiceTable } from './components/ServiceTable';
import { PricingSummary } from './components/PricingSummary';
import { TermsSection } from './components/TermsSection';
import { QuotationData, ServiceItem } from './types';

const App: React.FC = () => {
  // استخدام التاريخ بتنسيق YYYY-MM-DD لتسهيل التعامل مع الـ Date Picker
  const [quotation, setQuotation] = useState<QuotationData>({
    number: `QT-${new Date().getFullYear()}-001`,
    date: new Date().toISOString().split('T')[0],
    client: {
      name: "اسم العميل الكريم",
      company: "اسم شركة العميل",
      phone: "01xxxxxxxxx",
      email: "client@example.com"
    },
    items: [
      {
        id: "1",
        name: "اسم الخدمة الأولى",
        description: "وصف تفصيلي للخدمة المقدمة ومميزاتها الأساسية.",
        duration: "سنة واحدة",
        cost: 1000
      }
    ],
    vatRate: 0.14,
    terms: [
      "يسري عرض السعر لمدة 10 أيام عمل من تاريخ الإصدار.",
      "طريقة الدفع: 50% دفعة مقدمة عند التعاقد، و 50% عند الاستلام.",
      "تلتزم شركة إنجاز بتقديم الدعم الفني مجاناً لمدة 3 أشهر."
    ]
  });

  // تنسيق التاريخ للعرض في ترويسة العرض (يوم / شهر / سنة) بأرقام إنجليزية
  const formattedDisplayDate = useMemo(() => {
    if (!quotation.date) return "";
    const [year, month, day] = quotation.date.split('-');
    return `${day} / ${month} / ${year}`;
  }, [quotation.date]);

  const totals = useMemo(() => {
    const subtotal = quotation.items.reduce((sum, item) => sum + item.cost, 0);
    const vat = subtotal * quotation.vatRate;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  }, [quotation.items, quotation.vatRate]);

  useEffect(() => {
    document.title = `عرض سعر - ${quotation.client.company || 'إنجاز'} - ${quotation.number}`;
  }, [quotation.number, quotation.client.company]);

  const handleAddItem = () => {
    const newItem: ServiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      duration: "",
      cost: 0
    };
    setQuotation({ ...quotation, items: [...quotation.items, newItem] });
  };

  const handleUpdateItem = (id: string, field: keyof ServiceItem, value: any) => {
    const newItems = quotation.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setQuotation({ ...quotation, items: newItems });
  };

  const handleRemoveItem = (id: string) => {
    setQuotation({ ...quotation, items: quotation.items.filter(item => item.id !== id) });
  };

  const handleAddTerm = () => {
    setQuotation({ ...quotation, terms: [...quotation.terms, "بند جديد"] });
  };

  const handleUpdateTerm = (index: number, value: string) => {
    const newTerms = [...quotation.terms];
    newTerms[index] = value;
    setQuotation({ ...quotation, terms: newTerms });
  };

  const handleRemoveTerm = (index: number) => {
    setQuotation({ ...quotation, terms: quotation.terms.filter((_, i) => i !== index) });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f0f4f2] pb-20">
      {/* Editor Panel - Hidden on Print */}
      <div className="no-print bg-white border-b border-gray-200 shadow-xl mb-10 overflow-hidden">
        <div className="max-w-6xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <img src="https://enjaz.app/assets/img/enjaz-logo-main.webp" alt="Enjaz" className="h-12" />
              <h1 className="text-2xl font-black text-[#1b4332]">لوحة تحكم عروض الأسعار</h1>
            </div>
            <button 
              onClick={handlePrint}
              className="bg-[#1b4332] hover:bg-[#081c15] text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center gap-3 hover:scale-105 active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              توليد وطباعة العرض
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Client Info Section */}
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <h2 className="text-lg font-bold text-[#1b4332] mb-6 border-r-4 border-[#1b4332] pr-3">بيانات العميل والعرض</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">رقم العرض</label>
                  <input className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={quotation.number} onChange={e => setQuotation({...quotation, number: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">تاريخ العرض (اختر من التقويم)</label>
                  <input type="date" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={quotation.date} onChange={e => setQuotation({...quotation, date: e.target.value})} />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-gray-500 mr-1">اسم العميل</label>
                  <input className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={quotation.client.name} onChange={e => setQuotation({...quotation, client: {...quotation.client, name: e.target.value}})} />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="text-xs font-bold text-gray-500 mr-1">اسم الشركة</label>
                  <input className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={quotation.client.company} onChange={e => setQuotation({...quotation, client: {...quotation.client, company: e.target.value}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">رقم الموبايل</label>
                  <input className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={quotation.client.phone} onChange={e => setQuotation({...quotation, client: {...quotation.client, phone: e.target.value}})} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">البريد الإلكتروني</label>
                  <input className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" 
                    value={quotation.client.email} onChange={e => setQuotation({...quotation, client: {...quotation.client, email: e.target.value}})} />
                </div>
              </div>
            </div>

            {/* Terms Section */}
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <h2 className="text-lg font-bold text-[#1b4332] mb-6 border-r-4 border-[#1b4332] pr-3">الشروط والأحكام</h2>
              <div className="space-y-3">
                {quotation.terms.map((term, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input className="flex-1 p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500" 
                      value={term} onChange={e => handleUpdateTerm(idx, e.target.value)} />
                    <button onClick={() => handleRemoveTerm(idx)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
                <button onClick={handleAddTerm} className="w-full py-3 border-2 border-dashed border-green-200 text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors">
                  + إضافة بند جديد
                </button>
              </div>
            </div>
          </div>

          {/* Services Editor */}
          <div className="mt-10 bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <h2 className="text-lg font-bold text-[#1b4332] mb-6 border-r-4 border-[#1b4332] pr-3">بنود الخدمات والأسعار</h2>
            <div className="space-y-4">
              {quotation.items.map((item, idx) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400">اسم الخدمة</label>
                    <input className="w-full p-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm" 
                      value={item.name} placeholder="مثال: حجز استضافة" onChange={e => handleUpdateItem(item.id, 'name', e.target.value)} />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-gray-400">الوصف</label>
                    <input className="w-full p-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm" 
                      value={item.description} placeholder="وصف الخدمة..." onChange={e => handleUpdateItem(item.id, 'description', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400">المدة</label>
                    <input className="w-full p-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm" 
                      value={item.duration} placeholder="مثال: سنة" onChange={e => handleUpdateItem(item.id, 'duration', e.target.value)} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-bold text-gray-400">التكلفة (ج.م)</label>
                      <input type="number" className="w-full p-2.5 rounded-lg border border-gray-100 bg-gray-50 text-sm" 
                        value={item.cost} onChange={e => handleUpdateItem(item.id, 'cost', parseFloat(e.target.value) || 0)} />
                    </div>
                    <button onClick={() => handleRemoveItem(item.id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex gap-4">
                <button onClick={handleAddItem} className="flex-1 py-4 border-2 border-dashed border-[#1b4332]/30 text-[#1b4332] font-black rounded-2xl hover:bg-green-50 transition-all flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                  إضافة خدمة جديدة للعرض
                </button>
                <div className="bg-[#1b4332] text-white p-4 rounded-2xl flex items-center gap-4 shadow-lg min-w-[200px]">
                  <span className="text-xs font-bold opacity-70">نسبة الضريبة</span>
                  <input type="number" className="bg-white/20 w-16 p-2 rounded-lg font-bold text-center outline-none border-none" 
                    value={quotation.vatRate * 100} onChange={e => setQuotation({...quotation, vatRate: (parseFloat(e.target.value) || 0) / 100})} />
                  <span className="font-bold">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Quotation Preview - This is what prints */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl print-shadow-none overflow-hidden rounded-[2.5rem] border border-gray-100">
        <QuotationHeader 
          quotationNumber={quotation.number} 
          date={formattedDisplayDate} 
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
                شريككم الاستراتيجي للتحول الرقمي والحلول التقنية المبتكرة.
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
