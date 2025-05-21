"use client";
import React from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { API_BASE_URL } from "../lib/domen";

function OrderItem({ order }) {
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
      icon: <Clock size={16} className="inline mr-1" />,
      text: "text-yellow-800 dark:text-yellow-200",
    },
    "تم": {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-800 dark:text-green-200",
      icon: <CheckCircle size={16} className="inline mr-1" />,
    },
    "مرفوض": {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-800 dark:text-red-200",
      icon: <XCircle size={16} className="inline mr-1" />,
    },
  };

  const translatedStatus = translateStatus[order.status] || order.status;
  const style = statusStyles[translatedStatus] || {};

  const orderNumber = order.orderNumber || "";
  const phone = orderNumber.startsWith("L") ? "966575248673" : "249115982710";

  const message = `مرحباً، لدي استفسار عن الطلب التالي:\n\nرقم الطلب: ${order.orderNumber}\nالمنتج: ${order.name}\nالقيمة: ${order.value}\nالكمية: ${order.quantity}\nالمبلغ المدفوع: ${order.price} جنيه\nتاريخ الطلب: ${order.date}\nالحالة: ${translatedStatus}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <div className="relative flex gap-4 bg-white dark:bg-gray-800 rounded-2xl p-5 mb-5 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <img
        src={`${API_BASE_URL}/storage/${order.img}`}
        alt={order.name}
        className="w-24 h-44 rounded-xl object-cover border border-gray-200 dark:border-gray-600"
      />
      <div className="flex flex-col justify-between w-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">{order.name}</h3>
          <div className="text-sm space-y-1 leading-relaxed">
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">رقم الطلب:</span>{" "}
              <span className="text-gray-500 dark:text-gray-300">{order.orderNumber}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">المنتج:</span>{" "}
              <span className="text-gray-500 dark:text-gray-300">{order.value}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">الكمية:</span>{" "}
              <span className="text-gray-500 dark:text-gray-300">{order.quantity}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">المبلغ المدفوع:</span>{" "}
              <span className="text-gray-500 dark:text-gray-300">{order.price} جنيه</span>
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-white">تاريخ الطلب:</span>{" "}
              <span className="text-gray-500 dark:text-gray-300">{order.date}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 relative">
          <span
            className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${style.bg} ${style.text}`}
          >
            {style.icon}
            {translatedStatus}
          </span>

          {/* زر واتساب */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-0 hover:scale-110
            left-1 text-white bg-[#25D366] hover:bg-green-600 p-2 rounded-full shadow-md transition duration-200"
            title="تواصل بخصوص الطلب"
          >
            <FaWhatsapp size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
