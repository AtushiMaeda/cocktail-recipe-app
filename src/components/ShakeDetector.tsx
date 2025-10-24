import { useEffect, useState, useCallback, useRef } from 'react'

interface ShakeDetectorProps {
  onShake?: () => void  // 旧API（互換性のため残す）
  onShakeStart?: () => void  // シェイク開始時
  onShakeEnd?: () => void    // シェイク終了時
  isEnabled: boolean
}

export function useShakeDetector({ 
  onShake, 
  onShakeStart, 
  onShakeEnd, 
  isEnabled 
}: ShakeDetectorProps) {
  const [isSupported, setIsSupported] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [isCurrentlyShaking, setIsCurrentlyShaking] = useState(false)
  
  // useRefを使用して最新の状態を追跡
  const shakeCountRef = useRef(0)
  const lastLowAccelTimeRef = useRef(0)
  const isShakingRef = useRef(false)
  
  // シェイク検出の閾値
  const SHAKE_THRESHOLD = 25          // シェイク開始閾値
  const SHAKE_END_THRESHOLD = 8       // 静止判定閾値
  const SHAKE_END_TIMEOUT = 500       // 静止継続時間（ms）
  const MIN_SHAKE_COUNT = 3           // 最小振り回数
  const SHAKE_COOLDOWN = 1000         // 連続シェイク防止のクールダウン

  const requestPermission = useCallback(async () => {
    // iOS 13+ では権限リクエストが必要
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission()
        setPermissionGranted(permission === 'granted')
        return permission === 'granted'
      } catch (error) {
        console.error('DeviceMotion permission request failed:', error)
        return false
      }
    } else {
      // Android や他のブラウザでは権限不要
      setPermissionGranted(true)
      return true
    }
  }, [])

  useEffect(() => {
    // DeviceMotionEvent がサポートされているか確認
    if ('DeviceMotionEvent' in window) {
      setIsSupported(true)
      
      // iOS以外では自動的に権限を有効化
      if (typeof (DeviceMotionEvent as any).requestPermission !== 'function') {
        setPermissionGranted(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!isEnabled || !isSupported || !permissionGranted) return

    let lastX: number | null = null
    let lastY: number | null = null
    let lastZ: number | null = null
    let lastShakeEndTime = 0

    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity
      
      if (!current || current.x === null || current.y === null || current.z === null) {
        return
      }

      if (lastX !== null && lastY !== null && lastZ !== null) {
        const deltaX = Math.abs(current.x - lastX)
        const deltaY = Math.abs(current.y - lastY)
        const deltaZ = Math.abs(current.z - lastZ)
        
        const acceleration = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ)
        const now = Date.now()
        
        // シェイク開始検出
        if (acceleration > SHAKE_THRESHOLD) {
          if (!isShakingRef.current && now - lastShakeEndTime > SHAKE_COOLDOWN) {
            // シェイク開始
            isShakingRef.current = true
            shakeCountRef.current = 0
            setIsCurrentlyShaking(true)
            
            // 新API: onShakeStart
            if (onShakeStart) {
              onShakeStart()
            }
            // 旧API: onShake（互換性のため）
            else if (onShake) {
              onShake()
            }
          }
          
          if (isShakingRef.current) {
            shakeCountRef.current++
            lastLowAccelTimeRef.current = 0
          }
        } 
        // シェイク終了検出
        else if (acceleration < SHAKE_END_THRESHOLD && isShakingRef.current) {
          // 低加速度を検出
          if (lastLowAccelTimeRef.current === 0) {
            lastLowAccelTimeRef.current = now
          } else if (
            now - lastLowAccelTimeRef.current > SHAKE_END_TIMEOUT && 
            shakeCountRef.current >= MIN_SHAKE_COUNT
          ) {
            // シェイク終了
            isShakingRef.current = false
            shakeCountRef.current = 0
            lastLowAccelTimeRef.current = 0
            lastShakeEndTime = now
            setIsCurrentlyShaking(false)
            
            // 新API: onShakeEnd
            if (onShakeEnd) {
              onShakeEnd()
            }
          }
        }
        // 中間的な加速度の場合、タイマーをリセット
        else if (acceleration >= SHAKE_END_THRESHOLD && isShakingRef.current) {
          lastLowAccelTimeRef.current = 0
        }
      }

      lastX = current.x
      lastY = current.y
      lastZ = current.z
    }

    window.addEventListener('devicemotion', handleMotion)

    return () => {
      window.removeEventListener('devicemotion', handleMotion)
      // クリーンアップ
      isShakingRef.current = false
      shakeCountRef.current = 0
      lastLowAccelTimeRef.current = 0
    }
  }, [isEnabled, isSupported, permissionGranted, onShake, onShakeStart, onShakeEnd])

  return {
    isSupported,
    permissionGranted,
    requestPermission,
    isCurrentlyShaking
  }
}