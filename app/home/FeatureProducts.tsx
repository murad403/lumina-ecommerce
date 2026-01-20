"use client"
import { ProductCard } from '@/components/product-card'
import { useGetProductsQuery } from '@/redux/features/user/product.api'
import { TProduct } from '@/types/all'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const FeatureProducts = () => {
    const {data} = useGetProductsQuery({search: "", category: "", min_price: undefined, max_price: undefined});
    // console.log(data)
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
                {
                    data?.results?.slice(0, 4).map((product: TProduct) =>
                        <ProductCard key={product?.id} product={product} />
                    )
                }
            </div>
        </section>
    )
}

export default FeatureProducts
