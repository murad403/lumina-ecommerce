"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Check, Star } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/ContextProvider/AuthContext'
import { TFeature, TProductDetails, TReview } from '@/types/all'
import { tabs, TTab } from '@/lib/data'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { reviewSchema } from '@/validation/validation'
import { useAddProductReviewMutation, useViewProductReviewsQuery } from '@/redux/features/user/productReviews.api'
import { toast } from 'react-toastify'

type ReviewFormData = z.infer<typeof reviewSchema>

const ProductDetailsTabs = ({ product }: { product: TProductDetails }) => {

    const {data} = useViewProductReviewsQuery(product?.slug, {skip: !product?.slug});
    const [addProductReview, {isLoading}] = useAddProductReviewMutation();
    const { isAuth } = useAuth();
    
    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 5, comment: "" }
    })

    const currentRating = watch("rating");

    const onSubmit = async(data: ReviewFormData) => {
        try {
            const result = await addProductReview({slug: product?.slug, data}).unwrap();
            toast.success("Review submitted successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to submit review. Please try again.");
        }
    }
    return (
        <div className="mx-auto mb-24">
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full justify-between border-b border-white/10 bg-transparent rounded-none h-auto p-0 mb-8">
                    {
                        tabs.map((tab: TTab, index: number) =>
                            <TabsTrigger 
                                key={index}
                                value={tab?.value}
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 capitalize"
                            >
                                {tab?.label}
                            </TabsTrigger>
                        )
                    }
                </TabsList>

                <TabsContent value="details" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-serif mb-6">Features</h3>
                            <ul className="space-y-3">
                                {
                                    product?.features.map((feature: TFeature) =>
                                        <li key={feature?.id} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                            <span className="text-muted-foreground">{feature?.feature}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-serif mb-6">Specifications</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-white/5">
                                    <span className="">Category</span>
                                    <span className="text-muted-foreground font-medium">{product?.specifications?.category}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5">
                                    <span className="">Material</span>
                                    <span className="text-muted-foreground font-medium">{product?.specifications?.material}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5">
                                    <span className="">Origin</span>
                                    <span className="text-muted-foreground font-medium">{product?.specifications?.origin}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5">
                                    <span className="">Warranty</span>
                                    <span className="text-muted-foreground font-medium">{product?.specifications?.warranty}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5">
                                    <span className="">SKU</span>
                                    <span className="text-muted-foreground font-medium">{product?.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-8 mb-12 p-8 bg-card/30 rounded-lg border border-white/5">
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2">{product?.average_rating?.toFixed(1) || "0.0"}</div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star} 
                                                className={`w-4 h-4 ${star <= Math.round(product?.average_rating || 0) ? 'fill-current text-primary' : 'text-muted-foreground'}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        ({product?.review_count || 0} reviews)
                                    </span>
                                </div>
                            </div>
                            <Separator orientation="vertical" className="h-20" />
                            <div className="flex-1">
                                <p className="text-muted-foreground mb-4">
                                    {product?.review_count > 0
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

                        {data?.count > 0 && (
                            <div className="space-y-6 mb-12">
                                {data?.results?.map((review: TReview) => (
                                    <div key={review.id} className="p-6 bg-card/30 rounded-lg border border-white/5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                                                        {review.user_initial}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{review.user_name}</span>
                                                            {review.is_verified_purchase && (
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
                                                {new Date(review.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{review?.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {isAuth && (
                            <div className="p-8 bg-card/30 rounded-lg border border-white/5">
                                <h3 className="text-xl font-serif mb-6">Write a Review</h3>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-3">Your Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    onClick={() => setValue("rating", rating)}
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${rating <= currentRating ? "fill-primary text-primary" : "text-muted-foreground"
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                        {errors.rating && (
                                            <p className="text-sm text-destructive mt-2">{errors.rating.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="review-comment" className="block text-sm font-medium mb-2">
                                            Your Review
                                        </label>
                                        <Textarea
                                            id="review-comment"
                                            {...register("comment")}
                                            placeholder="Tell us what you think about this product..."
                                            rows={5}
                                            className="bg-background/50"
                                        />
                                        {errors.comment && (
                                            <p className="text-sm text-destructive mt-2">{errors.comment.message}</p>
                                        )}
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
