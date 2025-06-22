// app/auth/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<div className="text-center mt-10">جارٍ التحميل...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
