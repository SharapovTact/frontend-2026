import { ChangeEvent, useCallback, useRef } from 'react'
import { dispatch } from '../../editor'
import { generateId } from '../../functions/common'
import { addImageObject } from '../../functions/object'

const DEFAULT_POSITION = { x: 200, y: 150 }
const DEFAULT_SIZE = { width: 300, height: 200 }

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

function useAddPicture() {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAddPictureClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        e.target.value = ''

        if (!file || !file.type.startsWith('image/')) {
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                addPictureToActiveSlide(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }, [])

    return {
        fileInputRef,
        handleAddPictureClick,
        handleFileChange,
    }
}

export { useAddPicture }