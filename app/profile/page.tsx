"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  if (!isAuthenticated || !user) {
    router.push("/auth")
    return null
  }

  const defaultAddress = user.addresses.find((addr) => addr.isDefault)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2">My Account</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="rounded-full border-white/10 gap-2 w-fit bg-transparent"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Nav */}
            <aside className="lg:col-span-1 space-y-2">
              <Link
                href="/profile"
                className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground font-medium"
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

            {/* Content Area */}
            <div className="lg:col-span-3 space-y-8">
              <section className="bg-card/30 rounded-3xl p-8 border border-white/5 space-y-8">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                        Full Name
                      </label>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                        Email Address
                      </label>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    {user.phone && (
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2 block">
                          Phone Number
                        </label>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Default Shipping</h3>
                  {defaultAddress ? (
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">{defaultAddress.street}</p>
                        <p className="text-sm text-muted-foreground">
                          {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}
                        </p>
                        <p className="text-sm text-muted-foreground">{defaultAddress.country}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No default address set</p>
                  )}
                </div>
              </section>

              <section className="bg-card/30 rounded-3xl p-8 border border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-widest">Recent Orders</h3>
                  <Link href="/profile/orders">
                    <Button variant="link" className="text-primary text-xs font-bold p-0">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-card border border-white/5 flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary/50" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Order #LMN-82937</p>
                        <p className="text-xs text-muted-foreground">Placed on Jan 24, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">$299.00</p>
                      <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Shipped</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
