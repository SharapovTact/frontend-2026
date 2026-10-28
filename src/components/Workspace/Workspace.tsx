import { useEffect, useState } from 'react';
import { dispatch, getActiveSlideID } from '../../editor';
import type { Presentation } from '../../types/presentation';
import { SlidePreview } from '../SlidePreview/SlidePreview';
import styles from './Workspace.module.css';
import { removeObject } from '../../functions/object';

type WorkspaceProps = {
    presentation: Presentation;
};

function Workspace({ presentation }: WorkspaceProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID)

    const [selectedIds, setSelectedIds] = useState<string[]>([])

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
    }, [selectedIds]);

    if (!activeSlide) {
        return (
            <main className={styles.workspace}>
                <div className={styles.emptyState}>Нет слайдов</div>
            </main>
        );
    }

    const handleObjectSelect = (e: React.MouseEvent, objectId: string) => {
        e.stopPropagation();
        if (e.shiftKey) {
            setSelectedIds(prev =>
                prev.includes(objectId) ? prev.filter(id => id !== objectId) : [...prev, objectId]
            );
        } else {
            setSelectedIds([objectId]);
        }
    };

    return (
        <main className={styles.workspace} onClick={() => setSelectedIds([])}>
            <div className={styles.slideWrapper}>
                <SlidePreview
                    slide={activeSlide}
                    selectedIds={selectedIds}
                    onObjectSelect={handleObjectSelect}
                />
            </div>
        </main>
    );
}

export { Workspace };