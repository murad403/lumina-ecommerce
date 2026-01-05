import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Star, Quote, Zap, Award, Globe } from "lucide-react"
import Link from "next/link"
import Hero from "./home/Hero"
import Collection from "./home/Collection"
import TrustBadges from "./home/TrustBadges"
import FeatureProducts from "./home/FeatureProducts"
import NewArrivals from "./home/NewArrivals"
import BrandPromise from "./home/BrandPromise"
import CollectionGrid from "./home/CollectionGrid"
import SocialProof from "./home/SocialProof"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero Section */}
      <Hero></Hero>
      
      {/* collection */}
      <Collection></Collection>

      {/* Trust Badges */}
      <TrustBadges></TrustBadges>

      {/* Featured Products */}
      <FeatureProducts></FeatureProducts>

      {/* New Arrivals Section */}
      <NewArrivals></NewArrivals>

      {/* Brand Promise Section */}
      <BrandPromise></BrandPromise>

      {/* Collections Grid Section */}
      <CollectionGrid></CollectionGrid>

      {/* Social Proof */}
      <SocialProof></SocialProof>
    </main>
  )
}
