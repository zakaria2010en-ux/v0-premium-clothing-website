"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  address?: string
  phone?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("luxe-user")
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("luxe-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("luxe-user")
    }
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Demo: check stored users
    const users = JSON.parse(localStorage.getItem("luxe-users") || "[]")
    const found = users.find((u: { email: string; password: string }) => 
      u.email === email && u.password === password
    )
    
    if (found) {
      setUser({
        id: found.id,
        email: found.email,
        name: found.name || email.split("@")[0],
        address: found.address,
        phone: found.phone,
      })
      return true
    }
    return false
  }

  const register = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const users = JSON.parse(localStorage.getItem("luxe-users") || "[]")
    const exists = users.find((u: { email: string }) => u.email === email)
    
    if (exists) {
      return false
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name: email.split("@")[0],
    }
    
    users.push(newUser)
    localStorage.setItem("luxe-users", JSON.stringify(users))
    
    setUser({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })
    
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      
      // Update in users list too
      const users = JSON.parse(localStorage.getItem("luxe-users") || "[]")
      const index = users.findIndex((u: { id: string }) => u.id === user.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...data }
        localStorage.setItem("luxe-users", JSON.stringify(users))
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
