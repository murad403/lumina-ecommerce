import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FeatureProducts = () => {
    return (
        <section className="py-24 container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl md:text-7xl font-serif mb-6 italic">
                        Curated <span className="not-italic">Excellence</span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg text-lg">
                        Our most sought-after essentials, handpicked for the discerning individual who values architectural
                        precision and timeless design.
                    </p>
                </div>
                <Link href="/shop" className='flex items-center'>
                    <span className='hover:underline underline-offset-4'>View Collection</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ProductCard
                    id={1}
                    name="Ethereal Chronograph"
                    price="$299.00"
                    image="/luxury-gold-watch-minimalist-dark-background.jpg"
                    tag="Best Seller"
                />
                <ProductCard
                    id={2}
                    name="Noir Leather Wallet"
                    price="$89.00"
                    image="/minimalist-black-leather-wallet-premium.jpg"
                />
                <ProductCard
                    id={3}
                    name="Vertex Audio Pods"
                    price="$199.00"
                    image="/sleek-minimalist-wireless-earbuds-black.jpg"
                    tag="New Arrival"
                />
                <ProductCard id={4} name="Onyx Carry-on" price="$450.00" image="/premium-matte-black-suitcase-luggage.jpg" />
            </div>
        </section>
    )
}

export default FeatureProducts
