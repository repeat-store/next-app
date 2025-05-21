"use client";
import React, { useEffect, useState } from 'react';
import OrderItem from '../../components/OrderItem';
import fetchWithRefresh from '../../lib/fetchWithRefrech';
import { motion } from "framer-motion";
import Cookies from 'js-cookie';
import BottomNav from '../../components/NavButton/ButtonList';
import { API_BASE_URL } from '../../lib/domen';
import { useRouter } from 'next/navigation';


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [filterDate, setFilterDate] = useState('الكل');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter;

  const translateStatus = {
    pending: "قيد التنفيذ",
    approved: "تم",
    rejected: "مرفوض",
  };

  useEffect(() => {
    const token = Cookies.get('refresh_token'); // أو حسب طريقة تخزينك

    if (!token) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await fetchWithRefresh(`${API_BASE_URL}/api/my_orders`);
        setOrders(data);
      } catch (err) {
        setError("فشل تحميل الطلبات");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getDateRange = (range) => {
    const today = new Date();
    switch (range) {
      case 'اليوم':
        return new Date(today.setHours(0, 0, 0, 0));
      case 'أسبوع':
        return new Date(today.setDate(today.getDate() - 7));
      case 'شهر':
        return new Date(today.setMonth(today.getMonth() - 1));
      case '6 شهور':
        return new Date(today.setMonth(today.getMonth() - 6));
      case 'سنة':
        return new Date(today.setFullYear(today.getFullYear() - 1));
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const translated = translateStatus[order.status] || order.status;
    const statusMatch = filterStatus === 'الكل' || translated === filterStatus;
    const dateThreshold = getDateRange(filterDate);
    const dateMatch = filterDate === 'الكل' || new Date(order.date) >= dateThreshold;
    return statusMatch && dateMatch;
  });

  const total = filteredOrders
    .filter(order => (translateStatus[order.status] || order.status) === 'تم')
    .reduce((acc, order) => acc + order.price, 0);

  return (
    <>
     
    <div className="container mx-auto px-4 pt-20 pb-20 min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" dir="rtl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-zinc-800 dark:text-white tracking-tight"> قائمة الطلبات</h1>

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              عدد الطلبات : {filteredOrders.length} <br /> الإجمالي بالجنيه : {total} جنيه
            </div>

            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:scale-105"
              >
                <option value="الكل">كل الحالات</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="تم">تم</option>
                <option value="مرفوض">مرفوض</option>
              </select>

              <select
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:scale-105"
              >
                <option value="الكل">كل التواريخ</option>
                <option value="اليوم">اليوم</option>
                <option value="أسبوع">آخر أسبوع</option>
                <option value="شهر">آخر شهر</option>
                <option value="6 شهور">آخر 6 شهور</option>
                <option value="سنة">آخر سنة</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.length === 0 ? (
              <div className="text-center mt-20 col-span-full">
                <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
                  ليس لديك طلبات
                </p>
                <button
                  onClick={() =>  router.push('/')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  🚀 قم بالطلب الآن
                </button>
              </div>
            ) : (
              [...filteredOrders]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(order => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OrderItem order={order} />
                  </motion.div>
              ))
            )}
          </div>
          <BottomNav/>
        </>
      )}
    </div>
    </>
  );
}
