'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../lib/domen';

export default function DashboardPage() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const fetchAdminData = async () => {
    const token = Cookies.get("admin_token");
    if (!token) return alert('لم يتم العثور على التوكن');

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('فشل في تحميل البيانات');

      const data = await res.json();
      setAdmin(data);
    } catch (error) {
      console.error('خطأ:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOnlineStatus = async () => {
    const token = Cookies.get("admin_token");
    if (!token) return alert('لم يتم العثور على التوكن');

    try {
      setToggling(true);

      const res = await fetch(`${API_BASE_URL}/api/admin/toggle-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('فشل في تغيير الحالة');

      const data = await res.json();

      setAdmin((prev) => ({
        ...prev,
        is_online: data.is_online,
      }));
    } catch (error) {
      console.error('خطأ:', error);
    } finally {
      setToggling(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-600">جاري التحميل...</div>;

  return (
    <div dir="rtl" className="max-w-2xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">لوحة تحكم الأدمن</h2>
          <button
            onClick={fetchAdminData}
            className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition"
          >
            تحديث البيانات
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-semibold">الاسم:</span> {admin.name}</p>
          <p><span className="font-semibold">الإشعارات:</span> <span className="text-blue-600 font-bold">{admin.notifications}</span></p>
          <p>
            <span className="font-semibold">الحالة:</span>{' '}
            <span className={admin.is_online ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {admin.is_online ? 'متصل' : 'غير متصل'}
            </span>
          </p>
        </div>

        <button
          onClick={toggleOnlineStatus}
          disabled={toggling}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition disabled:opacity-50"
        >
          {toggling ? 'جارٍ التغيير...' : 'تغيير الحالة'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">الحسابات البنكية</h3>

        {admin.bank_accounts.length > 0 ? (
          <ul className="list-disc pr-5 space-y-2 text-gray-700">
            {admin.bank_accounts.map((account) => (
              <li key={account.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span>
                    <span className="font-medium">{account.account_name}</span> - {account.account_number}
                  </span>
                  <span className={account.is_available ? 'text-green-600' : 'text-red-600'}>
                    {account.is_available ? 'فعال ✅' : 'غير متاح ❌'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">لا توجد حسابات بنكية !</p>
        )}
      </div>
    </div>
  );
}
