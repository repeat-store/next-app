'use client';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners'; // من مكتبة react-spinners

const messages = [
    { text: 'ثواني بس...', color: 'text-blue-400' },
   { text: 'بنجهز ليك المحتوى...', color: 'text-yellow-400' },
  { text: 'اللعبة قربت تبدأ...', color: 'text-purple-400' },
  { text: ' نتك شكلو كعب 😅', color: 'text-pink-400' },
  { text: ' شيل الصبر بس 😊 ', color: 'text-pink-400' },
];

export default function PageLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Spinner جميل */}
      <PuffLoader color="#36d7b7" size={60} speedMultiplier={1.2} className="mb-6" />

      {/* رسالة ملونة */}
      <p className={`text-xl font-semibold animate-pulse ${messages[index].color}`}>
        {messages[index].text}
      </p>
    </div>
  );
}
