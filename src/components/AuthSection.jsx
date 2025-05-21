"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import './AuthSection.css';
import { API_BASE_URL } from "../lib/domen";

export default function AuthSection({ onClose }) {
  const router = useRouter();
  const [closing, setClosing] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = " مرحبًا بك👋 في متجر ريبيت ستور للمتابعة قم بي تسجيل الدخول نتمنى لك تجربة فريدة ";
  const audioRef = useRef(null);
  const storeName = "متجر ريبيت ستور";
  const phrases = ["سرعة", "أداء", "ثقة", "دعم متكامل", "شحن فوري"];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // الكتابة التدريجية بالعربي + صوت
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      audioRef.current?.play(); // تشغيل الصوت
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 60);
    return () => clearInterval(typing);
  }, []);

  // أنميشن الكلمات المتغيرة
  useEffect(() => {
    const current = phrases[wordIndex % phrases.length];
    const timeout = setTimeout(() => {
      setDisplayedWord((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );

      if (!isDeleting && displayedWord === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayedWord === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % phrases.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedWord, isDeleting, wordIndex]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const stopPropagation = (e) => e.stopPropagation();

  // روابط الازرار
  const handleGogleButton = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google/redirect`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-end sm:items-center justify-center px-4"
      onClick={handleClose}
    >
      {/* صوت الكتابة */}
      <audio ref={audioRef} src="/sounds/type.mp3" preload="auto" />

      {/* خلفية النجوم */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="w-full h-full bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:18px_18px] animate-starfield"></div>
      </div>

      {/* اسم المتجر وكلمات متغيرة */}
      <div className="absolute top-4 right-4 text-right text-white z-50">
        <h1 className="text-3xl font-bold">{storeName}</h1>
        <p className="text-2xl font-mono mt-1">
          ريبيت <span className="text-pink-400">{displayedWord}</span>
        </p>
      </div>

      {/* نص الترحيب */}
      <div
        // dir="rtl"
        className="absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10  text-white px-6 py-3 min-w-75 text-2xl  rounded-xl shadow-md z-50 font-semibold text-center   border border-white/20 animate-fade-in"
      >
        {typedText}
      </div>

      {/* صندوق تسجيل الدخول */}
      <div
        onClick={stopPropagation}
        className={`bg-white/5 backdrop-blur-2xl text-white w-full sm:w-[400px] rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-300 transform ${
          closing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <h2 className="text-center text-lg sm:text-xl font-semibold mb-6">
          اختر طريقة تسجيل الدخول
        </h2>

        {/* زر Google */}
        <button 
          className="w-full flex items-center  justify-center gap-3 bg-white text-black font-semibold text-sm px-4 py-3 rounded-full shadow-md hover:shadow-lg transition mb-4"
          onClick={handleGogleButton}
        >
          <span className="font-extrabold">المتابعة عن طريق جوجل</span>
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.4H272.1v95.4h147.1c-6.3 33.7-25.1 62.2-53.4 81.3v67.3h86.4c50.6-46.6 81.3-115.4 81.3-193.6z"
              fill="#4285F4"
            />
            <path
              d="M272.1 544.3c72.9 0 134.1-24.1 178.8-65.6l-86.4-67.3c-24.1 16.1-54.9 25.5-92.4 25.5-71.1 0-131.4-48-153-112.6H30.5v70.7c44.3 87.6 135.8 149.3 241.6 149.3z"
              fill="#34A853"
            />
            <path
              d="M119.1 324.3c-10.3-30.7-10.3-63.6 0-94.3V159.3H30.5c-43.4 86.6-43.4 189.1 0 275.7l88.6-70.7z"
              fill="#FBBC04"
            />
            <path
              d="M272.1 107.7c39.7-.6 77.7 14.2 106.9 41.7l80.1-80.1C407.5 24.5 341.2-.6 272.1 0 166.3 0 74.8 61.7 30.5 149.3l88.6 70.7c21.7-64.6 81.9-112.6 153-112.3z"
              fill="#EA4335"
            />
          </svg>
        </button>

        {/* زر إنشاء حساب */}
        <button 
          className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-semibold text-sm px-4 py-3 rounded-full transition hover:brightness-110 mb-3"
          onClick={()=> router.push('/auth/register')}
        >
          إنشاء حساب جديد
        </button>

        {/* زر تسجيل دخول */}
        <button 
          className="w-full border border-white/40 text-white font-semibold text-sm px-4 py-3 rounded-full hover:bg-white/10 transition"
          onClick={()=> router.push('/auth/login')}
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}
