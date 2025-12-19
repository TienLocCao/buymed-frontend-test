interface Props {
  rows?: number
}

export default function LoadingSkeleton({ rows = 6 }: Props) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center border rounded p-3"
        >
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>

          <div className="h-8 w-20 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  )
}
