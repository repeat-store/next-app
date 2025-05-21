import Cookies from 'js-cookie';
import refreshToken from './refresh_token';

const postWithRefresh = async (url, data = {}, customHeaders = {}) => {
  let token = Cookies.get('access_token');

  // إعداد الهيدر الأساسي
  let headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders
  };

  // أول محاولة للطلب
  let response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  // إذا فشل بسبب انتهاء التوكن (401 أو 500)، نحاول نحدّث التوكن ونعيد المحاولة
  if (response.status === 401 || response.status === 500) {
    const newAccessToken = await refreshToken();

    if (newAccessToken) {
      headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
    }
  }

  // التعامل مع فشل الاستجابة
  if (!response.ok) {
    const error = new Error('فشل في الاتصال بالسيرفر');
    error.status = response.status;
    throw error;
  }

  // إرجاع البيانات بصيغة JSON
  return await response.json();
};

export default postWithRefresh;
