"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard, Eye } from "lucide-react"
import Link from "next/link"

const orders = [
  {
    id: "LMN-82937",
    date: "January 24, 2026",
    status: "Shipped",
    total: 299.0,
    items: 2,
  },
  {
    id: "LMN-81204",
    date: "December 15, 2025",
    status: "Delivered",
    total: 189.0,
    items: 1,
  },
  {
    id: "LMN-79812",
    date: "November 28, 2025",
    status: "Delivered",
    total: 449.0,
    items: 3,
  },
  {
    id: "LMN-77356",
    date: "October 10, 2025",
    status: "Delivered",
    total: 129.0,
    items: 1,
  },
]

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2">My Orders</h1>
              <p className="text-muted-foreground">View and track your order history</p>
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
                className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground font-medium"
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
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-card/50 transition-colors text-muted-foreground hover:text-foreground"
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
                <h3 className="text-lg font-bold uppercase tracking-widest mb-8">Order History</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-6 rounded-2xl bg-background/50 border border-white/5 hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-card border border-white/5 flex items-center justify-center">
                          <Package className="w-7 h-7 text-primary/50" />
                        </div>
                        <div>
                          <p className="font-bold mb-1">Order #{order.id}</p>
                          <p className="text-xs text-muted-foreground mb-1">{order.date}</p>
                          <p className="text-xs text-muted-foreground">{order.items} item(s)</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-bold mb-1">${order.total.toFixed(2)}</p>
                          <p
                            className={`text-[10px] uppercase tracking-widest font-bold ${
                              order.status === "Delivered" ? "text-green-400" : "text-primary"
                            }`}
                          >
                            {order.status}
                          </p>
                        </div>
                        <Link href="/track-order">
                          <Button size="sm" variant="outline" className="rounded-full gap-2 bg-transparent">
                            <Eye className="w-4 h-4" /> View
                          </Button>
                        </Link>
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
