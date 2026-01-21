import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAudioStore } from './audio'

export type Category = 'animals' | 'fruits' | 'vehicles' | 'numbers' | 'mixed'
export type GameMode = '2x2' | '3x3'

export interface Item {
  id: string
  icon: string
  name: string
  category: Category
}

const animals: Item[] = [
  { id: 'lion', icon: '🦁', name: '獅子', category: 'animals' },
  { id: 'tiger', icon: '🐯', name: '老虎', category: 'animals' },
  { id: 'elephant', icon: '🐘', name: '大象', category: 'animals' },
  { id: 'monkey', icon: '🐵', name: '猴子', category: 'animals' },
  { id: 'cat', icon: '🐱', name: '貓咪', category: 'animals' },
  { id: 'dog', icon: '🐶', name: '狗狗', category: 'animals' },
  { id: 'rabbit', icon: '🐰', name: '兔子', category: 'animals' },
  { id: 'panda', icon: '🐼', name: '熊貓', category: 'animals' },
  { id: 'frog', icon: '🐸', name: '青蛙', category: 'animals' },
  { id: 'chick', icon: '🐥', name: '小雞', category: 'animals' },
  { id: 'pig', icon: '🐷', name: '小豬', category: 'animals' },
  { id: 'cow', icon: '🐮', name: '乳牛', category: 'animals' },
]

const fruits: Item[] = [
  { id: 'apple', icon: '🍎', name: '蘋果', category: 'fruits' },
  { id: 'banana', icon: '🍌', name: '香蕉', category: 'fruits' },
  { id: 'grape', icon: '🍇', name: '葡萄', category: 'fruits' },
  { id: 'watermelon', icon: '🍉', name: '西瓜', category: 'fruits' },
  { id: 'strawberry', icon: '🍓', name: '草莓', category: 'fruits' },
  { id: 'peach', icon: '🍑', name: '水蜜桃', category: 'fruits' },
  { id: 'pineapple', icon: '🍍', name: '鳳梨', category: 'fruits' },
  { id: 'cherry', icon: '🍒', name: '櫻桃', category: 'fruits' },
]

const vehicles: Item[] = [
  { id: 'police_car', icon: '🚓', name: '警車', category: 'vehicles' },
  { id: 'ambulance', icon: '🚑', name: '救護車', category: 'vehicles' },
  { id: 'fire_engine', icon: '🚒', name: '消防車', category: 'vehicles' },
  { id: 'car', icon: '🚗', name: '車子', category: 'vehicles' },
  { id: 'taxi', icon: '🚕', name: '計程車', category: 'vehicles' },
  { id: 'bus', icon: '🚌', name: '公車', category: 'vehicles' },
  { id: 'airplane', icon: '✈️', name: '飛機', category: 'vehicles' },
  { id: 'rocket', icon: '🚀', name: '火箭', category: 'vehicles' },
  { id: 'train', icon: '🚂', name: '火車', category: 'vehicles' },
  { id: 'ship', icon: '🚢', name: '輪船', category: 'vehicles' },
]

const numbers: Item[] = [
  { id: 'n1', icon: '1️⃣', name: '數字 1', category: 'numbers' },
  { id: 'n2', icon: '2️⃣', name: '數字 2', category: 'numbers' },
  { id: 'n3', icon: '3️⃣', name: '數字 3', category: 'numbers' },
  { id: 'n4', icon: '4️⃣', name: '數字 4', category: 'numbers' },
  { id: 'n5', icon: '5️⃣', name: '數字 5', category: 'numbers' },
  { id: 'n6', icon: '6️⃣', name: '數字 6', category: 'numbers' },
  { id: 'n7', icon: '7️⃣', name: '數字 7', category: 'numbers' },
  { id: 'n8', icon: '8️⃣', name: '數字 8', category: 'numbers' },
  { id: 'n9', icon: '9️⃣', name: '數字 9', category: 'numbers' },
]

