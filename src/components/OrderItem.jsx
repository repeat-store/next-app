"use client";
import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, ClipboardCopy, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { API_BASE_URL } from "../lib/domen";
import toast, { Toaster } from "react-hot-toast";

function OrderItem({ order }) {
  const [showCodeBox, setShowCodeBox] = useState(false);

  const translateStatus = {
    pending: "قيد التنفيذ",
    approved: "تم",
    rejected: "مرفوض",
    "قيد التنفيذ": "قيد التنفيذ",
    "تم": "تم",
    "مرفوض": "مرفوض",
  };

  const statusStyles = {
    "قيد التنفيذ": {
      bg: "bg-yellow-100 dark:bg-yellow-900",
      icon: <Clock size={16} />,
      text: "text-yellow-800 dark:text-yellow-200",
    },
    "تم": {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-800 dark:text-green-200",
      icon: <CheckCircle size={16} />,
    },
    "مرفوض": {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-800 dark:text-red-200",
      icon: <XCircle size={16} />,
    },
  };

  const translatedStatus = translateStatus[order.status] || order.status;
  const style = statusStyles[translatedStatus] || {};

  const orderNumber = order.orderNumber || "";
  const phone = orderNumber.startsWith("L") ? "966575248673" : "966575248673";

  const message = `مرحباً، لدي استفسار عن الطلب التالي:\n\nرقم الطلب: ${order.orderNumber}\nالمنتج: ${order.name}\nالقيمة: ${order.value}\nالكمية: ${order.quantity}\nالمبلغ المدفوع: ${order.price} جنيه\nتاريخ الطلب: ${order.date}\nالحالة: ${translatedStatus}`;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  const handleShowCode = () => {
    if (order.code) {
      setShowCodeBox(true);
    } else {
      toast.error("يجب أن يتم التحقق من الطلب أولاً");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(order.code);
    toast.success("تم نسخ الكود");
  };

  return (
    <div className="relative flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-5 mb-5 shadow hover:shadow-lg transition-all duration-300">
      <Toaster position="top-center" reverseOrder={false} />
      {/* <img */}
    <img src={order.img} alt="صورة الطلب" className="rounded-xl w-26 h-50 object-cover" />
        {/* // alt={order.name} */}
        {/* className="w-24 h-44 rounded-xl object-cover border border-gray-200 dark:border-gray-700" */}
      {/* /> */}

      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {order.name}
          </h3>
          <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <p>
              <strong>رقم الطلب:</strong> {order.orderNumber}
            </p>
            <p>
              <strong>المنتج:</strong> {order.value}
            </p>


            {order.type === "card" && (
              <>
                <p>
                  <strong>الدولة:</strong> {order.country}
                </p>
              </>
            )}

            {order.type !== "card" && (
              <>
                <p>
                  <strong>الايدي:</strong> {order.code}
                </p>
                {order.server && (
                  <p>
                    <strong>معرف السيرفر:</strong> {order.server}
                  </p>
                )}
                <p>
                  <strong>الكمية:</strong> {order.quantity}
                </p>
              </>
            )}

            <p>
              <strong>المبلغ المدفوع:</strong> {order.price.toLocaleString('en-US')} جنيه
            </p>
            <p>
              <strong>تاريخ الطلب:</strong> {order.date}
            </p>

            {order.type === "card" && (
              <>
                <button
                  onClick={handleShowCode}
                  className="mt-3 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition"
                >
                  عرض الكود
                </button>

                {showCodeBox && (
                  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-900 w-96 max-w-full p-5 rounded-2xl shadow-xl relative">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                          كود البطاقة
                        </h4>
                        <button onClick={() => setShowCodeBox(false)}>
                          <X className="text-red-500 hover:text-red-700" size={22} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded">
                        <span className="text-gray-900 dark:text-white break-all text-sm">
                          {order.code}
                        </span>
                        <button onClick={handleCopy} title="نسخ">
                          <ClipboardCopy
                            className="text-blue-600 hover:text-blue-800"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${style.bg} ${style.text}`}
          >
            {style.icon}
            {translatedStatus}
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-green-600 text-white p-2 rounded-full shadow transition-transform duration-200 hover:scale-110"
            title="تواصل عبر واتساب"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
