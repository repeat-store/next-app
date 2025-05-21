import Cookies from 'js-cookie';
import refreshToken from './refresh_token';

export const postFormData = async (url = '', formData, token = '') => {
  let authToken = token || Cookies.get('access_token');

  let headers = {
    ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
  };

  let response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  });

  // إذا انتهت صلاحية التوكن (Unauthorized أو Server Error)
  if (response.status === 401 || response.status === 500) {
    const newAccessToken = await refreshToken();

    if (newAccessToken) {
      headers['Authorization'] = `Bearer ${newAccessToken}`;

      // إعادة المحاولة بالتوكن الجديد
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });
    }
  }

  // إذا الاستجابة ما كانت ناجحة بعد المحاولة الثانية
  if (!response.ok) {
    console.error('خطأ أثناء الإرسال:', response.statusText);
    throw new Error(`خطأ: ${response.statusText}`);
  }

  // تحويل الاستجابة إلى JSON
  const data = await response.json();
  console.log('تم إرسال البيانات بنجاح:', data);
  return data;
};
