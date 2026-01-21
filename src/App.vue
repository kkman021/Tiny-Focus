<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useGameStore } from './stores/game'
import WelcomeScreen from './components/WelcomeScreen.vue'
import GameBoard from './components/GameBoard.vue'
import GameHeader from './components/GameHeader.vue'
import SettingsOverlay from './components/SettingsOverlay.vue'
import CelebrationOverlay from './components/CelebrationOverlay.vue'

const { height } = useWindowSize()
const gameStore = useGameStore()
</script>

<template>
  <main 
    class="w-screen overflow-hidden bg-pattern relative flex flex-col font-sans"
    :style="{ height: `${height}px` }"
  >
    <SettingsOverlay />
    <CelebrationOverlay v-if="gameStore.isCelebrating" />
    
    <div v-if="!gameStore.isPlaying" class="flex-1 flex items-center justify-center p-4">
      <WelcomeScreen />
    </div>

    <!-- Main Game Container -->
    <!-- Used 'min-h-0' to allow flex child scrolling/shrinking properly -->
    <div v-else class="flex-1 flex flex-col w-full max-w-lg mx-auto h-full min-h-0 relative">
      
      <!-- Top Section -->
      <div class="flex-none p-4 pb-2 z-10">
        <GameHeader />
      </div>

      <!-- Middle Section (Grid) - flexible height -->
      <div class="flex-1 min-h-0 p-4 pt-0 flex flex-col justify-center">
        <GameBoard />
      </div>
      
      <!-- Footer Info -->
      <div class="flex-none text-center text-orange-300/50 text-xs pb-2 font-medium">
         TinyFocus &copy; 2026
      </div>
    </div>
  </main>
</template>
