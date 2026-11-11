import { useEffect } from "react"
import { Slide } from "../../types/slide"
import { getSelectedSlideObjectsIds, setSelectedSlideObjectsIds } from "../../editor"

type UseSelectArgs = {
    activeSlide: Slide | undefined
}

function useSelect({ activeSlide }: UseSelectArgs) {
    const selectedIds = getSelectedSlideObjectsIds()
    const activeSlideID = activeSlide?.id

    const clearSelection = () => {
        if (getSelectedSlideObjectsIds().length > 0) {
            setSelectedSlideObjectsIds([])
        }
    }

    useEffect(() => {
        clearSelection()
    }, [activeSlideID])

    return {
        selectedIds,
        setSelectedIds: setSelectedSlideObjectsIds,
        clearSelection,
    }
}

export { useSelect }