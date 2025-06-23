'use client';
import React from 'react';

const PayMethod = ({ onSelect, selected }) => {
  const handleSelect = (method) => {
    if (onSelect) onSelect(method);
  };

  return (
    <div className="mt-4 flex justify-between items-center text-center select-none px-2">
      {[
        { name: 'bankak', label: 'بنكك', img: '/images/bank/bankak.png' },
        { name: 'mycashe', label: 'ماي كاشي', img: '/images/bank/Mycashey.png' },
        { name: 'forey', label: 'فوري', img: '/images/bank/forey.png' },
      ].map((method) => (
        <label key={method.name} className="relative cursor-pointer">
          <input
            type="radio"
            name="payment"
            value={method.name}
            className="sr-only peer"
            checked={selected === method.name}
            onChange={() => handleSelect(method.name)}
          />
          <span className="flex flex-col items-center justify-center w-20 h-20 rounded-lg border-4 border-gray-300 bg-white shadow-md transition peer-checked:border-blue-600 peer-checked:shadow-lg hover:border-blue-600 relative">
            <span className="absolute top-1 left-1 w-3 h-3 border-2 border-gray-300 bg-white rounded-full opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 peer-checked:border-blue-600 peer-checked:bg-blue-600 transition"></span>
            <span className="w-18 h-18 transform scale-90">
              <img
                src={method.img}
                alt={method.label}
                className="rounded-lg w-full h-full object-cover"
              />
            </span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default PayMethod;
