"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"
import { products } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  id?: number
  name: string
  price: string
  image: string
  tag?: string
}

export function ProductCard({ id = 1, name, price, image, tag }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const isWishlisted = isInWishlist(id)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const product = products.find((p) => p.id === id)
    if (!product) return

    if (isWishlisted) {
      removeItem(id)
      toast({ title: "Removed from Wishlist", description: `${name} has been removed.` })
    } else {
      addItem(product)
      toast({ title: "Added to Wishlist", description: `${name} has been added.` })
    }
  }

  


  return (
    <Link
      href={`/product/${id}`}
      className="block group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-all"
    >
      <div className="aspect-4/5 relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {tag && <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{tag}</Badge>}
        <button
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
            isWishlisted ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground hover:text-primary"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-medium text-lg leading-tight">{name}</h3>
        <p className="text-primary font-bold">{price}</p>
        {/* <Button onClick={handleAddToCart} className="w-full mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          Quick Add
        </Button> */}
      </div>
    </Link>
  )
}
