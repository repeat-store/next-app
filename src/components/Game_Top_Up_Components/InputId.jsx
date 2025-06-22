'use client';
import React from 'react';

const Input = ({ details, onChange, name }) => {
  const inputClass =
    'px-4 py-3 text-sm rounded-2xl border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 w-full';

  const labelClass =
    'text-sm font-semibold mb-1 ml-2 text-zinc-800 dark:text-zinc-100';

  const wrapperClass =
    'flex flex-col gap-1 mb-5  w-full max-w-xs mx-auto';

  return (
    <div className="space-y-4 mt-4">
        {/* قائمة اختيار السيرفر إذا كانت اللعبة genshin-impact */}
        {name === 'genshin-impact' && (
          <div className={wrapperClass}>
            <label htmlFor="server" className={labelClass}>
              سيرفر الحساب <span className="text-red-500">*</span>
            </label>
            <select
              name="server"
              value={details?.server || ''}
              onChange={(e) => onChange({ ...details, server: e.target.value })}
              className={inputClass}
            >
              <option value="">اختر السيرفر</option>
              <option value="asia">آسيا</option>
              <option value="america">أمريكا</option>
              <option value="europe">أوروبا</option>
            </select>
          </div>
        )}
      {/* حقل ID */}
      <div className={wrapperClass}>
        <label htmlFor="id" className={labelClass}>
          معرف الـ ID <span className="text-red-500">*</span>
        </label>
        <input
          name="id"
          type="text"
          placeholder="ادخل الـ ID الخاص باللاعب"
          value={details?.id || ''}
          onChange={(e) => onChange({ ...details, id: e.target.value })}
          className={inputClass}
        />
      </div>

      {/* حقل سيرفر ID إذا كانت اللعبة mobile-legends */}
      {name === 'mobile-legends' && (
        <div className={wrapperClass}>
          <label htmlFor="server" className={labelClass}>
            سيرفر ID <span className="text-red-500">*</span>
          </label>
          <input
            name="server"
            type="text"
            placeholder="ادخل رقم السيرفر"
            value={details?.server || ''}
            onChange={(e) => onChange({ ...details, server: e.target.value })}
            className={inputClass}
          />
        </div>
      )}


      {/* حقل رقم الواتساب */}
      <div className={wrapperClass}>
        <label htmlFor="whatsapp" className={labelClass}>
          رقم الواتساب <span className="text-red-500">*</span>
        </label>
        <input
          name="whatsapp"
          type="number"
          placeholder="ادخل رقم واتساب (مثل: 249...)"
          value={details?.whatsapp || ''}
          onChange={(e) => onChange({ ...details, whatsapp: e.target.value })}
          className={inputClass}
        />
      </div>
    </div>
  );
};

export default Input;
