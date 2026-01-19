"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import ProductDetailsTabs from "./ProductDetailsTabs"
import ProductDetails from "./ProductDetails"
import { useProductDetailsQuery } from "@/redux/features/user/product.api"

const Product = () => {
  const { id } = useParams();
  const {data, isLoading} = useProductDetailsQuery(id, {skip: !id});
  console.log(data)

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
          <span className="text-foreground">{data?.name}</span>
        </div>

        {/* product details */}
        <ProductDetails product={data}></ProductDetails>

        {/* product details tabs */}
        {/* <ProductDetailsTabs product={product}  averageRating={averageRating}/> */}





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