const allItems = [...animals, ...fruits, ...vehicles, ...numbers]

export const useGameStore = defineStore('game', () => {
  const audioStore = useAudioStore()
  
  // Settings
  const mode = ref<GameMode>('2x2')
  const category = ref<Category>('mixed')
  
  // Game State
  const isPlaying = ref(false)
  const isFrozen = ref(false) // Cool down lock
  const stars = ref<('gold' | 'silver')[]>([])
  const mistakeCount = ref(0)
  const isCelebrating = ref(false)
  
  // Current Question
  const target = ref<Item | null>(null)
  const options = ref<Item[]>([])

  const getItemsByCategory = () => {
    if (category.value === 'mixed') return allItems
    if (category.value === 'animals') return animals
    if (category.value === 'fruits') return fruits
    if (category.value === 'vehicles') return vehicles
    if (category.value === 'numbers') return numbers
    return allItems
  }

  const generateQuestion = () => {
    const pool = getItemsByCategory()
    
    if (pool.length === 0) return

    // 1. Pick Target
    const targetIndex = Math.floor(Math.random() * pool.length)
    const newTarget = pool[targetIndex]
    
    if (!newTarget) return // Safety check
    
    target.value = newTarget
    
    // 2. Pick Distractors
    const size = mode.value === '2x2' ? 4 : 9
    const distractorCount = size - 1
    const currentOptions: Item[] = [newTarget]
    
    const tempPool = pool.filter(i => i.id !== newTarget.id)
    
    // Shuffle tempPool
    for (let i = tempPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempI = tempPool[i]
      const tempJ = tempPool[j]
      if (tempI && tempJ) {
          tempPool[i] = tempJ
          tempPool[j] = tempI
      }
    }
    
    // Take distractors
    for (let i = 0; i < distractorCount; i++) {
      if (tempPool[i]) {
        currentOptions.push(tempPool[i]!)
      } else {
        // Fallback if pool is too small (shouldn't happen with our data size)
        const randomFallback = pool[Math.floor(Math.random() * pool.length)]
        if (randomFallback) currentOptions.push(randomFallback)
      }
    }
    
    // Shuffle Options
    for (let i = currentOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const optI = currentOptions[i]
      const optJ = currentOptions[j]
      if (optI && optJ) {
          currentOptions[i] = optJ
          currentOptions[j] = optI
      }
    }
    
    options.value = currentOptions
    mistakeCount.value = 0
    isFrozen.value = false
    
    // Speak
    setTimeout(() => {
      audioStore.speak(`找找看，${newTarget.name}在哪裡？`)
    }, 500)
  }

  const startGame = () => {
    isPlaying.value = true
    stars.value = []
    generateQuestion()
  }

  const handleCorrect = () => {
    if (mistakeCount.value === 0) {
      stars.value.push('gold')
      audioStore.playSfx('correct') // More enthusiastic
    } else {
      stars.value.push('silver')
      audioStore.playSfx('correct') // Standard
    }
    
    // Check if level complete (e.g., 5 stars)
    if (stars.value.length >= 5) {
        audioStore.playSfx('complete')
        isCelebrating.value = true
        setTimeout(() => {
            isCelebrating.value = false
            resetGame()
        }, 4000)
    } else {
        setTimeout(() => {
            generateQuestion()
        }, 1500) // Wait for animation
    }
  }

  const handleWrong = () => {
    mistakeCount.value++
    audioStore.playSfx('wrong')
    
    // Freeze mechanism
    isFrozen.value = true
    setTimeout(() => {
      isFrozen.value = false
    }, 1500)
  }
  
  const resetGame = () => {
      stars.value = []
      startGame()
  }

  return {
    mode,
    category,
    isPlaying,
    isFrozen,
    isCelebrating,
    stars,
    target,
    options,
    startGame,
    handleCorrect,
    handleWrong,
    resetGame,
    generateQuestion
  }
})
