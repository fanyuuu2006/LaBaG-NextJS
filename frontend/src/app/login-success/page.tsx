"use client";
import { Toast } from "@/components/common/Toast";
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
      Toast.fire({
        icon: "success",
        text: "登入成功",
      });
      router.replace("/Profile");
    } else {
      console.error("未成功取得 Token");
      Toast.fire({
        icon: "error",
        text: "登入失敗",
      });
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
