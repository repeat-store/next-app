"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { postData } from "../../../lib/api";
import { API_BASE_URL } from "../../../lib/domen";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    if (form.password !== form.password_confirmation) {
      toast.error("تأكيد كلمة المرور لا يطابق");
      return;
    }

    try {
      setLoading(true);
      await postData(`${API_BASE_URL}/api/reset-password`, {
        email,
        token,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });

      toast.success("تم إعادة تعيين كلمة المرور بنجاح");
      router.replace("/auth/login");
    } catch (err) {
      toast.error("حدث خطأ أثناء إعادة التعيين. تأكد من صحة الرابط.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-red-100 to-red-300 dark:from-[#1a1a1a] dark:to-[#2a2a2a]">
        <div className="bg-white dark:bg-[#1f1f1f] p-6 rounded-2xl shadow-lg text-center text-red-700 dark:text-red-400 font-bold text-lg animate-pulse">
          الرابط غير صالح أو مفقود.
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-[#1a1a1a] dark:via-[#222] dark:to-[#111] transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#1f1f1f] border border-gray-100 dark:border-gray-700 rounded-3xl shadow-xl p-10 w-full max-w-md animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          🔑 إعادة تعيين كلمة المرور
        </h2>

        <div className="mb-5">
          <label className="block text-right text-sm text-gray-600 dark:text-gray-300 mb-1">
            كلمة المرور الجديدة
          </label>
          <input
            type="password"
            name="password"
            dir="rtl"
            value={form.password}
            onChange={handleChange}
            placeholder="أدخل كلمة مرور جديدة"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2c] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-8">
          <label className="block text-right text-sm text-gray-600 dark:text-gray-300 mb-1">
            تأكيد كلمة المرور
          </label>
          <input
            type="password"
            name="password_confirmation"
            dir="rtl"
            value={form.password_confirmation}
            onChange={handleChange}
            placeholder="أعد كتابة كلمة المرور"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2c2c2c] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-xl text-white transition duration-300 ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "جارٍ الإرسال..." : "إعادة التعيين"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
