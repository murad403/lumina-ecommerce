"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  Settings,
  BarChart3,
  Menu,
  X,
  Store,
  Bell,
  Tag,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCog,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package, badge: "234" },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "23" },
  { name: "Customers", href: "/admin/customers", icon: Users, badge: "2.3K" },
  { name: "Reviews", href: "/admin/reviews", icon: Star, badge: "48" },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { admin, isAuthenticated, logout } = useAdminAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [isAuthenticated, pathname, router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  // Don't render layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:w-20" : "lg:w-72",
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border/40 bg-card px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center border-b border-border/40 justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Store className="h-5 w-5 text-primary-foreground" />
              </div>
              {!sidebarCollapsed && <span className="text-xl font-bold text-foreground">LUMINA</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            sidebarCollapsed && "justify-center",
                          )}
                          title={sidebarCollapsed ? item.name : undefined}
                        >
                          <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                          {!sidebarCollapsed && (
                            <>
                              {item.name}
                              {item.badge && (
                                <Badge
                                  variant={isActive ? "secondary" : "outline"}
                                  className="ml-auto bg-background/20 text-xs"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>

              {/* Bottom Actions */}
              <li className="mt-auto space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className={cn("w-full", sidebarCollapsed && "px-0")}
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <>
                      <ChevronLeft className="h-5 w-5 mr-2" />
                      Collapse
                    </>
                  )}
                </Button>

                <Link
                  href="/"
                  className={cn(
                    "group flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 text-muted-foreground hover:bg-muted hover:text-foreground",
                    sidebarCollapsed && "justify-center",
                  )}
                  title={sidebarCollapsed ? "View Store" : undefined}
                >
                  <Store className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && "View Store"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6 text-foreground" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Link href="/admin" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                      <Store className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold text-foreground">LUMINA</span>
                  </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const isActive = pathname === item.href
                          return (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={cn(
                                  "group flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6",
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                                )}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {item.name}
                                {item.badge && (
                                  <Badge variant={isActive ? "secondary" : "outline"} className="ml-auto text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-20" : "lg:pl-72")}>
        {/* Top navbar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border/40 bg-card/95 backdrop-blur px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-foreground lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold text-foreground">
                {navigation.find((item) => item.href === pathname)?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
              </button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-x-3 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={admin?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {admin?.name ? admin.name.substring(0, 2).toUpperCase() : "AD"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-foreground">{admin?.name || "Admin"}</p>
                      <p className="text-xs text-muted-foreground">{admin?.email || ""}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/profile" className="cursor-pointer">
                      <UserCog className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
