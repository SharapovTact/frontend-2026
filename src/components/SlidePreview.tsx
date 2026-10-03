import styles from './SlidePreview.module.css';

import { Slide } from "../types/slide"
import { SlideObject } from "./SlideObject";

type SlidePreviewProps = {
    slide: Slide
}

function SlidePreview({slide}: SlidePreviewProps) {
    const backgroundStyle: React.CSSProperties = {}
    const background = slide.background;

    if ('color' in background) {
        backgroundStyle.backgroundColor = background.color;
    } 
    else if ('src' in background) {
        backgroundStyle.backgroundImage = `url("${background.src}")`;
        backgroundStyle.backgroundSize = '100% 100%';
        backgroundStyle.backgroundPosition = 'center';
        backgroundStyle.backgroundRepeat = 'no-repeat';
    }
    else if ('colors' in background) {
        const angle = background.angle ?? 180;
        const colors = background.colors.join(', ');
        backgroundStyle.backgroundImage = `linear-gradient(${angle}deg, ${colors})`;
        //linear-gradient(180deg, #ff0000, #0000ff)
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