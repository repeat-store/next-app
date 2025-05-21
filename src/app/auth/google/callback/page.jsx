'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../../lib/domen';

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (code) {
        fetch(`${API_BASE_URL}/api/auth/google/callback?code=${code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (res) => {
            const data = await res.json();
            console.log(data);

            if (data.access_token && data.refresh_token) {
              Cookies.set('access_token', data.access_token);
              Cookies.set('refresh_token', data.refresh_token);
              router.push('/');
            } else {
              router.push('/error');
            }
          })
          .catch((err) => {
            console.error('Error fetching callback:', err);
            router.push('/error');
          });
      }
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mb-6"></div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200">
          جاري تسجيل الدخول بحساب Google... 😅
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          لحظة بس، بنجهز ليك الحاجات 🎮
        </p>
      </div>
    </div>
  );
}
