import styles from './SlidePreview.module.css';

import { Slide } from "../../types/slide"
import { SlideObject } from "../SlideObject/SlideObject";

type SlidePreviewProps = {
    slide: Slide
    selectedIds?: string[]
    onObjectSelect?: (e: React.MouseEvent, objectId: string) => void
}

function SlidePreview({ slide, selectedIds = [], onObjectSelect }: SlidePreviewProps) {
    const backgroundStyle: React.CSSProperties = {}
    const background = slide.background;

    switch (background.type) {
        case 'solid':
            backgroundStyle.backgroundColor = background.color;
            break;

        case 'image':
            backgroundStyle.backgroundImage = `url("${background.src}")`;
            backgroundStyle.backgroundSize = '100% 100%';
            backgroundStyle.backgroundPosition = 'center';
            backgroundStyle.backgroundRepeat = 'no-repeat';
            break;

        case 'gradient': {
            const angle = background.angle ?? 180;
            const colors = background.colors.join(', ');
            backgroundStyle.backgroundImage = `linear-gradient(${angle}deg, ${colors})`;
            break;
        }
    }

    return (
        <div className={styles.slide} style={backgroundStyle}>
            {slide.objects.map((object) => (
                <SlideObject 
                    key={object.id} 
                    object={object} 
                    isSelected={selectedIds.includes(object.id)}
                    onSelect={onObjectSelect ? (e) => onObjectSelect(e, object.id) : undefined}
                />
            ))}
        </div>
    );
}

export {
    SlidePreview,
};