"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Search, Eye, Mail, Users, UserPlus, Crown } from "lucide-react"

const customers = [
  {
    id: "1",
    name: "Marcus Chen",
    email: "marcus@email.com",
    orders: 12,
    spent: "$3,588",
    joined: "2023-08-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    orders: 8,
    spent: "$1,250",
    joined: "2023-09-22",
    status: "active",
  },
  {
    id: "3",
    name: "David Park",
    email: "david@email.com",
    orders: 15,
    spent: "$6,750",
    joined: "2023-07-10",
    status: "vip",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@email.com",
    orders: 5,
    spent: "$995",
    joined: "2023-11-05",
    status: "active",
  },
  {
    id: "5",
    name: "Alex Rivera",
    email: "alex@email.com",
    orders: 20,
    spent: "$8,920",
    joined: "2023-06-18",
    status: "vip",
  },
  {
    id: "6",
    name: "James Lee",
    email: "james@email.com",
    orders: 3,
    spent: "$597",
    joined: "2024-01-03",
    status: "new",
  },
  {
    id: "7",
    name: "Olivia Martinez",
    email: "olivia@email.com",
    orders: 9,
    spent: "$2,691",
    joined: "2023-10-12",
    status: "active",
  },
  {
    id: "8",
    name: "Ryan Thompson",
    email: "ryan@email.com",
    orders: 7,
    spent: "$3,150",
    joined: "2023-08-28",
    status: "active",
  },
]

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background space-y-6">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Customers</h1>
              <p className="text-muted-foreground mt-1">Manage your customer base</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold text-foreground">2,350</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold text-foreground">180</p>
              </div>
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">1,245</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">VIP Members</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <Crown className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 py-8 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search customers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Customers Table */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Orders</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Joined</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-border/40 last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">{customer.orders}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-foreground">{customer.spent}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-foreground">{customer.joined}</p>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            customer.status === "vip" ? "default" : customer.status === "new" ? "secondary" : "outline"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
