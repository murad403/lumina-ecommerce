import { RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import React from 'react'

const TrustBadges = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-card/30">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center gap-4 text-center md:text-left">
            <Truck className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-bold">Free Global Shipping</h4>
              <p className="text-sm text-muted-foreground">On all orders over $150</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-center md:text-left">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-bold">Secure Checkout</h4>
              <p className="text-sm text-muted-foreground">256-bit SSL encrypted</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-center md:text-left">
            <RotateCcw className="w-8 h-8 text-primary" />
            <div>
              <h4 className="font-bold">30-Day Returns</h4>
              <p className="text-sm text-muted-foreground">Hassle-free guarantee</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default TrustBadges
