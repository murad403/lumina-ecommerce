import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Collection = () => {
  return (
    <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/shop" className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-card">
            <img
              src="/luxury-gold-watch-minimalist-dark-background.jpg"
              alt="Timepieces"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/20 group-hover:bg-black/40 transition-all">
              <span className="text-xs uppercase tracking-[0.3em] font-bold mb-2">Collection</span>
              <h3 className="text-3xl font-serif italic">Timepieces</h3>
              <Button
                variant="link"
                className="text-white p-0 h-auto mt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
              >
                Explore →
              </Button>
            </div>
          </Link>
          <Link href="/shop" className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-card">
            <img
              src="/minimalist-black-leather-wallet-premium.jpg"
              alt="Accessories"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/20 group-hover:bg-black/40 transition-all">
              <span className="text-xs uppercase tracking-[0.3em] font-bold mb-2">Essential</span>
              <h3 className="text-3xl font-serif italic">Leather Goods</h3>
              <Button
                variant="link"
                className="text-white p-0 h-auto mt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
              >
                Explore →
              </Button>
            </div>
          </Link>
          <Link href="/shop" className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-card">
            <img
              src="/premium-matte-black-suitcase-luggage.jpg"
              alt="Travel"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/20 group-hover:bg-black/40 transition-all">
              <span className="text-xs uppercase tracking-[0.3em] font-bold mb-2">Voyage</span>
              <h3 className="text-3xl font-serif italic">Travel Sets</h3>
              <Button
                variant="link"
                className="text-white p-0 h-auto mt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0"
              >
                Explore →
              </Button>
            </div>
          </Link>
        </div>
      </section>

  )
}

export default Collection
