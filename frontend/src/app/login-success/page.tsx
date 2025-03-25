"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginSeccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 從 URL 取得 token
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      // 儲存 token 到 localStorage
      localStorage.setItem("authToken", token);

      router.replace("/Profile");
    } else {
      console.error("未成功取得 Token");
      router.replace("/Login"); // 跳回登入頁面
    }
  }, [router]);

  return (
    <section>
      <div className="Title" style={{ color: "#FFFFFF" }}>
        登入中...
      </div>
    </section>
  );
}
