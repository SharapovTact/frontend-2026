import { ChangeEvent } from "react"
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

function setSlideBackgroundGradient(colors: string[], angle: number) {
    const background: GradientBackground = { type: 'gradient', colors, angle }
    setActiveSlideBackground(background)
}

function clearSlideBackground() {
    setActiveSlideBackground({ type: 'solid', color: '#ffffff' })
}


function useBackground() {
    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSlideBackgroundColor(e.target.value)
    }

    const handleGradientApply = (firstColor: string, secondColor: string, angle: number) => {
        const normalizedAngle = Math.min(360, Math.max(0, angle))
        setSlideBackgroundGradient([firstColor, secondColor], normalizedAngle)
    }

    const handleClearBackground = () => {
        clearSlideBackground()
    }
    return {
        handleColorChange,
        handleGradientApply,
        handleClearBackground,
    }
}

export {useBackground}