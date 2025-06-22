"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import UploadFile from '../../components/Checkout_Componet/FileInput';
import { postFormData } from '../../lib/postOrderDataWithRefresh';
import './pay.css';
import { API_BASE_URL } from '../../lib/domen';

const CompletePay = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [file, setFile] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = sessionStorage.getItem('checkout');
    if (saved) {
      setCheckoutData(JSON.parse(saved));
    }
  }, []);

  if (!checkoutData) {
    return <p className="text-center mt-10 dark:text-white">جاري تحميل البيانات...</p>;
  }

  const playCopySound = () => {
    const audio = new Audio('/sounds/copy.mp3');
    audio.play();
  };

  const handleCopy = () => {
    const accountNumber = checkoutData.response.account_number;
    navigator.clipboard.writeText(accountNumber);
    playCopySound();
    setCopied(true);
    toast.success('تم نسخ رقم الحساب بنجاح ✅');
    setTimeout(() => setCopied(false), 2000);
  };

  const postOrder = async () => {
    if (!file) {
      toast.error('يرجى رفع إشعار التحويل أولاً.');
      return;
    }
    setIsLoading(true); // <-- بدء التحميل

    const formData = new FormData();
    formData.append('product_id', String(checkoutData.product.id));
    formData.append('account_id', String(checkoutData.response.account_id));
    formData.append('quantity', String(checkoutData.product.quantity));
    formData.append('whatsapp_number', checkoutData.userInfo.whatsapp);

    // ندمج ID + Server ID
    // let finalID = checkoutData.userInfo.id;
    // if (checkoutData.nameEN === 'mobile-legends' && checkoutData.userInfo.server) {
    //   finalID = `${checkoutData.userInfo.id} (${checkoutData.userInfo.server})`;
    // }
    formData.append('user_gameID', checkoutData.userInfo.id);
    formData.append('server_id', checkoutData.userInfo.server);
    formData.append('img', file);

    try {
      await postFormData(`${API_BASE_URL}/api/post_order`, formData);
      toast.success('تم إرسال الطلب بنجاح ✅');
      setFile(null);
      sessionStorage.removeItem('checkout');
      router.replace('/my_orders');
    } catch (err) {
      console.error(err);
      toast.error('حدث خطأ أثناء الإرسال.');
    } finally {
      setIsLoading(false); // <-- نهاية التحميل
    }
  };

  const getBankNameArabic = (key) => {
    const bankMap = {
      bankak: "بنكك",
      mycashe: "ماي كاشي",
      forey: "فوري",
    };
    return bankMap[key?.toLowerCase()] || key; // لو الاسم غير معروف، رجّع الأصل
  };


  return (
    <div className="p-4 bg-white dark:bg-gray-950" dir="rtl">
      <Toaster richColors position="top-center" />
      <div className="master-container container overflow-hidden" >
        {/* تفاصيل المنتج */}
        <div className="card cart bg-gray-200 dark:bg-gray-900 mt-1.5">
          <label className="title border-b-2 border-gray-100 dark:border-gray-800">تفاصيل المنتج</label>
          <div className="products">
            <div className="product">
              <img src={`/images/coins/${checkoutData.nameEN}.webp`} alt="عملات" />
              <div className="details">
                <span className="dark:text-gray-300">{checkoutData.name}</span>
                <div className="subDetails">
                  <p className="right-col dark:text-gray-300">فئة المنتج</p>
                  <p className="left-col">{checkoutData.product.label}</p>
                  <p className="right-col dark:text-gray-300">السعر</p>
                  <p className="left-col">{checkoutData.product.price.toLocaleString('en')} جنيه</p>
                  <p className="right-col dark:text-gray-300">الكمية</p>
                  <p className="left-col">{checkoutData.product.quantity}</p>
                  <hr className="mb-2 dark:text-gray-300" />
                  <hr className="mb-2 dark:text-gray-300" />
                  <p className="right-col dark:text-gray-300">الإجمالي</p>
                  <p className="left-col">{checkoutData.product.total.toLocaleString('en')} جنيه</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بيانات الطلب */}
        <div className="card coupons bg-gray-200 dark:bg-gray-900">
          <label className="title border-b-2 border-gray-100 dark:border-gray-800">بيانات الطلب</label>
          <div className="results p-4 mr-4">
            <p className="first dark:text-gray-300">معرف ال id :</p>
            <p className="second bg-gray-300 dark:bg-gray-700 dark:text-gray-100">{checkoutData.userInfo.id}</p>
            
            {checkoutData.nameEN === 'mobile-legends' && checkoutData.userInfo.server && (
              <>
                <p className="first dark:text-gray-300">سيرفر ID :</p>
                <p className="second bg-gray-300 dark:bg-gray-700 dark:text-gray-100">{checkoutData.userInfo.server}</p>
              </>
            )}

            <p className="first dark:text-gray-300">رقم الواتساب :</p>
            <p className="second bg-gray-300 dark:bg-gray-700 dark:text-gray-100">{checkoutData.userInfo.whatsapp}</p>
          </div>
        </div>

        {/* معلومات الدفع */}
        <div className="card checkout bg-gray-200 dark:bg-gray-900">
          <label className="title border-b-2 border-gray-100 dark:border-gray-800">معلومات الدفع</label>
          <div className="details mr-4 ml-4">
            <p className="text-xm dark:text-gray-200">يرجى تحويل المبلغ المطلوب إلى الحساب التالي ثم رفع إشعار التحويل</p>
            <div className="special-card bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-[10px_10px_60px_#bebebe,-10px_-10px_60px_#ffffff] dark:shadow-[20px_20px_60px_#0a0a0a,-20px_-20px_60px_#2a2a2a]">
              <ul className="mr-4 list-inside dark:text-gray-100">
                <li>البنك : {getBankNameArabic(checkoutData.response.bank_name)}</li>
                <li className="flex items-center gap-1 relative group">
                  <p className="ml-4">رقم الحساب : {checkoutData.response.account_number}</p>
                  <button onClick={handleCopy} className="Btn relative">
                    <svg viewBox="0 0 512 512" className="svgIcon" height="1em">
                      <path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z" />
                    </svg>
                    <p className="text">نسخ</p>
                    <span className="absolute bottom-full mb-1 right-0 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition">انسخ الرقم</span>
                  </button>
                  {/* {copied && <span className="absolute left-0 bottom-7 text-sm text-green-500 animate-fade-in-out">✅ تم النسخ!</span>} */}
                </li>
                <li>اسم الحساب : {checkoutData.response.account_name}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* رفع الإشعار */}
        <UploadFile file={file} setFile={setFile} />

        {/* إرسال الطلب */}
        <div className="checkout--footer bg-gray-300 dark:bg-gray-800 rounded-2xl">
          <button className="checkout-btn" onClick={postOrder} disabled={isLoading}>ارسال الطلب</button>
          <label className="price dark:text-gray-50">{checkoutData.product.total.toLocaleString('en')}<sup className="text-xl ">ج</sup></label>
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              جاري الإرسال...
            </span>
          ) 
          : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletePay;