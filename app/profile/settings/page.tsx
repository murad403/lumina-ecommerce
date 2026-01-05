"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard, Bell, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SettingsPage() {
  const { user, isAuthenticated, logout, updateUser } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState(user?.name.split(" ")[0] || "")
  const [lastName, setLastName] = useState(user?.name.split(" ").slice(1).join(" ") || "")
  const [email, setEmail] = useState(user?.email || "")

  if (!isAuthenticated || !user) {
    router.push("/auth")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser({
      name: `${firstName} ${lastName}`,
      email,
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2">Account Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and security</p>
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
                className="w-full flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground font-medium"
              >
                <span className="flex items-center gap-3">
                  <Settings className="w-5 h-5" /> Settings
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </aside>

            <div className="lg:col-span-3 space-y-8">
              <form onSubmit={handleSaveChanges} className="bg-card/30 rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold uppercase tracking-widest">Personal Information</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        First Name
                      </label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                        Last Name
                      </label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                  </div>
                  <Button type="submit" className="rounded-full">
                    Save Changes
                  </Button>
                </div>
              </form>

              <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <Lock className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold uppercase tracking-widest">Change Password</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      New Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-full bg-background border-white/10 px-6 h-12 focus:border-primary"
                    />
                  </div>
                  <Button className="rounded-full">Update Password</Button>
                </div>
              </div>

              <div className="bg-card/30 rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-8">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold uppercase tracking-widest">Notifications</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-xs text-muted-foreground">Receive email updates about your orders</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Promotions & Offers</p>
                        <p className="text-xs text-muted-foreground">Exclusive deals and new arrivals</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
