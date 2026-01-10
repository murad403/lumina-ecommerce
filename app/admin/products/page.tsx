"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products } from "@/lib/data"
import { mockInventory } from "@/lib/admin-data"
import { Search, Filter, MoreVertical, Edit, Trash, Plus, Eye, Package, AlertTriangle, Upload, X } from "lucide-react"

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    sku: "",
  })
  const [productImages, setProductImages] = useState<string[]>([])
  const [variants, setVariants] = useState<
    Array<{ color: string; size: string; sku: string; stock: number; price?: number }>
  >([])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStockInfo = (productId: string) => {
    const inventory = mockInventory[productId]
    if (!inventory) return { stock: 0, status: "out_of_stock" }
    return { stock: inventory.stock, status: inventory.status }
  }

  const handleEdit = (product: any) => {
    setSelectedProduct(product)
    const stockInfo = getStockInfo(product.id)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: stockInfo.stock.toString(),
      description: product.description,
      sku: mockInventory[product.id]?.sku || "",
    })
    setProductImages([product.image])
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      sku: "",
    })
    setProductImages([])
    setVariants([])
    setSelectedProduct(null)
  }

  const addVariant = () => {
    setVariants([...variants, { color: "", size: "", sku: "", stock: 0 }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  const updateVariant = (index: number, field: string, value: string | number) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    setVariants(newVariants)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
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
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">198</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Active</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-destructive">12</p>
              </div>
              <Badge variant="destructive">Alert</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <Badge variant="outline">Inactive</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button
          onClick={() => {
            resetForm()
            setIsAddDialogOpen(true)
          }}
          className="bg-primary text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">SKU</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockInfo = getStockInfo(product.id)
                  const inventory = mockInventory[product.id]
                  return (
                    <tr key={product.id} className="border-b border-border/40 last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1 max-w-75">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-mono text-muted-foreground">{inventory?.sku || "N/A"}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-foreground">{product.priceFormatted}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-foreground">{stockInfo.stock} units</p>
                          {stockInfo.status === "low_stock" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            stockInfo.status === "in_stock"
                              ? "default"
                              : stockInfo.status === "low_stock"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {stockInfo.status === "in_stock"
                            ? "In Stock"
                            : stockInfo.status === "low_stock"
                              ? "Low Stock"
                              : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/product/${product.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(product)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false)
            setIsEditDialogOpen(false)
            resetForm()
          }
        }}
      >
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen ? "Update product information" : "Create a new product with variants and images"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Timepieces">Timepieces</SelectItem>
                    <SelectItem value="Leather Goods">Leather Goods</SelectItem>
                    <SelectItem value="Audio">Audio</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="e.g., EC-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Product Images</Label>
              <div className="space-y-3">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB (multiple images allowed)</p>
                </div>
                {productImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-muted border group"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => setProductImages(productImages.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Product Variants (Color, Size & Price)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>
              {variants.length > 0 && (
                <div className="space-y-3 border rounded-lg p-4">
                  {variants.map((variant, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1 grid grid-cols-5 gap-3">
                        <Input
                          placeholder="Color (e.g., Black)"
                          value={variant.color}
                          onChange={(e) => updateVariant(index, "color", e.target.value)}
                        />
                        <Input
                          placeholder="Size (e.g., M, 42)"
                          value={variant.size}
                          onChange={(e) => updateVariant(index, "size", e.target.value)}
                        />
                        <Input
                          placeholder="SKU"
                          value={variant.sku}
                          onChange={(e) => updateVariant(index, "sku", e.target.value)}
                        />
                        <Input
                          type="number"
                          placeholder="Price (optional)"
                          value={variant.price || ""}
                          onChange={(e) =>
                            updateVariant(index, "price", Number.parseFloat(e.target.value))
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Stock"
                          value={variant.stock}
                          onChange={(e) => updateVariant(index, "stock", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {variants.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4 border rounded-lg border-dashed">
                  No variants added. Click "Add Variant" to add color, size, and pricing options.
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                setIsEditDialogOpen(false)
                resetForm()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsAddDialogOpen(false)
                setIsEditDialogOpen(false)
                resetForm()
              }}
            >
              {isEditDialogOpen ? "Update Product" : "Create Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
