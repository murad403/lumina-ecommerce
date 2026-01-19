"use client"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useGetProductsQuery } from "@/redux/features/user/product.api"
import { TProduct } from "@/types/all"

const categoriesOptions = [
  { label: "All Items", value: "" },
  { label: "Timepieces", value: "Timepieces" },
  { label: "Leather Goods", value: "Leather Goods" },
  { label: "Audio", value: "Audio" },
  { label: "Travel", value: "Travel" },
]


const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];



const ShopPage = () => {

  const [sortBy, setSortBy] = useState<string>("featured");
  const [category, setCategory] = useState<string>("");
  const [priceRanges, setPriceRanges] = useState<{ max_price?: number, min_price?: number }>({ max_price: undefined, min_price: undefined });

  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { data, isLoading } = useGetProductsQuery({ search: "", category, min_price: priceRanges.min_price, max_price: priceRanges.max_price });

  console.log(category, priceRanges, data);

  const handlePriceRangeChange = (range: string) => {
    const numbers = range.split("-");
    setPriceRanges({ max_price: numbers[0] ? parseInt(numbers[0]) : undefined, min_price: numbers[1] ? parseInt(numbers[1]) : undefined });
  };

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
                  categoriesOptions.map((categoryItem: { label: string, value: string }) =>
                    <li key={categoryItem.value}>
                      <button
                        className={`hover:text-primary cursor-pointer transition-colors ${categoryItem.value === category ? 'text-primary font-medium' : ''}`}
                        onClick={() => setCategory(categoryItem.value)}
                      >
                        {categoryItem.label}
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
                    checked={priceRanges.max_price === 100 && priceRanges.min_price === 0}
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
                    checked={priceRanges.max_price === 500 && priceRanges.min_price === 100}
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
                    checked={priceRanges.max_price === undefined && priceRanges.min_price === 500}
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
              <span className="text-sm text-muted-foreground">Showing 8 results</span>
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
              {data?.results?.map((product: TProduct) => (
                <ProductCard product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ShopPage;