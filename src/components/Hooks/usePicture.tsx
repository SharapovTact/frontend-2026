import { ChangeEvent, useCallback, useRef } from 'react'
import { dispatch } from '../../editor'
import { generateId } from '../../functions/common'
import { addImageObject } from '../../functions/object'
import { ImageBackground } from '../../types/slide'

const DEFAULT_POSITION = { x: 200, y: 150 }
const DEFAULT_SIZE = { width: 300, height: 200 }

type PictureTarget = 'object' | 'background'

function addPictureToActiveSlide(src: string) {
    dispatch((prev) => {
        const slideIndex = prev.presentation.slides.findIndex(s => s.id === prev.activeSlideID)
        if (slideIndex === -1) return {}

        const updatedSlide = addImageObject(prev.presentation.slides[slideIndex], generateId(), {
            src,
            position: DEFAULT_POSITION,
            size: DEFAULT_SIZE,
        })

        const updatedSlides = [...prev.presentation.slides]
        updatedSlides[slideIndex] = updatedSlide
        return { presentation: { ...prev.presentation, slides: updatedSlides } }
    })
}

function setPictureBackgroundToActiveSlide(src: string) {
    dispatch((prev) => {
        const slideIndex = prev.presentation.slides.findIndex(s => s.id === prev.activeSlideID)
        if (slideIndex === -1) return {}

        const background: ImageBackground = { type: 'image', src }
        const updatedSlide = { ...prev.presentation.slides[slideIndex], background }

        const updatedSlides = [...prev.presentation.slides]
        updatedSlides[slideIndex] = updatedSlide
        return { presentation: { ...prev.presentation, slides: updatedSlides } }
    })
}

function usePicture() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const targetRef = useRef<PictureTarget>('object')

    const openFileDialog = (target: PictureTarget) => {
        targetRef.current = target
        fileInputRef.current?.click()
    }

    const handleAddPictureClick = () => {
        openFileDialog('object')
    }

    const handleBackgroundClick = () => {
        openFileDialog('background')
    }

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file || !file.type.startsWith('image/')) {
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result !== 'string') return

            if (targetRef.current === 'background') {
                setPictureBackgroundToActiveSlide(reader.result)
            } else {
                addPictureToActiveSlide(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }, [])

    return {
        fileInputRef,
        handleAddPictureClick,
        handleBackgroundClick,
        handleFileChange,
    }
}

export { usePicture }