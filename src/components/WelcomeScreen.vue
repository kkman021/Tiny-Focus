<script setup lang="ts">
import { useGameStore } from '../stores/game'
import { useAudioStore } from '../stores/audio'

const gameStore = useGameStore()
const audioStore = useAudioStore()

const handleStart = () => {
  // Initialize Audio Context (must be user gesture)
  audioStore.playSfx('correct') // Silent or minimal sound to unlock audio
  gameStore.startGame()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full w-full bg-orange-50 p-4">
    <div class="mb-8 text-6xl animate-bounce">🦁</div>
    <h1 class="text-4xl font-bold text-orange-600 mb-2">TinyFocus</h1>
    <p class="text-gray-500 mb-12">專注力小遊戲</p>
    
    <button 
      @click="handleStart"
      class="bg-orange-500 hover:bg-orange-600 text-white text-3xl font-bold py-8 px-12 rounded-3xl shadow-[0_8px_0_rgb(194,65,12)] active:shadow-none active:translate-y-2 transition-all transform w-full max-w-sm flex items-center justify-center gap-4"
    >
      <span>▶️</span>
      <span>開始遊戲</span>
    </button>
  </div>
</template>
