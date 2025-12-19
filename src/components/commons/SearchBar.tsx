interface SearchBarProps {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}

export function SearchBar({
    value,
    onChange,
    disabled,
}: SearchBarProps) {
    return (
        <input
            type="text"
            value={value}
            disabled={disabled}
            placeholder="Search product by name..."
            onChange={(e) => onChange(e.target.value)}
            className="
        w-full
        sm:w-72
        px-3
        py-2
        border
        rounded
        outline-none
        focus:ring-2
        focus:ring-blue-500
        disabled:opacity-50
      "
        />
    )
}
