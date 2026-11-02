import styles from './SlideObject.module.css'
import { SlideObject } from "../../types/objects"


type SlideObjectProps = {
    object: SlideObject
    isSelected?: boolean
    onMouseDown?: (e: React.MouseEvent) => void;
    onResizeMouseDown?: (e: React.MouseEvent) => void;
}

function SlideObject({ object, isSelected = false, onMouseDown, onResizeMouseDown }: SlideObjectProps) {
    const positionStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        outline: isSelected ? '3px solid #0b57d0' : 'none',
        cursor: 'pointer',
    }

    const renderContent = () => {
        if (object.type === 'text') {
            return (
                <div
                    className={styles.textObject}
                    style={{
                        fontFamily: object.font.family,
                        fontSize: `${object.font.size}px`,
                        color: object.font.color,
                    }}
                >
                    {object.content}
                </div>
            )
        }
        if (object.type === 'image') {
            return (
                <img
                    src={object.src}
                    alt=""
                    className={styles.imageObject}
                />
            )
        }
        return null
    }
    
    return (
        <div
            className={`${styles.wrapper}${isSelected ? ` ${styles.wrapperSelected}` : ''}`}
            style={positionStyle}
            onMouseDown={onMouseDown}
        >
            {renderContent()}

            {isSelected && onResizeMouseDown && (
                <div
                    className={styles.resizeHandle}
                    onMouseDown={onResizeMouseDown}
                />
            )}
        </div>
    )
}

export {
    SlideObject,
}