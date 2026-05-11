"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Package, Clock, Truck, CheckCircle, ShoppingBag, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useOrders, type Order } from "@/context/orders-context"

const statusConfig = {
  preparando: {
    label: "Preparando",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
  enviado: {
    label: "Enviado",
    icon: Truck,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  entregado: {
    label: "Entregado",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
}

function OrderCard({ order, index }: { order: Order; index: number }) {
  const status = statusConfig[order.status]
  const StatusIcon = status.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Order Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Pedido #{order.id.slice(0, 8)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(order.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Status Badge */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.bgColor} ${status.borderColor} border`}
          >
            <StatusIcon className={`w-4 h-4 ${status.color}`} />
            <span className={`text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 space-y-4">
        {order.items.map((item, itemIndex) => (
          <div key={`${item.id}-${item.size}-${itemIndex}`} className="flex gap-4">
            <div className="relative w-20 h-24 bg-secondary rounded overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Talla: {item.size}
              </p>
              <p className="text-sm text-muted-foreground">
                Cantidad: {item.quantity}
              </p>
              <p className="mt-2 text-sm font-medium text-primary">
                {(item.price * item.quantity).toLocaleString("es-ES")} €
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="p-6 bg-secondary/30 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total del pedido
            </p>
            <p className="mt-1 text-xl font-semibold text-primary">
              {order.total.toLocaleString("es-ES")} €
            </p>
          </div>
          {order.status === "enviado" && (
            <button className="px-6 py-2 border border-primary text-primary text-sm font-medium tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              Rastrear Envío
            </button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { getUserOrders } = useOrders()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const orders = getUserOrders(user.id).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">
            Historial
          </span>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl text-foreground">
            Mis Pedidos
          </h1>
          <p className="mt-4 text-muted-foreground">
            Consulta el estado de tus pedidos y su historial de envío.
          </p>
        </motion.div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-border rounded-full text-muted-foreground">
              <Package className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-serif text-foreground mb-2">
              No tienes pedidos todavía
            </h2>
            <p className="text-muted-foreground mb-8">
              Explora nuestra colección y realiza tu primera compra.
            </p>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Ir a la Tienda
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
