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
  <div class="flex flex-col items-center justify-center w-full max-w-sm mx-auto px-4 py-8">
    <!-- Mascot / Logo Area -->
    <div class="relative mb-8 animate-bounce-slow flex items-center justify-center">
      <div class="text-[min(25vw,8rem)] filter drop-shadow-xl z-10 relative select-none">🦁</div>
      <div class="absolute -bottom-2 -right-2 text-[min(12vw,4rem)] animate-pulse select-none">⭐</div>
      <div class="absolute top-0 -left-4 text-[min(12vw,4rem)] animate-wiggle select-none">🍎</div>
    </div>

    <h1 class="text-[min(10vw,3rem)] font-black text-orange-500 mb-2 drop-shadow-sm tracking-wide text-center leading-tight">TinyFocus</h1>
    <p class="text-orange-400/80 mb-8 font-medium text-lg text-center">專注力大冒險</p>
    
    <button 
      @click="handleStart"
      class="group relative w-full max-w-[280px] bg-yellow-400 hover:bg-yellow-300 text-yellow-900 text-2xl md:text-3xl font-black py-4 md:py-5 px-8 rounded-[1.5rem] shadow-[0_6px_0_rgb(234,179,8)] active:shadow-none active:translate-y-[6px] transition-all transform flex items-center justify-center gap-3 overflow-hidden"
    >
      <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      <span class="relative z-10 flex items-center gap-2">
        <span class="text-2xl">▶️</span> 
        開始遊戲
      </span>
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
