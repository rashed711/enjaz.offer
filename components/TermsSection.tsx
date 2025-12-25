
import React from 'react';

interface Props {
  terms: string[];
}

export const TermsSection: React.FC<Props> = ({ terms }) => {
  return (
    <div className="mt-12 pt-8 border-t border-dashed border-gray-200 grid grid-cols-2 gap-12">
      <div>
        <h4 className="text-green-900 font-bold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          الشروط والأحكام
        </h4>
        <ul className="space-y-3">
          {terms.map((term, idx) => (
            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0"></span>
              {term}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 self-start">
        <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          توقيع واعتماد العميل
        </h4>
        <div className="mt-12 border-b border-gray-300 w-full mb-2"></div>
        <p className="text-xs text-gray-400 text-center uppercase tracking-tighter">التوقيع / الختم الرسمي</p>
      </div>
    </div>
  );
};
