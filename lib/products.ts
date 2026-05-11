export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  sizes: string[]
  featured?: boolean
  new?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "PROVEEDOR ACCESORIOS",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "accesorios",
    description: "Personalización de productos. Proveedores de accesorios de alta calidad.",
    sizes: ["Único"],
    featured: true,
  },
  {
    id: "2",
    name: "PACK PROVEEDORES",
    price: 29.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "packs",
    description: "Envoltorios para regalos. Pack completo de proveedores premium.",
    sizes: ["Único"],
    featured: true,
    new: true,
  },
  {
    id: "3",
    name: "PROVEEDOR PERFUMES",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "perfumes",
    description: "Grabaciones de voz y de campo. Proveedores de perfumes exclusivos.",
    sizes: ["Único"],
    featured: true,
  },
  {
    id: "4",
    name: "99 TICKETS EDITABLES",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "tickets",
    description: "Entradas para eventos. 99 tickets completamente editables.",
    sizes: ["Único"],
    new: true,
  },
  {
    id: "5",
    name: "PROVEEDOR RELOJES",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "relojes",
    description: "Relojes de pulsera y de bolsillo. Proveedores de relojes de alta gama.",
    sizes: ["Único"],
    featured: true,
  },
  {
    id: "6",
    name: "PROVEEDOR VAPERS",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "vapers",
    description: "Cigarrillos electrónicos. Proveedores de vapers y accesorios.",
    sizes: ["Único"],
  },
  {
    id: "7",
    name: "PROVEEDOR ROPA",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "ropa",
    description: "Arreglos de ropa. Proveedores de ropa y textiles de calidad.",
    sizes: ["Único"],
    new: true,
  },
  {
    id: "8",
    name: "PROVEEDOR ZAPAS",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "zapas",
    description: "Personalización de productos. Proveedores de zapatillas exclusivas.",
    sizes: ["Único"],
  },
  {
    id: "9",
    name: "PROVEEDOR TECNOLOGIA",
    price: 14.95,
    image: "/placeholder.svg?height=800&width=600",
    category: "tecnologia",
    description: "Teléfonos móviles e inteligentes. Proveedores de tecnología premium.",
    sizes: ["Único"],
    featured: true,
  },
]

export const categories = [
  { id: "todos", name: "Todos" },
  { id: "accesorios", name: "Accesorios" },
  { id: "packs", name: "Packs" },
  { id: "perfumes", name: "Perfumes" },
  { id: "tickets", name: "Tickets" },
  { id: "relojes", name: "Relojes" },
  { id: "vapers", name: "Vapers" },
  { id: "ropa", name: "Ropa" },
  { id: "zapas", name: "Zapas" },
  { id: "tecnologia", name: "Tecnología" },
]
