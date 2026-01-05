import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-12">Terms of Service</h1>
        <div className="prose prose-invert prose-gold max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using LUMINA's website and services, you acknowledge that you have read, understood, and
              agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not
              access our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Use of Services</h2>
            <p>
              You agree to use LUMINA's services only for lawful purposes and in accordance with these Terms. You are
              prohibited from:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Using the service in any way that violates applicable laws or regulations</li>
              <li>Attempting to interfere with the proper functioning of the service</li>
              <li>Engaging in any form of automated data collection without express written permission</li>
              <li>Impersonating another person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Intellectual Property</h2>
            <p>
              All content, trademarks, and intellectual property displayed on LUMINA's website are the property of LUMINA
              or its licensors. You may not reproduce, distribute, or create derivative works without our express written
              consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Product Information</h2>
            <p>
              We make every effort to display our products as accurately as possible. However, we cannot guarantee that
              your device's display of colors accurately reflects the actual product color. All product dimensions and
              specifications are approximate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Pricing and Payment</h2>
            <p>
              All prices are listed in USD and are subject to change without notice. We reserve the right to refuse or
              cancel any order for any reason, including but not limited to product availability, errors in pricing or
              product information, or suspected fraud.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Limitation of Liability</h2>
            <p>
              LUMINA shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of or inability to use our services. Our total liability shall not exceed the amount
              paid by you for products purchased.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
              LUMINA operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground uppercase tracking-widest mb-4">Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at legal@lumina.design or through our contact
              page.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-white/5 text-sm">
            <p className="text-muted-foreground">Last updated: January 2026</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
