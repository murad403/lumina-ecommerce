import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-background">

      <div className="container mx-auto px-4 pt-32 pb-24 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-12">Returns & Exchanges</h1>
        <div className="prose prose-invert prose-gold max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">30-Day Guarantee</h2>
            <p>
              If you are not completely satisfied with your purchase, you may return the item(s) within 30 days of
              delivery for a full refund or exchange.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Condition of Items</h2>
            <p>
              Returned items must be in their original condition: unworn, unwashed, and with all original tags and
              packaging intact.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Process</h2>
            <p>
              To initiate a return, please visit our Returns Portal or contact our concierge team at
              support@lumina.design.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
