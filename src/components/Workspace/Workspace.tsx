import { getActiveSlideID } from '../../editor';
import type { Presentation } from '../../types/presentation';
import { SlidePreview } from '../SlidePreview/SlidePreview';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    presentation: Presentation;
};

function Workspace({ presentation }: WorkspaceProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID);

    if (!activeSlide) {
        return (
            <main className={styles.workspace}>
                <div className={styles.emptyState}>Нет слайдов</div>
            </main>
        );
    }

    return (
        <main className={styles.workspace}>
            <div className={styles.slideWrapper}>
                <SlidePreview slide={activeSlide} />
            </div>
        </main>
    );
}

export { Workspace };