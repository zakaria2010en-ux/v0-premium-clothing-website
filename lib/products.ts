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
    name: "Abrigo Cashmere Premium",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop",
    category: "abrigos",
    description: "Abrigo de cashmere italiano de la más alta calidad. Corte elegante y sofisticado.",
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "2",
    name: "Blazer Italiano Slim Fit",
    price: 899,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
    category: "chaquetas",
    description: "Blazer de corte italiano confeccionado con lana merino premium.",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    new: true,
  },
  {
    id: "3",
    name: "Vestido Seda Noir",
    price: 750,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    category: "vestidos",
    description: "Vestido de seda natural con caída perfecta y acabados artesanales.",
    sizes: ["XS", "S", "M", "L"],
    featured: true,
  },
  {
    id: "4",
    name: "Camisa Lino Exclusiva",
    price: 320,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
    category: "camisas",
    description: "Camisa de lino belga con botones de nácar genuino.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    new: true,
  },
  {
    id: "5",
    name: "Pantalón Tailored Wool",
    price: 450,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop",
    category: "pantalones",
    description: "Pantalón de lana virgen con corte sastrería tradicional.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    featured: true,
  },
  {
    id: "6",
    name: "Jersey Cashmere Elegance",
    price: 520,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
    category: "jerseys",
    description: "Jersey de cashmere mongol de punto fino.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "7",
    name: "Abrigo Lana Doble Botonadura",
    price: 1150,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    category: "abrigos",
    description: "Abrigo clásico de lana con doble botonadura y forro de seda.",
    sizes: ["S", "M", "L", "XL"],
    new: true,
  },
  {
    id: "8",
    name: "Falda Midi Plisada",
    price: 380,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj9f?w=600&h=800&fit=crop",
    category: "faldas",
    description: "Falda midi con plisado artesanal y cintura alta.",
    sizes: ["XS", "S", "M", "L"],
  },
]

export const categories = [
  { id: "todos", name: "Todos" },
  { id: "abrigos", name: "Abrigos" },
  { id: "chaquetas", name: "Chaquetas" },
  { id: "vestidos", name: "Vestidos" },
  { id: "camisas", name: "Camisas" },
  { id: "pantalones", name: "Pantalones" },
  { id: "jerseys", name: "Jerseys" },
  { id: "faldas", name: "Faldas" },
]
