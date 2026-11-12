import { getActiveSlideID } from '../../editor';
import { Presentation } from '../../types/presentation';
import { MAX_FONT_SIZE, MIN_FONT_SIZE, useChangeText } from '../Hooks/useChangeText';
import styles from './TextStylePanel.module.css';

type TextStylePanelProps = {
    presentation: Presentation
    selectedIds: string[]
}

function TextStylePanel({ presentation, selectedIds }: TextStylePanelProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID);
    const selectedObject = activeSlide && selectedIds.length === 1 ? activeSlide.objects.find(obj => obj.id === selectedIds[0]) : undefined;
    const textObject = selectedObject && selectedObject.type === 'text' ? selectedObject : undefined;

    const {
        fontFamily,
        fontSize,
        fontColor,
        handleFamilyChange,
        handleSizeChange,
        handleColorChange,
        handleContentChange,
        changeSize,
    } = useChangeText({ textObject });

    if (!textObject) {
        return null;
    }

    return (
        <aside className={styles.panel}>
            <div className={styles.field}>
                <label className={styles.label}>Шрифт:</label>
                <select
                    className={styles.select}
                    value={fontFamily}
                    onChange={handleFamilyChange}
                >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Размер:</label>
                <div className={styles.sizeGroup}>
                    <button
                        type="button"
                        className={styles.sizeButton}
                        onClick={() => changeSize(-1)}
                        disabled={textObject.font.size <= MIN_FONT_SIZE}
                    >
                        −
                    </button>
                    <input
                        className={styles.sizeInput}
                        type="number"
                        min={MIN_FONT_SIZE}
                        max={MAX_FONT_SIZE}
                        value={fontSize}
                        onChange={handleSizeChange}
                    />
                    <button
                        type="button"
                        className={styles.sizeButton}
                        onClick={() => changeSize(1)}
                        disabled={textObject.font.size >= MAX_FONT_SIZE}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Цвет:</label>
                <input
                    className={styles.colorInput}
                    type="color"
                    value={fontColor}
                    onChange={handleColorChange}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Текст:</label>
                <textarea
                    className={styles.textArea}
                    value={textObject.content}
                    onChange={handleContentChange}
                    rows={3}
                />
            </div>
        </aside>
    );
}

export { TextStylePanel };