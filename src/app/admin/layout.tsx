"use client"
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden bg-gray-800 text-white p-3"
      >
        ☰ القائمة
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white shadow-md p-4 space-y-4 z-10 fixed md:static top-12 md:top-0 left-0 md:left-0 h-screen md:h-auto overflow-y-auto`}
      >
        <h2 className="text-xl font-bold mb-6">لوحة التحكم</h2>
        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="block hover:bg-gray-100 p-2 rounded">الصفحة الرئيسية</Link>
          <Link href="/admin/users" className="block hover:bg-gray-100 p-2 rounded">المستخدمون</Link>
          <Link href="/admin/orders/notifications" className="block hover:bg-gray-100 p-2 rounded">إشعارات الطلبات</Link>
          <Link href="/admin/orders" className="block hover:bg-gray-100 p-2 rounded">كل الطلبات</Link>
          <Link href="/admin/games" className="block hover:bg-gray-100 p-2 rounded">الألعاب</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 mt-2 md:mt-0">
        {children}
      </main>
    </div>
  );
}
