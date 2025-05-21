"use client"

import React, { useEffect, useRef, useState } from 'react'
import ProductSelector from './ProductSelector'
import PayButton from './PayButton'
import PayMethod from './PayMethod'
import Input from './InputId'
import { useCheckout } from './CheckoutContext'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import postWithRefresh from '../../lib/postWithRefresh'
import AuthSection from '../AuthSection'
import { API_BASE_URL } from '../../lib/domen'

export default function CheckoutForm({ products, nam, namEN}) {
  const { product, setProduct, method, setMethod, userInfo, setUserInfo, name, setName, nameEN, setNameEN} = useCheckout()
  const router = useRouter()
  const [showAuth, setShowAuth] = useState(false)
  const authRef = useRef()

  useEffect(() => {
    if (nam) setName(nam)
  }, [nam])

  useEffect(() => {
    if (namEN) setNameEN(namEN)
  }, [namEN])

  // إغلاق AuthSection عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) {
        setShowAuth(false)
      }
    }

    if (showAuth) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAuth])

  const handleSubmit = async () => {
    if (!Cookies.get('refresh_token')) {
      setShowAuth(true)
      return
    }

    if (
      !product || 
      !userInfo?.id || 
      !userInfo?.whatsapp || 
      !method || 
      (nameEN === "mobile-legends" && !userInfo?.server)
    ) {
      alert("الرجاء تعبئة جميع الحقول المطلوبة.")
      return;
    }

    try {
      const response = await postWithRefresh(
        `${API_BASE_URL}/api/admin-account`,
        { bank_name: method }
      )

      if (response.account_id) {
        const data = { product, userInfo, method, name, nameEN, response }
        sessionStorage.setItem('checkout', JSON.stringify(data))
        console.log(data)
        router.push('/pay_page')
      } else {
        alert("فشل في جلب الحساب البنكي، تأكد من اختيار بنك صحيح أو حاول لاحقًا.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("حدث خطأ أثناء التواصل مع الخادم.")
    }
  }

  return (
    <div className="relative">
      <ProductSelector onSelect={setProduct} selected={product} products={products} />
      <Input details={userInfo} onChange={setUserInfo} name={namEN}/>
      <p className="dark:text-gray-50">اختر طريقة الدفع :-</p>
      <PayMethod onSelect={setMethod} selected={method} />
      <PayButton onClick={handleSubmit} />

      {showAuth && (
        // <div ref={authRef} className="inset-0 z-50">
          <AuthSection onClose={() => setShowAuth(false)}/>
        // </div>
      )}
    </div>
  )
}
