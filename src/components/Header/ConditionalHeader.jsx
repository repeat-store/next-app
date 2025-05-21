"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const hideOn = [
    "/auth/login",
    "/auth/register",
    "/auth/google/callback", 
    "/pay_page",   
  ];
  const shouldShowHeader = (pathname) => 
    !hideOn.includes(pathname) && !
  pathname.startsWith("/admin");

  return shouldShowHeader(pathname) ? <Header /> : null;
}
