import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const CollectionGrid = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <h2 className="text-4xl md:text-6xl font-serif italic text-center md:text-left">
            The Winter <span className="not-italic">Selection</span>
          </h2>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full px-8 bg-transparent">
              Men's Edit
            </Button>
            <Button variant="outline" className="rounded-full px-8 bg-transparent">
              Women's Edit
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative h-150 overflow-hidden rounded-3xl">
            <Image
              width={500}
              height={500}
              src="/luxury-minimalist-fountain-pen-writing-instrument.jpg"
              alt="Stationery"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12">
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-primary mb-4">Craftsmanship</span>
              <h3 className="text-4xl font-serif text-white mb-6 italic">Signature Writing Instruments</h3>
              <Link href="/shop">
                <Button className="rounded-full px-8 py-6 h-auto">Explore Collection</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-8">
            <div className="group relative overflow-hidden rounded-3xl">
              <Image
                width={500}
                height={500}
                src="/luxury-minimalist-home-diffuser-aromatherapy.jpg"
                alt="Home"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-10">
                <h3 className="text-3xl font-serif text-white mb-4 italic">Home Sanctuaries</h3>
                <Link
                  href="/shop"
                  className="text-white underline underline-offset-8 text-sm uppercase tracking-widest font-bold hover:text-primary transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl">
              <Image
                width={500}
                height={500}
                src="/sleek-minimalist-wireless-earbuds-black-premium.jpg"
                alt="Tech"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-10">
                <h3 className="text-3xl font-serif text-white mb-4 italic">Auditory Precision</h3>
                <Link
                  href="/shop"
                  className="text-white underline underline-offset-8 text-sm uppercase tracking-widest font-bold hover:text-primary transition-colors"
                >
                  Shop Audio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionGrid
