<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { useAudioStore } from '../stores/audio'

const gameStore = useGameStore()
const audioStore = useAudioStore()

const handleStart = () => {
  audioStore.playSfx('correct')
  gameStore.startGame()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full max-w-sm mx-auto px-6">
    <!-- Mascot / Logo Area -->
    <div class="relative mb-12 animate-bounce-slow">
      <div class="text-[8rem] filter drop-shadow-xl z-10 relative">🦁</div>
      <div class="absolute -bottom-4 -right-4 text-[4rem] animate-pulse">⭐</div>
      <div class="absolute top-0 -left-6 text-[4rem] animate-wiggle">🍎</div>
    </div>

    <h1 class="text-5xl font-black text-orange-500 mb-2 drop-shadow-sm tracking-wide">TinyFocus</h1>
    <p class="text-orange-400/80 mb-12 font-medium text-lg">專注力大冒險</p>
    
    <button 
      @click="handleStart"
      class="group relative w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 text-4xl font-black py-6 px-12 rounded-[2rem] shadow-[0_10px_0_rgb(234,179,8)] active:shadow-none active:translate-y-[10px] transition-all transform flex items-center justify-center gap-4 overflow-hidden"
    >
      <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      <span class="relative z-10">▶️ 開始遊戲</span>
    </button>
  </div>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}
@keyframes wiggle {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}
</style>
