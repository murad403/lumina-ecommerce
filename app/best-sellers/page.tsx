import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { ChevronDown } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-32 pb-24">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-serif mb-4">Best Sellers</h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Explore our meticulously curated selection of premium goods, designed for those who appreciate the finer things.
                    </p>
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-64 space-y-8">
                        <div>
                            <h3 className="font-bold uppercase text-xs tracking-widest mb-4">Categories</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="text-primary font-medium">All Items</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Timepieces</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Leather Goods</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Audio</li>
                                <li className="hover:text-primary cursor-pointer transition-colors">Travel</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold uppercase text-xs tracking-widest mb-4">Price Range</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-white/10 bg-card" id="p1" />
                                    <label htmlFor="p1" className="text-sm text-muted-foreground">
                                        $0 - $100
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-white/10 bg-card" id="p2" />
                                    <label htmlFor="p2" className="text-sm text-muted-foreground">
                                        $100 - $500
                                    </label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-white/10 bg-card" id="p3" />
                                    <label htmlFor="p3" className="text-sm text-muted-foreground">
                                        $500+
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                            <span className="text-sm text-muted-foreground">Showing {products.length} results</span>
                            <Button variant="ghost" size="sm" className="gap-2">
                                Sort By <ChevronDown className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
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
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page
