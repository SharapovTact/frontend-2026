
import { getActiveSlideID, getWrapperState } from '../../editor';
import type { Presentation } from '../../types/presentation';
import { SlidePreview } from '../SlidePreview/SlidePreview';
import styles from './Workspace.module.css';
import { useDragAndDrop } from '../Hooks/useDragAndDrop';
import { useDelete } from '../Hooks/useDelete';
import { useSelect } from '../Hooks/useSelect';
import { useResize } from '../Hooks/useResize';

type WorkspaceProps = {
    presentation: Presentation
};

function Workspace({ presentation }: WorkspaceProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID)
    let isResizing: boolean = getWrapperState();
    const { selectedIds, setSelectedIds, clearSelection } = useSelect({
        activeSlide
    })
    useDelete({
        selectedIds,
        clearSelection
    })
    const { displaySlide: dragDisplaySlide, handleObjectMouseDown } = useDragAndDrop({
        activeSlide,
        selectedIds,
        setSelectedIds
    })

    const { displaySlide: resizeDisplaySlide, handleResizeMouseDown } = useResize({
        activeSlide,
        selectedIds
    })

    const displaySlide = resizeDisplaySlide !== activeSlide ? resizeDisplaySlide : dragDisplaySlide

    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        if (e.defaultPrevented) return
        clearSelection()
    }

    if (!activeSlide || !displaySlide) {
        return (
            <main className={styles.workspace}>
                <div className={styles.emptyState}>Нет слайдов</div>
            </main>
        )
    }

    return (
        <main className={styles.workspace} 
            onMouseDown={handleCanvasMouseDown}
            style={{ cursor: isResizing ? 'nwse-resize' : undefined }}>
            <div className={styles.slideWrapper}>
                <SlidePreview
                    slide={displaySlide}
                    selectedIds={selectedIds}
                    onObjectMouseDown={handleObjectMouseDown}
                    onResizeMouseDown={selectedIds.length == 1 ? handleResizeMouseDown : undefined}
                />
            </div>
        </main>
    )
}

export { Workspace }