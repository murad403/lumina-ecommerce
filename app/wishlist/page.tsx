"use client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetWishlistQuery } from "@/redux/features/user/wishlist.api"
import { TWishListItem } from "@/types/wish-list"
import WishListProductCard from "@/components/WishListProductCard"

export default function WishlistPage() {

  const { data, isLoading } = useGetWishlistQuery(undefined);
 
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="aspect-4/5 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ))}
          </div>
        ) : data?.length === 0 ? (
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
            {
              data?.map((product: TWishListItem) => (
                <WishListProductCard key={product?.id} product={product} />
              ))}
          </div>
        )}
      </div>
    </main>
  )
}
