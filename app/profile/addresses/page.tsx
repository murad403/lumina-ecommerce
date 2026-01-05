"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function AddressesPage() {
  const { user, isAuthenticated, logout, deleteAddress, setDefaultAddress } = useAuth()
  const router = useRouter()

  if (!isAuthenticated || !user) {
    router.push("/auth")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
 
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2">Saved Addresses</h1>
              <p className="text-muted-foreground">Manage your shipping addresses</p>
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
                className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground font-medium"
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
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-widest">Your Addresses</h3>
                  <Button className="rounded-full gap-2">
                    <Plus className="w-4 h-4" /> Add New
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="p-6 rounded-2xl bg-background/50 border border-white/5 relative group"
                    >
                      {address.isDefault && (
                        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest font-bold text-primary">
                          Default
                        </span>
                      )}
                      <div className="flex items-start gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="font-bold mb-2">{address.name}</p>
                          <p className="text-sm text-muted-foreground">{address.street}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p className="text-sm text-muted-foreground">{address.country}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                        {!address.isDefault && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDefaultAddress(address.id)}
                            className="rounded-full flex-1 gap-2 bg-transparent text-xs"
                          >
                            Set Default
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="rounded-full flex-1 gap-2 bg-transparent">
                          <Pencil className="w-3 h-3" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteAddress(address.id)}
                          className="rounded-full gap-2 text-red-400 border-red-400/20 bg-transparent"
                        >
                          <Trash2 className="w-3 h-3" />
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
