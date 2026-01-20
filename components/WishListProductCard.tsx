"use client"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"
import { useWishListToggleMutation } from "@/redux/features/user/wishlist.api"
import { toast } from "react-toastify"
import { TWishListItem } from "@/types/wish-list"

const WishListProductCard = ({ product }: { product: TWishListItem }) => {

    const [wishListToggle] = useWishListToggleMutation();

    const handleAddWishList = async () => {
        try {
            const result = await wishListToggle(product?.product?.id).unwrap();
            toast.success(result?.detail);
        } catch (error) {
            toast.error("Failed to update wishlist. Please try again.")
        }
    }
    return (
        <div className="block group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-all">
            <div className="aspect-4/5 relative">
                <Link href={`/product/${product?.product?.slug}`}>
                    <Image
                        src={product?.product?.main_image}
                        alt={product?.product?.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>
                {product?.product?.badge && <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{product?.product?.badge}</Badge>}
                <button
                    onClick={handleAddWishList}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all ${product?.product?.is_wishlisted ? "bg-primary text-primary-foreground" : "bg-background/80 text-foreground hover:text-primary"
                        }`}
                >
                    <Heart className={`w-4 h-4 ${product?.product?.is_wishlisted ? "fill-current" : ""}`} />
                </button>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h3 className="font-medium text-lg leading-tight">{product?.product?.title}</h3>
                <p className="text-primary font-bold">{product?.product?.price}</p>
            </div>
        </div>
    )
}

export default WishListProductCard;