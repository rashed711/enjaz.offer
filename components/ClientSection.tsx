
import React from 'react';
import { ClientInfo } from '../types';

interface Props {
  client: ClientInfo;
}

export const ClientSection: React.FC<Props> = ({ client }) => {
  return (
    <div className="grid grid-cols-2 gap-8 bg-gray-50 p-6 rounded-2xl border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1 h-full bg-green-600"></div>
      
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">معلومات العميل</label>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">اسم العميل:</p>
            <p className="text-lg font-bold text-green-900">{client.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">اسم الشركة:</p>
            <p className="text-md font-semibold text-gray-700">{client.company}</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">معلومات الاتصال</label>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">رقم الموبايل:</p>
            <p className="text-md font-semibold text-gray-800 font-mono" dir="ltr">{client.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">البريد الإلكتروني:</p>
            <p className="text-md font-semibold text-green-700 font-mono tracking-tight">{client.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
