export interface Review {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

export interface Product {
  id: string
  name: string
  price: number
  priceFormatted: string
  image: string
  images?: string[]
  category: string
  tag?: string
  description: string
  colors?: { name: string; value: string }[]
  sizes?: string[]
  reviews?: Review[]
}

export const products: Product[] = [
  {
    id: "ethereal-chronograph",
    name: "Ethereal Chronograph",
    price: 299,
    priceFormatted: "$299.00",
    image: "/luxury-gold-watch-minimalist-dark-background.jpg",
    images: [
      "/luxury-gold-watch-minimalist-dark-background.jpg",
      "/luxury-watch-detail-1.jpg",
      "/luxury-watch-detail-2.jpg",
    ],
    category: "Timepieces",
    tag: "Best Seller",
    description:
      "Experience time through the lens of pure minimalism. Features a hand-polished gold-plated titanium case and sapphire crystal dome.",
    colors: [
      { name: "Gold", value: "oklch(0.85 0.12 85)" },
      { name: "Silver", value: "oklch(0.9 0 0)" },
      { name: "Space Black", value: "oklch(0.2 0 0)" },
    ],
    sizes: ["40mm", "42mm", "44mm"],
    reviews: [
      {
        id: "1",
        author: "Marcus Chen",
        rating: 5,
        date: "2024-01-15",
        comment: "Absolutely stunning timepiece. The craftsmanship is impeccable and it feels luxurious on the wrist.",
        verified: true,
      },
      {
        id: "2",
        author: "Sarah Johnson",
        rating: 5,
        date: "2024-01-10",
        comment: "Worth every penny. The gold finish is sophisticated and the minimalist design is timeless.",
        verified: true,
      },
      {
        id: "3",
        author: "David Park",
        rating: 4,
        date: "2024-01-05",
        comment: "Beautiful watch, though the price point is quite high. Quality is undeniable.",
        verified: true,
      },
    ],
  },
  {
    id: "noir-leather-wallet",
    name: "Noir Leather Wallet",
    price: 89,
    priceFormatted: "$89.00",
    image: "/minimalist-black-leather-wallet-premium.jpg",
    images: ["/minimalist-black-leather-wallet-premium.jpg", "/leather-wallet-open.jpg", "/leather-wallet-texture.jpg"],
    category: "Leather Goods",
    tag: "Best Seller",
    description:
      "Crafted from premium Italian full-grain leather, this wallet combines sleek dimensions with maximum utility.",
    colors: [
      { name: "Onyx", value: "oklch(0.15 0 0)" },
      { name: "Cognac", value: "oklch(0.45 0.15 45)" },
      { name: "Emerald", value: "oklch(0.35 0.1 160)" },
    ],
    reviews: [
      {
        id: "4",
        author: "Alex Rivera",
        rating: 5,
        date: "2024-01-20",
        comment: "The leather quality is exceptional. Perfect slim design for front pocket carry.",
        verified: true,
      },
      {
        id: "5",
        author: "Emma Wilson",
        rating: 5,
        date: "2024-01-18",
        comment: "Bought this as a gift and my partner loves it. Looks even better in person!",
        verified: true,
      },
    ],
  },
  {
    id: "vertex-audio-pods",
    name: "Vertex Audio Pods",
    price: 199,
    priceFormatted: "$199.00",
    image: "/sleek-minimalist-wireless-earbuds-black.jpg",
    category: "Audio",
    tag: "New Arrival",
    description: "Superior sound meets architectural design. Features noise cancellation and 30 hours of battery life.",
    reviews: [
      {
        id: "6",
        author: "James Lee",
        rating: 5,
        date: "2024-01-22",
        comment: "Best earbuds I've owned. Sound quality is crystal clear and noise cancellation is amazing.",
        verified: true,
      },
      {
        id: "7",
        author: "Olivia Martinez",
        rating: 4,
        date: "2024-01-19",
        comment: "Great audio quality and comfortable fit. Battery life is impressive as advertised.",
        verified: true,
      },
    ],
  },
  {
    id: "onyx-carry-on",
    name: "Onyx Carry-on",
    price: 450,
    priceFormatted: "$450.00",
    image: "/premium-matte-black-suitcase-luggage.jpg",
    category: "Travel",
    description:
      "The ultimate travel companion. Lightweight aerospace-grade polycarbonate shell with silent 360° wheels.",
    reviews: [
      {
        id: "8",
        author: "Ryan Thompson",
        rating: 5,
        date: "2024-01-25",
        comment: "Premium quality luggage. The wheels glide smoothly and it's surprisingly lightweight.",
        verified: true,
      },
    ],
  },
  {
    id: "lumina-desk-lamp",
    name: "Lumina Desk Lamp",
    price: 185,
    priceFormatted: "$185.00",
    image: "/luxury-minimalist-desk-lamp-modern-lighting.jpg",
    images: ["/luxury-minimalist-desk-lamp-modern-lighting.jpg", "/desk-lamp-side-view.jpg", "/desk-lamp-lighting.jpg"],
    category: "Home",
    tag: "New",
    description:
      "Architectural lighting refined to its purest form. Features touch-sensitive dimming and wireless charging base.",
    colors: [
      { name: "Matte Black", value: "oklch(0.2 0 0)" },
      { name: "Brushed Steel", value: "oklch(0.7 0 0)" },
    ],
    reviews: [
      {
        id: "9",
        author: "Sophie Anderson",
        rating: 5,
        date: "2024-01-28",
        comment: "Beautiful lamp with perfect lighting for my workspace. The wireless charging is a great bonus.",
        verified: true,
      },
    ],
  },
  {
    id: "minimal-leather-folio",
    name: "Minimal Leather Folio",
    price: 120,
    priceFormatted: "$120.00",
    image: "/minimalist-leather-folio-portfolio-black.jpg",
    images: ["/minimalist-leather-folio-portfolio-black.jpg", "/leather-folio-open.jpg", "/leather-folio-detail.jpg"],
    category: "Leather Goods",
    tag: "Limited",
    description:
      "Executive portfolio crafted from vegetable-tanned leather. Features multiple card slots and document compartments.",
    colors: [
      { name: "Jet Black", value: "oklch(0.15 0 0)" },
      { name: "Tan", value: "oklch(0.55 0.1 50)" },
    ],
    reviews: [
      {
        id: "10",
        author: "Michael Brown",
        rating: 5,
        date: "2024-01-26",
        comment: "Professional and elegant. Perfect for client meetings and travel.",
        verified: true,
      },
    ],
  },
  {
    id: "titanium-key-loop",
    name: "Titanium Key Loop",
    price: 45,
    priceFormatted: "$45.00",
    image: "/luxury-minimalist-titanium-keychain-modern.jpg",
    images: [
      "/luxury-minimalist-titanium-keychain-modern.jpg",
      "/titanium-keychain-closeup.jpg",
      "/titanium-keychain-lifestyle.jpg",
    ],
    category: "Accessories",
    description:
      "Precision-machined from aerospace-grade titanium. Ultra-lightweight yet incredibly durable key organization.",
    colors: [
      { name: "Titanium", value: "oklch(0.65 0 0)" },
      { name: "Black Oxide", value: "oklch(0.25 0 0)" },
    ],
    reviews: [
      {
        id: "11",
        author: "Chris Taylor",
        rating: 5,
        date: "2024-01-30",
        comment: "Incredibly light but feels solid. Love the minimalist design.",
        verified: true,
      },
      {
        id: "12",
        author: "Laura White",
        rating: 4,
        date: "2024-01-29",
        comment: "Great quality and sleek look. A bit pricey but worth it for the durability.",
        verified: true,
      },
    ],
  },
]
