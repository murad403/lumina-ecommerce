"use client"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useWishlist } from "@/hooks/use-wishlist"

export default function WishlistPage() {
  const { items } = useWishlist()

  return (
    <main className="min-h-screen bg-background">

      <div className="container mx-auto px-4 pt-32 pb-24">
        <header className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="w-12 h-12 text-primary fill-primary/20" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">Your curated selection of future essentials.</p>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-card/20 rounded-3xl border border-white/5">
            <p className="text-muted-foreground mb-8">Your wishlist is currently empty.</p>
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-12">
                Discover Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.priceFormatted}
                image={product.image}
                tag={product.tag}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
