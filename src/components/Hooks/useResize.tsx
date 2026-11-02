import { useRef, useState } from "react"
import { dispatch } from "../../editor"
import { Slide } from "../../types/slide"

const MIN_SIZE = 30

type ResizeInfo = {
    objectId: string
    startX: number
    startY: number
    startWidth: number
    startHeight: number
}

type UseResizeArgs = {
    activeSlide: Slide | undefined
}

function useResize({ activeSlide }: UseResizeArgs) {
    const resizeRef = useRef<ResizeInfo | null>(null)
    const [sizeDelta, setSizeDelta] = useState({ width: 0, height: 0 })

    const handleResizeMouseDown = (e: React.MouseEvent, objectId: string) => {
        if (e.defaultPrevented) {
            return
        }
        const obj = activeSlide?.objects.find((o) => o.id === objectId)
        
        if (!obj) {
            return
        }
        e.preventDefault()

        resizeRef.current = {
            objectId,
            startX: e.clientX,
            startY: e.clientY,
            startWidth: obj.size.width,
            startHeight: obj.size.height,
        }

        const handleMouseMove = (ev: MouseEvent) => {
            const info = resizeRef.current
            if (!info) {
                return
            }
            setSizeDelta({
                width: ev.clientX - info.startX,
                height: ev.clientY - info.startY,
            })
        }

        const handleMouseUp = (ev: MouseEvent) => {
            const info = resizeRef.current
            if (info) {

                const width = Math.max(MIN_SIZE, info.startWidth + ev.clientX - info.startX)
                const height = Math.max(MIN_SIZE, info.startHeight + ev.clientY - info.startY)

                dispatch((prev) => {
                    const slideIndex = prev.presentation.slides.findIndex(
                        (s) => s.id === prev.activeSlideID)
                    if (slideIndex === -1) {
                        return {}
                    }

                    const slide = prev.presentation.slides[slideIndex]

                    const objects = slide.objects.map((obj) =>
                        obj.id === info.objectId ? { ...obj, size: { width, height } } : obj
                    )
                    const slides = [...prev.presentation.slides]
                    slides[slideIndex] = { ...slide, objects }
                    return { 
                        presentation: { ...prev.presentation, slides } 
                    }
                })
            }

            resizeRef.current = null
            setSizeDelta({ width: 0, height: 0 })
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    let displaySlide = activeSlide
    const info = resizeRef.current
    if (activeSlide && info) {
        displaySlide = {
            ...activeSlide,
            objects: activeSlide.objects.map((obj) => {
                if (obj.id !== info.objectId) return obj
                return {
                    ...obj,
                    size: {
                        width: Math.max(MIN_SIZE, info.startWidth + sizeDelta.width),
                        height: Math.max(MIN_SIZE, info.startHeight + sizeDelta.height),
                    },
                }
            }),
        }
    }

    return { displaySlide, handleResizeMouseDown }
}

export { useResize }