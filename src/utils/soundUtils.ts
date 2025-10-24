// 音声再生ユーティリティ

class SoundUtils {
  private audioContext: AudioContext | null = null
  private isSupported = false

  constructor() {
    // Web Audio APIサポートチェック
    this.isSupported = 'AudioContext' in window || 'webkitAudioContext' in window
  }

  // AudioContextの初期化
  private async initAudioContext(): Promise<AudioContext | null> {
    if (!this.isSupported) return null
    
    if (!this.audioContext || this.audioContext.state === 'closed') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.error('AudioContext initialization failed:', error)
        return null
      }
    }

    // AudioContextが停止状態の場合は再開
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume()
      } catch (error) {
        console.error('AudioContext resume failed:', error)
        return null
      }
    }

    return this.audioContext
  }

  // ベル音を生成して再生
  async playBellSound(duration: number = 0.5): Promise<void> {
    const audioContext = await this.initAudioContext()
    if (!audioContext) return

    try {
      // オシレーターを作成
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      // ベル音の周波数（Cメジャーコード）
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
      oscillator.type = 'sine'

      // 音量エンベロープ（アタック・ディケイ・サステイン・リリース）
      const now = audioContext.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01) // アタック
      gainNode.gain.exponentialRampToValueAtTime(0.1, now + 0.1) // ディケイ
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration) // リリース

      // 接続
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // 再生
      oscillator.start(now)
      oscillator.stop(now + duration)

      // 高音を重ねて豊かな音色を作る
      const oscillator2 = audioContext.createOscillator()
      const gainNode2 = audioContext.createGain()
      
      oscillator2.frequency.setValueAtTime(1046.5, audioContext.currentTime) // C6
      oscillator2.type = 'sine'
      
      gainNode2.gain.setValueAtTime(0, now)
      gainNode2.gain.linearRampToValueAtTime(0.15, now + 0.01)
      gainNode2.gain.exponentialRampToValueAtTime(0.05, now + 0.1)
      gainNode2.gain.exponentialRampToValueAtTime(0.01, now + duration)
      
      oscillator2.connect(gainNode2)
      gainNode2.connect(audioContext.destination)
      
      oscillator2.start(now)
      oscillator2.stop(now + duration)

    } catch (error) {
      console.error('Bell sound playback failed:', error)
    }
  }

  // チャイム音を生成して再生（カクテル完成時用）
  async playSuccessChime(): Promise<void> {
    const audioContext = await this.initAudioContext()
    if (!audioContext) return

    try {
      const now = audioContext.currentTime
      const notes = [
        { freq: 523.25, start: 0, duration: 0.2 },     // C5
        { freq: 659.25, start: 0.1, duration: 0.2 },  // E5
        { freq: 783.99, start: 0.2, duration: 0.4 }   // G5
      ]

      notes.forEach(note => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.frequency.setValueAtTime(note.freq, now + note.start)
        oscillator.type = 'triangle'

        const startTime = now + note.start
        const endTime = startTime + note.duration

        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02)
        gainNode.gain.exponentialRampToValueAtTime(0.01, endTime)

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.start(startTime)
        oscillator.stop(endTime)
      })

    } catch (error) {
      console.error('Success chime playback failed:', error)
    }
  }

  // シンプルなポップ音（フィードバック用）
  async playPopSound(): Promise<void> {
    const audioContext = await this.initAudioContext()
    if (!audioContext) return

    try {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      oscillator.type = 'square'

      const now = audioContext.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.start(now)
      oscillator.stop(now + 0.1)

    } catch (error) {
      console.error('Pop sound playback failed:', error)
    }
  }

  // 音声再生可能かチェック
  async canPlayAudio(): Promise<boolean> {
    if (!this.isSupported) return false
    
    try {
      const audioContext = await this.initAudioContext()
      return audioContext !== null && audioContext.state === 'running'
    } catch {
      return false
    }
  }

  // AudioContextのクリーンアップ
  dispose(): void {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close()
    }
  }
}

// シングルトンインスタンスをエクスポート
export const soundUtils = new SoundUtils()