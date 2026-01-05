"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star, Plus, Minus, Heart, Check, Truck, Shield, RotateCcw, Package } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"
import { useCart } from "@/hooks/use-cart"
import { notFound } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useWishlist } from "@/hooks/use-wishlist"
import { ProductCard } from "@/components/product-card"
import { useAuth } from "@/hooks/use-auth"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)
  if (!product) notFound()

  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [activeImage, setActiveImage] = useState(0)

  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")

  const addItem = useCart((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const { isAuthenticated, user } = useAuth()

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, quantity, { color: selectedColor, size: selectedSize })
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your shopping bag.`,
    })
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({ title: "Removed from Wishlist" })
    } else {
      addToWishlist(product)
      toast({ title: "Added to Wishlist" })
    }
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to write a review.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })

    setReviewRating(5)
    setReviewComment("")
    setReviewTitle("")
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const averageRating = product.reviews?.length
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 5

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          <div className="space-y-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-card/30 border border-white/5">
              <img
                src={product.images?.[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-medium">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx ? "border-primary" : "border-transparent hover:border-white/20"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl lg:text-5xl font-serif mb-4 text-balance">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= averageRating ? "fill-current" : ""}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {averageRating.toFixed(1)} ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <p className="text-3xl font-medium text-primary mb-6">{product.priceFormatted}</p>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator className="my-6" />

            {product.colors && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium uppercase tracking-wider">Color</span>
                  <span className="text-sm text-muted-foreground">{selectedColor}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-105 ${
                        selectedColor === color.name ? "border-primary shadow-lg shadow-primary/20" : "border-white/10"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium uppercase tracking-wider">Size</span>
                  <button className="text-sm text-primary hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border transition-all hover:border-primary ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-white/10 hover:bg-card"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-6" />

            <div className="mb-8">
              <span className="text-sm font-medium uppercase tracking-wider block mb-3">Quantity</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-card">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-white/5 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-white/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <Button onClick={handleAddToCart} size="lg" className="flex-1 h-14 text-base rounded-lg">
                <Package className="w-5 h-5 mr-2" />
                Add to Bag
              </Button>
              <Button
                onClick={handleWishlist}
                size="lg"
                variant="outline"
                className={`h-14 w-14 p-0 rounded-lg ${
                  isWishlisted ? "bg-primary/10 border-primary text-primary" : "border-white/10"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-card/30 rounded-lg border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">SSL encrypted</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Authenticity</p>
                  <p className="text-xs text-muted-foreground">100% guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-24">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b border-white/10 bg-transparent rounded-none h-auto p-0 mb-8">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Reviews ({product.reviews?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-serif mb-6">Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Premium materials and expert craftsmanship</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Timeless minimalist design philosophy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Handcrafted with attention to every detail</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Lifetime warranty and authenticity guarantee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Sustainable and ethically sourced materials</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-6">Specifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-3 border-b border-white/5">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/5">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-medium">Premium Grade</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/5">
                      <span className="text-muted-foreground">Origin</span>
                      <span className="font-medium">Handcrafted Globally</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/5">
                      <span className="text-muted-foreground">Warranty</span>
                      <span className="font-medium">Lifetime Coverage</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/5">
                      <span className="text-muted-foreground">SKU</span>
                      <span className="font-medium">{product.id.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="max-w-4xl">
                <div className="flex items-center gap-8 mb-12 p-8 bg-card/30 rounded-lg border border-white/5">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                    <div className="flex text-primary mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-5 h-5 ${s <= averageRating ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">{product.reviews?.length || 0} reviews</div>
                  </div>
                  <Separator orientation="vertical" className="h-20" />
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-4">
                      {product.reviews?.length
                        ? "See what our customers are saying"
                        : "Be the first to review this product"}
                    </p>
                    {!isAuthenticated && (
                      <Link href="/auth">
                        <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                          Sign In to Write a Review
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Review List */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="space-y-6 mb-12">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="p-6 bg-card/30 rounded-lg border border-white/5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                                {review.author.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{review.author}</span>
                                  {review.verified && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <div className="flex text-primary mt-1">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                      key={s}
                                      className={`w-3.5 h-3.5 ${s <= review.rating ? "fill-current" : ""}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Write Review Form */}
                {isAuthenticated && (
                  <div className="p-8 bg-card/30 rounded-lg border border-white/5">
                    <h3 className="text-xl font-serif mb-6">Write a Review</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-3">Your Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setReviewRating(rating)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  rating <= reviewRating ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="review-title" className="block text-sm font-medium mb-2">
                          Review Title
                        </label>
                        <Input
                          id="review-title"
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                          placeholder="Sum up your experience"
                          required
                          className="bg-background/50"
                        />
                      </div>

                      <div>
                        <label htmlFor="review-comment" className="block text-sm font-medium mb-2">
                          Your Review
                        </label>
                        <Textarea
                          id="review-comment"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Tell us what you think about this product..."
                          rows={5}
                          required
                          className="bg-background/50"
                        />
                      </div>

                      <Button type="submit" size="lg" className="rounded-lg">
                        Submit Review
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-0">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-serif mb-6">Shipping Information</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We offer free standard shipping on all orders over $100. Orders are typically processed within 1-2
                      business days.
                    </p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>Standard Shipping: 5-7 business days (Free over $100)</li>
                      <li>Express Shipping: 2-3 business days ($15)</li>
                      <li>Next Day Delivery: 1 business day ($30)</li>
                    </ul>
                    <p className="text-sm">All orders include tracking information sent to your email.</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif mb-6">Returns & Exchanges</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      We want you to be completely satisfied with your purchase. If you're not happy, we offer easy
                      returns within 30 days.
                    </p>
                    <ul className="space-y-2 ml-4 list-disc">
                      <li>30-day return window from delivery date</li>
                      <li>Items must be unused and in original packaging</li>
                      <li>Free return shipping for exchanges</li>
                      <li>Refunds processed within 5-7 business days</li>
                    </ul>
                    <p className="text-sm">Contact our support team to initiate a return or exchange.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif">You May Also Like</h2>
              <Link href="/shop" className="text-primary hover:underline text-sm">
                View All Products
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} price={p.priceFormatted} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
