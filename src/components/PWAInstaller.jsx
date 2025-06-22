'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

export default function PwaPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) return;

    const permanentlyDismissed = localStorage.getItem('pwa-dismissed-permanently');
    if (permanentlyDismissed) return;

    const laterCount = parseInt(localStorage.getItem('pwa-later-count') || '0', 10);
    if (laterCount < 2) {
      localStorage.setItem('pwa-later-count', (laterCount + 1).toString());
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    const fallbackTimeout = setTimeout(() => {
      setShowPrompt(true);
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(fallbackTimeout);
    };
  }, []);

  useEffect(() => {
    if (!showPrompt) return;
    if (countdown === 0) {
      handleDismiss();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showPrompt, countdown]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      console.log(result.outcome === 'accepted' ? 'User accepted install' : 'User dismissed install');
    }
    localStorage.setItem('pwa-dismissed-permanently', 'true');
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-later-count', '0');
    setShowPrompt(false);
  };

  const handleNeverShow = () => {
    localStorage.setItem('pwa-dismissed-permanently', 'true');
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[400px] rounded-2xl px-6 py-5 backdrop-blur-lg bg-white/80 dark:bg-[#1f1f1f]/80 border border-gray-300 dark:border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-center"
        >
          <div className="flex flex-col items-center space-y-3">
            <img
              src="/images/logo.png"
              alt="App Icon"
              className="w-16 h-16 rounded-xl shadow-lg"
            />

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              🎮 حمل تطبيق المتجر الآن!
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              ثبّت التطبيق واستمتع بتجربة ألعاب أسرع وأسهل!
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full pt-2">
              <motion.button
                onClick={handleInstall}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-violet-500 to-blue-500 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md hover:from-violet-600 hover:to-blue-600 transition-all w-full sm:w-auto flex items-center gap-2 justify-center"
              >
                <FaDownload />
                تثبيت التطبيق
              </motion.button>

              <button
                onClick={handleDismiss}
                className="text-yellow-700 dark:text-yellow-400 text-sm font-medium hover:underline flex items-center gap-1"
              >
                  {countdown}
                <FaHourglassHalf />
                لاحقًا
                <span className="ml-1 inline-block text-xs font-bold bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 px-2 py-0.5 rounded-full">
                </span>
              </button>

              <button
                onClick={handleNeverShow}
                className="text-xs text-red-500 dark:text-red-400 hover:underline transition flex items-center gap-1"
              >
                <FaTimesCircle className="text-sm" />
                لا تظهر لي مجددًا
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
