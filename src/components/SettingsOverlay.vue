<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../stores/game'
import { useAudioStore, type VoiceType } from '../stores/audio'
import { onClickOutside, useIntervalFn } from '@vueuse/core'

const isOpen = ref(false)
const isUnlocked = ref(false)
const unlockProgress = ref(0)
const settingsRef = ref(null)

const gameStore = useGameStore()
const audioStore = useAudioStore()

// Long press logic
const { pause, resume } = useIntervalFn(() => {
  if (unlockProgress.value < 100) {
    unlockProgress.value += 5
  } else {
    isUnlocked.value = true
    pause()
  }
}, 50)

const startUnlock = () => {
  if (isUnlocked.value) return
  unlockProgress.value = 0
  resume()
}

const cancelUnlock = () => {
  pause()
  unlockProgress.value = 0
}

const toggleSettings = () => {
  isOpen.value = !isOpen.value
  isUnlocked.value = false // Reset lock when closing/opening
  unlockProgress.value = 0
}

onClickOutside(settingsRef, () => {
  isOpen.value = false
})

const changeVoice = (type: VoiceType) => {
    audioStore.setVoice(type)
}
</script>

<template>
  <!-- Gear Button -->
  <button 
    @click="toggleSettings"
    class="absolute top-4 right-4 z-50 w-12 h-12 bg-white rounded-full shadow-md text-2xl flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
  >
    ⚙️
  </button>

  <!-- Overlay -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
    <div ref="settingsRef" class="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border-4 border-gray-100">
      
      <!-- Lock Screen -->
      <div v-if="!isUnlocked" class="p-8 flex flex-col items-center gap-6">
        <div class="text-6xl animate-bounce">🔒</div>
        <h2 class="text-2xl font-bold text-gray-700">家長專區</h2>
        <p class="text-gray-400 text-center font-medium">長按下方按鈕 3 秒解鎖</p>
        
        <button 
          @mousedown="startUnlock"
          @touchstart="startUnlock"
          @mouseup="cancelUnlock"
          @mouseleave="cancelUnlock"
          @touchend="cancelUnlock"
          class="relative w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden active:scale-95 transition-transform shadow-inner"
        >
          <div 
            class="absolute bottom-0 left-0 w-full bg-green-400 transition-all duration-100 ease-linear"
            :style="{ height: `${unlockProgress}%` }"
          ></div>
          <span class="relative z-10 text-4xl">🔓</span>
        </button>
      </div>

      <!-- Settings Panel -->
      <div v-else class="p-6 space-y-6">
        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
           <h2 class="text-2xl font-black text-gray-800">遊戲設定</h2>
           <button @click="isOpen = false" class="text-gray-400 text-xl font-bold px-2">✕</button>
        </div>

        <!-- Difficulty -->
        <div>
          <label class="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">難度選擇</label>
          <div class="grid grid-cols-2 gap-3">
            <button 
              @click="gameStore.mode = '2x2'; gameStore.resetGame()"
              class="p-4 rounded-2xl border-b-4 text-center transition-all font-bold"
              :class="gameStore.mode === '2x2' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'"
            >
              2 x 2
              <span class="block text-xs font-normal opacity-70 mt-1">暖身練習</span>
            </button>
            <button 
              @click="gameStore.mode = '3x3'; gameStore.resetGame()"
              class="p-4 rounded-2xl border-b-4 text-center transition-all font-bold"
              :class="gameStore.mode === '3x3' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-gray-50 border-gray-200 text-gray-400'"
            >
              3 x 3
              <span class="block text-xs font-normal opacity-70 mt-1">進階挑戰</span>
            </button>
          </div>
        </div>

        <!-- Category -->
        <div>
           <label class="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">題目類型</label>
           <select 
             v-model="gameStore.category" 
             @change="gameStore.resetGame()"
             class="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 text-gray-700 font-bold text-lg outline-none focus:border-blue-300 transition-colors"
           >
             <option value="mixed">🌈 全部混和</option>
             <option value="animals">🦁 動物園</option>
             <option value="fruits">🍎 水果食物</option>
             <option value="vehicles">🚓 交通工具</option>
             <option value="numbers">1️⃣ 數字 1-9</option>
           </select>
        </div>

        <!-- Voice -->
        <div>
          <label class="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">語音角色</label>
          <div class="space-y-3">
            <button
              v-for="(profile, key) in audioStore.voiceProfiles"
              :key="key"
              @click="changeVoice(key as VoiceType)"
              class="w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all font-bold"
               :class="audioStore.currentVoiceType === key ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-sm' : 'border-gray-100 text-gray-400 bg-white'"
            >
              <div class="flex items-center gap-3">
                 <span class="text-2xl">{{ key === 'robot' ? '🤖' : key === 'friend' ? '👧' : '👩‍🏫' }}</span>
                 <span>{{ profile.name }}</span>
              </div>
              <span v-if="audioStore.currentVoiceType === key" class="text-orange-500">✓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
