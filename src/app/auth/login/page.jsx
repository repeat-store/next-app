"use client"
import React, { useState } from 'react';
import '../auth.css';
import Cookies from 'js-cookie';
import { postData } from '../../../lib/api';
import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../../lib/domen';
 



const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  function handleForm(event) {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" }); // إزالة الخطأ عند التعديل
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    // تحقق من القيم الفارغة
    if (!form.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    }

    if (!form.password) {
      newErrors.password = "كلمة السر مطلوبة";
    } else if (form.password.length < 8) {
      newErrors.password = "كلمة السر يجب أن تكون 8 أحرف على الأقل";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const result = await postData(`${API_BASE_URL}/api/login`, form);

      if (result.access_token) {
        Cookies.set('access_token', result.access_token, {expires: 170});
        Cookies.set('refresh_token', result.refresh_token, {expires: 170});
        router.replace('/');
      }
    } catch (err) {
      if (err.response) {
        const res = err.response;
    
        if (res.status === 422) {
          const laravelErrors = res.data.errors || {};
          Object.values(laravelErrors).forEach((messages) => {
            toast.error(messages[0]); // يعرض أول رسالة خطأ من كل حقل
          });
        } else if (res.status === 401) {
           toast.error("يا زول، شوف الإيميل أو الباسورد، في غلط واضح 😂");
        } else {
          toast.error("يا زول، شوف الإيميل أو الباسورد، في غلط واضح 😂");
        }
      } else {
        toast.error("تعذر الاتصال بالسيرفر. تأكد من الشبكة.");
      }
    }    
  }

  const handleGogleButton = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google/redirect`;
  };

  const translate = () => {
    router.push('/auth/register');
  };

  const getInputProps = (field, type, defaultPlaceholder) => {
    return {
      type,
      name: field,
      className: `input ${errors[field] ? 'border-red-500 placeholder-red-500' : ''}`,
      placeholder: errors[field] || defaultPlaceholder,
      value: errors[field] ? "" : form[field],
      onChange: handleForm,
      dir: 'rtl',
    };
  };

  return (
    <>
     
    <div style={{ width: "100vw", height: "100svh", backgroundColor: "#212121" }}>
      <div className="auth-container container top-1/2 left-1/2"
        style={{
          position: "absolute",
          transform: "translate(-50%,-50%)",
        }}>
        <div className="login-box">
          <form className="form" method='post' onSubmit={handleSubmit}>
            <div className="logo" />
            <span className="header">تسجيل الدخول</span>

            <input {...getInputProps("email", "email", "ادخل الايميل")} autoComplete="email" />
            <input {...getInputProps("password", "password", "ادخل كلمة السر")} />

            <button type="button" className="forget-btn" onClick={translate}>
              ليس لديك حساب؟ سجل حساب جديد
            </button>

            <button type="submit" className="button sign-in mb-3">تسجيل الدخول</button>

          </form>
            <button className="button google-sign-in" onClick={handleGogleButton}>
              <svg className="icon" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
                <g>
                  <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                  <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                  <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                  <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                </g>
              </svg>
              <span className="span two">تسجيل الدخول عن طريق جوجل</span>
            </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
