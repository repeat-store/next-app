'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../lib/domen';


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

  return (
    <div className="space-y-4 p-4 max-w-xl mx-auto" dir="rtl">
      <h2 className="text-xl font-semibold">إدارة الألعاب</h2>

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
