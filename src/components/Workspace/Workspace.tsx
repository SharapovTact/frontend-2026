import { useEffect, useState } from 'react';
import { dispatch, getActiveSlideID } from '../../editor';
import type { Presentation } from '../../types/presentation';
import { SlidePreview } from '../SlidePreview/SlidePreview';
import styles from './Workspace.module.css';
import { moveObject, removeObject } from '../../functions/object';
import { useDragAndDrop } from '../DragAndDrop/DragAndDrop';

type WorkspaceProps = {
    presentation: Presentation
};

function Workspace({ presentation }: WorkspaceProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID)

    const {selectedIds, displaySlide, handleObjectMouseDown, clearSelection} = useDragAndDrop({activeSlide})
    
    if (!activeSlide || !displaySlide) {
        return (
            <main className={styles.workspace}>
                <div className={styles.emptyState}>Нет слайдов</div>
            </main>
        )
    }

    return (
        <main className={styles.workspace} onMouseDown={clearSelection}>
            <div className={styles.slideWrapper}>
                <SlidePreview
                    slide={displaySlide}
                    selectedIds={selectedIds}
                    onObjectMouseDown={handleObjectMouseDown}
                />
            </div>
        </main>
    )
}

export { Workspace };