import { useState } from 'react'
import type { Cocktail, Ingredient } from '../types/cocktail'

interface CocktailFormProps {
  onSubmit: (cocktail: Omit<Cocktail, 'id'>) => void
  onCancel: () => void
  initialData?: Cocktail
}

export const CocktailForm = ({ onSubmit, onCancel, initialData }: CocktailFormProps) => {
  const [name, setName] = useState(initialData?.name || '')
  const [nameEn, setNameEn] = useState(initialData?.nameEn || '')
  const [image, setImage] = useState(initialData?.image || '')
  const [imageInputType, setImageInputType] = useState<'url' | 'file'>('url')
  const [isDragOver, setIsDragOver] = useState(false)
  const [imageError, setImageError] = useState('')
  const [description, setDescription] = useState(initialData?.description || '')
  const [category, setCategory] = useState(initialData?.category || 'ショートカクテル')
  const [glass, setGlass] = useState(initialData?.glass || 'カクテルグラス')
  const [alcoholContent, setAlcoholContent] = useState(initialData?.alcoholContent || 'medium')
  const [alcoholContentType, setAlcoholContentType] = useState<'preset' | 'custom'>(
    ['non-alcoholic', 'low', 'medium', 'high'].includes(initialData?.alcoholContent || 'medium') ? 'preset' : 'custom'
  )
  const [customAlcoholContent, setCustomAlcoholContent] = useState(
    !['non-alcoholic', 'low', 'medium', 'high'].includes(initialData?.alcoholContent || 'medium') 
      ? initialData?.alcoholContent || '' 
      : ''
  )
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialData?.ingredients.length ? initialData.ingredients : [{ name: '', amount: '', unit: 'ml' }])
  const [instructions, setInstructions] = useState<string[]>(initialData?.instructions.length ? initialData.instructions : [''])
  const [flavors, setFlavors] = useState<string[]>(initialData?.flavor.length ? initialData.flavor : [''])

  const categories = ['ショートカクテル', 'ロングカクテル', 'フローズンカクテル', 'ティキカクテル', 'スパークリングカクテル', 'ホットカクテル', 'ビアカクテル']
  const glasses = ['カクテルグラス', 'ロックグラス', 'ハイボールグラス', 'コリンズグラス', 'シャンパングラス', 'ワイングラス', 'その他']
  const defaultAlcoholTags = [
    { value: 'non-alcoholic', label: 'ノンアルコール', color: 'bg-green-100 text-green-800' },
    { value: 'low', label: '低アルコール', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: '中アルコール', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: '高アルコール', color: 'bg-red-100 text-red-800' }
  ]

  const handleFileSelect = (file: File) => {
    setImageError('')
    
    // ファイルサイズチェック (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setImageError('ファイルサイズは2MB以下にしてください')
      return
    }

    // ファイルタイプチェック
    if (!file.type.startsWith('image/')) {
      setImageError('画像ファイルを選択してください')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImage(result)
    }
    reader.onerror = () => {
      setImageError('ファイルの読み込みに失敗しました')
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const clearImage = () => {
    setImage('')
    setImageError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const finalAlcoholContent = alcoholContentType === 'custom' 
      ? customAlcoholContent.trim() 
      : alcoholContent
    
    const newCocktail: Omit<Cocktail, 'id'> = {
      name,
      nameEn,
      ...(image.trim() && { image: image.trim() }),
      description,
      category,
      glass,
      alcoholContent: finalAlcoholContent,
      ingredients: ingredients.filter(ing => ing.name.trim() !== ''),
      instructions: instructions.filter(inst => inst.trim() !== ''),
      flavor: flavors.filter(f => f.trim() !== ''),
      isOriginal: initialData?.isOriginal || true
    }
    
    onSubmit(newCocktail)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'ml' }])
  }

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const updated = [...ingredients]
    updated[index] = { ...updated[index], [field]: value }
    setIngredients(updated)
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const addInstruction = () => {
    setInstructions([...instructions, ''])
  }

  const updateInstruction = (index: number, value: string) => {
    const updated = [...instructions]
    updated[index] = value
    setInstructions(updated)
  }

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const addFlavor = () => {
    setFlavors([...flavors, ''])
  }

  const updateFlavor = (index: number, value: string) => {
    const updated = [...flavors]
    updated[index] = value
    setFlavors(updated)
  }

  const removeFlavor = (index: number) => {
    setFlavors(flavors.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カクテル名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="例: オリジナルモヒート"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            英語名
          </label>
          <input
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="例: Original Mojito"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          画像
        </label>
        <div className="space-y-3">
          {/* タブ切り替え */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setImageInputType('url')}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                imageInputType === 'url'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              URL
            </button>
            <button
              type="button"
              onClick={() => setImageInputType('file')}
              className={`px-4 py-2 font-medium text-sm border-b-2 ${
                imageInputType === 'file'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              ファイル
            </button>
          </div>

          {/* URL入力 */}
          {imageInputType === 'url' && (
            <input
              type="url"
              value={image}
              onChange={(e) => {
                setImage(e.target.value)
                setImageError('')
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="例: https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300"
            />
          )}

          {/* ファイルアップロード */}
          {imageInputType === 'file' && (
            <div>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500 font-medium">
                        ファイルを選択
                      </span>
                      <span className="text-gray-500"> または ドラッグ&ドロップ</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileInputChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF（最大2MB）</p>
                </div>
              </div>
            </div>
          )}

          {/* エラーメッセージ */}
          {imageError && (
            <p className="text-red-500 text-sm">{imageError}</p>
          )}

          {/* 画像プレビュー */}
          {image && !imageError && (
            <div className="mt-2 flex items-start space-x-2">
              <img
                src={image}
                alt="カクテルプレビュー"
                className="w-32 h-24 object-cover rounded-lg border"
                onError={() => setImageError('画像の読み込みに失敗しました')}
              />
              <button
                type="button"
                onClick={clearImage}
                className="text-red-500 hover:text-red-700 p-1"
                title="画像を削除"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          説明 <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="カクテルの特徴や味わいについて説明してください"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリー
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            グラス
          </label>
          <select
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            {glasses.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            アルコール度数
          </label>
          <div className="space-y-3">
            {/* プリセットタグ選択 */}
            <div className="space-y-2">
              {defaultAlcoholTags.map((tag) => (
                <label key={tag.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="alcoholContentType"
                    value={tag.value}
                    checked={alcoholContentType === 'preset' && alcoholContent === tag.value}
                    onChange={(e) => {
                      setAlcoholContentType('preset')
                      setAlcoholContent(e.target.value)
                    }}
                    className="mr-3 text-blue-500 focus:ring-blue-400"
                  />
                  <span className={`px-2 py-1 rounded text-sm font-medium ${tag.color}`}>
                    {tag.label}
                  </span>
                </label>
              ))}
              
              {/* カスタムタグ選択 */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="alcoholContentType"
                  value="custom"
                  checked={alcoholContentType === 'custom'}
                  onChange={() => setAlcoholContentType('custom')}
                  className="mr-3 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-gray-700">カスタム</span>
              </label>
              
              {/* カスタム入力フィールド */}
              {alcoholContentType === 'custom' && (
                <div className="ml-8 mt-2">
                  <input
                    type="text"
                    value={customAlcoholContent}
                    onChange={(e) => setCustomAlcoholContent(e.target.value)}
                    placeholder="例: 微アルコール、強アルコール"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    required={alcoholContentType === 'custom'}
                  />
                  {customAlcoholContent.trim() && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">プレビュー: </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                        {customAlcoholContent.trim()}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          材料 <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 items-start">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="材料名"
                required={index === 0}
              />
              <input
                type="text"
                value={ingredient.amount}
                onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                className="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="量"
                required={index === 0}
              />
              <input
                type="text"
                value={ingredient.unit || ''}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="単位"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            材料を追加
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          作り方 <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2 items-start">
              <span className="text-gray-500 mt-2">{index + 1}.</span>
              <input
                type="text"
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="手順を入力"
                required={index === 0}
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            手順を追加
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          フレーバー
        </label>
        <div className="space-y-2">
          {flavors.map((flavor, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={flavor}
                onChange={(e) => updateFlavor(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="例: フルーティー、爽やか"
              />
              {flavors.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFlavor(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFlavor}
            className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            フレーバーを追加
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {initialData ? 'カクテルを更新' : 'カクテルを追加'}
        </button>
      </div>
    </form>
  )
}