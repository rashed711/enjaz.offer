
import React from 'react';
import { ServiceItem } from '../types';

interface Props {
  items: ServiceItem[];
}

export const ServiceTable: React.FC<Props> = ({ items }) => {
  return (
    <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-[#1b4332] text-white">
            <th className="py-3 px-4 font-extrabold text-xs uppercase">اسم الخدمة</th>
            <th className="py-3 px-4 font-extrabold text-xs uppercase">الوصف</th>
            <th className="py-3 px-4 font-extrabold text-xs uppercase text-center">المدة</th>
            <th className="py-3 px-4 font-extrabold text-xs uppercase text-left">التكلفة</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {items.map((item, idx) => (
            <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50/10'}>
              <td className="py-4 px-4 font-bold text-gray-900 align-top text-sm">{item.name}</td>
              <td className="py-4 px-4 text-gray-600 text-[11px] leading-relaxed align-top max-w-sm">{item.description}</td>
              <td className="py-4 px-4 text-gray-700 text-xs font-bold text-center align-top">{item.duration}</td>
              <td className="py-4 px-4 text-[#1b4332] font-black text-base text-left align-top whitespace-nowrap">
                {item.cost.toLocaleString('en-US')} <span className="text-[10px] font-bold text-gray-400">ج.م</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
