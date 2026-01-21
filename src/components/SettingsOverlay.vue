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
    class="absolute top-4 right-4 z-50 p-2 bg-white/80 rounded-full shadow-sm backdrop-blur-sm text-2xl"
  >
    ⚙️
  </button>

  <!-- Overlay -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div ref="settingsRef" class="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
      
      <!-- Lock Screen -->
      <div v-if="!isUnlocked" class="p-8 flex flex-col items-center gap-6">
        <div class="text-6xl">🔒</div>
        <h2 class="text-2xl font-bold text-gray-700">家長設定</h2>
        <p class="text-gray-500 text-center">請長按解鎖按鈕 3 秒鐘</p>
        
        <button 
          @mousedown="startUnlock"
          @touchstart="startUnlock"
          @mouseup="cancelUnlock"
          @mouseleave="cancelUnlock"
          @touchend="cancelUnlock"
          class="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden active:scale-95 transition-transform"
        >
          <div 
            class="absolute bottom-0 left-0 w-full bg-orange-400 transition-all duration-100 ease-linear"
            :style="{ height: `${unlockProgress}%` }"
          ></div>
          <span class="relative z-10 text-3xl">🔓</span>
        </button>
      </div>

      <!-- Settings Panel -->
      <div v-else class="p-6 space-y-6">
        <h2 class="text-2xl font-bold text-gray-800 text-center border-b pb-4">設定</h2>

        <!-- Difficulty -->
        <div>
          <label class="block text-sm font-medium text-gray-500 mb-2">難度 (Grid Size)</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              @click="gameStore.mode = '2x2'; gameStore.resetGame()"
              class="p-3 rounded-xl border-2 text-center transition-all"
              :class="gameStore.mode === '2x2' ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold' : 'border-gray-200 text-gray-500'"
            >
              2 x 2 (暖身)
            </button>
            <button 
              @click="gameStore.mode = '3x3'; gameStore.resetGame()"
              class="p-3 rounded-xl border-2 text-center transition-all"
              :class="gameStore.mode === '3x3' ? 'border-orange-500 bg-orange-50 text-orange-700 font-bold' : 'border-gray-200 text-gray-500'"
            >
              3 x 3 (挑戰)
            </button>
          </div>
        </div>

        <!-- Category -->
        <div>
           <label class="block text-sm font-medium text-gray-500 mb-2">題目類型</label>
           <select 
             v-model="gameStore.category" 
             @change="gameStore.resetGame()"
             class="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-lg"
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
          <label class="block text-sm font-medium text-gray-500 mb-2">語音角色</label>
          <div class="space-y-2">
            <button
              v-for="(profile, key) in audioStore.voiceProfiles"
              :key="key"
              @click="changeVoice(key as VoiceType)"
              class="w-full p-3 rounded-xl border-2 flex items-center justify-between transition-all"
               :class="audioStore.currentVoiceType === key ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-600'"
            >
              <span>{{ profile.name }}</span>
              <span v-if="audioStore.currentVoiceType === key">✓</span>
            </button>
          </div>
        </div>

        <button 
          @click="isOpen = false"
          class="w-full py-4 bg-gray-900 text-white rounded-xl font-bold"
        >
          完成
        </button>
      </div>
    </div>
  </div>
</template>
