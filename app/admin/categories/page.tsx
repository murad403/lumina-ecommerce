"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tag, Plus, Edit, Trash, Package } from "lucide-react"

const categories = [
  { id: "1", name: "Timepieces", slug: "timepieces", products: 45, description: "Luxury watches and chronographs" },
  {
    id: "2",
    name: "Leather Goods",
    slug: "leather-goods",
    products: 89,
    description: "Premium wallets and accessories",
  },
  { id: "3", name: "Audio", slug: "audio", products: 32, description: "High-end audio equipment" },
  { id: "4", name: "Travel", slug: "travel", products: 28, description: "Luxury luggage and travel gear" },
  { id: "5", name: "Home", slug: "home", products: 40, description: "Designer home accessories" },
]

export default function AdminCategories() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              <Tag className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Products</p>
                <p className="text-2xl font-bold text-foreground">234</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Largest</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Leather Goods</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg per Category</p>
                <p className="text-2xl font-bold text-foreground">46.8</p>
              </div>
              <Badge variant="outline">products</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Slug</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Products</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-border/40 last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <p className="font-medium text-foreground">{category.name}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">{category.slug}</Badge>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-foreground">{category.products} items</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-destructive" />
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new product category</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" placeholder="Enter category name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="category-slug" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter category description" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
