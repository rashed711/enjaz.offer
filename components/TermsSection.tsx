
import React from 'react';

interface Props {
  terms: string[];
}

export const TermsSection: React.FC<Props> = ({ terms }) => {
  return (
    <div className="mt-8 pt-6 border-t border-dashed border-gray-200 grid grid-cols-2 gap-8 print:mt-4 print:pt-4">
      <div>
        <h4 className="text-green-900 font-bold mb-3 flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-green-600 no-print" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          الشروط والأحكام
        </h4>
        <ul className="space-y-1.5">
          {terms.map((term, idx) => (
            <li key={idx} className="text-[11px] text-gray-600 flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-green-400 mt-1.5 shrink-0"></span>
              {term}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 self-start print:p-2">
        <h4 className="text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm">
          توقيع واعتماد العميل
        </h4>
        <div className="mt-6 border-b border-gray-300 w-full mb-1"></div>
        <p className="text-[9px] text-gray-400 text-center uppercase">التوقيع / الختم الرسمي</p>
      </div>
    </div>
  );
};
