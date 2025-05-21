"use client"
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faBars,
  faHome,
  faTrophy,
  faClipboardList,
  faUserCircle,
  faInfoCircle,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faCircle,
  faGamepad
} from "@fortawesome/free-solid-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { usePathname } from 'next/navigation'; 
import Switch from './ToggleButton';
import './logo.css'
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showById, setShowById] = useState(false);
  const [showByAccount, setShowByAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("refresh_token");
    setIsLoggedIn(!!token);
  }, []);

  const menuItemClasses = (active) =>
    `flex items-center justify-between w-full px-4 py-2 rounded-xl transition-all duration-300 ${
      active
        ? "bg-yellow-400 text-white font-semibold shadow-lg"
        : "hover:bg-gray-200 dark:hover:bg-gray-800"
    }`;

  const subItemContainerClasses =
    "bg-gray-100 dark:bg-gray-800 border-r-4 border-yellow-400 rounded-tl-xl rounded-br-xl ml-6 p-3 space-y-1";

  const subItemClasses = (active) =>
    `flex items-center gap-2 pl-4 pr-4 py-2 rounded-lg transition-all duration-300 ${
      active
        ? "bg-yellow-300 text-white font-semibold shadow-inner"
        : "hover:bg-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <header className="flex fixed rounded-b-2xl items-center justify-between px-4 py-4 bg-gray-100 dark:bg-gray-950 shadow-md w-full top-0 right-0 z-10">
      <div>
        <Switch/>
      </div>

      <div className="text-xl font-bold text-center flex-1/2 loader">         
        <span>RepeatStore</span>
        <span>RepeatStore</span>
      </div>

      <button className="text-gray-600 focus:outline-none" onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faBars} size='2x'/>
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-100"
          style={{backgroundColor: "#0000009e"}}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 z-110 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto shadow-2xl rounded-l-3xl`}
        style={{ direction: "rtl" }}
      >
        <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 p-6 flex justify-between items-center z-90">
          <h2 className="text-3xl font-bold">القائمة</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-red-500 text-3xl hover:text-red-700 transition"
          >
            ×
          </button>
        </div>

        <nav className="mt-4 space-y-4 text-lg px-6">
          <a
            href="/"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
              pathname === "/"
                ? "bg-yellow-400 text-white font-semibold shadow-lg"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <FontAwesomeIcon icon={faHome} />
            الصفحة الرئيسية
          </a>

          <div>
            <button
              onClick={() => setShowById(!showById)}
              className={menuItemClasses(false)}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faGamepad} />
                الشحن بالإيدي
              </div>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={`transition-transform duration-300 ${
                  showById ? "-rotate-90" : ""
                }`}
              />
            </button>
            {showById && (
              <div className={subItemContainerClasses}>
                {[
                  { label: "ببجي", path: "/game/id/pubg-mobile" },
                  { label: "فري فاير", path: "/game/id/free" },
                  { label: "موبايل ليجند", path: "/game/id/mobile-legends" },
                  { label: " ببجي لايت", path: "/game/id/pubg-lite" },
                ].map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className={subItemClasses(pathname === item.path)}
                  >
                    <FontAwesomeIcon icon={faCircle} size="xs" />
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowByAccount(!showByAccount)}
              className={menuItemClasses(false)}
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faTiktok} />
                الشحن بالحساب
              </div>
              <FontAwesomeIcon
                icon={faAngleLeft}
                className={`transition-transform duration-300 ${
                  showByAccount ? "-rotate-90" : ""
                }`}
              />
            </button>
            {showByAccount && (
              <div className={subItemContainerClasses}>
                {[
                  { label: "ببجي", path: "/game/acount/pubg-acount" },
                  { label: "عملات تيك توك", path: "/game/acount/tik-tok" },
                  { label: "كلاش اوف كلانس", path: "/game/acount/clash-of-clans" },
                  { label: "كلاش رويال", path: "/game/acount/clash-royale" },
                  { label: "براول ستارز", path: "/game/acount/brawl-stars" },
                  { label: "هاي داي", path: "/game/acount/hay-day" },
                   
                ].map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className={subItemClasses(pathname === item.path)}
                  >
                    <FontAwesomeIcon icon={faCircle} size="xs" />
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/pubg-battle"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
              pathname === "/pubg-battle"
                ? "bg-yellow-400 text-white font-semibold shadow-lg"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <FontAwesomeIcon icon={faTrophy} />
            بطولات ببجي
          </a>

          <a
            href="/my_orders"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
              pathname === "/my_orders"
                ? "bg-yellow-400 text-white font-semibold shadow-lg"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            طلباتي
          </a>

          <a
            href="/my_profile"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
              pathname === "/my_profile"
                ? "bg-yellow-400 text-white font-semibold shadow-lg"
                : "hover:bg-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            <FontAwesomeIcon icon={faUserCircle} />
            معلومات الحساب
          </a>

          <a
            href="/#footer"
            className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-800`}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            عن ربيت ستور
          </a>

          {!isLoggedIn ? (
            <>
              <a
                href="/auth/login"
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                تسجيل الدخول
              </a>
              <a
                href="/auth/register"
                className="flex items-center gap-3 px-4 py-2 mb-6 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                تسجيل حساب جديد
              </a>
            </>
          ) : (
            <button
              onClick={() => {
                const confirmLogout = window.confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟");
                if (confirmLogout) {
                  Cookies.remove("access_token");
                  Cookies.remove("refresh_token");
                  toast.success("تم تسجيل الخروج بنجاح");
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 1500);
                }
              }}
              className="flex items-center gap-3 mb-6 px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              تسجيل الخروج
            </button>
          )}
        </nav>
        <ToastContainer />
      </div>
    </header>
  );
}