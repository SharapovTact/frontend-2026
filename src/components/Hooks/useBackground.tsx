import { ChangeEvent, useEffect, useRef, useState } from "react"
import { dispatch } from "../../editor"
import { clearSlideBackground, setSlideBackgroundColor, setSlideBackgroundGradient } from "../../functions/background"
import { Slide } from "../../types/slide"

type UseBackgroundArgs = {
    slide: Slide | undefined
}

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

function getSlideColor(slide: Slide): string {
    return slide.background.type === 'solid' ? slide.background.color : '#ffffff'
}

function useBackground({ slide }: UseBackgroundArgs) {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const colorInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!slide) return
        setBackgroundColor(getSlideColor(slide))
    }, [slide?.id])

    useEffect(() => {
        const input = colorInputRef.current
        if (!input || !slide) return

        const handleColorCommit = () => {
            const color = input.value
            if (slide.background.type !== 'solid' || color !== slide.background.color) {
                updateActiveSlide((s) => setSlideBackgroundColor(s, color))
            }
        }

        input.addEventListener('change', handleColorCommit)
        return () => input.removeEventListener('change', handleColorCommit)
    }, [slide])

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value
        setBackgroundColor(color)
        if (!slide) return

        document.querySelectorAll<HTMLElement>(`[data-slide-id="${slide.id}"]`).forEach((element) => {
            element.style.background = color
        })
    }

    const handleGradientApply = (gradientType: 'linear' | 'radial', firstColor: string, secondColor: string, angle: number) => {
        const normalizedAngle = Math.min(360, Math.max(0, angle))
        updateActiveSlide((s) =>
            setSlideBackgroundGradient(s, [firstColor, secondColor], normalizedAngle, gradientType)
        )
    }

    const handleClearBackground = () => {
        updateActiveSlide(clearSlideBackground)
    }

    return {
        backgroundColor,
        colorInputRef,
        handleColorChange,
        handleGradientApply,
        handleClearBackground,
    }
}

export { useBackground }