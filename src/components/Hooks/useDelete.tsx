import { useEffect } from "react"
import { dispatch } from "../../editor"
import { removeObject } from "../../functions/object"

type UseDeleteArgs = {
    selectedIds: string[]
    clearSelection: () => void
}

function useDelete({ selectedIds, clearSelection }: UseDeleteArgs) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0) {
                dispatch((prev) => {
                    const slideIndex = prev.presentation.slides.findIndex(s => s.id === prev.activeSlideID)
                    if (slideIndex === -1) return {}
                    let updatedSlide = prev.presentation.slides[slideIndex]
                    
                    selectedIds.forEach(id => {
                        updatedSlide = removeObject(updatedSlide, id)
                    })

                    const updatedSlides = [...prev.presentation.slides]
                    updatedSlides[slideIndex] = updatedSlide
                    return {
                        presentation: {
                            ...prev.presentation,
                            slides: updatedSlides
                        }
                    }
                })
                clearSelection()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedIds, clearSelection])
}

export {useDelete}