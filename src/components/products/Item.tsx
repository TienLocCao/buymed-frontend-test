interface Props {
  product: {
    id: number
    name: string
    price: number
    category: string
    isPrescription: boolean
  }
  qty: number
  disabled?: boolean
  onChangeQty: (id: number, qty: number) => void
}

const MAX_QTY = 99

export default function ProductItem({
  product,
  qty,
  onChangeQty,
  disabled,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if (Number.isNaN(value)) return

    value = Math.min(MAX_QTY, Math.max(0, value))
    onChangeQty(product.id, value)
  }

  return (
    <div className="border rounded p-3 flex justify-between items-center">
      <div>
        <div className="font-medium">
          {product.name}
          {product.isPrescription && (
            <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 rounded">
              Rx
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">{product.category}</div>
        <div className="text-sm">
          {product.price.toLocaleString()} VND
        </div>
      </div>

      <input
        type="number"
        min={0}
        max={MAX_QTY}
        disabled={disabled}
        value={qty}
        onChange={handleChange}
        className="border rounded w-20 px-2 py-1"
      />
    </div>
  )
}
