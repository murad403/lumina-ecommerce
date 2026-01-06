"use client"
import { Check, Heart, Minus, Package, Plus, RotateCcw, Shield, Star, Truck } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"

type TProps = {
    product: any;
    averageRating: number;
}

const ProductDetails = ({ product, averageRating }: TProps) => {
    const [activeImage, setActiveImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name)
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
    const [quantity, setQuantity] = useState(1)
    const addItem = useCart((state) => state.addItem)
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
    const isWishlisted = isInWishlist(product.id)

    const handleAddToCart = () => {
        addItem(product, quantity, { color: selectedColor, size: selectedSize })
    }

    const handleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist(product)
        }
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">

            {/* images */}
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
                        {product.images.map((img: any, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary" : "border-transparent hover:border-white/20"
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
                            {product.colors.map((color: any) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-105 ${selectedColor === color.name ? "border-primary shadow-lg shadow-primary/20" : "border-white/10"
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
                            {product.sizes.map((size: any) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-6 py-3 rounded-lg border transition-all hover:border-primary ${selectedSize === size
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
                            <span className="px-6 py-3 font-medium min-w-12 text-center">{quantity}</span>
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
