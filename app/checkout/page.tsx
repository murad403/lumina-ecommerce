"use client"

import type React from "react"
import { ArrowLeft, ShieldCheck, Landmark, Smartphone, Truck, CheckCircle2, Edit2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

const PAYMENT_METHODS = [
  { id: "bkash", name: "bKash", icon: Smartphone, adminInfo: "bKash Merchant: 017XXXXXXXX" },
  { id: "nagad", name: "Nagad", icon: Smartphone, adminInfo: "Nagad Merchant: 018XXXXXXXX" },
  { id: "bank", name: "Bank Transfer", icon: Landmark, adminInfo: "City Bank: AC 1234567890" },
  { id: "cod", name: "Cash on Delivery", icon: Truck, adminInfo: "Advance Shipping Payment Required" },
]

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("bkash")
  const SHIPPING_COST = 60 // Standard shipping cost

  const { user, isAuthenticated } = useAuth()

  const [contactType, setContactType] = useState<"email" | "phone">("email")
  const [contactValue, setContactValue] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")

  useEffect(() => {
    if (isAuthenticated && user) {
      const isEmail = user.email.includes("@")
      setContactType(isEmail ? "email" : "phone")
      setContactValue(isEmail ? user.email : user.phone || "")
      setIsVerified(true)

      const nameParts = user.name.split(" ")
      setFirstName(nameParts[0] || "")
      setLastName(nameParts.slice(1).join(" ") || "")

      const defaultAddress = user.addresses.find((addr) => addr.isDefault)
      if (defaultAddress) {
        setAddress(defaultAddress.street)
        setCity(defaultAddress.city)
        setPostalCode(defaultAddress.zip)
      }
    }
  }, [isAuthenticated, user])

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 pt-32">
          <h1 className="text-3xl font-serif mb-4">Your bag is empty</h1>
          <Link href="/shop">
            <Button size="lg" className="rounded-full px-12">
              Return to Shop
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isVerified) {
      alert("Please verify your contact information first.")
      return
    }
    clearCart()
    router.push("/checkout/success")
  }

  const handleSendOtp = () => {
    if (!contactValue) return
    setIsVerifying(true)
    setTimeout(() => {
      setShowOtp(true)
      setIsVerifying(false)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    if (otpValue.length !== 6) return
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerified(true)
      setShowOtp(false)
      setIsVerifying(false)
    }, 1500)
  }

  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === paymentMethod)

  return (
    <main className="min-h-screen bg-background">

      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <Link
              href="/cart"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Return to Bag
            </Link>
            <h1 className="text-4xl font-serif">Checkout</h1>
            {isAuthenticated && user && (
              <p className="text-sm text-muted-foreground mt-2">
                Checking out as <span className="text-primary font-medium">{user.name}</span>
              </p>
            )}
          </header>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    1
                  </span>
                  Contact Information
                </h3>

                <div className="space-y-4">
                  {!isVerified && !showOtp ? (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex bg-card/50 p-1 rounded-full border border-white/5 w-fit mb-2">
                        <button
                          type="button"
                          onClick={() => setContactType("email")}
                          className={`px-6 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all ${contactType === "email" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactType("phone")}
                          className={`px-6 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all ${contactType === "phone" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          Phone
                        </button>
                      </div>
                      <div className="flex gap-3">
                        <Input
                          className="rounded-full bg-card border-white/10 px-6 h-12 flex-1"
                          placeholder={contactType === "email" ? "email@example.com" : "017XXXXXXXX"}
                          type={contactType === "email" ? "email" : "tel"}
                          value={contactValue}
                          onChange={(e) => setContactValue(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={!contactValue || isVerifying}
                          className="rounded-full px-8 h-12 text-[10px] uppercase tracking-widest font-bold"
                        >
                          {isVerifying ? "Sending..." : "Verify"}
                        </Button>
                      </div>
                    </div>
                  ) : showOtp ? (
                    <div className="bg-card/30 p-8 rounded-2xl border border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                      <p className="text-xs text-muted-foreground mb-4 text-center">
                        Enter the 6-digit code sent to <span className="text-primary font-medium">{contactValue}</span>
                      </p>
                      <div className="flex flex-col items-center gap-6">
                        <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                            <InputOTPSlot index={1} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                            <InputOTPSlot index={2} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                            <InputOTPSlot index={4} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                            <InputOTPSlot index={5} className="w-10 h-12 rounded-lg border-white/10 bg-background" />
                          </InputOTPGroup>
                        </InputOTP>
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowOtp(false)}
                            className="rounded-full px-6 h-10 text-[10px] uppercase tracking-widest border-white/10"
                          >
                            Back
                          </Button>
                          <Button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpValue.length !== 6 || isVerifying}
                            className="rounded-full px-8 h-10 text-[10px] uppercase tracking-widest font-bold"
                          >
                            {isVerifying ? "Verifying..." : "Confirm"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-primary/5 border border-primary/20 p-4 rounded-2xl animate-in zoom-in-95 duration-500">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                            Verified {contactType}
                          </p>
                          <p className="font-medium">{contactValue}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsVerified(false)
                          setOtpValue("")
                        }}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                      >
                        <Edit2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </button>
                    </div>
                  )}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    2
                  </span>
                  Shipping Address
                  {isAuthenticated && user?.addresses.find((a) => a.isDefault) && (
                    <span className="text-[10px] text-primary font-normal ml-2">(Using saved address)</span>
                  )}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    className="rounded-full bg-card border-white/10 px-6 h-12"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    className="rounded-full bg-card border-white/10 px-6 h-12"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    className="rounded-full bg-card border-white/10 px-6 h-12 md:col-span-2"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Input
                    className="rounded-full bg-card border-white/10 px-6 h-12"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    className="rounded-full bg-card border-white/10 px-6 h-12"
                    placeholder="Postal Code"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    3
                  </span>
                  Payment Method
                </h3>
                <div className="bg-card/50 rounded-2xl p-8 border border-white/5 space-y-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <ShieldCheck className="w-4 h-4" /> Secure Manual Verification
                  </div>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <div key={method.id}>
                        <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                        <Label
                          htmlFor={method.id}
                          className="flex flex-col items-center justify-between rounded-xl border-2 border-white/5 bg-background/50 p-4 hover:bg-white/5 peer-data-[state=checked]:border-primary transition-all cursor-pointer"
                        >
                          <method.icon className="mb-3 h-6 w-6 text-muted-foreground peer-data-[state=checked]:text-primary" />
                          <span className="text-xs font-bold uppercase tracking-tighter">{method.name}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="bg-background/80 rounded-xl p-6 border border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-primary italic">
                      {paymentMethod === "cod" ? "Shipping Pre-payment Required" : "Admin Payment Information"}
                    </h4>
                    <p className="text-sm font-medium mb-2">{selectedMethod?.adminInfo}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {paymentMethod === "cod"
                        ? "Please pay the ৳60 shipping cost via bKash/Nagad and provide transaction details below."
                        : "Please complete your manual payment to the account above and enter the transaction details below."}
                    </p>

                    <Separator className="my-6 bg-white/5" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="txid" className="text-[10px] uppercase tracking-widest">
                          Transaction ID
                        </Label>
                        <Input
                          id="txid"
                          className="rounded-full bg-background border-white/10 h-11"
                          placeholder="TRX-XXXXXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-[10px] uppercase tracking-widest">
                          Paid Amount
                        </Label>
                        <Input
                          id="amount"
                          className="rounded-full bg-background border-white/10 h-11"
                          placeholder={paymentMethod === "cod" ? "৳60" : `৳${totalPrice() + SHIPPING_COST}`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card/50 rounded-2xl p-8 border border-white/5 sticky top-32">
                <h3 className="font-bold uppercase text-xs tracking-widest mb-6">Your Order</h3>
                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-background shrink-0 border border-white/5">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-sm font-medium leading-tight">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">৳{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-sm mb-8 pt-6 border-t border-white/5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>৳{totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>৳{SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="flex justify-between text-primary font-bold animate-in fade-in duration-300">
                      <span className="text-[10px] uppercase tracking-tighter">Shipping Paid Advance</span>
                      <span>-৳{SHIPPING_COST.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-white/5 flex justify-between text-lg font-medium">
                    <span>{paymentMethod === "cod" ? "Pay on Delivery" : "Total"}</span>
                    <span>৳{totalPrice().toFixed(2)}</span>
                  </div>
                  {paymentMethod === "cod" && (
                    <p className="text-[10px] text-center text-muted-foreground italic">
                      Final verification will be done by admin before processing.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 rounded-full gap-2 font-bold tracking-widest uppercase text-xs"
                >
                  <ShieldCheck className="w-5 h-5" /> Confirm Order
                </Button>

                <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest">
                  Secure Checkout Guaranteed
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
