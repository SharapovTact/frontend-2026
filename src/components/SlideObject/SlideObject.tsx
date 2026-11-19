import styles from './SlideObject.module.css'
import { SlideObject } from "../../types/objects"
import { updateTextContent } from '../../functions/object'
import { updateActiveSlide } from '../Hooks/useChangeText'
import { useState } from 'react';

type SlideObjectProps = {
    object: SlideObject
    isSelected?: boolean
    onMouseDown?: (e: React.MouseEvent) => void;
    onResizeMouseDown?: (e: React.MouseEvent) => void;
}

function SlideObject({ object, isSelected = false, onMouseDown, onResizeMouseDown }: SlideObjectProps) {
    const [isEditing, setIsEditing] = useState(false)

    const positionStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${object.position.x}px`,
        top: `${object.position.y}px`,
        width: `${object.size.width}px`,
        height: `${object.size.height}px`,
        outline: isSelected ? '3px solid #0b57d0' : 'none',
        cursor: 'pointer',
    }

    const handleDoubleClick = () => {
        if (object.type === 'text' && onMouseDown) {
            setIsEditing(true)
        }
    }

    const finishEditing = (content: string) => {
        setIsEditing(false)
        if (object.type === 'text' && content !== object.content) {
            updateActiveSlide((slide) => updateTextContent(slide, object.id, content))
        }
    }

    const renderContent = () => {
        if (object.type === 'text') {
            const fontStyle: React.CSSProperties = {
                fontFamily: object.font.family,
                fontSize: `${object.font.size}px`,
                color: object.font.color,
            }

            if (isEditing) {
                return (
                    <textarea
                        className={styles.textEditor}
                        style={fontStyle}
                        defaultValue={object.content}
                        onBlur={(e) => finishEditing(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                e.currentTarget.value = object.content
                                e.currentTarget.blur()
                            }
                        }}
                    />
                )
            }

            return (
                <div className={styles.textObject} style={fontStyle}>
                    {object.content}
                </div>
            )
        }
        if (object.type === 'image') {
            return (
                <div
                    className={styles.imageObject}
                    style={{ backgroundImage: `url("${object.src}")` }}
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
            onDoubleClick={handleDoubleClick}>
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