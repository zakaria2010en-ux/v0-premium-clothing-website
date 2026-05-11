"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Lock, LogOut, Loader2, Check, Package } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function AccountPage() {
  const router = useRouter()
  const { user, isLoading: authLoading, logout, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "address">("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  // Profile form
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Address form
  const [address, setAddress] = useState("")

  // Security form
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setPhone(user.phone || "")
      setAddress(user.address || "")
    }
  }, [user])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateUser({ name, email, phone })
    setSuccess("Perfil actualizado correctamente")
    setIsLoading(false)
  }

  const handleAddressUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateUser({ address })
    setSuccess("Dirección actualizada correctamente")
    setIsLoading(false)
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      return
    }
    setIsLoading(true)
    setSuccess("")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSuccess("Contraseña actualizada correctamente")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setIsLoading(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

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

  const tabs = [
    { id: "profile" as const, label: "Datos Personales", icon: User },
    { id: "address" as const, label: "Dirección de Envío", icon: MapPin },
    { id: "security" as const, label: "Seguridad", icon: Lock },
  ]

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
            Panel de Usuario
          </span>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl text-foreground">
            Mi Cuenta
          </h1>
          <p className="mt-4 text-muted-foreground">
            Bienvenido, {user.name}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-card border border-border p-6 rounded-lg space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSuccess("")
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-300 rounded ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}

              {/* Orders Link */}
              <Link
                href="/pedidos"
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-foreground hover:bg-secondary transition-all duration-300 rounded"
              >
                <Package className="w-5 h-5" />
                Mis Pedidos
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/10 transition-all duration-300 rounded mt-4"
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </button>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border p-8 rounded-lg">
              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded flex items-center gap-2 text-green-500"
                >
                  <Check className="w-5 h-5" />
                  {success}
                </motion.div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <h2 className="text-xl font-serif text-foreground mb-6">
                    Datos Personales
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Teléfono
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                          placeholder="+34 600 000 000"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar Cambios"
                    )}
                  </button>
                </form>
              )}

              {/* Address Tab */}
              {activeTab === "address" && (
                <form onSubmit={handleAddressUpdate} className="space-y-6">
                  <h2 className="text-xl font-serif text-foreground mb-6">
                    Dirección de Envío
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Dirección completa
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                        placeholder="Calle, número, piso, código postal, ciudad..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar Dirección"
                    )}
                  </button>
                </form>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <h2 className="text-xl font-serif text-foreground mb-6">
                    Cambiar Contraseña
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contraseña actual
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Confirmar nueva contraseña
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-input border border-border text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="mt-2 text-sm text-destructive">
                        Las contraseñas no coinciden
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || newPassword !== confirmPassword}
                    className="px-8 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Actualizando...
                      </>
                    ) : (
                      "Actualizar Contraseña"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
