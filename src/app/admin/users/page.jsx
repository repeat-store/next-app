'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../lib/domen';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [sortedDesc, setSortedDesc] = useState(false);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('admin_token')
        const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('فشل في تحميل البيانات');

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = () => {
    const sorted = [...users].sort((a, b) =>
      sortedDesc
        ? a.tickets - b.tickets
        : b.tickets - a.tickets
    );
    setUsers(sorted);
    setSortedDesc(!sortedDesc);
  };

  const totalTickets = users.reduce((sum, user) => sum + Number(user.tickets), 0);

  return (
    <div className="bg-white p-4 rounded shadow" dir="rtl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-lg font-semibold">المستخدمون</h2>
        <div className="text-sm text-gray-700 font-medium">
          مجموع التذاكر: <span className="text-blue-600">{totalTickets}</span>
        </div>
        <button
          onClick={handleSort}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          ترتيب حسب التذاكر {sortedDesc ? 'تصاعدي' : 'تنازلي'}
        </button>
      </div>

      <table className="w-full text-right border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">id</th>
            <th className="p-2">الاسم</th>
            <th className="p-2">الإيميل</th>
            <th className="p-2">عدد التذاكر</th>
            <th className="p-2">تاريخ الانضمام</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.tickets}</td>
              <td className="p-2">
                {new Date(user.created_at).toLocaleDateString('ar-EG')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
