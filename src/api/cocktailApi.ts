import type { Cocktail } from '../types/cocktail'
import { authHeaders } from './authApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

interface CocktailsResponse {
  cocktails: Cocktail[]
  meta: {
    currentPage: number
    totalPages: number
    totalCount: number
  }
}

export async function fetchCocktails(params?: {
  search?: string
  category?: string
  alcoholContent?: string
  page?: number
  per_page?: number
}): Promise<CocktailsResponse> {
  const query = new URLSearchParams()
  if (params?.search) query.set('search', params.search)
  if (params?.category && params.category !== 'all') query.set('category', params.category)
  if (params?.alcoholContent && params.alcoholContent !== 'all') query.set('alcoholContent', params.alcoholContent)
  if (params?.page) query.set('page', params.page.toString())
  if (params?.per_page) query.set('per_page', params.per_page.toString())

  const res = await fetch(`${API_BASE_URL}/api/v1/cocktails?${query}`, {
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to fetch cocktails')
  return res.json()
}

export async function fetchCocktail(id: string): Promise<Cocktail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/cocktails/${id}`, {
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Cocktail not found')
  const data = await res.json()
  return data.cocktail
}

export async function fetchRandomCocktail(): Promise<Cocktail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/cocktails/random`, {
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to fetch random cocktail')
  const data = await res.json()
  return data.cocktail
}

export async function createCocktail(cocktailData: Omit<Cocktail, 'id'>): Promise<Cocktail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/cocktails`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      cocktail: {
        name: cocktailData.name,
        name_en: cocktailData.nameEn,
        image_url: cocktailData.image,
        description: cocktailData.description,
        ingredients: cocktailData.ingredients,
        instructions: cocktailData.instructions,
        glass: cocktailData.glass,
        category: cocktailData.category,
        alcohol_content: cocktailData.alcoholContent,
        flavors: cocktailData.flavor
      }
    })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.errors?.join(', ') || 'Failed to create cocktail')
  return data.cocktail
}

export async function updateCocktail(id: string, cocktailData: Omit<Cocktail, 'id'>): Promise<Cocktail> {
  const res = await fetch(`${API_BASE_URL}/api/v1/cocktails/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({
      cocktail: {
        name: cocktailData.name,
        name_en: cocktailData.nameEn,
        image_url: cocktailData.image,
        description: cocktailData.description,
        ingredients: cocktailData.ingredients,
        instructions: cocktailData.instructions,
        glass: cocktailData.glass,
        category: cocktailData.category,
        alcohol_content: cocktailData.alcoholContent,
        flavors: cocktailData.flavor
      }
    })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.errors?.join(', ') || 'Failed to update cocktail')
  return data.cocktail
}

export async function deleteCocktail(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/v1/cocktails/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Failed to delete cocktail')
}

export async function uploadCocktailImage(id: string, file: File): Promise<Cocktail> {
  const token = authHeaders()['Authorization' as keyof HeadersInit]
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`${API_BASE_URL}/api/v1/cocktails/${id}/upload_image`, {
    method: 'POST',
    headers: token ? { 'Authorization': token as string } : {},
    body: formData
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to upload image')
  return data.cocktail
}
