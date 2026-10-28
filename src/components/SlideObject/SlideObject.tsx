import styles from './SlideObject.module.css'
import { SlideObject } from "../../types/objects"


type SlideObjectProps = {
    object: SlideObject
    isSelected?: boolean
    onMouseDown?: (e: React.MouseEvent) => void;
}

function SlideObject({ object, isSelected = false, onMouseDown }: SlideObjectProps) {
    const positionStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        outline: isSelected ? '3px solid #0b57d0' : 'none',
        cursor: 'pointer',
    }

    if (object.type === 'text') {
        return (
            <div
                className={styles.textObject}
                style={{
                    ...positionStyle,
                    fontFamily: object.font.family,
                    fontSize: `${object.font.size}px`,
                    color: object.font.color,
                }}
                onMouseDown={onMouseDown}
            >
                {object.content}
            </div>
        )
    }
    else if (object.type === 'image') {
        return (
            <img
                src={object.src}
                alt=""
                className={styles.imageObject}
                style={positionStyle}
                onMouseDown={onMouseDown}
            />
        )
    }

    return null;
}

export {
    SlideObject,
}