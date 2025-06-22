"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const hideOn = [
    "/pay_page",   
  ];
  const shouldShowHeader = (pathname) => 
    !hideOn.includes(pathname) && !
  pathname.startsWith("/admin") && !
  pathname.startsWith("/auth"); 


  return shouldShowHeader(pathname) ? <Header /> : null;
}
