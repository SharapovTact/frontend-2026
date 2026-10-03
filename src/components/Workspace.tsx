import type { Presentation } from '../types/presentation';
import { SlidePreview } from './SlidePreview';
import styles from './Workspace.module.css';

type WorkspaceProps = {
    presentation: Presentation;
};

function Workspace({ presentation }: WorkspaceProps) {
    const activeSlide = presentation.slides[1];

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