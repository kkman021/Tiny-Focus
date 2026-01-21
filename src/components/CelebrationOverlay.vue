<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

onMounted(() => {
  const duration = 3000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
  }, 250)
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
    <div class="text-9xl animate-bounce mb-8">🏆</div>
    <h1 class="text-5xl font-bold text-yellow-400 mb-4 drop-shadow-lg">你好棒！</h1>
    <p class="text-white text-xl">完成所有挑戰！</p>
  </div>
</template>
