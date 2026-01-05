"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Truck, CheckCircle, MapPin, Clock } from "lucide-react"

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [tracking, setTracking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setTracking({
        orderNumber: orderNumber || "LMN-82937",
        status: "In Transit",
        estimatedDelivery: "January 28, 2026",
        currentLocation: "Distribution Center - New York",
        timeline: [
          {
            status: "Order Placed",
            date: "January 24, 2026",
            time: "10:30 AM",
            completed: true,
          },
          {
            status: "Order Confirmed",
            date: "January 24, 2026",
            time: "11:15 AM",
            completed: true,
          },
          {
            status: "Shipped",
            date: "January 25, 2026",
            time: "2:00 PM",
            completed: true,
          },
          {
            status: "In Transit",
            date: "January 26, 2026",
            time: "8:45 AM",
            completed: true,
          },
          {
            status: "Out for Delivery",
            date: "January 28, 2026",
            time: "Estimated",
            completed: false,
          },
          {
            status: "Delivered",
            date: "January 28, 2026",
            time: "Estimated",
            completed: false,
          },
        ],
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-serif mb-4">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order number and email address to track your shipment in real-time.
            </p>
          </header>

          {!tracking ? (
            <div className="bg-card/30 rounded-3xl p-8 md:p-12 border border-white/5">
              <form onSubmit={handleTrack} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Order Number
                  </label>
                  <Input
                    className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    placeholder="LMN-12345"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 rounded-full font-medium" disabled={isLoading}>
                  {isLoading ? "Tracking..." : "Track Order"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Order Status Card */}
              <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-serif mb-2">Order {tracking.orderNumber}</h2>
                    <p className="text-sm text-muted-foreground">Status: {tracking.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Estimated Delivery</p>
                    <p className="font-bold">{tracking.estimatedDelivery}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Current Location</p>
                    <p className="text-xs text-muted-foreground">{tracking.currentLocation}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
                <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Shipment Timeline</h3>
                <div className="space-y-6">
                  {tracking.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.completed
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border border-white/10 text-muted-foreground"
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : index === tracking.timeline.findIndex((t: any) => !t.completed) ? (
                            <Truck className="w-5 h-5" />
                          ) : (
                            <Package className="w-5 h-5" />
                          )}
                        </div>
                        {index < tracking.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${item.completed ? "bg-primary/50" : "bg-white/10"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {item.status}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>
                            {item.date} • {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => {
                  setTracking(null)
                  setOrderNumber("")
                  setEmail("")
                }}
                variant="outline"
                className="w-full h-12 rounded-full"
              >
                Track Another Order
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
