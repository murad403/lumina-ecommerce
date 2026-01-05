import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-12">Shipping Policy</h1>
        <div className="prose prose-invert prose-gold max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Global Reach</h2>
            <p>
              LUMINA delivers to over 50 countries worldwide. We partner with premium carriers including DHL Express and
              FedEx to ensure your items arrive safely and promptly.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Shipping Rates</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Standard Shipping (5-10 business days): $15.00</li>
              <li>Express Shipping (2-4 business days): $35.00</li>
              <li>Free Standard Shipping on orders over $150.00</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Processing Time</h2>
            <p>
              All orders are processed within 24-48 hours. Orders placed on weekends or public holidays will be
              processed the following business day.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
