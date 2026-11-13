import styles from './SlidePreview.module.css';
import { Slide } from "../../types/slide"
import { SlideObject } from "../SlideObject/SlideObject";

type SlidePreviewProps = {
    slide: Slide
    selectedIds?: string[]
    onObjectMouseDown?: (e: React.MouseEvent, objectId: string) => void
    onResizeMouseDown?: (e: React.MouseEvent, objectId: string) => void
}

function SlidePreview({ slide, selectedIds = [], onObjectMouseDown, onResizeMouseDown }: SlidePreviewProps) {
    const backgroundStyle: React.CSSProperties = {}
    const background = slide.background

    switch (background.type) {
        case 'solid':
            backgroundStyle.backgroundColor = background.color
            break
        case 'image':
            backgroundStyle.backgroundImage = `url("${background.src}")`
            backgroundStyle.backgroundSize = '100% 100%'
            backgroundStyle.backgroundPosition = 'center'
            backgroundStyle.backgroundRepeat = 'no-repeat'
            break
        case 'gradient': {
            const colors = background.colors.join(', ')
            if (background.gradientType === 'radial') {
                backgroundStyle.backgroundImage = `radial-gradient(circle, ${colors})`
            } else {
                const angle = background.angle ?? 180
                backgroundStyle.backgroundImage = `linear-gradient(${angle}deg, ${colors})`
            }
            break
        }
    }

    return (
        <div className={styles.slide} style={backgroundStyle}>
            {slide.objects.map((object) => (
                <SlideObject
                    key={object.id}
                    object={object}
                    isSelected={selectedIds.includes(object.id)}
                    onMouseDown={onObjectMouseDown ? (e) => onObjectMouseDown(e, object.id) : undefined}
                    onResizeMouseDown={onResizeMouseDown ? (e) => onResizeMouseDown(e, object.id) : undefined}
                />
            ))}
        </div>
    );
}

export { SlidePreview };