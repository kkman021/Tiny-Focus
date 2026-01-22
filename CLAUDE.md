# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TinyFocus - 幼兒專注力訓練遊戲（改良版舒爾特方格），針對 3 歲幼兒設計的網頁版專注力訓練遊戲。

## Commands

```bash
npm install        # 安裝依賴
npm run dev        # 啟動開發伺服器 (Vite)
npm run build      # TypeScript 型別檢查 + 生產建置
npm run preview    # 預覽生產版本
```

## Tech Stack

- Vue 3 + TypeScript + Vite 7
- Tailwind CSS 4 (via PostCSS)
- Pinia (State Management)
- VueUse (TTS, Window Size utilities)
- canvas-confetti (慶祝特效)

## Architecture

```
src/
├── App.vue              # 根元件，管理遊戲畫面切換與全局 overlay
├── main.ts              # 應用程式入口，掛載 Pinia
├── stores/
│   ├── game.ts          # 遊戲核心狀態：題目生成、答題判定、星星收集、冷卻鎖定
│   └── audio.ts         # 音效與語音：TTS 語音導引、Web Audio API 合成音效
└── components/
    ├── WelcomeScreen.vue    # 開始畫面
    ├── GameBoard.vue        # 遊戲主板，處理卡片點擊與 confetti 特效
    ├── GameCard.vue         # 單張卡片元件
    ├── GameHeader.vue       # 頂部：顯示星星進度與題目提示
    ├── SettingsOverlay.vue  # 設定面板：模式/類別/語音選擇
    └── CelebrationOverlay.vue # 過關慶祝動畫
```

## Key Concepts

### Game Store (`stores/game.ts`)
- `Category`: animals | fruits | vehicles | numbers | mixed
- `GameMode`: '2x2' | '3x3' (格子數量)
- `isFrozen`: 錯誤後 1.5 秒冷卻鎖定，防止幼兒亂按
- `stars`: 收集 5 顆星星後觸發過關慶祝
- `mistakeCount`: 答對時無錯誤得金星，有錯誤得銀星

### Audio Store (`stores/audio.ts`)
- `VoiceType`: normal (溫柔老師) | robot (酷酷機器人) | friend (元氣好朋友)
- 使用 Web Speech API 進行 TTS 語音導引
- 使用 Web Audio API 合成簡易音效 (correct/wrong/complete)

## Deployment

Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`
