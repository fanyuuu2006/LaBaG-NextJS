# 啦八機 (Next.js version)

**嘗試透過實作學習**

1. JavaScript
2. React
3. Next.js

[前往遊玩](https://labag-nextjs.vercel.app/)

## 專案結構 Project Structure

```plaintext
├── .eslintrc.json                          # ESLint 配置文件，管理 JavaScript 程式碼檢查規則
├── .gitignore                              # Git 忽略的檔案清單，排除不需要追蹤的檔案
├── README.md                               # 項目說明文檔，通常包含項目的描述和使用說明
├── jsconfig.json                           # JavaScript 配置文件，定義項目的根目錄與模組解析設置
├── next.config.mjs                         # Next.js 配置文件，包含應用程式的相關設定
├── package-lock.json                       # 記錄具體依賴版本的檔案，確保一致的依賴
├── package.json                            # 項目的 NPM 配置文件，包含依賴、腳本等設定
├── public                                  # 公開的靜態資源文件夾
│   └── Superhhh.ico                        # 網站或應用程序的圖標
└── src                                     # 來源碼文件夾
    ├── assets                              # 存放資源檔案的資料夾，如圖片、音效等
    ├── app                                 # 存放主要應用程式邏輯的資料夾
    │   ├── Toast.jsx                       # 顯示 Toast 訊息的組件
    │   ├── game                            # 遊戲相關頁面與組件
    │   │   ├── backend                     # 後端邏輯（遊戲規則等）
    │   │   │   ├── LaBaG.js                # LaBaG 遊戲核心邏輯
    │   │   │   ├── P.js                    # LaBaG 的圖案符號
    │   │   │   ├── PlayLaBaG.js            # 提供遊玩的 LaBaG
    │   │   │   └── test.js                 # 測試程式碼
    │   │   ├── components                  # 遊戲頁面的相關組件資料夾
    │   │   │   ├── BackButton.jsx          # 返回按鈕組件
    │   │   │   ├── BeginButton.jsx         # 開始遊戲按鈕組件
    │   │   │   ├── InfoText.jsx            # 顯示遊戲相關資訊訊息組件
    │   │   │   ├── MusicButton.jsx         # 音樂開關按鈕組件
    │   │   │   ├── Pictures.jsx            # 啦八機得分圖片顯示的組件
    │   │   │   ├── PopPicture.jsx          # 彈出圖片組件
    │   │   │   └── TitlePicture.jsx        # 顯示標題圖片的組件
    │   │   └── page.jsx                    # 遊戲頁面的主組件
    │   ├── gameover                        # 遊戲結束頁面
    │   │   ├── components                  # 遊戲結束頁面相關組件資料夾
    │   │   │   ├── AgainButton.jsx         # 再玩一次按鈕組件
    │   │   │   ├── InfoText.jsx            # 顯示遊戲結束訊息
    │   │   │   └── ScoresPicture.jsx       # 顯示分數計算規則圖片的組件
    │   │   └── page.jsx                    # 遊戲結束頁面的主組件
    |   ├── components                      # 根頁面相關組件資料夾
    │   │   └── CirclePicture.jsx           # 每月訪客數組件
    │   ├── layout.jsx                      # 全站頁面的佈局設計
    │   └── page.jsx                        # 根頁面組件
    └── styles                              # 存放 CSS 檔案的資料夾
        ├── Toast.css                       # Toast 訊息的樣式表
        ├── InfoSwal.css                    # InfoSwal 彈窗的樣式表
        └── global.css                      # 全局樣式表，設定通用的樣式規則
```
