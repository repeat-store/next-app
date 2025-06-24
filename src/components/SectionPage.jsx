'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function SectionPage({ name, products, sectionName }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 mt-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-700">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
         {sectionName}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {products.map((product, index) => {
          const imageUrl = `/images/acount/${name}/${product.coin}.png`;
          const whatsappMessage = `https://wa.me/966575248673?text=${encodeURIComponent(
            `مرحبًا،\n\nأرغب في شراء المنتج التالي:\n🎮 القسم: ${sectionName}\n📦 القيمة:  ${product.value} \n💰 السعر: ${product.price} جنيه\n\n`
          )}`;

          return (
            <div
              key={product.productID}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center flex flex-col justify-between h-[290px] transition-transform duration-500 hover:scale-105 opacity-0 animate-fadeUp"
            >
              <img
                src={imageUrl}
                alt={product.value}
                className="w-full h-40 object-cover rounded-2xl mb-3"
                onError={(e) => {
                  e.currentTarget.src = '/images/default.jpg';
                }}
              />
              <div>
                <h2 className="text-gray-600 dark:text-gray-300" dir="rtl">{product.value}</h2>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3" dir="ltr">
                  السعر: {product.price.toLocaleString('en-US')} جنيه
                </p>
              </div>
              <Link
                href={whatsappMessage}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
              >
                <FaWhatsapp className="text-lg" />
                اشحن الآن
              </Link>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}
