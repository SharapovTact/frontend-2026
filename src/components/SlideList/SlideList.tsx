import type { Presentation } from "../../types/presentation";
import styles from './SlideList.module.css';
import { SlidePreview } from "../SlidePreview/SlidePreview";
import { setActiveSlideID } from "../../editor";

type SlideListProps = {
    presentation: Presentation;
};

function SlideList({ presentation }: SlideListProps) {
    return (
        <aside className={styles.slideList}>
            {presentation.slides.map((slide, index) => (
                <div key={slide.id} className={styles.item}>
                    <span className={styles.itemNumber}>{index + 1}</span>
                    <div className={styles.wrapper}
                        onClick={() => setActiveSlideID(slide.id)}
                    >
                        <SlidePreview slide={slide} />
                    </div>
                </div>
            ))}
        </aside>
    );
}

export { SlideList };