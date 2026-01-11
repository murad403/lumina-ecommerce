import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif">Thank you for your order.</h1>
            <p className="text-muted-foreground text-lg">
              Your order #LMN-82937 has been confirmed and is being prepared for shipment.
            </p>
          </div>

          <div className="bg-card/30 rounded-3xl p-8 border border-white/5 text-left space-y-4">
            <h4 className="font-bold uppercase text-xs tracking-widest">Next Steps</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">01</span>
                <span>You will receive an order confirmation email shortly.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">02</span>
                <span>Our team will meticulously package your premium items.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">03</span>
                <span>Tracking details will be sent once your order ships.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-12 py-6 w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
            <Link href={"/track-order"}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-12 py-6 w-full sm:w-auto border-white/10 bg-transparent"
              >
                Track Order <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
