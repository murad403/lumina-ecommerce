"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import ProductDetailsTabs from "./ProductDetailsTabs"
import ProductDetails from "./ProductDetails"
import { useProductDetailsQuery } from "@/redux/features/user/product.api"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"

const Product = () => {
  const { id } = useParams();
  const {data, isLoading, isError} = useProductDetailsQuery(id, {skip: !id});
  // console.log(data)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-32 pb-24">

        {/* breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span>/</span>
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span className="text-foreground">{data?.title || data?.name || id}</span>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
        )}

        {/* Error or Not Found State */}
        {(isError || (!isLoading && !data)) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Product Not Found</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Sorry, we couldn't find the product you're looking for. It may have been removed or the link may be incorrect.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        )}

        {/* product details */}
         {!isLoading && !isError && data && (
          <ProductDetails product={data}></ProductDetails>
        )}



        {/* product details tabs */}
        <ProductDetailsTabs product={data}/>





        {/* Related Products */}
        {/* {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif">You May Also Like</h2>
              <Link href="/shop" className="text-primary hover:underline text-sm">
                View All Products
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} price={p.price} />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </main>
  )
}


export default Product;