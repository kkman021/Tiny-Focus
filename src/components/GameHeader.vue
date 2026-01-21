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
  <header class="w-full px-4 py-2 flex flex-col gap-2 bg-white shadow-sm z-20">
    <!-- Stars Progress -->
    <div class="flex justify-center gap-2 h-8">
      <div 
        v-for="(_, index) in 5" 
        :key="index"
        class="text-2xl transition-all duration-500"
        :class="index < gameStore.stars.length ? 'scale-100 opacity-100' : 'scale-50 opacity-20 grayscale'"
      >
        {{ gameStore.stars[index] === 'silver' ? '🥈' : '⭐' }}
      </div>
    </div>

    <!-- Target Prompt -->
    <button 
      @click="replayAudio"
      class="flex items-center justify-center gap-4 bg-orange-100 rounded-xl p-2 active:bg-orange-200 transition-colors mx-auto w-full max-w-md border-2 border-orange-200"
    >
      <div class="text-5xl animate-pulse" v-if="gameStore.target">
        {{ gameStore.target.icon }}
      </div>
      <div class="flex flex-col items-start" v-if="gameStore.target">
        <span class="text-xs text-gray-500">找找看</span>
        <span class="text-xl font-bold text-gray-800">{{ gameStore.target.name }}</span>
      </div>
      <div class="ml-auto text-orange-400">
        🔊
      </div>
    </button>
  </header>
</template>
