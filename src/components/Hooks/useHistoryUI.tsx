import { useCallback, useEffect, useState } from 'react'
import { addEditorChangeHandler, getCanRedo, getCanUndo, redo, undo } from '../../editor'

type HistoryUI = {
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

function isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false
    const tag = target.tagName
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

function useHistoryUI(): HistoryUI {
    const [canUndo, setCanUndo] = useState(getCanUndo())
    const [canRedo, setCanRedo] = useState(getCanRedo())

    useEffect(() => {
        const sync = () => {
            setCanUndo(getCanUndo())
            setCanRedo(getCanRedo())
        }
        const unsubscribe = addEditorChangeHandler(sync)
        return unsubscribe
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isTypingTarget(e.target)) {
                return
            }
            if (e.ctrlKey && e.code === 'KeyZ') {
                e.preventDefault()
                undo()
            }
            if (e.ctrlKey && e.code === 'KeyY') {
                e.preventDefault()
                redo()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const onUndo = useCallback(() => {
        undo()
    }, [])

    const onRedo = useCallback(() => {
        redo()
    }, [])

    return { canUndo, canRedo, onUndo, onRedo }
}

export { useHistoryUI } 