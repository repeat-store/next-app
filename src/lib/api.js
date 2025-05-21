export const postData = async (url = '', data = {}, token = '') => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const error = new Error(result.message || 'حدث خطأ');
      error.response = {
        status: response.status,
        data: result,
      };
      throw error;
    }

    return result;
  } catch (error) {
    console.error('خطأ أثناء الإرسال:', error);
    throw error;
  }
};


export const getData = async (url = '',  token = '') => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), // يضيف التوكن فقط إذا وُجد
    };
  
    try {
      const response = await fetch(url, {
        method: 'get',
        headers,
         
      });
  
      if (!response.ok) {
        const error = new Error('فشل في جلب البيانات');
        error.status = response.status;
        throw error;
      }
  
      return await response.json();
    } catch (error) {
      console.error('خطأ أثناء الإرسال:', error);
      throw error;
    }
};

 