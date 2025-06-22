'use client';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { MailCheck, ArrowLeft, RefreshCcw } from 'lucide-react';

const VerifyCodeInput = ({ onSubmit, email, onResend, onEdit }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [shake, setShake] = useState(false);
  const inputsRef = useRef([]);
  const soundRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (seconds === 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    const finalCode = code.join('');
    if (finalCode.length === 6 && !error) handleSubmit();
  }, [code]);

  const playClickSound = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    }
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...code];
    updated[index] = value;
    setCode(updated);
    playClickSound();

    if (value && index < 5) inputsRef.current[index + 1]?.focus();
    setError('');
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const finalCode = code.join('');
    if (finalCode.length !== 6) {
      setError('الرمز يجب أن يتكون من 6 أرقام');
      triggerShake();
      return;
    }

    setIsLoading(true); // بدأ اللودينج
    setError('');

    try {
      await onSubmit(finalCode);
    } catch (err) {
      setError('حدث خطأ أثناء التحقق من الرمز');
      triggerShake();
    } finally {
      setIsLoading(false); // انتهى اللودينج
    }
  };


  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleResend = async () => {
    try {
      await onResend();
      toast.success('تم إرسال رمز جديد 📩');
      setSeconds(60);
      setCanResend(false);
      setCode(['', '', '', '', '', '']);
    } catch {
      toast.error('حدث خطأ أثناء إعادة الإرسال');
    }
  };

  const renderTimer = () => {
    const percent = (seconds / 60) * 100;
    return (
      <div className="relative w-10 h-10 mx-auto mt-4">
        <svg className="transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-blue-500"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${percent}, 100`}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 dark:text-gray-300">
          {seconds}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#fdf2f8] to-[#ecfeff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4"
    >
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 shadow-2xl border border-white/20 dark:border-gray-700 rounded-3xl p-6 sm:p-8 w-full max-w-md text-center"
      >
        {/* صوت النقر */}
        <audio ref={soundRef} src="/sounds/click.wav" preload="auto" />

        <div className="flex justify-center mb-4">
          <MailCheck size={52} className="text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">تحقق من بريدك الإلكتروني</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">تم إرسال رمز التحقق إلى:</p>
        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-6 break-all">{email}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2 sm:gap-3">
            {code.map((digit, i) => (
              <motion.input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                animate={{ scale: digit ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 shadow-sm transition-all backdrop-blur-md"
              />
            ))}
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl shadow-md hover:shadow-lg transition font-semibold flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'تأكيد الرمز'
            )}
          </motion.button>

        </form>

        {!canResend ? renderTimer() : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={handleResend}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition"
          >
            <RefreshCcw size={16} />
            إعادة إرسال الرمز
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={onEdit}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium transition"
        >
          <ArrowLeft size={16} />
          تعديل البيانات
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default VerifyCodeInput;
