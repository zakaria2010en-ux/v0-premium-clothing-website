"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Minus, Plus, X, ShoppingBag, ArrowRight, Loader2, Check } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useOrders } from "@/context/orders-context"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart()
  const { user } = useAuth()
  const { createOrder } = useOrders()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    createOrder(user.id, items, total, user.address || "Dirección no especificada")
    clearCart()
    setOrderComplete(true)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-500/10 border border-green-500/30 rounded-full">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-serif text-foreground mb-4">
              Pedido Realizado
            </h1>
            <p className="text-muted-foreground mb-8">
              Gracias por tu compra. Recibirás un email con los detalles de tu pedido.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pedidos"
                className="px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
              >
                Ver Mis Pedidos
              </Link>
              <Link
                href="/tienda"
                className="px-8 py-4 border border-border text-foreground text-sm font-medium tracking-widest uppercase hover:border-primary hover:text-primary transition-colors duration-300"
              >
                Seguir Comprando
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">
            Tu Selección
          </span>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl text-foreground">
            Cesta de Compra
          </h1>
          <p className="mt-4 text-muted-foreground">
            {itemCount} {itemCount === 1 ? "artículo" : "artículos"} en tu cesta
          </p>
        </motion.div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.article
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="relative w-24 h-32 sm:w-32 sm:h-40 bg-secondary rounded overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-foreground">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Talla: {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors duration-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-end justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.quantity - 1)
                              }
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center text-sm text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.quantity + 1)
                              }
                              className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-lg font-semibold text-primary">
                            {(item.price * item.quantity).toLocaleString("es-ES")} €
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6 sticky top-24"
              >
                <h2 className="text-lg font-serif text-foreground mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      {total.toLocaleString("es-ES")} €
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="text-foreground">
                      {total >= 200 ? "Gratis" : "15,00 €"}
                    </span>
                  </div>
                  {total < 200 && (
                    <p className="text-xs text-muted-foreground">
                      Envío gratuito en pedidos superiores a 200€
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">Total</span>
                    <span className="text-2xl font-semibold text-primary">
                      {(total + (total >= 200 ? 0 : 15)).toLocaleString("es-ES")} €
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Finalizar Compra
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {!user && (
                  <p className="mt-4 text-xs text-center text-muted-foreground">
                    Debes{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      iniciar sesión
                    </Link>{" "}
                    para finalizar la compra
                  </p>
                )}

                <Link
                  href="/tienda"
                  className="mt-4 w-full py-3 border border-border text-foreground text-sm font-medium tracking-wider uppercase hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Seguir Comprando
                </Link>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-border rounded-full text-muted-foreground">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-serif text-foreground mb-2">
              Tu cesta está vacía
            </h2>
            <p className="text-muted-foreground mb-8">
              Explora nuestra colección y añade productos a tu cesta.
            </p>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
            >
              Ir a la Tienda
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
