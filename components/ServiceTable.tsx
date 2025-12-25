
import React from 'react';
import { ServiceItem } from '../types';

interface Props {
  items: ServiceItem[];
}

export const ServiceTable: React.FC<Props> = ({ items }) => {
  return (
    <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-[#1b4332] text-white">
            <th className="py-5 px-6 font-extrabold text-sm uppercase">اسم الخدمة</th>
            <th className="py-5 px-6 font-extrabold text-sm uppercase">الوصف التفصيلي</th>
            <th className="py-5 px-6 font-extrabold text-sm uppercase text-center">المدة</th>
            <th className="py-5 px-6 font-extrabold text-sm uppercase text-left">التكلفة</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {items.map((item, idx) => (
            <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50/20'}>
              <td className="py-6 px-6 font-bold text-gray-900 align-top">{item.name}</td>
              <td className="py-6 px-6 text-gray-600 text-sm leading-loose align-top max-w-md">{item.description}</td>
              <td className="py-6 px-6 text-gray-700 text-sm font-bold text-center align-top whitespace-nowrap">{item.duration}</td>
              <td className="py-6 px-6 text-[#1b4332] font-black text-xl text-left align-top whitespace-nowrap">
                {item.cost.toLocaleString('ar-EG')} <span className="text-xs font-bold text-gray-400">ج.م</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
