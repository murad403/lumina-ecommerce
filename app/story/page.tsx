import Image from "next/image";


const StoryPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-32 pb-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-serif tracking-tight mb-12">
            The LUMINA <br />
            <span className="italic text-primary">Manifesto</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                LUMINA was born from a simple observation: in a world of excess, true quality is often lost in the
                noise. We believe that the objects we surround ourselves with should be as intentional as the lives we
                lead.
              </p>
              <p>
                Founded in 2024, our mission has always been to curate a selection of essentials that marry
                architectural precision with timeless elegance. Every piece in our collection undergoes a rigorous
                selection process, ensuring it meets our standards for material integrity, functional excellence, and
                aesthetic longevity.
              </p>
            </div>
            <div className="aspect-4/5 relative rounded-lg overflow-hidden">
              <Image
                width={500}
                height={500}
                src="/luxury-minimalist-product-hero-dark-elegant.jpg"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="border-t border-white/5 pt-24">
            <h2 className="text-3xl font-serif mb-8 text-center text-primary italic">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-primary">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  We source materials that last a lifetime, prioritizing sustainability and ethical production.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-primary">Simplicity</h3>
                <p className="text-sm text-muted-foreground">
                  We believe beauty lies in the essential, removing everything unnecessary to let quality speak.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-primary">Curation</h3>
                <p className="text-sm text-muted-foreground">
                  Our collection is intentionally small, focusing on perfection over variety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


export default StoryPage;