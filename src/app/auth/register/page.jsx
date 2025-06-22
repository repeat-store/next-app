"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import "../auth.css";
import { postData } from "../../../lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../../lib/domen";
import VerifyCodeInput from "./VerifyCodeInput";
import Image from "next/image";
import {
   FaUser, 
   FaEnvelope, 
   FaLock, 
   FaEye, 
   FaEyeSlash,
   FaUserPlus, 
   FaSignInAlt 
  } from "react-icons/fa";



const RegisterForm = () => {
  const [step, setStep] = useState("register"); // أو "verify"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [emailToVerify, setEmailToVerify] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" });
    setForm({ ...form, [name]: value });
  };

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

  const handleSubmit = async (event) => {
  event.preventDefault();
  const clientErrors = validate();
  if (Object.keys(clientErrors).length > 0) {
    setErrors(clientErrors);
    return;
  }

  setIsLoading(true); // ← ابدأ اللودينج

  try {
    const result = await postData(`${API_BASE_URL}/api/register`, form);
    setEmailToVerify(form.email);
    setStep("verify");
    toast.success("تم إرسال رمز التحقق إلى بريدك الإلكتروني 📩");
  } catch (err) {
    if (err.response && err.response.status === 422) {
      const laravelErrors = err.response.data.errors || {};
      const formattedErrors = {};
      Object.keys(laravelErrors).forEach((key) => {
        formattedErrors[key] = laravelErrors[key][0];
      });
      setErrors(formattedErrors);
      if (laravelErrors.email?.[0]?.includes("مستخدم")) {
        toast.error("البريد الإلكتروني مستخدم بالفعل 📨");
      }
    } else {
      toast.error("حدث خطأ أثناء التسجيل، حاول مرة أخرى");
    }
  } finally {
    setIsLoading(false); // ← أوقف اللودينج
  }
};

  const handleVerifyCode = async (code) => {
    try {
      const result = await postData(`${API_BASE_URL}/api/verify-code`, {
        email: emailToVerify,
        code,
      });
      Cookies.set("access_token", result.access_token);
      Cookies.set("refresh_token", result.refresh_token);
      router.replace("/");
    } catch (err) {
      toast.error("رمز التحقق غير صحيح أو منتهي ⛔");
    }
  };
 
  const translate = () => router.push("/auth/login");

  const handleGogleButton = (e) => {
    e.preventDefault();
    window.location.href = `${API_BASE_URL}/api/auth/google/redirect`;
  };

  const getInputProps = (field, type, defaultPlaceholder) => {
    const isPasswordField = field === "password" || field === "password_confirmation";
    return {
      type: isPasswordField ? (showPassword ? "text" : "password") : type,
      name: field,
      className: `input pr-10 ${errors[field] ? "border-red-500 placeholder-red-500" : ""}`,
      placeholder: errors[field] || defaultPlaceholder,
      value: errors[field] ? "" : form[field],
      onChange: handleForm,
      dir: "rtl",
    };
  };


  return (
    <div className="w-screen h-svh dark:bg-[#212121] dark:from-gray-900 dark:via-[#1e1e1e] dark:to-gray-800 bg-gradient-to-br from-blue-100 via-white to-purple-100 ">
      {step === "register" ? (
        <div
          className="auth-container container top-1/2 left-1/2 bg-amber-50"
          style={{
            position: "absolute",
            transform: "translate(-50%,-50%)",
            ["--aspect-ratio"]: "1.73",
          }}
        >
          <div className="login-box  bg-amber-50">
            <form className="form" method="post" onSubmit={handleSubmit}>

              <div className='logo'>
                <Image
                  src={`/images/logo.png`}
                  alt={`logo`}
                  width={1200}
                  height={800}
                />
              </div>

               <span className="header">انشاء حساب جديد</span>

              {/* اسم المستخدم */}
              <div className="relative w-full">
                <input {...getInputProps("name", "text", "اسم المستخدم")} />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* الإيميل */}
              <div className="relative w-full">
                <input {...getInputProps("email", "email", "البريد الإلكتروني")} autoComplete="email" />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* كلمة السر */}
              <div className="relative w-full">
                <input {...getInputProps("password", "password", "كلمة السر")} />
                <span
                  className="absolute left-9 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* تأكيد كلمة السر */}
              <div className="relative w-full">
                <input {...getInputProps("password_confirmation", "password", "تأكيد كلمة السر")} />
                <span
                  className="absolute left-9 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <button type="button" className="forget-btn flex items-center gap-1" onClick={translate}>
                <FaSignInAlt />
                <span>لديك حساب بالفعل؟ سجل الدخول</span>
              </button> 

             <button type="submit" className="button sign-in mb-3 flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaUserPlus />
                  <span>إنشاء الحساب</span>
                </>
              )}
            </button>


            </form>

            <button className="button google-sign-in" onClick={handleGogleButton}>
              <svg
                className="icon"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.5-37-4.8-54.8H272v103.9h147.5c-6.4 34.7-25.5 64.4-54.2 84.3v69.8h87.4c51-47 80.8-116.2 80.8-203.2z" />
                <path fill="#34A853" d="M272 544.3c73.7 0 135.5-24.4 180.6-66.5l-87.4-69.8c-24.3 16.3-55.5 25.9-93.2 25.9-71.6 0-132.2-48.2-153.9-112.9H26v70.9c45.2 89.8 138.8 152.4 246 152.4z" />
                <path fill="#FBBC05" d="M118.1 321c-10.7-31.6-10.7-65.7 0-97.3V152.7H26c-41.9 83.8-41.9 182.1 0 265.9l92.1-97.6z" />
                <path fill="#EA4335" d="M272 107.4c39.9-.6 78.3 13.8 107.5 40.6l80.4-80.4C417.5 23.4 345.9-2 272 0 164.8 0 71.2 62.6 26 152.7l92.1 70.9c21.7-64.7 82.3-112.9 153.9-116.2z" />
              </svg>
              <span className="span two">تسجيل الدخول عن طريق غوغل</span>
            </button>
          </div>
        </div>
      ) : (
        <VerifyCodeInput
          email={emailToVerify}
          onSubmit={handleVerifyCode}
          onResend={async () => {
          await postData(`${API_BASE_URL}/api/register`, form);
            }}
          onEdit={() => setStep("register")}
        />
      )}
    </div>
  );
};

export default RegisterForm;
