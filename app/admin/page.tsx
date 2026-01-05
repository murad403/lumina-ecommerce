"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  AlertCircle,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$45,231</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">573</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">234</div>
            <p className="text-xs text-muted-foreground mt-2">12 low stock alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">2,350</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+180</span> new this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-75 flex items-end justify-between gap-2 px-4">
              {[
                { month: "Jan", amount: 32000, percent: 65 },
                { month: "Feb", amount: 28000, percent: 55 },
                { month: "Mar", amount: 38000, percent: 75 },
                { month: "Apr", amount: 35000, percent: 70 },
                { month: "May", amount: 42000, percent: 85 },
                { month: "Jun", amount: 45231, percent: 95 },
              ].map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: `${data.percent}%` }}>
                    <div className="absolute inset-0 bg-linear-to-t from-primary to-primary/50 rounded-t-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-foreground">${(data.amount / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">{data.month}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Manage your store efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/products/new">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/orders?status=pending">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Process Pending Orders
                <Badge variant="destructive" className="ml-auto">
                  23
                </Badge>
              </Button>
            </Link>
            <Link href="/admin/reviews?status=pending">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Review Customer Feedback
                <Badge variant="destructive" className="ml-auto">
                  48
                </Badge>
              </Button>
            </Link>
            <Link href="/admin/products?filter=low-stock">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                Check Low Stock Items
                <Badge variant="outline" className="ml-auto">
                  12
                </Badge>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#ORD-2453",
                  customer: "Marcus Chen",
                  amount: "$299.00",
                  status: "pending",
                  time: "2 mins ago",
                },
                {
                  id: "#ORD-2452",
                  customer: "Sarah Johnson",
                  amount: "$89.00",
                  status: "processing",
                  time: "15 mins ago",
                },
                { id: "#ORD-2451", customer: "David Park", amount: "$450.00", status: "shipped", time: "1 hour ago" },
                {
                  id: "#ORD-2450",
                  customer: "Emma Wilson",
                  amount: "$199.00",
                  status: "delivered",
                  time: "3 hours ago",
                },
                {
                  id: "#ORD-2449",
                  customer: "Alex Rivera",
                  amount: "$89.00",
                  status: "delivered",
                  time: "5 hours ago",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-3 border-b border-border/40 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        order.status === "delivered" ? "default" : order.status === "shipped" ? "secondary" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                    <p className="font-medium text-foreground min-w-20 text-right">{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling items this month</CardDescription>
              </div>
              <Link href="/admin/products">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ethereal Chronograph", sales: 145, revenue: "$43,355", rating: 4.9, trend: "up" },
                { name: "Onyx Carry-on", sales: 89, revenue: "$40,050", rating: 4.8, trend: "up" },
                { name: "Vertex Audio Pods", sales: 123, revenue: "$24,477", rating: 4.7, trend: "down" },
                { name: "Noir Leather Wallet", sales: 201, revenue: "$17,889", rating: 5.0, trend: "up" },
                { name: "Lumen Desk Lamp", sales: 67, revenue: "$12,060", rating: 4.6, trend: "up" },
              ].map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 py-3 border-b border-border/40 last:border-0"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{product.revenue}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {product.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-primary" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customer Reviews</CardTitle>
          <CardDescription>Latest feedback from your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                customer: "Alex Rivera",
                product: "Noir Leather Wallet",
                rating: 5,
                comment: "The leather quality is exceptional. Perfect slim design for front pocket carry...",
                time: "10 mins ago",
                status: "approved",
              },
              {
                customer: "James Lee",
                product: "Vertex Audio Pods",
                rating: 5,
                comment: "Best earbuds I've owned. Sound quality is crystal clear and noise cancellation is...",
                time: "1 hour ago",
                status: "approved",
              },
              {
                customer: "David Park",
                product: "Ethereal Chronograph",
                rating: 4,
                comment: "Beautiful watch, though the price point is quite high. Quality is undeniable...",
                time: "3 hours ago",
                status: "pending",
              },
              {
                customer: "Emma Wilson",
                product: "Onyx Carry-on",
                rating: 5,
                comment: "Premium quality luggage. The wheels glide smoothly and it's surprisingly...",
                time: "5 hours ago",
                status: "approved",
              },
            ].map((review, index) => (
              <div key={index} className="py-4 border-b border-border/40 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{review.customer}</p>
                      <Badge variant={review.status === "approved" ? "default" : "outline"} className="text-xs">
                        {review.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.product}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.time}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
          <Link href="/admin/reviews">
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Manage All Reviews
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
