import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NewArrivals = () => {
    return (
        <section className="py-32 bg-card/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl -z-10" />
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-20">
                    <div className="text-center md:text-left">
                        <h2 className="text-5xl md:text-8xl font-serif italic mb-6">
                            New <span className="not-italic">Arrivals</span>
                        </h2>
                        <p className="text-muted-foreground text-xl">The latest additions to our architectural collection.</p>
                    </div>
                    <Link href="/shop" className="mt-8 md:mt-0">
                        <Button
                            variant="outline"
                            className="rounded-full px-10 py-8 text-lg border-primary/20 hover:bg-primary/5 bg-transparent"
                        >
                            Explore All New
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <ProductCard
                        id={1}
                        name="Lumina Desk Lamp"
                        price="$185.00"
                        image="/luxury-minimalist-desk-lamp-modern-lighting.jpg"
                        tag="New"
                    />
                    <ProductCard
                        id={2}
                        name="Minimal Leather Folio"
                        price="$120.00"
                        image="/minimalist-leather-folio-portfolio-black.jpg"
                        tag="Limited"
                    />
                    <ProductCard
                        id={3}
                        name="Titanium Key Loop"
                        price="$45.00"
                        image="/luxury-minimalist-titanium-keychain-modern.jpg"
                    />
                </div>
            </div>
        </section>
    )
}

export default NewArrivals
