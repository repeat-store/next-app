import Cookies from 'js-cookie';
import refreshToken from './refresh_token';

const fetchWithRefresh = async (url, options = {}) => {
  const token = Cookies.get('access_token');
  
  // بناء الـ headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  // طلب الـ API الأول
  let response = await fetch(url, { 
    ...options, 
    headers 
  });

  // إذا رجع 401، حاول تعمل refresh للتوكن
  if (response.status === 401 || response.status === 500) {
    const newAccessToken = await refreshToken();

    if (newAccessToken) {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      
      // إعادة محاولة الطلب بالتوكن الجديد
      response = await fetch(url, { 
        ...options, 
        headers: retryHeaders 
      });
    }
  }

  // إذا كانت الاستجابة غير ناجحة، ارجع بالخطأ
  if (!response.ok) {
    const error = new Error('فشل في الاتصال');
    error.status = response.status;
    throw error;
  }

  return await response.json();
};

export default fetchWithRefresh;
