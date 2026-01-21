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
  <header class="w-full flex flex-col gap-2 z-20">
    <!-- Target Board -->
    <div class="bg-white rounded-2xl p-2 pr-3 shadow-md border-b-4 border-blue-100 flex items-center justify-between relative overflow-hidden">
      
      <!-- Left: Target Info -->
      <button @click="replayAudio" class="flex items-center gap-3 flex-1 active:scale-95 transition-transform min-w-0">
        <div class="w-14 h-14 shrink-0 bg-blue-50 rounded-xl flex items-center justify-center text-4xl shadow-inner border-2 border-blue-100 animate-pulse-slow">
           {{ gameStore.target?.icon }}
        </div>
        <div class="flex flex-col items-start min-w-0">
          <span class="text-xs text-blue-400 font-bold bg-blue-50 px-2 py-0.5 rounded-md mb-0.5 whitespace-nowrap">任務目標</span>
          <span class="text-xl font-black text-gray-700 tracking-wider truncate w-full text-left leading-tight">{{ gameStore.target?.name }}</span>
        </div>
      </button>

      <!-- Right: Speaker Icon -->
      <button 
        @click="replayAudio"
        class="w-10 h-10 shrink-0 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center text-lg hover:bg-orange-200 active:scale-90 transition-all shadow-sm ml-2"
      >
        🔊
      </button>
    </div>

    <!-- Progress Stars -->
    <div class="flex justify-center gap-2 bg-white/50 backdrop-blur rounded-full py-1.5 px-4 shadow-sm mx-auto w-fit border border-white/60">
      <div 
        v-for="(_, index) in 5" 
        :key="index"
        class="text-xl transition-all duration-500 transform"
        :class="index < gameStore.stars.length 
          ? 'scale-110 rotate-12 drop-shadow-sm' 
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
