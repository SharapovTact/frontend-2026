import { useCallback, useRef } from "react"
import { dispatch } from "../../editor"
import { clearSlideBackground, setSlideBackgroundColor, setSlideBackgroundGradient } from "../../functions/background"
import { Slide } from "../../types/slide"

function updateActiveSlide(update: (slide: Slide) => Slide) {
    dispatch((prev) => {
        const slideIndex = prev.presentation.slides.findIndex(s => s.id === prev.activeSlideID)
        if (slideIndex === -1) return {}

        const updatedSlide = update(prev.presentation.slides[slideIndex])

        const updatedSlides = [...prev.presentation.slides]
        updatedSlides[slideIndex] = updatedSlide
        return { presentation: { ...prev.presentation, slides: updatedSlides } }
    })
}

function handleColorCommit(e: Event) {
    const color = (e.target as HTMLInputElement).value
    updateActiveSlide((slide) => setSlideBackgroundColor(slide, color))
}

function useBackground() {
    const colorInputRef = useRef<HTMLInputElement | null>(null)

    const setColorInputRef = useCallback((input: HTMLInputElement | null) => {
        colorInputRef.current?.removeEventListener('change', handleColorCommit)
        colorInputRef.current = input
        input?.addEventListener('change', handleColorCommit)
    }, [])

    const handleGradientApply = (gradientType: 'linear' | 'radial', firstColor: string, secondColor: string, angle: number) => {
        const normalizedAngle = Math.min(360, Math.max(0, angle))
        updateActiveSlide((slide) =>
            setSlideBackgroundGradient(slide, [firstColor, secondColor], normalizedAngle, gradientType)
        )
    }

    const handleClearBackground = () => {
        updateActiveSlide(clearSlideBackground)
    }

    return {
        setColorInputRef,
        handleGradientApply,
        handleClearBackground,
    }
}

export { useBackground }