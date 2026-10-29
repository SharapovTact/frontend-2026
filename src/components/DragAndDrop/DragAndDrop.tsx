import { useEffect, useState } from 'react';
import { dispatch, getActiveSlideID } from '../../editor';
import { moveObject, removeObject } from '../../functions/object';
import { Slide } from '../../types/slide';

type DragInfo = {
    startX: number,
    startY: number,
    startPositions: { id: string; x: number; y: number }[]
}

type UseDragAndDropsArgs = {
    activeSlide: Slide | undefined
}

function useDragAndDrop({ activeSlide }: UseDragAndDropsArgs) {
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [dragInfo, setDragInfo] = useState<DragInfo | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const activeSlideID = activeSlide?.id;
    useEffect(() => {
        setSelectedIds([])
    }, [activeSlideID])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.length > 0) {
                dispatch((prev) => {
                    const slideIndex = prev.presentation.slides.findIndex(s => s.id === prev.activeSlideID)
                    if (slideIndex === -1) return {}
                    let updatedSlide = prev.presentation.slides[slideIndex]
                    selectedIds.forEach(id => {
                        updatedSlide = removeObject(updatedSlide, id);
                    })

                    const updatedSlides = [...prev.presentation.slides];
                    updatedSlides[slideIndex] = updatedSlide;
                    return {
                        presentation: {
                            ...prev.presentation,
                            slides: updatedSlides
                        }
                    };
                });
                setSelectedIds([]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIds])

    useEffect(() => {
        if (!dragInfo) return;

        const handleMouseMove = (e: MouseEvent) => {
            setDragOffset({
                x: e.clientX - dragInfo.startX,
                y: e.clientY - dragInfo.startY
            });
        };

        const handleMouseUp = (e: MouseEvent) => {
            const finalOffsetX = e.clientX - dragInfo.startX;
            const finalOffsetY = e.clientY - dragInfo.startY;

            if (finalOffsetX !== 0 || finalOffsetY !== 0) {
                dispatch((prev) => {
                    const slideIndex = prev.presentation.slides.findIndex(s => s.id === prev.activeSlideID);
                    if (slideIndex === -1) return {}

                    let updatedSlide = prev.presentation.slides[slideIndex]

                    dragInfo.startPositions.forEach(pos => {
                        const newX = pos.x + finalOffsetX
                        const newY = pos.y + finalOffsetY
                        updatedSlide = moveObject(updatedSlide, pos.id, { x: newX, y: newY })
                    })

                    const updatedSlides = [...prev.presentation.slides]
                    updatedSlides[slideIndex] = updatedSlide
                    return { presentation: { ...prev.presentation, slides: updatedSlides } }
                })
            }

            setDragInfo(null);
            setDragOffset({ x: 0, y: 0 });
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [dragInfo])

    const handleObjectMouseDown = (e: React.MouseEvent, objectId: string) => {
        if (!activeSlide) return;
        e.preventDefault()
        e.stopPropagation()

        let currentSelected = selectedIds

        if (!selectedIds.includes(objectId)) {
            currentSelected = e.shiftKey ? [...selectedIds, objectId] : [objectId]
            setSelectedIds(currentSelected)
        } else if (e.shiftKey) {
            currentSelected = selectedIds.filter(id => id !== objectId)
            setSelectedIds(currentSelected)
            return
        }

        const startPositions = activeSlide.objects
            .filter(obj => currentSelected.includes(obj.id))
            .map(obj => ({ id: obj.id, x: obj.position.x, y: obj.position.y }))

        setDragInfo({
            startX: e.clientX,
            startY: e.clientY,
            startPositions
        })
    }

    const clearSelection = () => setSelectedIds([])
    let displaySlide = activeSlide
    if (activeSlide && dragInfo && (dragOffset.x !== 0 || dragOffset.y !== 0)) {
        const movedObjects = activeSlide.objects.map(obj => {
            if (!selectedIds.includes(obj.id)) return obj

            const startPos = dragInfo.startPositions.find(p => p.id === obj.id)
            if (!startPos) { return obj }
            return {
                ...obj,
                position: {
                    x: startPos.x + dragOffset.x,
                    y: startPos.y + dragOffset.y
                }
            }

        })

        displaySlide = { ...activeSlide, objects: movedObjects }
    }

    return {
        selectedIds,
        displaySlide,
        handleObjectMouseDown,
        clearSelection,
    }
}

export { useDragAndDrop };