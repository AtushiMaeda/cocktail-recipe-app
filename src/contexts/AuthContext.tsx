import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types/cocktail'
import { signIn, signUp, signOut, getCurrentUser } from '../api/authApi'

interface AuthContextValue {
  currentUser: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then(user => {
      setCurrentUser(user)
      setIsLoading(false)
    })
  }, [])

  const login = async (email: string, password: string) => {
    const user = await signIn(email, password)
    setCurrentUser(user)
  }

  const logout = async () => {
    await signOut()
    setCurrentUser(null)
  }

  const register = async (email: string, password: string, name: string) => {
    await signUp(email, password, name)
    const user = await signIn(email, password)
    setCurrentUser(user)
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isLoading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
