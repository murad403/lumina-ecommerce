"use client"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowRight, ShoppingBag, User, Minus, Plus, Lock, Tag } from "lucide-react"
import Link from "next/link"
import { AuthDialog } from "@/components/auth-dialog"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useDeleteCartMutation, useGetCartQuery, useUpdateCartMutation } from "@/redux/features/user/cart.api"
import { TCartProduct } from "@/types/cart"
import { toast } from "react-toastify"



const CartPage = () => {
  const { data, isLoading } = useGetCartQuery(undefined);
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const handleRemoveItem = async (id: number) => {
    try {
      await deleteCart(id).unwrap();
      toast.success("Item removed from cart.")
    } catch (error) {
      toast.error("Failed to remove item from cart.")
    }
  }

  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [promoCode, setPromoCode] = useState("");

  const tax = 0;
  const shipping = 15;
  const subtotal = (data?.total_price || 0) + shipping + tax;

  if (isLoading) {
    return (
      <main className="bg-background">
        <div className="container mx-auto px-4 pt-32 pb-24">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-card/30 rounded-lg border border-white/5">
                    <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/3" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-10 w-32 rounded-lg" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 bg-card/30 rounded-lg border border-white/5">
                <Skeleton className="h-6 w-48 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-32">
                <div className="p-6 bg-card/30 rounded-lg border border-white/5">
                  <Skeleton className="h-5 w-32 mb-6" />
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-full rounded-lg mb-3" />
                  <Skeleton className="h-4 w-full" />
                </div>

                <div className="p-6 bg-card/30 rounded-lg border border-white/5">
                  <Skeleton className="h-10 w-10 rounded-full mb-3" />
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (data?.items.length === 0) {
    return (
      <main className="bg-background flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-32 pb-24">
          <div className="max-w-md text-center">
            <div className="w-24 h-24 rounded-full bg-card/50 flex items-center justify-center mx-auto mb-6 border border-white/5">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-serif mb-4">Your Bag is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your bag yet. Start exploring our collection.
            </p>
            <Link href="/shop">
              <Button size="lg" className="rounded-lg px-8">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background">
      <div className="container mx-auto px-4 pt-32 pb-24">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif mb-2">Shopping Bag</h1>
            <p className="text-muted-foreground">
              {data?.items?.length} {data?.items?.length === 1 ? "item" : "items"} in your bag
            </p>
          </div>
          <Link href="/shop" className="text-primary hover:underline text-sm">
            Continue Shopping
          </Link>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {
                data?.items?.map((item: TCartProduct) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-card/30 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <Link
                      href={`/product/${item?.product?.slug}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-card shrink-0"
                    >
                      <img
                        src={item?.product?.main_image || "/placeholder.svg"}
                        alt={item?.product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <Link href={`/product/${item?.product?.slug}`}>
                            <h3 className="font-serif text-lg sm:text-xl hover:text-primary transition-colors line-clamp-1">
                              {item?.product.title}
                            </h3>
                          </Link>
                          <button
                            onClick={() => handleRemoveItem(item?.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item?.product?.category?.name}</p>
                        <p className="text-sm text-muted-foreground mb-3">{item?.color?.name}, {item?.size?.name}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-card">
                          <button
                            onClick={async () => {
                              if (item?.product?.is_in_stock) {
                                try {
                                  await updateCart({ id: item?.id, data: { quantity: item?.quantity - 1 } }).unwrap();
                                } catch (error) {
                                  console.log(error)
                                }
                              }
                            }}
                            className="px-3 py-2 hover:bg-white/5 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-10 text-center text-sm">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={async () => {
                              if (item?.product?.is_in_stock) {
                                try {
                                  await updateCart({ id: item?.id, data: { quantity: item?.quantity + 1 } }).unwrap();
                                } catch (error) {
                                  console.log(error)
                                }
                              }
                            }}
                            className="px-3 py-2 hover:bg-white/5 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-medium text-lg">${(item.product.current_price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 p-6 bg-card/30 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="font-medium">Have a promo code?</h3>
              </div>
              <div className="flex gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="bg-background/50"
                />
                <Button variant="outline" className="rounded-lg bg-transparent">
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-32">
              <div className="p-6 bg-card/30 rounded-lg border border-white/5">
                <h3 className="font-bold uppercase text-xs tracking-widest mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({data?.total_items} items)</span>
                    <span className="font-medium">${data?.total_price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>

                    <span className="font-medium">${shipping.toFixed(2)}</span>

                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold pt-2">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full h-12 rounded-lg group mb-3">
                    <Lock className="w-4 h-4 mr-2" />
                    Secure Checkout
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-muted-foreground">Secure payment powered by SSL encryption</p>
              </div>

              <div className="p-6 bg-linear-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg">Join Our Community</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Create an account to track orders, save favorites, and unlock exclusive member benefits.
                </p>
                <Button
                  onClick={() => setShowAuthDialog(true)}
                  variant="outline"
                  className="w-full rounded-lg border-primary/30 hover:bg-primary/10"
                >
                  Sign Up or Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </main>
  )
}

export default CartPage