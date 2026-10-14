import styles from './SlidePreview.module.css';

import { Slide } from "../../types/slide"
import { SlideObject } from "../SlideObject/SlideObject";

type SlidePreviewProps = {
    slide: Slide
}

function SlidePreview({ slide }: SlidePreviewProps) {
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
                <SlideObject key={object.id} object={object} />
            ))}
        </div>
    );
}

export {
    SlidePreview,
};