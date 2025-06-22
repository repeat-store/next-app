"use client";
import { ToastContainer, toast } from "react-toastify";

import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import fetchWithRefresh from "@/lib/fetchWithRefrech";
import {
  LogOut,
  Ticket,
  Trophy,
  Medal,
  // Image as ImageIcon,
  ArrowLeft,
  LogIn,
} from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../lib/domen";
 

const ProfileCard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    joinedAt: "",
    tickets: 0,
    tournaments: 0,
    wins: 0,
    image: ""
  });

  // const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("refresh_token");
    if (!token) return;

    setIsAuthenticated(true);

    (async () => {
      try {
        const data = await fetchWithRefresh(`${API_BASE_URL}/api/profile`);

        setProfile({
          name: data.name || "",
          joinedAt: data.joinedAt
            ? new Date(data.joinedAt).toLocaleDateString("en-SA", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
            : "تاريخ غير معروف",
          tickets: data.tickets || 0,
          tournaments: data.tournaments || 0,
          wins: data.wins || 0,
          image: data.image || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsAuthenticated(false);
      }
    })();
  }, []);

  // const handleUploadClick = () => fileInputRef.current?.click();
  // const handleFileChange = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // handle upload...
  //   }
  // };

  const handleOrderClick = () => router.push("/my_orders");
  const handleTournamentClick = () => router.push("/pubg-battle");
  const handleLogout = () =>  {
    const confirmLogout = window.confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟");
      if (confirmLogout) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      toast.success("تم تسجيل الخروج بنجاح");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google/redirect`;
  };
  const goLogin = () => router.push("/auth/login");
  const goRegister = () => router.push("/auth/register");

  const getInitials = (name) =>
    name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

      if (!isAuthenticated) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-sm bg-white dark:bg-zinc-800 rounded-3xl shadow-xl p-8 space-y-6 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                أهلاً بك في ربيت ستور 👋
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                سجّل الدخول أو أنشئ حسابًا لمتابعة الطلبات والمشاركة في البطولات.
              </p>
      
              {/* زر تسجيل الدخول */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={goLogin}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
              >
                <LogIn className="w-5 h-5" />
                تسجيل الدخول
              </motion.button>
      
              {/* زر إنشاء حساب */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={goRegister}
                className="w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition"
              >
                إنشاء حساب جديد
              </motion.button>
      
              <div className="text-gray-400">أو</div>
      
              {/* تسجيل باستخدام Google */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 bg-red-400 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 533.5 544.3"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M533.5 278.4c0-17.7-1.6-34.9-4.6-51.5H272.1v97.5h146.9c-6.4 34.2-25.8 63.3-54.9 82.8v68.5h88.9c52-47.9 81.5-118.5 81.5-197.3z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.8 0 135.7-24.5 180.9-66.6l-88.9-68.5c-24.7 16.5-56.4 26.3-91.9 26.3-70.6 0-130.5-47.7-151.9-111.4H28.4v69.9c45.6 90.1 139.6 150.3 243.7 150.3z"
                    fill="#34a853"
                  />
                  <path
                    d="M120.2 324.1c-10.2-30.6-10.2-63.7 0-94.3V159.9H28.4c-38.9 77.7-38.9 169.8 0 247.5l91.8-69.3z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.3c39.9-.6 78.2 13.9 107.5 40.4l80.3-80.3C404.6 24.5 342.5 0 272.1 0 168 0 74 60.1 28.4 150.2l91.8 69.9c21.5-63.7 81.3-112.1 151.9-112.8z"
                    fill="#ea4335"
                  />
                </svg>
                المتابعة باستخدام جوجل
              </motion.button>
            </motion.div>
          </div>
        );
      }
      

  return (
    <> 
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 mt-20 bg-gradient-to-br from-white to-gray-100 dark:from-zinc-800 dark:to-zinc-900"
    >
      <div className="max-w-md w-full rounded-3xl shadow-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {/* <div className="absolute inset-0 bg-[url('/images/back.jpg')] bg-cover opacity-20" /> */}
        </div>

       <div className="-mt-16 flex justify-center relative">
        <div className="relative w-32 h-32 rounded-full ring-4 ring-white dark:ring-zinc-900 bg-gradient-to-br from-pink-400 to-purple-600 shadow-lg overflow-hidden">
          {profile.image ? (
            <img
              src={profile.image}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
              {getInitials(profile.name)}
            </div>
          )}
        </div>
      </div>


        {/* Info */}
        <div dir="rtl" className="text-center p-6 space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-14">
             عضو منذ {profile.joinedAt}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <Ticket className="w-6 h-6 text-green-500" />
              <span className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {profile.tickets}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">التذاكر</span>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="w-6 h-6 text-blue-500" />
              <span className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {profile.tournaments}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">البطولات</span>
            </div>
            <div className="flex flex-col items-center">
              <Medal className="w-6 h-6 text-yellow-500" />
              <span className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                {profile.wins}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">الفوز</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 mt-6">
            <button
              onClick={handleOrderClick}
              className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-zinc-600 rounded-2xl p-4 shadow hover:shadow-lg hover:scale-105 transition"
            >
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">سجل الطلبات</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  استعرض جميع الطلبات
                </p>
              </div>
              <ArrowLeft className="w-6 h-6 rotate-180 text-gray-500 dark:text-gray-300" />
            </button>

            <button
              onClick={handleTournamentClick}
              className="w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-zinc-600 rounded-2xl p-4 shadow hover:shadow-lg hover:scale-105 transition"
            >
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">سجل البطولات</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  استعرض مشاركاتك
                </p>
              </div>
              <ArrowLeft className="w-6 h-6 rotate-180 text-gray-500 dark:text-gray-300" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white rounded-xl py-3 font-semibold hover:bg-red-600 transition"
            >
              <LogOut className="w-5 h-5 rotate-180" />
              تسجيل الخروج
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </motion.div>
    </>
  );
};

export default ProfileCard;
