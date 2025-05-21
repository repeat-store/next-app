'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../lib/domen';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('فشل تسجيل الدخول');
      }

      const data = await res.json();
      const token = data.token;

      // خزّن التوكن في الكوكيز
      Cookies.set('admin_token', token, { expires: 7 });

      // إعادة التوجيه إلى لوحة التحكم
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError('فشل تسجيل الدخول، تحقق من البيانات');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">تسجيل دخول الأدمن</h2>

        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}

        <input
          type="text"
          placeholder="البريد الإلكتروني"
          className="w-full mb-3 border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          className="w-full mb-4 border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}
