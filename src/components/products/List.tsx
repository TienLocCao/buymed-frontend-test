import { Product } from "@/types/product"
import ProductItem from "./Item"
import { useVirtualList } from "@/hooks/useVirtualList"
import LoadingSkeleton from "@/components/products/LoadingSkeleton"

interface Props {
    products: Product[]
    cart: Record<number, number>
    loading: boolean
    onChangeQuantity: (productId: number, qty: number) => void
}

export function ProductList({
    products,
    cart,
    loading,
    onChangeQuantity,
}: Props) {
    const {
        containerRef,
        startIndex,
        endIndex,
        paddingTop,
        paddingBottom,
    } = useVirtualList({
        itemCount: products.length,
        itemHeight: 88,
    })
    if (loading) {
        return (
        <div className="border rounded p-3">
            <LoadingSkeleton rows={6} />
        </div>
        )
    }

    if (!loading && products.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                No products found
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="h-[500px] overflow-auto border rounded"
        >
            <div style={{ paddingTop, paddingBottom }}>
                {products.slice(startIndex, endIndex + 1).map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        qty={cart[product.id] ?? 0}
                        disabled={loading}
                        onChangeQty={onChangeQuantity}
                    />
                ))}
            </div>
        </div>
    )
}
