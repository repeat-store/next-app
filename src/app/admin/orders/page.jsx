'use client';

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../../../lib/domen';

export default function AllOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [monthFilter, setMonthFilter] = useState('');
  const [adminFilter, setAdminFilter] = useState('');
  const [bankFilter, setBankFilter] = useState('');
  const [gameFilter, setGameFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showImages, setShowImages] = useState({});

  const months = [
    '', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const getToken = () => Cookies.get('admin_token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error('فشل جلب الطلبات:', err);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (monthFilter) {
      filtered = filtered.filter(o => parseInt(o.public_order_id?.charAt(2)) === parseInt(monthFilter));
    }
    if (adminFilter) {
      filtered = filtered.filter(o => o.public_order_id?.charAt(0) === adminFilter);
    }
    if (bankFilter) {
      filtered = filtered.filter(o => o.public_order_id?.charAt(1) === bankFilter);
    }
    if (gameFilter) {
      filtered = filtered.filter(o => o.public_order_id?.charAt(3) === gameFilter);
    }
    if (search) {
      filtered = filtered.filter(o => {
        const target = `${o.user?.name ?? ''} ${o.user?.email ?? ''} ${o.public_order_id ?? ''}`.toLowerCase();
        return target.includes(search.toLowerCase());
      });
    }

    setFilteredOrders(filtered);
  }, [orders, monthFilter, adminFilter, bankFilter, gameFilter, search]);

  const totalOrders = filteredOrders.length;
  const totalSales = filteredOrders.reduce((acc, o) => acc + parseFloat(o.price), 0);
  const totalProfit = filteredOrders.reduce((acc, o) => acc + parseFloat(o.profits), 0);

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['العميل', 'الإيميل', 'المنتج', 'المجموع', 'الربح', 'التاريخ']],
      body: filteredOrders.map(o => [
        o?.public_order_id ?? 'غير معروف',
        o.user?.name ?? 'غير معروف',
        o.user?.email ?? '',
        o.product?.name ?? '',
        `${(parseFloat(o.price)).toLocaleString()} SDG`,
        `${(parseFloat(o.profits)).toLocaleString()} SDG`,
        new Date(o.created_at).toLocaleDateString()
      ]),
      styles: { font: 'arabic' },
    });
    doc.save('الطلبات.pdf');
  };

  const exportToExcel = () => {
    const worksheetData = filteredOrders.map(o => ({
      'العميل': o?.public_order_id ?? 'غير معروف',
      'العميل': o.user?.name ?? 'غير معروف',
      'الإيميل': o.user?.email ?? '',
      'المنتج': o.product?.name ?? '',
      'المجموع': `${parseFloat(o.price).toLocaleString()} SDG`,
      'الربح': `${parseFloat(o.profits).toLocaleString()} SDG`,
      'التاريخ': new Date(o.created_at).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'الطلبات');
    XLSX.writeFile(workbook, 'الطلبات.xlsx');
  };

  return (
    <div className="space-y-6" dir='rtl'>
      <div className="bg-white p-4 rounded shadow space-y-4" dir='rtl'>
        <div className="flex flex-wrap gap-4">
          <select onChange={e => setMonthFilter(e.target.value)} className="border rounded p-2">
            <option value="">كل الشهور</option>
            {months.slice(1).map((month, index) => (
              <option key={index + 1} value={index + 1}>{month}</option>
            ))}
          </select>

          <select onChange={e => setAdminFilter(e.target.value)} className="border rounded p-2">
            <option value="">كل الأدمن</option>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <select onChange={e => setBankFilter(e.target.value)} className="border rounded p-2">
            <option value="">كل البنوك</option>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <select onChange={e => setGameFilter(e.target.value)} className="border rounded p-2">
            <option value="">كل الألعاب</option>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="بحث بالاسم أو الايميل أو رقم الطلب العام"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded p-2 flex-1"
          />

          <button onClick={exportToPDF} className="bg-green-600 text-white px-4 py-2 rounded">تصدير PDF</button>
          <button onClick={exportToExcel} className="bg-blue-600 text-white px-4 py-2 rounded">تصدير Excel</button>
        </div>

        <div className="flex justify-between mt-4">
          <div>إجمالي الطلبات: <strong>{totalOrders}</strong></div>
          <div>إجمالي المبيعات: <strong>{totalSales.toLocaleString()} SDG</strong></div>
          <div>إجمالي الربح: <strong>{totalProfit.toLocaleString()} SDG</strong></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">قائمة الطلبات</h2>
        <table className="w-full text-right border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">العميل</th>
              <th className="p-2">الإيميل</th>
              <th className="p-2">المنتج</th>
              <th className="p-2">معرف اللاعب</th>
              <th className="p-2">معرف السيرفر</th>
              <th className="p-2">المجموع</th>
              <th className="p-2">الربح</th>
              <th className="p-2">واتساب</th>
              <th className="p-2">الصورة</th>
              <th className="p-2">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="p-2">{order?.public_order_id ?? 'غير معروف'}</td>
                <td className="p-2">{order.user?.name ?? 'غير معروف'}</td>
                <td className="p-2">{order.user?.email ?? ''}</td>
                <td className="p-2">{order.product?.name ?? ''}</td>
                <td className="p-2">{order?.user_gameID ?? ''}</td>
                <td className="p-2">{order?.server_id ?? ''}</td>
                <td className="p-2">{(parseFloat(order.price*order.quantity)).toLocaleString()} </td>
                <td className="p-2">{(parseFloat(order.profits)).toLocaleString()} </td>
                <td className="p-2">{order.whatsapp_number}</td>
                <td className="p-2">
                  {order.img ? (
                    <button
                      onClick={() => setShowImages(prev => ({ ...prev, [index]: !prev[index] }))}
                      className="text-blue-600 hover:underline"
                    >
                      {showImages[index] ? 'إخفاء' : 'عرض'}
                    </button>
                  ) : 'لا توجد'}
                  {showImages[index] && order.img && (
                    <div className="mt-2">
                      <img src={`${order.img}`} alt="صورة التحويل" className="max-w-xs rounded shadow" />
                    </div>
                  )}
                </td>
                <td className="p-2">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
