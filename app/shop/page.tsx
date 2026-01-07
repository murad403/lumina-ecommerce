"use client"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { products } from "@/lib/data"
import { useState } from "react"

const categories = ["All Items", "Timepieces", "Leather Goods", "Audio", "Travel"];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

const ShopPage = () => {
  const [category, setCategory] = useState<string>("All Items");
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  console.log(priceRanges, category)

  const handlePriceRangeChange = (range: string) => {
    setPriceRanges(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = category === "All Items" || product.category === category;
    if (priceRanges.length === 0) return categoryMatch;
    const price = product.price;
    const priceMatch = priceRanges.some(range => {
      if (range === "0-100") return price >= 0 && price <= 100;
      if (range === "100-500") return price > 100 && price <= 500;
      if (range === "500+") return price > 500;
      return false;
    });

    return categoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">All Collections</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our meticulously curated selection of premium goods, designed for those who appreciate the finer
            things.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-8">
            <div>
              <h3 className="font-bold uppercase text-xs tracking-widest mb-4">Categories</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {
                  categories.map((categoryItem: string) =>
                    <li key={categoryItem}>
                      <button
                        className={`hover:text-primary cursor-pointer transition-colors ${categoryItem === category ? 'text-primary font-medium' : ''}`}
                        onClick={() => setCategory(categoryItem)}
                      >
                        {categoryItem}
                      </button>
                    </li>
                  )
                }
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase text-xs tracking-widest mb-4">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-white/10 bg-card cursor-pointer"
                    id="p1"
                    checked={priceRanges.includes("0-100")}
                    onChange={() => handlePriceRangeChange("0-100")}
                  />
                  <label htmlFor="p1" className="text-sm text-muted-foreground cursor-pointer">
                    $0 - $100
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-white/10 bg-card cursor-pointer"
                    id="p2"
                    checked={priceRanges.includes("100-500")}
                    onChange={() => handlePriceRangeChange("100-500")}
                  />
                  <label htmlFor="p2" className="text-sm text-muted-foreground cursor-pointer">
                    $100 - $500
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-white/10 bg-card cursor-pointer"
                    id="p3"
                    checked={priceRanges.includes("500+")}
                    onChange={() => handlePriceRangeChange("500+")}
                  />
                  <label htmlFor="p3" className="text-sm text-muted-foreground cursor-pointer">
                    $500+
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <span className="text-sm text-muted-foreground">Showing {sortedProducts.length} results</span>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  {sortOptions.find(opt => opt.value === sortBy)?.label || "Sort By"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-white/10 rounded-md shadow-lg z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${sortBy === option.value ? 'text-primary font-medium' : 'text-muted-foreground'
                          }`}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.priceFormatted}
                  image={product.image}
                  tag={product.tag}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ShopPage;