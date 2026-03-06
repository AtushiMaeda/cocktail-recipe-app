import { useState, useMemo, useEffect, useCallback } from 'react'
// useMemo is used for allAlcoholTags and isMobileDevice
import './App.css'
import { CocktailCard } from './components/CocktailCard'
import { CocktailForm } from './components/CocktailForm'
import { BartenderLoading } from './components/BartenderLoading'
import { useShakeDetector } from './components/ShakeDetector'
import { AuthForm } from './components/AuthForm'
import { soundUtils } from './utils/soundUtils'
import { useAuth } from './contexts/AuthContext'
import {
  fetchCocktails,
  fetchRandomCocktail,
  createCocktail,
  updateCocktail,
  deleteCocktail
} from './api/cocktailApi'
import type { Cocktail } from './types/cocktail'

function App() {
  const { currentUser, isAuthenticated, isLoading: authLoading, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingCocktail, setEditingCocktail] = useState<Cocktail | null>(null)
  const [cocktails, setCocktails] = useState<Cocktail[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [displayedCocktails, setDisplayedCocktails] = useState<Cocktail[]>([])
  const [pendingSearchTerm, setPendingSearchTerm] = useState('')
  const [pendingCategory, setPendingCategory] = useState('all')
  const [pendingAlcoholLevel, setPendingAlcoholLevel] = useState('all')
  const [isShakeEnabled, setIsShakeEnabled] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(true)

  // モバイルデバイス判定
  const isMobileDevice = useMemo(() => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }, [])

  // APIからカクテル一覧を取得
  useEffect(() => {
    const savedSoundEnabled = localStorage.getItem('soundEnabled')
    if (savedSoundEnabled !== null) {
      setSoundEnabled(JSON.parse(savedSoundEnabled))
    }

    const loadCocktails = async () => {
      setIsApiLoading(true)
      try {
        const { cocktails: data } = await fetchCocktails({ per_page: 200 })
        setCocktails(data)
        setDisplayedCocktails(data)
      } catch (error) {
        console.error('Failed to load cocktails:', error)
      } finally {
        setIsApiLoading(false)
      }
    }

    loadCocktails()
  }, [])

  const categories = ['all', 'ショートカクテル', 'ロングカクテル', 'フローズンカクテル', 'ティキカクテル', 'スパークリングカクテル', 'ホットカクテル', 'ビアカクテル']

  const allAlcoholTags = useMemo(() => {
    const uniqueTags = new Set<string>()
    cocktails.forEach(cocktail => {
      uniqueTags.add(cocktail.alcoholContent)
    })
    return ['all', ...Array.from(uniqueTags).sort()]
  }, [cocktails])

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
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
    if (soundEnabled) {
      try {
        await soundUtils.playPopSound()
      } catch (error) {
        console.error('Failed to play shake start sound:', error)
      }
    }
  }, [soundEnabled])

  // シェイク終了時の処理（APIからランダム取得）
  const handleShakeEnd = useCallback(() => {
    setIsShaking(true)

    setTimeout(async () => {
      try {
        const randomCocktail = await fetchRandomCocktail()
        setSelectedCocktail(randomCocktail)
      } catch {
        if (cocktails.length > 0) {
          const randomIndex = Math.floor(Math.random() * cocktails.length)
          setSelectedCocktail(cocktails[randomIndex])
        }
      }
      setIsShaking(false)

      if ('vibrate' in navigator) {
        navigator.vibrate([150, 100, 300, 100, 150])
      }
      if (soundEnabled) {
        try {
          await soundUtils.playSuccessChime()
        } catch (error) {
          console.error('Failed to play success sound:', error)
        }
      }
    }, 2500)
  }, [cocktails, soundEnabled])

  const shakeDetector = useShakeDetector({
    onShakeStart: handleShakeStart,
    onShakeEnd: handleShakeEnd,
    isEnabled: isShakeEnabled && !selectedCocktail && !showAddForm && !showEditForm
  })

  // 検索実行
  const executeSearch = useCallback(async () => {
    setIsSearching(true)

    try {
      const { cocktails: data } = await fetchCocktails({
        search: pendingSearchTerm || undefined,
        category: pendingCategory !== 'all' ? pendingCategory : undefined,
        alcoholContent: pendingAlcoholLevel !== 'all' ? pendingAlcoholLevel : undefined,
        per_page: 200
      })
      setTimeout(() => {
        setDisplayedCocktails(data)
        setIsSearching(false)
      }, 2000)
    } catch (error) {
      console.error('Search failed:', error)
      setIsSearching(false)
    }
  }, [pendingSearchTerm, pendingCategory, pendingAlcoholLevel])


  const handleAddCocktail = async (newCocktailData: Omit<Cocktail, 'id'>) => {
    try {
      const newCocktail = await createCocktail(newCocktailData)
      setCocktails(prev => [...prev, newCocktail])
      setShowAddForm(false)
      setSelectedCocktail(newCocktail)
    } catch (error) {
      console.error('Failed to create cocktail:', error)
      alert('カクテルの追加に失敗しました')
    }
  }

  const handleDeleteCocktail = async (cocktailToDelete: Cocktail) => {
    try {
      await deleteCocktail(cocktailToDelete.id)
      setCocktails(prev => prev.filter(c => c.id !== cocktailToDelete.id))
      if (selectedCocktail?.id === cocktailToDelete.id) {
        setSelectedCocktail(null)
      }
    } catch (error) {
      console.error('Failed to delete cocktail:', error)
      alert('カクテルの削除に失敗しました')
    }
  }

  const handleEditCocktail = (cocktail: Cocktail) => {
    setEditingCocktail(cocktail)
    setShowEditForm(true)
    setSelectedCocktail(null)
  }

  const handleUpdateCocktail = async (updatedCocktailData: Omit<Cocktail, 'id'>) => {
    if (!editingCocktail) return
    try {
      const updatedCocktail = await updateCocktail(editingCocktail.id, updatedCocktailData)
      setCocktails(prev => prev.map(c => c.id === editingCocktail.id ? updatedCocktail : c))
      setShowEditForm(false)
      setEditingCocktail(null)
      setSelectedCocktail(updatedCocktail)
    } catch (error) {
      console.error('Failed to update cocktail:', error)
      alert('カクテルの更新に失敗しました')
    }
  }

  if (authLoading || isApiLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">読み込み中...</div>
      </div>
    )
  }

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
                      if (granted) setIsShakeEnabled(!isShakeEnabled)
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
                  if (newSoundEnabled) soundUtils.playBellSound(0.3)
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
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    レシピを追加
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{currentUser?.name || currentUser?.email}</span>
                    <button
                      onClick={logout}
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      ログアウト
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthForm(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  ログイン
                </button>
              )}
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
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setShowAddForm(true)
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
                  >
                    レシピを追加
                  </button>
                  <div className="px-3 py-2 text-sm text-gray-600">{currentUser?.name || currentUser?.email}</div>
                  <button
                    onClick={() => { logout(); setIsMenuOpen(false) }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setShowAuthForm(true); setIsMenuOpen(false) }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
                >
                  ログイン
                </button>
              )}
              {isMobileDevice && shakeDetector.isSupported && (
                <button
                  onClick={async () => {
                    if (!shakeDetector.permissionGranted) {
                      const granted = await shakeDetector.requestPermission()
                      if (granted) setIsShakeEnabled(!isShakeEnabled)
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
                  if (newSoundEnabled) soundUtils.playBellSound(0.3)
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
        {isMobileDevice && isShakeEnabled && !selectedCocktail && !showAddForm && !showEditForm && (
          <div className="mb-4 p-4 bg-purple-100 border border-purple-300 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-purple-600 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-purple-800">スマホを振るとランダムでカクテルが表示されます！</span>
            </div>
            <button onClick={() => setIsShakeEnabled(false)} className="text-purple-600 hover:text-purple-800">
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
                <div className="text-gray-500">カクテルを検索中です...</div>
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
              {selectedCocktail.canEdit && (
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
              )}
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

      {showAuthForm && <AuthForm onClose={() => setShowAuthForm(false)} />}
    </div>
  )
}

export default App
