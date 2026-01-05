"use client"

import type React from "react"

import Link from "next/link"
import { ShoppingCart, Menu, Search, User, Heart, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export function Navbar() {
  const totalItems = useCart((state) => state.totalItems())
  const wishlistItems = useWishlist((state) => state.items.length)
  const isAuthenticated = useAuth((state) => state.isAuthenticated)
  const [mounted, setMounted] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearchOpen(false)
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              LUMINA<span className="text-primary text-2xl">.</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/shop" className="hover:text-foreground transition-colors">
                Collections
              </Link>
              <Link href="/shop" className="hover:text-foreground transition-colors">
                Best Sellers
              </Link>
              <Link href="/story" className="hover:text-foreground transition-colors">
                Our Story
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/wishlist" className="p-2 relative text-muted-foreground hover:text-foreground">
              <Heart className="w-5 h-5" />
              {mounted && wishlistItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>
            <Link
              href={isAuthenticated ? "/profile" : "/auth"}
              className={`p-2 ${isAuthenticated ? "text-primary" : "text-muted-foreground"} hover:text-foreground relative`}
            >
              <User className="w-5 h-5" />
              {mounted && isAuthenticated && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </Link>
            <Link href="/cart" className="p-2 relative text-muted-foreground hover:text-foreground">
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/shop">
              <Button size="sm" className="hidden md:flex rounded-full">
                Shop Now
              </Button>
            </Link>
            <button className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-8 right-8 p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-2xl text-center">
            <h2 className="text-3xl font-serif mb-8 italic">Search our collections</h2>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find watches, wallets, carry-ons..."
                className="w-full text-2xl h-20 pl-16 rounded-full bg-card border-white/10 focus:border-primary focus:ring-primary"
              />
              <Button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 p-0">
                <ArrowRight className="w-6 h-6" />
              </Button>
            </form>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Trending:</span>
              <Link
                href="/shop"
                onClick={() => setIsSearchOpen(false)}
                className="text-sm hover:text-primary underline"
              >
                Timepieces
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsSearchOpen(false)}
                className="text-sm hover:text-primary underline"
              >
                Carry-ons
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsSearchOpen(false)}
                className="text-sm hover:text-primary underline"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
