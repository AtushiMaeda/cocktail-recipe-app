import type { User } from '../types/cocktail'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const TOKEN_KEY = 'auth_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function authHeaders(): HeadersInit {
  const token = getToken()
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export async function signUp(email: string, password: string, name: string): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/sign_up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { email, password, password_confirmation: password, name } })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.errors?.join(', ') || 'Registration failed')
  return data.user
}

export async function signIn(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/sign_in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { email, password } })
  })
  const token = res.headers.get('Authorization')?.replace('Bearer ', '')
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Login failed')
  if (token) saveToken(token)
  return data.user
}

export async function signOut(): Promise<void> {
  const token = getToken()
  if (!token) return
  await fetch(`${API_BASE_URL}/api/v1/auth/sign_out`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  clearToken()
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getToken()
  if (!token) return null
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!res.ok) {
      clearToken()
      return null
    }
    const data = await res.json()
    return data.user
  } catch {
    return null
  }
}
