"use client"
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function UploadFile({file, setFile}) {
  // const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10 ميغا

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        alert("الملف أكبر من 10 ميغا اصلو شنو هو!");
      } else {
        setFile(selectedFile);
      }
    }
    // مهم: نمسح القيمة عشان نقدر نعيد اختيار نفس الملف
    e.target.value = null;
  };

  const removeFile = () => {
    setFile(null);
    // لو حبيت تمسح الانبوت بالريف
    // inputRef.current.value = null;
  };

  
  const viewFile = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };
  // نجيب امتداد الملف uppercase عشان نحطه في البادج
  const ext = file?.name.split(".").pop().toUpperCase();
  
   
  return (
       <div className=" rounded-xl shadow-lg overflow-hidden p-6 bg-gray-200 dark:bg-gray-900">
        {/* عنوان البطاقة */}
        <h2 className="text-center text-xl font-bold " style={{color: "darkcyan"}}>رفع اشعار التحويل</h2>

        {/* منطقة الرفع */}
        <label
          htmlFor="file-upload"
          className="mt-4 block border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 hover:dark:bg-gray-950 rounded-lg py-8 cursor-pointer transition"
        >
          <div className="flex flex-col items-center text-blue-500">
            {/* أيقونة السحابة */}
            <FontAwesomeIcon icon={faCloudArrowUp} className="text-6xl"/>

            <span className="text-sm font-medium">اضغط لرفع الصورة</span>
          </div>
          <input
            ref={inputRef}
            id="file-upload"
            type="file"
            accept=""
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* عنوان المرفوعات */}
        {
          file && (

            <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">المستندات المرفوعة</p>
          )
        }

        {/* قائمة الملف المرفوع */}
        {file && (
          <div className="mt-2 flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-black rounded-lg px-3 py-2">
            {/* بادج الامتداد واسم الملف */}
            <div className="flex items-center overflow-hidden gap-3">
              <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {ext}
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200 truncate max-w-xs">
                {file.name}
              </span>
            </div>
            {/* أزرار العرض والحذف */}
            <div className="flex items-center gap-2">
              <button
                onClick={viewFile}
                className="text-sm text-blue-500 font-medium hover:underline"
              >
                عرض
              </button>
              <button
                onClick={removeFile}
                className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
);
}
