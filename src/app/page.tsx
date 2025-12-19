"use client"

import { useMemo, useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import { useDebounce } from "@/hooks/useDebounce"
import { ProductList } from "@/components/products/List"
import CartSummary from "@/components/products/CartSummary"
import { SearchBar } from "@/components/commons/SearchBar"
import { CategoryFilter } from "@/components/products/CategoryFilter"
import { Product } from "@/types/product"

export default function HomePage() {
  // ===== DATA =====
  const { data: products, loading } = useProducts()

  // ===== UI STATE =====
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<Record<number, number>>({})

  const debouncedSearch = useDebounce(search, 300)

  // ===== FILTER =====
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchName = p.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())

      const matchCategory = category
        ? p.category === category
        : true

      return matchName && matchCategory
    })
  }, [products, debouncedSearch, category])

  // ===== CATEGORY LIST =====
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)))
  }, [products])

  // ===== CART HANDLER =====
  const updateQuantity = (productId: number, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        const copy = { ...prev }
        delete copy[productId]
        return copy
      }
      return { ...prev, [productId]: qty }
    })
  }

  const cartItems = useMemo(() => {
    return products
      .filter((p) => cart[p.id])
      .map((p) => ({
        ...p,
        quantity: cart[p.id],
        subtotal: p.price * cart[p.id],
      }))
  }, [products, cart])

  // ===== RENDER =====
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Product Search & Order
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          disabled={loading}
        />
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
          disabled={loading}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Product List */}
        <ProductList
          products={filteredProducts}
          loading={loading}
          onChangeQuantity={updateQuantity}
          cart={cart}
        />

        {/* Cart Summary */}
        <div className="hidden lg:block">
          <CartSummary items={cartItems} />
        </div>
      </div>

      {/* Mobile Cart */}
      <div className="lg:hidden mt-4">
        <CartSummary items={cartItems} />
      </div>
    </main>
  )
}
