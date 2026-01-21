<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameStore, type Item } from '../stores/game'
import GameCard from './GameCard.vue'
import confetti from 'canvas-confetti'

const gameStore = useGameStore()
const cardRefs = ref<any[]>([])

// When options change, reset refs
watch(() => gameStore.options, () => {
  cardRefs.value = []
})

const handleSelect = (item: Item, index: number) => {
  if (gameStore.isFrozen) return

  if (item.id === gameStore.target?.id) {
    // Correct
    cardRefs.value[index]?.playSuccess()
    gameStore.handleCorrect()
    
    // Check if celebration is needed (we do this in store, but we can add confetti here for every correct answer too)
    // Small confetti for correct answer
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FDBA74', '#FB923C', '#EA580C'] // Orange shades
    })
    
  } else {
    // Wrong
    cardRefs.value[index]?.playError()
    gameStore.handleWrong()
  }
}

</script>

<template>
  <div class="flex-1 w-full p-4 flex items-center justify-center max-w-2xl mx-auto">
    <div 
      class="grid gap-3 w-full aspect-square"
      :class="gameStore.mode === '2x2' ? 'grid-cols-2' : 'grid-cols-3'"
    >
      <GameCard
        v-for="(item, index) in gameStore.options"
        :key="item.id + index"
        :ref="el => { if(el) cardRefs[index] = el }"
        :item="item"
        :is-target="item.id === gameStore.target?.id"
        :is-frozen="gameStore.isFrozen"
        @select="(i) => handleSelect(i, index)"
      />
    </div>
  </div>
</template>
