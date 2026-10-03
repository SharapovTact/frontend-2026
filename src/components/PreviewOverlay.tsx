import type { Presentation } from '../types/presentation';
import { SlidePreview } from './SlidePreview';
import { setPreviewMode } from '../editor';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = {
    presentation: Presentation
    onClose: () => void
};

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps) {
    const slide = presentation.slides[0];

    if (!slide) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <button
                className={styles.closeButton}
                onClick={onClose}
            >
                Закрыть превью
            </button>

            <div className={styles.slideWrapper}>
                <SlidePreview slide={slide} />
            </div>
        </div>
    );
}

export { PreviewOverlay };