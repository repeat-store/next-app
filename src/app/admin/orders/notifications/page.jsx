"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { RefreshCcw, Copy } from "lucide-react";
import { API_BASE_URL } from "../../../../lib/domen";

export default function OrderNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [codeInputs, setCodeInputs] = useState({});

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

  const updateStatus = async (orderId, status, user_gameID) => {
    if (!user_gameID) return alert("لا يمكن قبول الطلب بدون معرف اللاعب");
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

  const sendCodeToEmail = async (orderId, email, code) => {
    if (!code) return alert("الرجاء إدخال الكود أولاً");

    const token = Cookies.get("admin_token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, email }),
      });
      if (!res.ok) throw new Error("فشل إرسال الكود إلى البريد");
      showToast("تم إرسال الكود إلى البريد الإلكتروني بنجاح");
    } catch {
      showToast("فشل إرسال البريد الإلكتروني");
    }
  };

  const storeGameId = async (orderId, code) => {
    if (!code) return alert("الرجاء إدخال الكود أولاً");

    const token = Cookies.get("admin_token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/store-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) throw new Error("فشل تخزين معرف اللاعب");
      showToast("تم تخزين معرف اللاعب بنجاح");
      fetchNotifications();
    } catch {
      showToast("حدث خطأ أثناء التخزين");
    }
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
              <p><strong>إيميل المستخدم:</strong> {n.email}</p>
              <p className="flex items-center gap-2">
                <strong>معرف اللعبة:</strong> {n.user_gameID || "-"}
                {n.user_gameID && (
                  <button onClick={() => copyToClipboard(n.user_gameID)}>
                    <Copy className="w-4 h-4 text-blue-500" />
                  </button>
                )}
              </p>
              <p className="flex items-center gap-2">
                <strong>معرف السيرفر:</strong> {n.server_id || "-"}
                {n.user_gameID && (
                  <button onClick={() => copyToClipboard(n.server_id)}>
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
              <p><strong>الايميل:</strong> {n.email}</p>
              <p><strong>تاريخ الإنشاء:</strong> {new Date(n.created_at).toLocaleString()}</p>
            </div>

            {!n.user_gameID && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  placeholder="ادخل كود اللاعب"
                  value={codeInputs[n.id] || ""}
                  onChange={(e) =>
                    setCodeInputs({ ...codeInputs, [n.id]: e.target.value })
                  }
                  className="border rounded p-2 w-full"
                />
                <div className="flex gap-2 flex-wrap">
                  {n.email && (
                    <button
                      onClick={() => sendCodeToEmail(n.id, n.email, codeInputs[n.id])}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      إرسال عبر الإيميل
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${n.whatsapp_number}?text=${encodeURIComponent(`هذا هو كودك: ${codeInputs[n.id] || ""}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    إرسال عبر واتساب
                  </a>
                  <button
                    onClick={() => storeGameId(n.id, codeInputs[n.id])}
                    className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded"
                  >
                    تخزين الكود
                  </button>
                </div>
              </div>
            )}

            {n.img && (
              <div className="mt-4 space-y-2">
                <img
                  src={`${n.img}`}
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
                onClick={() => updateStatus(n.id, "approved", n.user_gameID)}
                className={`${
                  !n.user_gameID ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                } text-white px-4 py-2 rounded transition`}
                disabled={!n.user_gameID}
              >
                قبول
              </button>
              <button
                onClick={() => updateStatus(n.id, "rejected", true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
              >
                رفض
              </button>

              <a
                href={`https://wa.me/${n.whatsapp_number}?text=${encodeURIComponent(
                  `👤 ${n.user_name}، تم تنفيذ طلبك بنجاح ✅\n\n` +
                  `📦 رقم الطلب: ${n.public_order_id}\n` +
                  `🎮 اللعبة: ${n.game_name}\n` +
                  `🧾 المنتج: ${n.product_name}\n` +
                  `🔢 الكمية: ${n.quantity}\n` +
                  `💵 السعر: ${n.price} SDG\n` +
                  (n.user_gameID ? `🆔 معرف اللعبة: ${n.user_gameID}\n` : "") 
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                إرسال تم التنفيذ عبر واتساب
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
