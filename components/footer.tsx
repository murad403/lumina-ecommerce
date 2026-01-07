"use client"
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    console.log(email)
    toast({
      title: "Success!",
      description: "You've been added to our exclusive list.",
    })
    setEmail("")
  }

  return (
    <footer className="py-24 border-t border-white/5 bg-background">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold mb-6 tracking-tighter">
            LUMINA<span className="text-primary">.</span>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Curating the world's most exquisite essentials for those who value architectural integrity and functional
            perfection.
          </p>
          <div className="flex gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/5 hover:border-primary/30 transition-all bg-card/30"
            >
              <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/5 hover:border-primary/30 transition-all bg-card/30"
            >
              <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/5 hover:border-primary/30 transition-all bg-card/30"
            >
              <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/5 hover:border-primary/30 transition-all bg-card/30"
            >
              <Youtube className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary italic">Shop</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-medium">
            <li>
              <Link href="/shop" className="hover:text-primary transition-colors">
                All Collections
              </Link>
            </li>
            <li>
              <Link href="/best-sellers" className="hover:text-primary transition-colors">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="/best-sellers" className="hover:text-primary transition-colors">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary italic">Experience</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-medium">
            <li>
              <Link href="/story" className="hover:text-primary transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-primary transition-colors">
                Track Order
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary italic">Newsletter</h4>
          <p className="text-xs text-muted-foreground mb-4">
            Join our inner circle for exclusive early access to new releases.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
              className="bg-card border border-white/10 rounded-full px-4 py-2 text-xs flex-1 focus:outline-none focus:border-primary transition-all"
            />
            <Button type="submit" size="sm" className="rounded-full px-4 text-xs">
              Join
            </Button>
          </form>
          <div className="mt-8">
            <ul className="flex gap-4 text-[10px] uppercase tracking-tighter text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/5">
        <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground/50">
          © 2026 LUMINA LUXURY GROUP. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}
