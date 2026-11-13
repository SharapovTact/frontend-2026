import { ChangeEvent, useCallback, useRef } from "react"
import { dispatch } from "../../editor"
import { Background, GradientBackground, ImageBackground, SolidBackground } from "../../types/slide"

function setActiveSlideBackground(background: Background) {
    dispatch((prev) => {
        const slideIndex = prev.presentation.slides.findIndex(s => s.id === prev.activeSlideID)
        if (slideIndex === -1) return {}

        const updatedSlide = { ...prev.presentation.slides[slideIndex], background }

        const updatedSlides = [...prev.presentation.slides]
        updatedSlides[slideIndex] = updatedSlide
        return { presentation: { ...prev.presentation, slides: updatedSlides } }
    })
}


function setSlideBackgroundColor(color: string) {
    const background: SolidBackground = { type: 'solid', color }
    setActiveSlideBackground(background)
}

function setSlideBackgroundGradient(gradientType: 'linear' | 'radial', colors: string[], angle: number) {
    const background: GradientBackground = { type: 'gradient', gradientType, colors, angle }
    setActiveSlideBackground(background)
}

function clearSlideBackground() {
    setActiveSlideBackground({ type: 'solid', color: '#ffffff' })
}

function handleColorCommit(e: Event) {
    const input = e.target as HTMLInputElement
    setSlideBackgroundColor(input.value)
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
        setSlideBackgroundGradient(gradientType, [firstColor, secondColor], normalizedAngle)
    }

    const handleClearBackground = () => {
        clearSlideBackground()
    }
    return {
        setColorInputRef,
        handleGradientApply,
        handleClearBackground,
    }
}

export {useBackground}