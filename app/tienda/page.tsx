"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/products"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products
    .filter((p) => selectedCategory === "todos" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return 0
    })

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm tracking-[0.3em] uppercase">
            Colección Completa
          </span>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl text-foreground">
            Nuestra Tienda
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra selección de prendas exclusivas, confeccionadas con los 
            mejores materiales y un diseño impecable.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-300"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </button>

          {/* Desktop Categories */}
          <div className="hidden lg:flex items-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-sm tracking-wider transition-colors duration-300 ${
                  selectedCategory === category.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-input border border-border text-foreground text-sm px-3 py-2 focus:outline-none focus:border-primary transition-colors duration-300"
            >
              <option value="default">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} productos
          </p>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mb-8 p-6 bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-foreground">Categorías</span>
              <button
                onClick={() => setShowFilters(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setShowFilters(false)
                  }}
                  className={`px-4 py-2 text-sm border transition-colors duration-300 ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              No se encontraron productos en esta categoría.
            </p>
            <button
              onClick={() => setSelectedCategory("todos")}
              className="mt-4 text-primary hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
