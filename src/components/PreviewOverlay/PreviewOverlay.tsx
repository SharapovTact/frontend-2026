import type { Presentation } from '../../types/presentation';
import { SlidePreview } from '../SlidePreview/SlidePreview';
import { getActiveSlideID, setPreviewMode } from '../../editor';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = {
    presentation: Presentation
    onClose: () => void
};

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID);

    if (!activeSlide) {
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
                <SlidePreview slide={activeSlide} />
            </div>
        </div>
    );
}

export { PreviewOverlay };