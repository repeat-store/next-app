'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../lib/domen';
import toast from 'react-hot-toast';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    const token = Cookies.get('admin_token');
    if (!token) {
      console.error('لا يوجد توكن');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/games`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('فشل في جلب الألعاب');
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error('خطأ:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleUpdatePrices = async () => {
    const dollarRate = prompt("أدخل سعر الدولار:");
    const rate = parseFloat(dollarRate);

    if (!rate || isNaN(rate) || rate <= 0) {
      toast.error("الرجاء إدخال رقم صحيح لسعر الدولار");
      return;
    }

    const token = Cookies.get('admin_token');
    if (!token) {
      toast.error("لا يوجد توكن، الرجاء تسجيل الدخول");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/update-prices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dollar_rate: rate }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("تم تحديث الأسعار بنجاح");
      } else {
        toast.error(data.message || "فشل في تحديث الأسعار");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  return (
    <div className="space-y-4 p-4 max-w-xl mx-auto" dir="rtl">
      <h2 className="text-xl font-semibold">إدارة الألعاب</h2>

      <button
        onClick={handleUpdatePrices}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        تحديث الأسعار حسب سعر الدولار
      </button>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="bg-white p-4 rounded shadow space-y-2">
          {games.length === 0 ? (
            <p className="text-gray-500">لا توجد ألعاب حالياً.</p>
          ) : (
            games.map((game) => (
              <div key={game.id} className="flex justify-between items-center border-b pb-2">
                <Link href={`/admin/games/${game.id}`} className="text-blue-600 font-medium hover:underline">
                  {game.name}
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
