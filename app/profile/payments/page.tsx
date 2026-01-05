"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/27",
    isDefault: false,
  },
]

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2">Payment Methods</h1>
              <p className="text-muted-foreground">Manage your saved payment methods</p>
            </div>
            <Button variant="outline" className="rounded-full border-white/10 gap-2 w-fit bg-transparent">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-2">
              <Link
                href="/profile"
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-card/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-3">
                  <User className="w-5 h-5" /> Profile
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/profile/orders"
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-card/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-3">
                  <Package className="w-5 h-5" /> Orders
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/profile/addresses"
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-card/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" /> Addresses
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/profile/payments"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground font-medium"
              >
                <span className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5" /> Payments
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/profile/settings"
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-card/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <span className="flex items-center gap-3">
                  <Settings className="w-5 h-5" /> Settings
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </aside>

            <div className="lg:col-span-3">
              <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-widest">Saved Cards</h3>
                  <Button className="rounded-full gap-2">
                    <Plus className="w-4 h-4" /> Add Card
                  </Button>
                </div>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative"
                    >
                      {method.isDefault && (
                        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold text-primary">
                          Default
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-card border border-white/5 flex items-center justify-center">
                            <CreditCard className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold mb-1">
                              {method.type} •••• {method.last4}
                            </p>
                            <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full gap-2 text-red-400 border-red-400/20 bg-transparent"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
