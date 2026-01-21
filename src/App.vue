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
    class="w-screen overflow-hidden bg-orange-50 relative flex flex-col"
    :style="{ height: `${height}px` }"
  >
    <SettingsOverlay />
    <CelebrationOverlay v-if="gameStore.isCelebrating" />
    
    <div v-if="!gameStore.isPlaying" class="flex-1">
      <WelcomeScreen />
    </div>

    <div v-else class="flex-1 flex flex-col w-full max-w-lg mx-auto h-full">
      <GameHeader />
      <GameBoard />
      
      <!-- Footer Info -->
      <div class="p-4 text-center text-gray-400 text-xs">
         TinyFocus &copy; 2026
      </div>
    </div>
  </main>
</template>
