// components/ProductRow.tsx
import type { Product } from "@/types/product"

export function ProductRow({ product }: { product: Product }) {
  return (
    <div
      className="flex justify-between items-center px-3 border-b"
      style={{ height: 72 }}
    >
      <div>
        <div className="font-medium flex gap-2">
          {product.name}
          {product.isPrescription && (
            <span className="text-xs bg-red-100 text-red-600 px-2 rounded">
              Rx
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          {product.category}
        </div>
      </div>

      <div className="text-right">
        <div className="font-semibold">
          {product.price.toLocaleString()} đ
        </div>
        <input
          type="number"
          min={0}
          max={99}
          className="w-16 border rounded px-1"
        />
      </div>
    </div>
  )
}
