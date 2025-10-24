import { useState, useMemo, useEffect, useCallback } from 'react'
import './App.css'
import { cocktails as initialCocktails } from './data/cocktails'
import { CocktailCard } from './components/CocktailCard'
import { CocktailForm } from './components/CocktailForm'
import { BartenderLoading } from './components/BartenderLoading'
import { useShakeDetector } from './components/ShakeDetector'
import { imageStorage } from './utils/imageStorage'
import { soundUtils } from './utils/soundUtils'
import type { Cocktail } from './types/cocktail'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAlcoholLevel, setSelectedAlcoholLevel] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingCocktail, setEditingCocktail] = useState<Cocktail | null>(null)
  const [cocktails, setCocktails] = useState<Cocktail[]>(initialCocktails)
  const [isSearching, setIsSearching] = useState(false)
  const [displayedCocktails, setDisplayedCocktails] = useState<Cocktail[]>(initialCocktails)
  const [pendingSearchTerm, setPendingSearchTerm] = useState('')
  const [pendingCategory, setPendingCategory] = useState('all')
  const [pendingAlcoholLevel, setPendingAlcoholLevel] = useState('all')
  const [isShakeEnabled, setIsShakeEnabled] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // モバイルデバイス判定
  const isMobileDevice = useMemo(() => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }, [])

  useEffect(() => {
    const loadCocktails = async () => {
      const savedCustom = localStorage.getItem('customCocktails')
      const savedDeleted = localStorage.getItem('deletedCocktails')
      const savedEdited = localStorage.getItem('editedCocktails')
      const savedSoundEnabled = localStorage.getItem('soundEnabled')
      
      const customCocktails = savedCustom ? JSON.parse(savedCustom) : []
      const deletedCocktails = savedDeleted ? JSON.parse(savedDeleted) : []
      const editedCocktails = savedEdited ? JSON.parse(savedEdited) : {}
      
      // 音声設定を読み込み
      if (savedSoundEnabled !== null) {
        setSoundEnabled(JSON.parse(savedSoundEnabled))
      }
      
      const visibleInitialCocktails = initialCocktails
        .filter(c => !deletedCocktails.includes(c.id))
        .map(c => editedCocktails[c.id] || c)
      
      const allCocktails = [...visibleInitialCocktails, ...customCocktails]
      
      // IndexedDBから画像を復元
      try {
        await imageStorage.init()
        const imageIds = await imageStorage.getAllImageIds()
        
        for (const cocktail of allCocktails) {
          if (cocktail.image && cocktail.image.startsWith('data:')) {
            // 既にBase64画像がある場合はIndexedDBに保存
            await imageStorage.saveImage(cocktail.id, cocktail.image)
          } else if (imageIds.includes(cocktail.id)) {
            // IndexedDBに画像がある場合は復元
            const image = await imageStorage.getImage(cocktail.id)
            if (image) {
              cocktail.image = image
            }
          }
        }
      } catch (error) {
        console.error('Failed to load images from IndexedDB:', error)
      }
      
      setCocktails(allCocktails)
    }
    
    loadCocktails()
  }, [])

  const categories = ['all', 'ショートカクテル', 'ロングカクテル', 'フローズンカクテル', 'ティキカクテル', 'スパークリングカクテル', 'ホットカクテル', 'ビアカクテル']
  
  // アルコール度数タグの一覧を取得
  const allAlcoholTags = useMemo(() => {
    const uniqueTags = new Set<string>()
    cocktails.forEach(cocktail => {
      uniqueTags.add(cocktail.alcoholContent)
    })
    return ['all', ...Array.from(uniqueTags).sort()]
  }, [cocktails])
  
  // デフォルトタグの表示名マッピング
  const getAlcoholTagLabel = (tag: string) => {
    const labels: Record<string, string> = {
      'all': 'すべて',
      'non-alcoholic': 'ノンアルコール',
      'low': '低アルコール',
      'medium': '中アルコール',
      'high': '高アルコール'
    }
    return labels[tag] || tag
  }

  // シェイク開始時の処理
  const handleShakeStart = useCallback(async () => {
    // シェイク開始のフィードバック（軽い振動）
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    
    // 軽い効果音
    if (soundEnabled) {
      try {
        await soundUtils.playPopSound()
      } catch (error) {
        console.error('Failed to play shake start sound:', error)
      }
    }
  }, [soundEnabled])

  // シェイク終了時の処理
  const handleShakeEnd = useCallback(() => {
    if (cocktails.length === 0) return
    
    // 調合中画面を表示
    setIsShaking(true)
    
    // ランダムにカクテルを選択
    const randomIndex = Math.floor(Math.random() * cocktails.length)
    const randomCocktail = cocktails[randomIndex]
    
    // 2.5秒後にカクテルを表示（調合時間）
    setTimeout(async () => {
      setSelectedCocktail(randomCocktail)
      setIsShaking(false)
      
      // カクテル完成時の通知
      // バイブレーション
      if ('vibrate' in navigator) {
        // より印象的なバイブレーションパターン：短い→長い→短い→長い
        navigator.vibrate([150, 100, 300, 100, 150])
      }
      
      // 効果音
      if (soundEnabled) {
        try {
          await soundUtils.playSuccessChime()
        } catch (error) {
          console.error('Failed to play success sound:', error)
        }
      }
    }, 2500)
  }, [cocktails, soundEnabled])

  // ShakeDetectorの設定
  const shakeDetector = useShakeDetector({
    onShakeStart: handleShakeStart,
    onShakeEnd: handleShakeEnd,
    isEnabled: isShakeEnabled && !selectedCocktail && !showAddForm && !showEditForm
  })

  // 検索実行関数
  const executeSearch = useCallback(() => {
    setSearchTerm(pendingSearchTerm)
    setSelectedCategory(pendingCategory)
    setSelectedAlcoholLevel(pendingAlcoholLevel)
  }, [pendingSearchTerm, pendingCategory, pendingAlcoholLevel])

  const handleAddCocktail = async (newCocktailData: Omit<Cocktail, 'id'>) => {
    const newCocktail: Cocktail = {
      ...newCocktailData,
      id: `custom-${Date.now()}`
    }
    
    // 画像がBase64の場合はIndexedDBに保存
    if (newCocktail.image && newCocktail.image.startsWith('data:')) {
      try {
        await imageStorage.saveImage(newCocktail.id, newCocktail.image)
      } catch (error) {
        console.error('Failed to save image to IndexedDB:', error)
      }
    }
    
    const customCocktails = cocktails.filter(c => c.id.startsWith('custom-'))
    const updatedCustomCocktails = [...customCocktails, newCocktail]
    
    localStorage.setItem('customCocktails', JSON.stringify(updatedCustomCocktails))
    setCocktails([...initialCocktails, ...updatedCustomCocktails])
    
    setShowAddForm(false)
    setSelectedCocktail(newCocktail)
  }

  const handleDeleteCocktail = async (cocktailToDelete: Cocktail) => {
    // IndexedDBから画像を削除
    try {
      await imageStorage.deleteImage(cocktailToDelete.id)
    } catch (error) {
      console.error('Failed to delete image from IndexedDB:', error)
    }
    
    if (cocktailToDelete.id.startsWith('custom-')) {
      // カスタムカクテルの削除
      const customCocktails = cocktails.filter(c => c.id.startsWith('custom-') && c.id !== cocktailToDelete.id)
      localStorage.setItem('customCocktails', JSON.stringify(customCocktails))
      setCocktails([...initialCocktails, ...customCocktails])
    } else {
      // 既存カクテルの削除（非表示リストに追加）
      const deletedCocktails = JSON.parse(localStorage.getItem('deletedCocktails') || '[]')
      const updatedDeletedCocktails = [...deletedCocktails, cocktailToDelete.id]
      localStorage.setItem('deletedCocktails', JSON.stringify(updatedDeletedCocktails))
      
      const customCocktails = cocktails.filter(c => c.id.startsWith('custom-'))
      const visibleInitialCocktails = initialCocktails.filter(c => !updatedDeletedCocktails.includes(c.id))
      setCocktails([...visibleInitialCocktails, ...customCocktails])
    }
    
    if (selectedCocktail && selectedCocktail.id === cocktailToDelete.id) {
      setSelectedCocktail(null)
    }
  }

  const handleEditCocktail = (cocktail: Cocktail) => {
    setEditingCocktail(cocktail)
    setShowEditForm(true)
    setSelectedCocktail(null)
  }

  const handleUpdateCocktail = async (updatedCocktailData: Omit<Cocktail, 'id'>) => {
    if (!editingCocktail) return

    const updatedCocktail: Cocktail = {
      ...updatedCocktailData,
      id: editingCocktail.id
    }
    
    // 画像がBase64の場合はIndexedDBに保存
    if (updatedCocktail.image && updatedCocktail.image.startsWith('data:')) {
      try {
        await imageStorage.saveImage(updatedCocktail.id, updatedCocktail.image)
      } catch (error) {
        console.error('Failed to save image to IndexedDB:', error)
      }
    }

    if (editingCocktail.id.startsWith('custom-')) {
      // カスタムカクテルの編集
      const customCocktails = cocktails.filter(c => c.id.startsWith('custom-'))
      const updatedCustomCocktails = customCocktails.map(c => 
        c.id === editingCocktail.id ? updatedCocktail : c
      )
      
      localStorage.setItem('customCocktails', JSON.stringify(updatedCustomCocktails))
      
      const deletedCocktails = JSON.parse(localStorage.getItem('deletedCocktails') || '[]')
      const visibleInitialCocktails = initialCocktails.filter(c => !deletedCocktails.includes(c.id))
      setCocktails([...visibleInitialCocktails, ...updatedCustomCocktails])
    } else {
      // 既存カクテルの編集（編集されたバージョンをカスタムカクテルとして保存）
      const editedCocktails = JSON.parse(localStorage.getItem('editedCocktails') || '{}')
      editedCocktails[editingCocktail.id] = updatedCocktail
      localStorage.setItem('editedCocktails', JSON.stringify(editedCocktails))
      
      const customCocktails = cocktails.filter(c => c.id.startsWith('custom-'))
      const deletedCocktails = JSON.parse(localStorage.getItem('deletedCocktails') || '[]')
      const visibleInitialCocktails = initialCocktails.filter(c => !deletedCocktails.includes(c.id))
        .map(c => editedCocktails[c.id] || c)
      
      setCocktails([...visibleInitialCocktails, ...customCocktails])
    }

    setShowEditForm(false)
    setEditingCocktail(null)
    setSelectedCocktail(updatedCocktail)
  }

  const filteredCocktails = useMemo(() => {
    return cocktails.filter(cocktail => {
      const matchesSearch = cocktail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cocktail.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cocktail.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || cocktail.category === selectedCategory
      const matchesAlcoholLevel = selectedAlcoholLevel === 'all' || cocktail.alcoholContent === selectedAlcoholLevel
      
      return matchesSearch && matchesCategory && matchesAlcoholLevel
    })
  }, [cocktails, searchTerm, selectedCategory, selectedAlcoholLevel])

  // 検索時に2秒の遅延とアニメーションを追加
  useEffect(() => {
    // 検索条件が変更された時のみ検索実行
    if (searchTerm !== '' || selectedCategory !== 'all' || selectedAlcoholLevel !== 'all') {
      setIsSearching(true)
      
      const timer = setTimeout(() => {
        setDisplayedCocktails(filteredCocktails)
        setIsSearching(false)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      // 初期状態では全件表示
      setDisplayedCocktails(filteredCocktails)
      setIsSearching(false)
    }
  }, [filteredCocktails, searchTerm, selectedCategory, selectedAlcoholLevel])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">カクテルレシピ</h1>
            </div>
            
            <div className="hidden sm:flex items-center space-x-4">
              {isMobileDevice && shakeDetector.isSupported && (
                <button
                  onClick={async () => {
                    if (!shakeDetector.permissionGranted) {
                      const granted = await shakeDetector.requestPermission()
                      if (granted) {
                        setIsShakeEnabled(!isShakeEnabled)
                      }
                    } else {
                      setIsShakeEnabled(!isShakeEnabled)
                    }
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isShakeEnabled 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="スマホを振ってランダムカクテル"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-1">{isShakeEnabled ? 'シェイクON' : 'シェイクOFF'}</span>
                </button>
              )}
              <button
                onClick={() => {
                  const newSoundEnabled = !soundEnabled
                  setSoundEnabled(newSoundEnabled)
                  localStorage.setItem('soundEnabled', JSON.stringify(newSoundEnabled))
                  // テスト音を再生
                  if (newSoundEnabled) {
                    soundUtils.playBellSound(0.3)
                  }
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  soundEnabled 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                title="効果音のオン/オフ"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {soundEnabled ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10H4a2 2 0 00-2 2v0a2 2 0 002 2h2l4 4V6l-4 4z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a2 2 0 01-2-2v0a2 2 0 012-2h1.586l4.707-4.707C10.923 5.663 12 6.109 12 7v10c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  )}
                </svg>
                <span className="ml-1">{soundEnabled ? '音ON' : '音OFF'}</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedCocktail(null)
                  setShowAddForm(false)
                  setShowEditForm(false)
                  setEditingCocktail(null)
                }}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                レシピ一覧
              </button>
              <button 
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                レシピを追加
              </button>
            </div>

            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => {
                  setSelectedCocktail(null)
                  setShowAddForm(false)
                  setShowEditForm(false)
                  setEditingCocktail(null)
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                レシピ一覧
              </button>
              <button 
                onClick={() => {
                  setShowAddForm(true)
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
              >
                レシピを追加
              </button>
              {isMobileDevice && shakeDetector.isSupported && (
                <button
                  onClick={async () => {
                    if (!shakeDetector.permissionGranted) {
                      const granted = await shakeDetector.requestPermission()
                      if (granted) {
                        setIsShakeEnabled(!isShakeEnabled)
                      }
                    } else {
                      setIsShakeEnabled(!isShakeEnabled)
                    }
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isShakeEnabled 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {isShakeEnabled ? 'シェイクON' : 'シェイクOFF'}
                </button>
              )}
              <button
                onClick={() => {
                  const newSoundEnabled = !soundEnabled
                  setSoundEnabled(newSoundEnabled)
                  localStorage.setItem('soundEnabled', JSON.stringify(newSoundEnabled))
                  // テスト音を再生
                  if (newSoundEnabled) {
                    soundUtils.playBellSound(0.3)
                  }
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  soundEnabled 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {soundEnabled ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10H4a2 2 0 00-2 2v0a2 2 0 002 2h2l4 4V6l-4 4z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a2 2 0 01-2-2v0a2 2 0 012-2h1.586l4.707-4.707C10.923 5.663 12 6.109 12 7v10c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  )}
                </svg>
                {soundEnabled ? '音ON' : '音OFF'}
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* シェイク機能の通知 */}
        {isMobileDevice && isShakeEnabled && !selectedCocktail && !showAddForm && !showEditForm && (
          <div className="mb-4 p-4 bg-purple-100 border border-purple-300 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-600 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-purple-800">スマホを振るとランダムでカクテルが表示されます！</span>
            </div>
            <button
              onClick={() => setIsShakeEnabled(false)}
              className="text-purple-600 hover:text-purple-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {!selectedCocktail && !showAddForm && !showEditForm && (
          <>
            <div className="mb-8 space-y-4">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="カクテルを検索..."
                    value={pendingSearchTerm}
                    onChange={(e) => setPendingSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={executeSearch}
                  disabled={isSearching}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      検索中
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      検索
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリー</label>
                  <select
                    value={pendingCategory}
                    onChange={(e) => {
                      setPendingCategory(e.target.value)
                      setSelectedCategory(e.target.value)
                    }}
                    className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'すべて' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">アルコール度数</label>
                  <select
                    value={pendingAlcoholLevel}
                    onChange={(e) => {
                      setPendingAlcoholLevel(e.target.value)
                      setSelectedAlcoholLevel(e.target.value)
                    }}
                    className="w-full px-3 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {allAlcoholTags.map(tag => (
                      <option key={tag} value={tag}>
                        {getAlcoholTagLabel(tag)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {isSearching ? '検索中...' : `${displayedCocktails.length}件のカクテルが見つかりました`}
              </div>
            </div>

            {!isSearching ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedCocktails.map((cocktail) => (
                  <CocktailCard 
                    key={cocktail.id} 
                    cocktail={cocktail} 
                    onClick={setSelectedCocktail}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-20">
                <div className="text-gray-500">
                  カクテルを検索中です...
                </div>
              </div>
            )}
          </>
        )}

        {selectedCocktail && !showAddForm && !showEditForm && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setSelectedCocktail(null)}
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                戻る
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCocktail(selectedCocktail)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  編集
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`「${selectedCocktail.name}」を削除しますか？`)) {
                      handleDeleteCocktail(selectedCocktail)
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  削除
                </button>
              </div>
            </div>
            <div className="text-center mb-6">
              {selectedCocktail.image ? (
                <div className="w-64 h-48 mx-auto mb-4 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={selectedCocktail.image} 
                    alt={selectedCocktail.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="text-8xl mb-4 flex items-center justify-center h-full">🍸</div>';
                    }}
                  />
                </div>
              ) : (
                <div className="text-8xl mb-4">🍸</div>
              )}
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedCocktail.name}
                {selectedCocktail.isOriginal && (
                  <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    オリジナル
                  </span>
                )}
              </h2>
              <p className="text-xl text-gray-600 mb-4">{selectedCocktail.nameEn}</p>
              <p className="text-gray-700">{selectedCocktail.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">材料</h3>
                <ul className="space-y-2">
                  {selectedCocktail.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between text-gray-700">
                      <span>{ingredient.name}</span>
                      <span className="text-gray-500">
                        {ingredient.amount} {ingredient.unit || ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">作り方</h3>
                <ol className="space-y-2">
                  {selectedCocktail.instructions.map((instruction, index) => (
                    <li key={index} className="text-gray-700 flex">
                      <span className="font-semibold mr-2">{index + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="font-semibold">グラス: </span>
                  <span className="text-gray-700">{selectedCocktail.glass}</span>
                </div>
                <div>
                  <span className="font-semibold">カテゴリー: </span>
                  <span className="text-gray-700">{selectedCocktail.category}</span>
                </div>
                <div>
                  <span className="font-semibold">フレーバー: </span>
                  <span className="text-gray-700">{selectedCocktail.flavor.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddForm && !showEditForm && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">オリジナルカクテルを追加</h2>
            <CocktailForm 
              onSubmit={handleAddCocktail}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {showEditForm && editingCocktail && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">「{editingCocktail.name}」を編集</h2>
            <CocktailForm 
              onSubmit={handleUpdateCocktail}
              onCancel={() => {
                setShowEditForm(false)
                setEditingCocktail(null)
              }}
              initialData={editingCocktail}
            />
          </div>
        )}
      </main>
      
      <BartenderLoading isVisible={isSearching || isShaking} />
    </div>
  )
}

export default App
