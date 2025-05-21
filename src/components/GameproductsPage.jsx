'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../lib/domen';

export default function GameProductsPage({ gameId }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const fetchProducts = async () => {
    const token = Cookies.get('admin_token');
    if (!token) return alert('لا يوجد توكن');
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/games/${gameId}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('فشل في جلب المنتجات:', err);
    }
  };

  const openPriceModal = (product) => {
    setCurrentProduct(product);
    setNewPrice(product.price);
    setShowModal(true);
  };

  const confirmUpdatePrice = async () => {
    const token = Cookies.get('admin_token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products/${currentProduct.id}/update-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ price: Number(newPrice) }),
      });

      if (res.ok) {
        fetchProducts();
        alert('✅ تم تعديل السعر بنجاح');
      } else {
        alert('❌ فشلت عملية تعديل السعر');
      }
    } catch (err) {
      alert('❌ حدث خطأ أثناء تعديل السعر');
    } finally {
      setShowModal(false);
    }
  };

  const confirmDelete = async (id) => {
    const confirm = window.confirm('هل أنت متأكد من حذف هذا المنتج؟');
    if (!confirm) return;

    const token = Cookies.get('admin_token');
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchProducts();
        alert('✅ تم حذف المنتج بنجاح');
      } else {
        alert('❌ فشلت عملية الحذف');
      }
    } catch (err) {
      alert('❌ حدث خطأ أثناء الحذف');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">منتجات اللعبة</h2>
      <div className="bg-white p-4 rounded shadow space-y-2">
        {products.map(p => (
          <div key={p.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-gray-600 mt-1">{p.price} SDG</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openPriceModal(p)}
                className="text-blue-600 hover:underline"
              >
                تعديل السعر
              </button>
              <button
                onClick={() => confirmDelete(p.id)}
                className="text-red-600 hover:underline"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* المودال لتعديل السعر */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 space-y-4">
            <h3 className="text-lg font-semibold">تعديل السعر</h3>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                إلغاء
              </button>
              <button
                onClick={confirmUpdatePrice}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
