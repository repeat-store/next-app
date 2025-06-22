'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import postWithRefresh from '../../../lib/postWithRefresh';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../../lib/domen";
import { postFormData } from '../../../lib/postOrderDataWithRefresh';
import { motion } from "framer-motion";

export default function Checkout({ formData, onBack }) {
  const [accountInfo, setAccountInfo] = useState(null);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!formData.paymentMethod) return;
    console.log(formData)

    const fetchAccountInfo = async () => {
      try {
        const res = await postWithRefresh(
          `${API_BASE_URL}/api/admin-account`,
          { bank_name: formData.paymentMethod }
        );
        setAccountInfo(res);
      } catch (err) {
        console.error(err);
        toast.error("حدث خطأ أثناء تحميل معلومات الحساب");
      }
    };

    fetchAccountInfo();
  }, [formData.paymentMethod]);

    const handleSubmitOrder = async () => {
        if (!file) return toast.error("يرجى رفع إشعار التحويل");

        setSubmitting(true);

        try {
            const form = new FormData();
            form.append("cardItem_id", formData.card_id); 
            form.append("account_id", accountInfo.account_id);
            form.append("whatsapp_number", formData.whatsapp || "");
            form.append("email", formData.email || "");
            form.append("img", file); // الصور
            console.log(form);
            const res = await postFormData(`${API_BASE_URL}/api/post_order`, form);

            toast.success("🚀 تم إرسال الطلب بنجاح!");
            console.log("الرد من السيرفر:", res);
            router.replace('/my_orders');


        } catch (error) {
            console.error(error);
            toast.error("❌ حدث خطأ أثناء إرسال الطلب");
        } finally {
            setSubmitting(false);
        }
    };


  const translateBankName = (name) => {
    switch (name?.toLowerCase()) {
      case "bankak":
        return "بنكك";
      case "mycashey":
        return "ماي كاشي";
      case "forey":
        return "فوري";
      default:
        return name;
    }
  };

  return (
    <div
      className="min-h-screen mt-18 bg-white dark:bg-gradient-to-br dark:from-[#1f1c2c] dark:to-[#928dab] flex items-center justify-center p-4 font-tajawal text-black dark:text-white"
      dir="rtl"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
        .font-tajawal {
          font-family: 'Tajawal', sans-serif;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl rounded-3xl border border-gray-200 dark:border-none bg-white dark:bg-gradient-to-tr dark:from-[#2c2c54] dark:to-[#706fd3]">
          <CardContent className="p-8 space-y-6">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-extrabold text-center mb-4"
            >
               تأكيد الطلب
            </motion.h2>

            <p className="text-center text-lg font-medium text-gray-700 dark:text-white">
              🧾 نوع البطاقة: {formData.name}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 gap-3 text-sm"
            >
              <p><span className="font-semibold">{formData.name === 'paypal' ? '💰 العملة:' : '🌍 الدولة:'}</span> {formData.countryName}</p>
              <p><span className="font-semibold">💳 قيمة البطاقة:</span> {formData.cardValue}</p>
              <p><span className="font-semibold">💰 السعر:</span> {formData.cardPrice.toLocaleString('en')} جنيه</p>
              <p><span className="font-semibold">📦 الاستلام عبر:</span> {formData.deliveryMethod === "whatsapp" ? "واتساب" : "إيميل"}</p>
              {formData.whatsapp && <p><span className="font-semibold">📱 رقم الواتساب:</span> {formData.whatsapp}</p>}
              {formData.email && <p><span className="font-semibold">📧 البريد الإلكتروني:</span> {formData.email}</p>}
              <p><span className="font-semibold">🏦 طريقة الدفع:</span> {formData.paymentMethod}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl border border-gray-200 dark:border-white/30"
            >
              <h3 className="text-md font-semibold mb-2">📝 معلومات الحساب البنكي</h3>
              {accountInfo ? (
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">اسم البنك:</span> {translateBankName(accountInfo.bank_name)}</p>
                  <p><span className="font-semibold">اسم الحساب:</span> {accountInfo.account_name}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">رقم الحساب:</p>
                    <span className="break-all">{accountInfo.account_number}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(accountInfo.account_number);
                        toast.success("📋 تم نسخ رقم الحساب");
                      }}
                      className="text-xs px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      نسخ
                    </button>
                  </div>
                  <div className="mt-4 p-3 rounded-lg bg-yellow-100 dark:bg-yellow-300/10 text-yellow-800 dark:text-yellow-200 text-sm border border-yellow-300 dark:border-yellow-500">
                    ⚠️ يجب عليك تحويل مبلغ <span className="font-bold">{formData.cardPrice.toLocaleString('en')} جنيه</span> إلى الحساب أعلاه، ثم رفع إشعار التحويل قبل الضغط على "إرسال الطلب".
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-white/70 animate-pulse">⏳ جارٍ تحميل بيانات الحساب...</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block font-semibold mb-2">📤 إشعار التحويل (صورة فقط)</label>
              <div
                onClick={() => document.getElementById("fileInput")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (!droppedFile) return;
                  if (droppedFile.type.startsWith("image/")) {
                    setFile(droppedFile);
                    toast.success("تم رفع الصورة بنجاح");
                  } else {
                    toast.error(" فقط الصور مسموح بها");
                  }
                }}
                className="relative cursor-pointer border-4 border-dashed border-gray-300 dark:border-white/20 bg-white dark:bg-black/30 rounded-2xl p-6 text-center transition-all hover:border-blue-500 hover:shadow-lg"
              >
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile && selectedFile.type.startsWith("image/")) {
                      setFile(selectedFile);
                      toast.success("✅ تم رفع الصورة بنجاح");
                    } else {
                      toast.error("❌ فقط الصور مسموح بها");
                    }
                  }}
                  className="hidden"
                />

                {!file ? (
                  <div className="flex flex-col items-center space-y-2 text-gray-500 dark:text-white/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-sm font-medium">اسحب الصورة هنا أو انقر لاختيارها</p>
                    <p className="text-xs text-gray-400">فقط الصور (PNG / JPG / JPEG)</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-40 h-40 object-cover rounded-xl border border-gray-300 shadow-lg"
                    />
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-2">
                      ✅ {file.name}
                    </p>
                    <button
                      onClick={() => setFile(null)}
                      className="mt-1 text-xs px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
                    >
                      🗑️ إزالة الصورة
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between items-center pt-4"
            >
              <Button
                variant="outline"
                onClick={onBack}
                className="rounded-full px-6 bg-gray-200 dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-white/30 hover:bg-gray-300 dark:hover:bg-white/20 transition duration-200"
              >
                🔙 رجوع
              </Button>
              <Button
                onClick={handleSubmitOrder}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition duration-300"
              >
                {submitting ? "🚀 جارٍ الإرسال..." : "✅ إرسال الطلب"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
