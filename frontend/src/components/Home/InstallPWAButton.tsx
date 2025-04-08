import { useNowMode } from "@/context/NowModeContext";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState, useEffect } from "react";
import ModeColors from "@/json/ModeColors.json";
import { Toast } from "../common/Modal";
interface BeforeInstallPromptEvent extends Event {
  prompt?: () => void;
  userChoice?: Promise<{ outcome: string; platform: string }>;
}

export const InstallPWAButton = () => {
  const { NowMode } = useNowMode();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault(); // 阻止默認的安裝提示
      setDeferredPrompt(e); // 保存事件對象
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt); // 瀏覽器發現該網站符合 PWA 安裝條件時，會觸發 beforeinstallprompt 事件

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt?.(); // 顯示安裝提示
      deferredPrompt.userChoice?.then(
        (choiceResult: { outcome: string; platform: string }) => {
          if (choiceResult.outcome === "accepted") {
            console.log("用戶安裝了 PWA");
            Toast.fire({
              icon: "info",
              title: "正在開始安裝",
            });
          } else {
            console.log("用戶拒絕安裝");
          }
          setDeferredPrompt(null);
        }
      );
    }
  };

  return (
    <>
      {deferredPrompt && (
        <Button
          icon={<DownloadOutlined />}
          onClick={handleInstallClick}
          type="text"
          className="Hint"
          style={{
            padding: "1em",
            color: "#FFFFFF",
            backgroundColor: ModeColors[NowMode].dark,
            border: `${ModeColors[NowMode].light} solid 2px`,
            borderRadius: "5px",
          }}
        >
          安裝 APP
        </Button>
      )}
    </>
  );
};
