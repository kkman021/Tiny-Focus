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

watch(() => props.item, () => {
  status.value = 'idle'
})

const handleClick = () => {
  if (props.isFrozen || status.value !== 'idle') return
  emit('select', props.item)
}

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
  if (status.value === 'correct') {
    return 'scale-110 bg-green-400 border-green-600 shadow-none translate-y-[4px] z-10 ring-4 ring-green-200'
  }
  if (status.value === 'wrong') {
    return 'animate-shake opacity-50 bg-gray-200 border-gray-400 grayscale'
  }
  if (props.isFrozen) {
    return 'opacity-60 cursor-not-allowed bg-gray-100 border-gray-200'
  }
  // Normal State
  return 'bg-white border-b-[8px] border-gray-200 hover:border-gray-300 active:border-b-0 active:translate-y-[8px] hover:-translate-y-1 transition-all'
})
</script>

<template>
  <button
    @click="handleClick"
    class="relative w-full h-full rounded-[2rem] flex items-center justify-center select-none overflow-hidden duration-150"
    :class="cardClasses"
  >
    <!-- Background Decoration Circle -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent pointer-events-none"></div>
    
    <span 
      class="text-[4rem] md:text-[6rem] leading-none filter drop-shadow-sm transition-transform duration-200"
      :class="status === 'idle' && !isFrozen ? 'group-hover:scale-110' : ''"
    >
      {{ item.icon }}
    </span>
  </button>
</template>
