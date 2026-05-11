"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Truck, Shield } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"

const featuredProducts = products.filter((p) => p.featured)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
            alt="Luxury fashion"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-primary text-sm tracking-[0.3em] uppercase mb-6"
          >
            Nueva Colección 2024
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight text-balance"
          >
            Elegancia <span className="text-primary">Atemporal</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            Descubre prendas exclusivas confeccionadas con los materiales más selectos. 
            Lujo y sofisticación en cada detalle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/tienda"
              className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
            >
              Comprar Ahora
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tienda"
              className="px-8 py-4 border border-foreground/30 text-foreground text-sm font-medium tracking-widest uppercase hover:border-primary hover:text-primary transition-all duration-300"
            >
              Ver Colección
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Calidad Premium",
                description: "Materiales selectos de las mejores casas europeas",
              },
              {
                icon: Truck,
                title: "Envío Gratuito",
                description: "En todos nuestros pedidos",
              },
              {
                icon: Shield,
                title: "Garantía Total",
                description: "Todos nuestros proveedores son de confianza y ofrecen los mejores productos del mercado",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase">
              Selección Exclusiva
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-foreground">
              Productos Destacados
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 text-primary text-sm tracking-widest uppercase hover:gap-4 transition-all duration-300"
            >
              Ver Toda la Colección
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Split Banner */}
      <section className="py-20 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Image Side */}
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
                alt="Luxury collection"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="flex items-center justify-center bg-card p-8 lg:p-16">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-md"
              >
                <span className="text-primary text-sm tracking-[0.3em] uppercase">
                  Colección Otoño-Invierno
                </span>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl text-foreground leading-tight">
                  El Arte de la <span className="text-primary">Sofisticación</span>
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Cada prenda es una obra maestra de artesanía. Nuestros diseñadores 
                  combinan técnicas tradicionales con innovación contemporánea para 
                  crear piezas que trascienden el tiempo.
                </p>
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-3 mt-8 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
                >
                  Explorar
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase">
              Newsletter
            </span>
            <h2 className="mt-4 font-serif text-4xl text-foreground">
              Únete al Club LUXE
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sé el primero en descubrir nuestras nuevas colecciones y ofertas exclusivas.
            </p>

            <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-6 py-4 bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-primary-foreground text-sm font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors duration-300"
              >
                Suscribirse
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
