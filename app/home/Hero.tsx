import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-background z-10" />
          <img
            src="/luxury-minimalist-product-hero-dark-elegant.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="container relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-9xl font-serif tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Curation Without <br />
            <span className="italic text-primary">Compromise</span>
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg md:text-xl mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Exquisite design meets functional perfection. Discover our latest collection of architectural essentials.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400">
            <Link href="/shop">
              <Button size="lg" className="text-lg px-12 py-7 rounded-full group w-full md:w-auto">
                Shop Collection <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/story">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-7 rounded-full border-white/20 bg-transparent hover:bg-white/5 w-full md:w-auto"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

  )
}

export default Hero
