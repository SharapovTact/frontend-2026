import styles from './SlideObject.module.css'
import { SlideObject } from "../types/objects"


type SlideObjectProps = {
    object: SlideObject
}

function SlideObject({object}: SlideObjectProps) {
    const positionStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
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
            />
        )
    }

    return null;
}

export {
    SlideObject,
}