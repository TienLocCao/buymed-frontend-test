import { Product } from "@/types/product"

interface CartItem extends Product {
    quantity: number
    subtotal: number
}

interface Props {
    items: CartItem[]
}

export default function CartSummary({ items }: Props) {
    const total = items.reduce(
        (sum, item) => sum + item.subtotal,
        0
    )

    return (
        <div className="border rounded p-4 h-fit">
            <h2 className="font-semibold mb-3">
                Order Summary
            </h2>

            {items.length === 0 && (
                <p className="text-sm text-gray-500">
                    No items selected.
                </p>
            )}

            <div className="space-y-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between text-sm"
                    >
                        <span>
                            {item.name} × {item.quantity}
                        </span>
                        <span>
                            {item.subtotal.toLocaleString()} VND
                        </span>
                    </div>
                ))}
            </div>

            {items.length > 0 && (
                <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{total.toLocaleString()} VND</span>
                </div>
            )}
        </div>
    )
}
