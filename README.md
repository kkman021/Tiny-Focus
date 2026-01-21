# TinyFocus - 幼兒專注力訓練遊戲

這是一個針對 3 歲幼兒設計的網頁版專注力訓練遊戲 (改良版舒爾特方格)。

## 功能特色
- **適配手機/平板**: 滿版設計，防止誤觸。
- **語音導引**: 內建「溫柔老師」、「機器人」、「好朋友」三種語音模式。
- **防亂按機制**: 錯誤時畫面凍結 1.5 秒，引導幼兒觀察。
- **正向回饋**: 星星收集與過關煙火特效。

## 開發技術
- Vue 3 + TypeScript + Vite
- Tailwind CSS
- Pinia (State Management)
- VueUse (TTS, Window Size)

## 如何執行

1. 安裝依賴
   ```bash
   npm install
   ```

2. 啟動開發伺服器
   ```bash
   npm run dev
   ```
   
3. 建置生產版本
   ```bash
   npm run build
   ```

## 部署
本專案已設定好可直接部署至 Cloudflare Pages。
- Build command: `npm run build`
- Output directory: `dist`
