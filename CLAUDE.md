# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TinyFocus - 幼兒專注力訓練遊戲（改良版舒爾特方格），針對 2-5 歲幼兒設計的網頁版專注力訓練遊戲。

## Tech Stack

- 純前端單檔案應用 (index.html)
- Tailwind CSS (via CDN)
- canvas-confetti (via CDN)
- Web Speech API (TTS 語音導引)
- Web Audio API (音效合成)

## Development

無需建置步驟，直接用瀏覽器開啟 `index.html` 或使用任意靜態伺服器：

```bash
npx serve .              # 或任意靜態伺服器
python -m http.server    # Python 內建伺服器
```

## Architecture

單檔案結構 (`index.html`)：

- **HTML 結構**：畫面區塊 (homeScreen, settingsPanel, gameScreen, 各 overlay)
- **CSS**：內嵌 `<style>` 區塊，包含動畫定義與元件樣式
- **JavaScript**：內嵌 `<script>` 區塊，包含：
  - `itemDatabase`: 題庫資料 (animals, fruits, vehicles, numbers, shapes, mixed)
  - `voiceProfiles`: 語音角色設定 (robot, normal, cheerful)
  - `gameConfig`: 遊戲設定狀態
  - `gameState`: 遊戲進行狀態

## Key Concepts

### 遊戲設定 (`gameConfig`)
- `mode`: '2x2' | '3x3' (格子數量)
- `category`: animals | fruits | vehicles | numbers | shapes | mixed
- `rounds`: 5-20 (題目數量)
- `voiceType`: robot | normal | cheerful
- 設定透過 localStorage 持久化

### 遊戲狀態 (`gameState`)
- `isFrozen`: 錯誤後 1.5 秒冷卻鎖定，防止幼兒亂按
- `stars`: 收集星星陣列，完成所有題目後顯示結果
- `mistakeCount`: 當題錯誤次數，0 錯得金星，有錯得銀星

### 畫面流程
1. homeScreen → 開始遊戲 / 設定
2. settingsPanel → 調整難度、主題、題數、語音
3. gameScreen → 遊戲主體，含 header (目標圖示)、星星進度、卡片區、底部進度
4. celebration overlays → 答對時短暫顯示
5. endGameOverlay → 遊戲結束統計

## Deployment

Cloudflare Pages (或任意靜態託管)：
- 直接部署 `index.html` 即可
- 無需 build 步驟
