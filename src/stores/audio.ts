import { defineStore } from 'pinia'
import { useSpeechSynthesis } from '@vueuse/core'
import { ref, computed } from 'vue'

export type VoiceType = 'normal' | 'robot' | 'friend'

interface VoiceProfile {
  pitch: number
  rate: number
  name: string
}

export const useAudioStore = defineStore('audio', () => {
  const currentVoiceType = ref<VoiceType>('normal')
  const isMuted = ref(false)
  
  const voiceProfiles: Record<VoiceType, VoiceProfile> = {
    normal: { pitch: 1.0, rate: 0.9, name: '溫柔老師' },
    robot: { pitch: 0.6, rate: 0.8, name: '酷酷機器人' },
    friend: { pitch: 1.1, rate: 0.95, name: '元氣好朋友' }
  }

  const currentProfile = computed(() => voiceProfiles[currentVoiceType.value])

  const speech = useSpeechSynthesis('')

  // Pre-load sounds (using Base64 for simplicity and performance)
  // These are placeholders - in production we might want real mp3s
  // For now, I'll use simple AudioContext beeps if possible, but let's stick to the plan of "playing sfx".
  // Since I don't have files, I will create a simple synth function for SFX.
  
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()

  function playTone(freq: number, type: 'sine' | 'square' | 'triangle', duration: number) {
    if (isMuted.value) return
    
    // Resume context if suspended (browser policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  }

  function playSfx(type: 'correct' | 'wrong' | 'complete') {
    if (isMuted.value) return

    switch (type) {
      case 'correct':
        // High pitch ding
        playTone(880, 'sine', 0.1) // A5
        setTimeout(() => playTone(1760, 'sine', 0.3), 100) // A6
        break
      case 'wrong':
        // Low pitch thud
        playTone(150, 'triangle', 0.3)
        break
      case 'complete':
        // Fanfare
        playTone(523.25, 'sine', 0.1)
        setTimeout(() => playTone(659.25, 'sine', 0.1), 100)
        setTimeout(() => playTone(783.99, 'sine', 0.2), 200)
        setTimeout(() => playTone(1046.50, 'sine', 0.4), 300)
        break
    }
  }

  function speak(text: string) {
    if (isMuted.value) return

    // Ensure we stop previous speech
    if (speech.isPlaying.value) {
      window.speechSynthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.pitch = currentProfile.value.pitch
    utterance.rate = currentProfile.value.rate
    utterance.lang = 'zh-TW'
    
    window.speechSynthesis.speak(utterance)
  }

  function setVoice(type: VoiceType) {
    currentVoiceType.value = type
    speak(`我是${voiceProfiles[type].name}`)
  }

  return {
    currentVoiceType,
    isMuted,
    speak,
    playSfx,
    setVoice,
    voiceProfiles
  }
})
