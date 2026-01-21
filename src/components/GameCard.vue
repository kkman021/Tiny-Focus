<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Item } from '../stores/game'

const props = defineProps<{
  item: Item
  isTarget: boolean
  isFrozen: boolean
}>()

const emit = defineEmits<{
  (e: 'select', item: Item): void
}>()

const status = ref<'idle' | 'correct' | 'wrong'>('idle')

// Reset status when item changes
watch(() => props.item, () => {
  status.value = 'idle'
})

const handleClick = () => {
  if (props.isFrozen || status.value !== 'idle') return
  
  // We emit the event, parent handles logic, but we can do local visual update immediately if needed
  // However, it's better to let parent drive state or expose methods
  // For simplicity, let's just emit. The parent will tell us if it was wrong via props updates or re-render?
  // Actually, for "wrong" state local feedback is nice.
  
  emit('select', props.item)
}

// Expose a method to trigger error animation from parent if needed, 
// OR simply rely on a prop if the parent tracks "wrong items".
// Since the store generates new questions, let's keep it simple: 
// The parent (GameBoard) manages the interaction logic.
// But we need to know if THIS card was clicked and it was wrong.
// We can use a ref here that is set by the parent via template ref, or just handle the click here.

const playError = () => {
  status.value = 'wrong'
  setTimeout(() => {
    status.value = 'idle'
  }, 1500)
}

const playSuccess = () => {
    status.value = 'correct'
}

defineExpose({ playError, playSuccess })

const cardClasses = computed(() => {
  if (status.value === 'correct') return 'scale-110 bg-green-100 border-green-400 z-10'
  if (status.value === 'wrong') return 'animate-shake opacity-50 bg-gray-100 border-gray-300'
  if (props.isFrozen) return 'opacity-60 cursor-not-allowed'
  return 'hover:scale-105 bg-white border-orange-100 shadow-lg'
})
</script>

<template>
  <button
    @click="handleClick"
    class="relative w-full h-full rounded-2xl border-4 transition-all duration-200 flex items-center justify-center select-none"
    :class="cardClasses"
  >
    <span class="text-[5rem] md:text-[7rem] leading-none filter drop-shadow-md">
      {{ item.icon }}
    </span>
  </button>
</template>
