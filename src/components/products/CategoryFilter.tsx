interface CategoryFilterProps {
    categories: string[]
    value: string | null
    onChange: (value: string | null) => void
    disabled?: boolean
}

export function CategoryFilter({
    categories,
    value,
    onChange,
    disabled,
}: CategoryFilterProps) {
    return (
        <select
            value={value ?? ""}
            disabled={disabled}
            onChange={(e) =>
                onChange(e.target.value || null)
            }
            className="
        w-full
        sm:w-56
        px-3
        py-2
        border
        rounded
        bg-white
        outline-none
        focus:ring-2
        focus:ring-blue-500
        disabled:opacity-50
      "
        >
            <option value="">All categories</option>

            {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
        </select>
    )
}
