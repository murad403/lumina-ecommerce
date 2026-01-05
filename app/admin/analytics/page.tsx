"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Eye, Star } from "lucide-react"

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Revenue (30d)</p>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">$45,231</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+20.1%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Orders (30d)</p>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">573</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+12.5%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Customers (30d)</p>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">180</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+8.2%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground">$78.95</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingDown className="h-3 w-3 text-destructive" />
              <span className="text-destructive">-2.3%</span> vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Timepieces", revenue: "$18,492", percent: 41, color: "bg-primary" },
                { name: "Leather Goods", revenue: "$13,569", percent: 30, color: "bg-primary/70" },
                { name: "Audio", revenue: "$9,046", percent: 20, color: "bg-primary/50" },
                { name: "Travel", revenue: "$4,124", percent: 9, color: "bg-primary/30" },
              ].map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{category.name}</span>
                    <span className="text-muted-foreground">{category.revenue}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${category.color}`} style={{ width: `${category.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best sellers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ethereal Chronograph", sales: 145, revenue: "$43,355", trend: "up" },
                { name: "Onyx Carry-on", sales: 89, revenue: "$40,050", trend: "up" },
                { name: "Vertex Audio Pods", sales: 123, revenue: "$24,477", trend: "down" },
                { name: "Noir Leather Wallet", sales: 201, revenue: "$17,889", trend: "up" },
              ].map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between py-3 border-b border-border/40 last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{product.revenue}</p>
                    <div className="flex items-center justify-end gap-1">
                      {product.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-primary" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Page Views
            </CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">24,589</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+15.3%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Conversion Rate
            </CardTitle>
            <CardDescription>Orders / Visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">2.33%</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span className="text-primary">+0.4%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Customer Satisfaction
            </CardTitle>
            <CardDescription>Average rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">4.8/5</div>
            <p className="text-sm text-muted-foreground">Based on 284 reviews</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
