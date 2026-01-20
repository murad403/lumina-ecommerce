import ProfileHeader from '@/components/ProfileHeader'
import { ChevronRight, CreditCard, LogOut, MapPin, Package, Settings, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 pt-32 pb-24">
                <div className="max-w-5xl mx-auto">
                    <ProfileHeader></ProfileHeader>
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
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default layout
