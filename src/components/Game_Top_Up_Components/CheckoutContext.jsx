'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [product, setProduct] = useState('');
  const [method, setMethod] = useState('bankak');
  const [userInfo, setUserInfo] = useState({ id: '', whatsapp: '', server: ''});
  const [name, setName] = useState('');
  const [nameEN, setNameEN] = useState('');
  

  // نستخدم sessionStorage فقط داخل صفحة الدفع
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('checkout')) {
      const saved = sessionStorage.getItem('checkout');
      if (saved) {
        const data = JSON.parse(saved);
        setProduct(data.product || '');
        setMethod(data.method || 'bankak');
        setUserInfo(data.userInfo || { id: '', whatsapp: '' , server: ''});
        setName(data.name || '');
        setNameEN(data.nameEN || '');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('checkout')) {
      const data = { product, method, userInfo, name, nameEN};
      sessionStorage.setItem('checkout', JSON.stringify(data));
    }
  }, [product, method, userInfo, name, nameEN]);

  return (
    <CheckoutContext.Provider value={{
      product, setProduct,
      method, setMethod,
      userInfo, setUserInfo,
      name, setName,
      nameEN, setNameEN
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};
export const useCheckout = () => useContext(CheckoutContext);