"use client";
import React from 'react';

const Input = ({ details, onChange, name }) => {
  return (
    <div className="space-y-5">
      {/* حقل ID */}
      <div className="flex flex-col min-w-[240px] mb-5 m-auto">
        <label
          htmlFor="id"
          className="text-[0.95rem] font-bold relative top-2 bg-gray-50 dark:bg-transparent px-1 ml-2 w-fit dark:text-white"
        >
          معرف ال Id <span className='text-red-600 text-xl'>*</span>
        </label>
        <input 
          name="id"
          type="text"
          placeholder="ادخل ال ID الخاص بالاعب"
          value={details?.id || ''}
          onChange={(e) => onChange({ ...details, id: e.target.value })}
          className="px-3 py-[11px] text-sm border-2 border-black rounded  dark:bg-zinc-700 dark:text-white w-[240px] focus:outline-none"
        />
      </div>
      
        {/* حقل سيرفر ID إذا كان اسم اللعبة mobile-legnds */}
        {name === 'mobile-legends' && (
          <div className="flex flex-col min-w-[240px] mb-5 m-auto">
            <label
              htmlFor="server"
              className="text-[0.95rem] font-bold relative top-2 bg-gray-50 dark:bg-transparent px-1 ml-2 w-fit dark:text-white"
            >
              سيرفر ID <span className='text-red-600 text-xl'>*</span>
            </label>
            <input
              name="server"
              type="text"
              placeholder="ادخل رقم السيرفر"
              value={details?.server || ''}
              onChange={(e) => onChange({ ...details, server: e.target.value })}
              className="px-3 py-[11px] text-sm border-2 border-black rounded dark:bg-zinc-700 dark:text-white w-[240px] focus:outline-none"
            />
          </div>
        )}

      {/* حقل رقم الواتساب */}
      <div className="flex flex-col min-w-[240px] mb-5 m-auto">
        <label
          htmlFor="whatsapp"
          className="text-[0.95rem] font-bold relative top-2 bg-gray-50 dark:bg-transparent px-1 ml-2 w-fit dark:text-white"
        >
          رقم الواتساب <span className='text-red-600 text-xl'>*</span>
        </label>
        <input
          name="whatsapp"
          type="number"
          placeholder="ادخل رقم واتساب (..249)"
          value={details?.whatsapp || ''}
          onChange={(e) => onChange({ ...details, whatsapp: e.target.value })}
          className="px-3 py-[11px] text-sm border-2 border-black rounded dark:bg-zinc-700 dark:text-white w-[240px] focus:outline-none"
        />
      </div>

    </div>
  );
};

export default Input;
