import { useEffect, useRef, useState } from "react"

interface Options {
    itemCount: number
    itemHeight: number
    overscan?: number
}

export function useVirtualList({
    itemCount,
    itemHeight,
    overscan = 5,
}: Options) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(0)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const onScroll = () => {
            const scrollTop = el.scrollTop
            const height = el.clientHeight

            const start = Math.max(
                Math.floor(scrollTop / itemHeight) - overscan,
                0
            )

            const end = Math.min(
                Math.ceil((scrollTop + height) / itemHeight) + overscan,
                itemCount - 1
            )

            setStartIndex(start)
            setEndIndex(end)
        }

        onScroll()
        el.addEventListener("scroll", onScroll)
        return () => el.removeEventListener("scroll", onScroll)
    }, [itemCount, itemHeight, overscan])

    const paddingTop = startIndex * itemHeight
    const paddingBottom =
        (itemCount - endIndex - 1) * itemHeight

    return {
        containerRef,
        startIndex,
        endIndex,
        paddingTop,
        paddingBottom,
    }
}
