// hooks/useProducts.ts
import { useEffect, useState } from "react"
import { PRODUCTS as mockProducts } from "@/lib/products"
import { Product } from "@/types/product"

export function useProducts() {
  const [data, setData] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      // giả lập data lớn
      const bigData = Array.from({ length: 1000 }, (_, i) => ({
        ...mockProducts[i % mockProducts.length],
        id: i + 1,
      }))
      setData(bigData)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return { data, loading }
}
