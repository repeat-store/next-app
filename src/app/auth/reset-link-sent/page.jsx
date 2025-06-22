"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ResetLinkSent = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-[#1e1e1e] dark:to-gray-800 transition-all">
      <div className="bg-white dark:bg-[#1f1f1f] shadow-2xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full animate-bounce">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">تم الإرسال بنجاح</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.
          الرجاء التحقق من بريدك واتبع التعليمات.
        </p>

        <button
          onClick={() => router.push("/auth/login")}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transition-all"
        >
          العودة لتسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default ResetLinkSent;
