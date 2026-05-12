"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingBag, Heart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/products"

declare global {
  interface Window {
    ShopifyBuy: any
  }
}

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { addItem } = useCart()
  
  const isPackProveedores = product.name === "PACK PROVEEDORES"
  
  useEffect(() => {
    if (!isPackProveedores) return
    
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
    
    function ShopifyBuyInit() {
      const client = window.ShopifyBuy.buildClient({
        domain: 'prnpkh-iy.myshopify.com',
        storefrontAccessToken: 'de9901cf9776dedbe1d1370b2f330081',
      })
      
      window.ShopifyBuy.UI.onReady(client).then(function (ui: any) {
        const packNode = document.getElementById('product-component-pack-proveedores')
        if (packNode && !packNode.hasChildNodes()) {
          ui.createComponent('product', {
            id: '15694103445835',
            node: packNode,
            moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
            options: {
              product: {
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px"
                    }
                  },
                  button: {
                    "background-color": "hsl(var(--primary))",
                    "font-family": "inherit",
                    ":hover": {
                      "background-color": "hsl(var(--primary) / 0.9)"
                    },
                    "font-size": "12px",
                    "padding": "12px 24px",
                    "font-weight": "500",
                    "text-transform": "uppercase",
                    "letter-spacing": "0.05em"
                  }
                },
                text: {
                  button: "Comprar"
                }
              },
              cart: {
                text: {
                  total: "Subtotal",
                  button: "Pagar"
                }
              }
            },
          })
        }
      })
    }
    
    function loadScript() {
      const script = document.createElement('script')
      script.async = true
      script.src = scriptURL
      document.head.appendChild(script)
      script.onload = ShopifyBuyInit
    }
    
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit()
      } else {
        loadScript()
      }
    } else {
      loadScript()
    }
  }, [isPackProveedores])

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-card rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-background/40 backdrop-blur-sm flex items-end justify-center pb-6"
        >
          {/* Size Selection */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 text-xs font-medium border transition-all duration-300 ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background/80 text-foreground border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {isPackProveedores ? (
              <div id="product-component-pack-proveedores" className="shopify-buy-button"></div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                Añadir
              </button>
            )}
          </div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.new && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium tracking-wider uppercase">
              Nuevo
            </span>
          )}
          {product.originalPrice && (
            <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium tracking-wider uppercase">
              Oferta
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-background/80 rounded-full text-foreground hover:text-primary transition-colors duration-300"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isLiked ? "fill-primary text-primary" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-primary">
            {product.price.toLocaleString("es-ES")} €
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString("es-ES")} €
            </span>
          )}
        </div>

      </div>
    </motion.article>
  )
}
