import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-32 pb-24 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-12">Privacy Policy</h1>
        <div className="prose prose-invert prose-gold max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Data Protection</h2>
            <p>
              LUMINA is committed to protecting your personal data. We use industry-standard encryption and security
              measures to ensure your information remains private.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Information Collection</h2>
            <p>
              We collect information you provide directly to us when you make a purchase, sign up for our newsletter, or
              contact support.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
