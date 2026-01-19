"use client"
import { Check, Heart, Minus, Package, Plus, RotateCcw, Shield, Star, Truck } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ProductImage, TColor, TProductDetails, TSize } from "@/types/all"

const ProductDetails = ({ product }: { product: TProductDetails }) => {
    const [activeImage, setActiveImage] = useState(product?.images?.[0]);
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name)
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.name)
    const [quantity, setQuantity] = useState(1);
    // console.log(selectedSize);

    const isWishlisted = true;

    const handleAddToCart = () => {
        console.log("cart")
    }

    const handleWishlist = () => {
        console.log("wishlist")
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">

            {/* images */}
            <div className="space-y-4">
                <div className="aspect-square relative rounded-2xl overflow-hidden bg-card/30 border border-white/5">
                    <img
                        src={activeImage?.image || product?.main_image}
                        alt={product?.title}
                        className="w-full h-full object-cover"
                    />
                    {/* {product.tag && (
                        <div className="absolute top-4 left-4">
                            <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-medium">
                                {product?.tag}
                            </span>
                        </div>
                    )} */}
                </div>

                {product?.images && product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                        {product.images.map((img: ProductImage) => (
                            <button
                                key={img?.id}
                                onClick={() => setActiveImage(img)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? "border-primary" : "border-transparent hover:border-white/20"
                                    }`}
                            >
                                <img
                                    src={img?.image || "/placeholder.svg"}
                                    alt={`${product.title} ${img?.id}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {
                                [...Array(product?.average_rating || 5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 fill-current text-primary`} />
                                ))
                            }
                        </div>
                        <span className="text-sm text-muted-foreground">
                            ({product?.review_count || 0} reviews)
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-serif mb-4 text-balance capitalize">{product?.title}</h1>
                    <p className="text-3xl font-medium text-primary">${product?.current_price}</p>
                    <p className="text-muted-foreground leading-relaxed">{product?.description}</p>
                </div>

                <Separator className="my-6" />

                {product?.colors && (
                    <div className="space-y-4 mb-6">
                        <div className="flex gap-2">
                            <span className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Color:</span>
                            <span className="text-sm  uppercase">{selectedColor}</span>
                        </div>
                        <div className="flex gap-2">
                            {product?.colors?.map((color: TColor) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`size-10 rounded-full border-2 transition-all hover:scale-105 ${selectedColor === color.name ? "border-primary shadow-lg shadow-primary/20" : "border-white/10"
                                        }`}
                                    style={{ backgroundColor: color.hex_code }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {product?.sizes && (
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Size: </span>
                            <span className="text-sm text-muted-foreground uppercase">{selectedSize}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {product?.sizes.map((size: TSize) => (
                                <button
                                    key={size?.id}
                                    onClick={() => setSelectedSize(size?.name)}
                                    className={`px-5 py-2 border transition-all rounded-3xl hover:border-primary ${selectedSize === size.name
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-white/10 hover:bg-card"
                                        }`}
                                >
                                    {size.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <Separator className="my-6" />

                <div className="mb-6 flex items-center gap-5">
                    <span className="text-sm font-medium uppercase tracking-wider block mb-3">Quantity</span>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center border border-white/10 rounded-4xl overflow-hidden bg-card">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-3"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-6 py-3 font-medium min-w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-3"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* button group */}
                <div className="flex gap-3 mb-8">
                    <Button onClick={handleAddToCart} size="lg" className="flex-1 h-14 text-base rounded-lg">
                        <Package className="w-5 h-5" />
                        Add to Bag
                    </Button>
                    <Button
                        onClick={handleWishlist}
                        size="lg"
                        variant="outline"
                        className={`h-14 w-14 p-0 rounded-lg ${isWishlisted ? "bg-primary/10 border-primary text-primary" : "border-white/10"
                            }`}
                    >
                        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-card/30 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Truck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Free Shipping</p>
                            <p className="text-xs text-muted-foreground">On orders over $100</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <RotateCcw className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Easy Returns</p>
                            <p className="text-xs text-muted-foreground">30-day return policy</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Secure Payment</p>
                            <p className="text-xs text-muted-foreground">SSL encrypted</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
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
    )
}

export default ProductDetails
