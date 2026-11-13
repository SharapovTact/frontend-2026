import { ChangeEvent, useEffect, useState } from 'react'
import { dispatch } from '../../editor'
import { updateTextContent, updateTextObjectStyle } from '../../functions/object'
import { Font, TextObject } from '../../types/objects'
import { Slide } from '../../types/slide'

const MIN_FONT_SIZE = 8
const MAX_FONT_SIZE = 200

type UseChangeTextArgs = {
    textObject: TextObject | undefined //TODO при изменении цвета - у меня закидывается 
                                       //всё сразу в модельку, если водить по градиент-полю
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

function useChangeText({ textObject }: UseChangeTextArgs) {
    const [fontFamily, setFontFamily] = useState('Arial')
    const [fontSize, setFontSize] = useState('16')
    const [fontColor, setFontColor] = useState('#000000')

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
        const color = e.target.value
        setFontColor(color)
        applyFont({ color })
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

    return {
        fontFamily,
        fontSize,
        fontColor,
        handleFamilyChange,
        handleSizeChange,
        handleColorChange,
        handleContentChange,
        changeSize,
    }
}

export { useChangeText, MIN_FONT_SIZE, MAX_FONT_SIZE }