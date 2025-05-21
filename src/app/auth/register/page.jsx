"use client"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../auth.css';
import { postData } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../../lib/domen';
 


const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  function handleForm(event) {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" }); // حذف الخطأ عند الكتابة

    setForm({ ...form, [name]: value });
  }

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "الاسم مطلوب";
    if (!form.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }

    if (!form.password) {
      newErrors.password = "كلمة السر مطلوبة";
    } else if (form.password.length < 8) {
      newErrors.password = "كلمة السر يجب أن تكون 8 أحرف على الأقل";
    }

    if (form.password_confirmation !== form.password) {
      newErrors.password_confirmation = "كلمتا السر غير متطابقتين";
    }

    return newErrors;
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      const result = await postData(`${API_BASE_URL}/api/register`, form);

      if (result.access_token) {
        Cookies.set('access_token', result.access_token);
        Cookies.set('refresh_token', result.refresh_token);
        router.replace('/');
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const laravelErrors = err.response.data.errors || {};
        const formattedErrors = {};
        Object.keys(laravelErrors).forEach((key) => {
          formattedErrors[key] = laravelErrors[key][0];
        });
        setErrors(formattedErrors);

        // لو البريد مستخدم بالفعل
        if (laravelErrors.email?.[0]?.includes('مستخدم')) {
          toast.error('البريد الإلكتروني مستخدم بالفعل 📨');
        }
      } else {
         toast.error('البريد الإلكتروني مستخدم بالفعل 📨');
       }
    }
  }

  const translate = () => router.push('/auth/login');

  const handleGogleButton = (e) => {
    e.preventDefault();
    window.location.href = `${API_BASE_URL}/api/auth/google/redirect`;
  };

  const getInputProps = (field, type, defaultPlaceholder) => {
    return {
      type,
      name: field,
      className: `input ${errors[field] ? 'border-red-500 placeholder-red-500' : ''}`,
      placeholder: errors[field] || defaultPlaceholder,
      value: errors[field] ? "" : form[field],
      onChange: handleForm,
      dir: 'rtl'
    };
  };

  return (
    <>
     
    
    <div style={{ width: "100vw", height: "100svh", backgroundColor: "#212121" }}>
      <div className="auth-container container top-1/2 left-1/2"
        style={{
          position: "absolute",
          transform: "translate(-50%,-50%)",
          ['--aspect-ratio']: '1.63',
        }}>
        <div className="login-box">
          <form className="form" method='post' onSubmit={handleSubmit}>
            <div className="logo" />
            <span className="header">انشاء حساب جديد</span>

            <input {...getInputProps("name", "text", "اسم المستخدم")} />
            <input {...getInputProps("email", "email", "الايميل")} autoComplete="email" />
            <input {...getInputProps("password", "password", "كلمة السر")} />
            <input {...getInputProps("password_confirmation", "password", "تاكيد كلمة السر")} />

            <button type="button" className="forget-btn " onClick={translate}>
              لديك حساب بالفعل ؟ سجل الدخول
            </button>

            <button type="submit" className="button sign-in mb-3">انشاء الحساب</button>
          </form>

            <button className="button google-sign-in" onClick={handleGogleButton}>
              <svg className="icon" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-37-4.8-54.8H272v103.9h147.5c-6.4 34.7-25.5 64.4-54.2 84.3v69.8h87.4c51-47 80.8-116.2 80.8-203.2z"/>
                <path fill="#34A853" d="M272 544.3c73.7 0 135.5-24.4 180.6-66.5l-87.4-69.8c-24.3 16.3-55.5 25.9-93.2 25.9-71.6 0-132.2-48.2-153.9-112.9H26v70.9c45.2 89.8 138.8 152.4 246 152.4z"/>
                <path fill="#FBBC05" d="M118.1 321c-10.7-31.6-10.7-65.7 0-97.3V152.7H26c-41.9 83.8-41.9 182.1 0 265.9l92.1-97.6z"/>
                <path fill="#EA4335" d="M272 107.4c39.9-.6 78.3 13.8 107.5 40.6l80.4-80.4C417.5 23.4 345.9-2 272 0 164.8 0 71.2 62.6 26 152.7l92.1 70.9c21.7-64.7 82.3-112.9 153.9-116.2z"/>
              </svg>
              <span className="span two">تسجيل الدخول عن طريق غوغل</span>
            </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterForm;
