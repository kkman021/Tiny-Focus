<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { useAudioStore } from '../stores/audio'

const gameStore = useGameStore()
const audioStore = useAudioStore()

const replayAudio = () => {
    if (gameStore.target) {
        audioStore.speak(`找找看，${gameStore.target.name}在哪裡？`)
    }
}
</script>

<template>
  <header class="w-full flex flex-col gap-4 z-20">
    <!-- Target Board -->
    <div class="bg-white rounded-[2rem] p-4 shadow-lg border-b-8 border-blue-100 flex items-center justify-between relative overflow-hidden">
      
      <!-- Left: Target Info -->
      <button @click="replayAudio" class="flex items-center gap-4 flex-1 active:scale-95 transition-transform">
        <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-5xl shadow-inner border-2 border-blue-100 animate-pulse-slow">
           {{ gameStore.target?.icon }}
        </div>
        <div class="flex flex-col items-start">
          <span class="text-sm text-blue-400 font-bold bg-blue-50 px-2 py-1 rounded-lg mb-1">任務目標</span>
          <span class="text-2xl font-black text-gray-700 tracking-wider">{{ gameStore.target?.name }}</span>
        </div>
      </button>

      <!-- Right: Speaker Icon -->
      <button 
        @click="replayAudio"
        class="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-xl hover:bg-orange-200 active:scale-90 transition-all shadow-sm"
      >
        🔊
      </button>
    </div>

    <!-- Progress Stars -->
    <div class="flex justify-center gap-3 bg-white/50 backdrop-blur rounded-full py-2 px-6 shadow-sm mx-auto w-fit">
      <div 
        v-for="(_, index) in 5" 
        :key="index"
        class="text-2xl transition-all duration-500 transform"
        :class="index < gameStore.stars.length 
          ? 'scale-110 rotate-12 drop-shadow-md' 
          : 'scale-90 opacity-30 grayscale'"
      >
        {{ gameStore.stars[index] === 'silver' ? '🥈' : '⭐' }}
      </div>
    </div>
  </header>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
