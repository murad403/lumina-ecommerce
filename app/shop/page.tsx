"use client"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronDown, PackageOpen } from "lucide-react"
import { useState } from "react"
import { useGetProductsQuery } from "@/redux/features/user/product.api"
import { TProduct } from "@/types/all"
import { categoriesOptions, sortOptions, TCategory, TSortOption } from "@/lib/data"


const ShopPage = () => {

  const [sortBy, setSortBy] = useState<string>("featured");
  const [category, setCategory] = useState<string>("");
  const [priceRanges, setPriceRanges] = useState<{ max_price?: number, min_price?: number }>({ max_price: undefined, min_price: undefined });

  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const { data, isLoading } = useGetProductsQuery({ search: "", category, min_price: priceRanges.min_price, max_price: priceRanges.max_price });

  // console.log(category, priceRanges, data);

  const handlePriceRangeChange = (range: string) => {
    const numbers = range.split("-");
    const newMinPrice = numbers[0] ? parseInt(numbers[0]) : undefined;
    const newMaxPrice = numbers[1] ? parseInt(numbers[1]) : undefined;
    
    // If clicking the same range, deselect it
    if (priceRanges.min_price === newMinPrice && priceRanges.max_price === newMaxPrice) {
      setPriceRanges({ max_price: undefined, min_price: undefined });
    } else {
      // Otherwise, select the new range
      setPriceRanges({ max_price: newMaxPrice, min_price: newMinPrice });
    }
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
                  categoriesOptions.map((categoryItem: TCategory, index: number) =>
                    <li key={index}>
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
                    className="rounded border-white/10 bg-card cursor-pointer accent-primary"
                    id="p1"
                    checked={priceRanges.max_price === 100 && priceRanges.min_price === 0}
                    onChange={() => handlePriceRangeChange("0-100")}
                  />
                  <label htmlFor="p1" className={`text-sm cursor-pointer transition-colors ${priceRanges.max_price === 100 && priceRanges.min_price === 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    $0 - $100
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-white/10 bg-card cursor-pointer accent-primary"
                    id="p2"
                    checked={priceRanges.max_price === 500 && priceRanges.min_price === 100}
                    onChange={() => handlePriceRangeChange("100-500")}
                  />
                  <label htmlFor="p2" className={`text-sm cursor-pointer transition-colors ${priceRanges.max_price === 500 && priceRanges.min_price === 100 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    $100 - $500
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-white/10 bg-card cursor-pointer accent-primary"
                    id="p3"
                    checked={priceRanges.max_price === undefined && priceRanges.min_price === 500}
                    onChange={() => handlePriceRangeChange("500+")}
                  />
                  <label htmlFor="p3" className={`text-sm cursor-pointer transition-colors ${priceRanges.max_price === undefined && priceRanges.min_price === 500 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    $500+
                  </label>
                </div>
              </div>
            </div>
          </aside>


          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <span className="text-sm text-muted-foreground">Showing {data?.count} results</span>
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
                    {sortOptions.map((option: TSortOption, index: number) => (
                      <button
                        key={index}
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

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : data?.results && data.results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.results.map((product: TProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <PackageOpen className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                <p className="text-muted-foreground max-w-md">
                  No products match your current filters. Try adjusting your category or price range selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ShopPage;