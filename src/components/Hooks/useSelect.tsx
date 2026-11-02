import { useEffect, useState } from "react"
import { Slide } from "../../types/slide"

type UseSelectArgs = {
    activeSlide: Slide | undefined
}

function useSelect({ activeSlide }: UseSelectArgs) {
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const activeSlideID = activeSlide?.id

    useEffect(() => {
        setSelectedIds([])
    }, [activeSlideID])

    const clearSelection = () => setSelectedIds([])

    return {
        selectedIds,
        setSelectedIds,
        clearSelection,
    }
}

export {useSelect}