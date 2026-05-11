"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "./cart-context"

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "preparando" | "enviado" | "entregado"
  date: string
  address: string
}

interface OrdersContextType {
  orders: Order[]
  createOrder: (userId: string, items: CartItem[], total: number, address: string) => void
  getUserOrders: (userId: string) => Order[]
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("luxe-orders")
    if (stored) {
      setOrders(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("luxe-orders", JSON.stringify(orders))
  }, [orders])

  const createOrder = (userId: string, items: CartItem[], total: number, address: string) => {
    const newOrder: Order = {
      id: crypto.randomUUID(),
      userId,
      items,
      total,
      status: "preparando",
      date: new Date().toISOString(),
      address,
    }
    setOrders((prev) => [...prev, newOrder])
  }

  const getUserOrders = (userId: string) => {
    return orders.filter((order) => order.userId === userId)
  }

  return (
    <OrdersContext.Provider value={{ orders, createOrder, getUserOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
