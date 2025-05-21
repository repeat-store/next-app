"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { RefreshCcw, Copy } from "lucide-react";
import { API_BASE_URL } from "../../../../lib/domen";


export default function OrderNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchNotifications = async () => {
    const token = Cookies.get("admin_token");
    if (!token) return alert("لم يتم العثور على التوكن");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("فشل جلب الإشعارات");
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("خطأ في جلب الإشعارات:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    if (!confirm(`هل أنت متأكد من ${status === "approved" ? "قبول" : "رفض"} الطلب؟`)) return;

    const token = Cookies.get("admin_token");
    if (!token) return alert("لم يتم العثور على التوكن");

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("فشل تحديث الحالة");

      showToast(`تم ${status === "approved" ? "قبول" : "رفض"} الطلب بنجاح`);
      fetchNotifications();
    } catch (error) {
      showToast("فشلت العملية");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("تم النسخ إلى الحافظة");
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className =
      "fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow-lg z-50 animate-fade";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto bg-gray-50 min-h-screen" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">إشعارات الطلبات</h2>
        <button
          onClick={fetchNotifications}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <RefreshCcw className="w-5 h-5" />
          تحديث
        </button>
      </div>

      {notifications.length === 0 && !loading && (
        <p className="text-gray-500">لا توجد طلبات حالياً.</p>
      )}

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.public_order_id}
            className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition text-sm md:text-base"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
              <p><strong>رقم الطلب:</strong> {n.public_order_id}</p>
              <p><strong>اسم المستخدم:</strong> {n.user_name}</p>
              <p><strong>إيميل المستخدم:</strong> {n.user_email}</p>
              <p className="flex items-center gap-2">
                <strong>معرف اللعبة:</strong> {n.user_gameID || "-"}
                {n.user_gameID && (
                  <button onClick={() => copyToClipboard(n.user_gameID)}>
                    <Copy className="w-4 h-4 text-blue-500" />
                  </button>
                )}
              </p>
              <p><strong>اللعبة:</strong> {n.game_name}</p>
              <p><strong>المنتج:</strong> {n.product_name}</p>
              <p><strong>الكمية:</strong> {n.quantity}</p>
              <p><strong>السعر:</strong> {n.price} SDG</p>
              <p className="flex items-center gap-2">
                <strong>رقم الواتساب:</strong> {n.whatsapp_number}
                <button onClick={() => copyToClipboard(n.whatsapp_number)}>
                  <Copy className="w-4 h-4 text-green-600" />
                </button>
              </p>
              <p><strong>الحالة:</strong> {n.status}</p>
              <p><strong>تاريخ الإنشاء:</strong> {new Date(n.created_at).toLocaleString()}</p>
            </div>

            {n.img && (
              <div className="mt-4 space-y-2">
                <img
                  src={`${API_BASE_URL}/storage/${n.img}`}
                  alt="صورة التحويل"
                  className="w-48 h-auto hover:scale-105 transform transition rounded border"
                />
                <button
                  onClick={() => setSelectedImage(`${API_BASE_URL}/storage/${n.img}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm"
                >
                  تكبير الصورة
                </button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(n.id, "approved")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
              >
                قبول
              </button>
              <button
                onClick={() => updateStatus(n.id, "rejected")}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                رفض
              </button>
              <a
                href={`https://wa.me/${n.whatsapp_number}?text=${encodeURIComponent(
                  `مرحباً ${n.user_name}\nتم شحن طلبك بنجاح.\nرقم الطلب: ${n.public_order_id}\nاللعبة: ${n.game_name}\nالمنتج: ${n.product_name}\nالكمية: ${n.quantity}\nالسعر: ${n.price} SDG\nشكرًا لاستخدامك ريبيت ستور ❤️`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                واتساب
              </a>
            </div>

            {selectedImage && (
              <div
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer backdrop-blur-sm"
              >
                <img
                  src={selectedImage}
                  alt="صورة مكبرة"
                  className="max-w-full max-h-full rounded shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade {
          animation: fade 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
