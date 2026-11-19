import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { dispatch } from '../../editor'
import { updateTextContent, updateTextObjectStyle } from '../../functions/object'
import { Font, TextObject } from '../../types/objects'
import { Slide } from '../../types/slide'

const MIN_FONT_SIZE = 8
const MAX_FONT_SIZE = 200

type UseChangeTextArgs = {
    textObject: TextObject | undefined
    activeSlide: Slide | undefined
}

function isValidSize(size: number): boolean {
    return Number.isFinite(size) && size >= MIN_FONT_SIZE && size <= MAX_FONT_SIZE
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

function useChangeText({ textObject, activeSlide }: UseChangeTextArgs) {
    const [fontFamily, setFontFamily] = useState('Arial')
    const [fontSize, setFontSize] = useState('16')
    const [fontColor, setFontColor] = useState('#000000')
    const colorInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!textObject) return
        setFontFamily(textObject.font.family)
        setFontSize(String(textObject.font.size))
        setFontColor(textObject.font.color)
    }, [textObject?.id])

    const applyFont = (changes: Partial<Font>) => {
        if (!textObject) return
        const objectId = textObject.id
        const newFont = { ...textObject.font, ...changes }
        updateActiveSlide((slide) => updateTextObjectStyle(slide, objectId, newFont))
    }

    useEffect(() => {
        const input = colorInputRef.current
        if (!input || !textObject) return

        const handleColorCommit = () => {
            if (input.value !== textObject.font.color) {
                applyFont({ color: input.value })
            }
        }

        input.addEventListener('change', handleColorCommit)
        return () => input.removeEventListener('change', handleColorCommit)
    }, [textObject])

    const handleFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const family = e.target.value
        setFontFamily(family)
        applyFont({ family })
    }

    const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFontSize(value)
        const size = Number(value)
        if (value !== '' && isValidSize(size)) {
            applyFont({ size })
        }
    }

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFontColor(e.target.value)
    }

    const changeSize = (delta: number) => {
        if (!textObject) return
        const size = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, textObject.font.size + delta))
        setFontSize(String(size))
        applyFont({ size })
    }

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!textObject) return
        const objectId = textObject.id
        const content = e.target.value
        updateActiveSlide((slide) => updateTextContent(slide, objectId, content))
    }

    let displaySlide = activeSlide
    if (activeSlide && textObject) {
        displaySlide = {
            ...activeSlide,
            objects: activeSlide.objects.map((obj) => {
                if (obj.id !== textObject.id) return obj
                if ('font' in obj) {
                    return {
                        ...obj,
                        font: { ...obj.font, color: fontColor },
                    }
                }
                return obj
            }),
        }
    }
    return {
        displaySlide,
        fontFamily,
        fontSize,
        fontColor,
        colorInputRef,
        handleFamilyChange,
        handleSizeChange,
        handleColorChange,
        handleContentChange,
        changeSize,
    }
}

export { useChangeText, updateActiveSlide, MIN_FONT_SIZE, MAX_FONT_SIZE }