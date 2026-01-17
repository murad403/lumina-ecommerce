"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Check, Star } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/ContextProvider/AuthContext'

const ProductDetailsTabs = ({ product, averageRating }: { product: any, averageRating: number }) => {
    const { isAuth } = useAuth();
    const [reviewRating, setReviewRating] = useState(5)
    const [reviewComment, setReviewComment] = useState("")
    const [reviewTitle, setReviewTitle] = useState("")

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault()
        setReviewRating(5)
        setReviewComment("")
        setReviewTitle("")
    }
    return (
        <div className="mx-auto mb-24">
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full justify-between border-b border-white/10 bg-transparent rounded-none h-auto p-0 mb-8">
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
                                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span className="text-muted-foreground">Premium materials and expert craftsmanship</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span className="text-muted-foreground">Timeless minimalist design philosophy</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span className="text-muted-foreground">Handcrafted with attention to every detail</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <span className="text-muted-foreground">Lifetime warranty and authenticity guarantee</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
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
                                    <span className="font-medium">{product.id}</span>
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
                                {!isAuth && (
                                    <Link href="/auth/sign-in">
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
                                {product.reviews.map((review: any) => (
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
                        {isAuth && (
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
                                                        className={`w-8 h-8 ${rating <= reviewRating ? "fill-primary text-primary" : "text-muted-foreground"
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
    )
}

export default ProductDetailsTabs
