import { ChangeEvent, useEffect, useState } from 'react';
import { dispatch, getActiveSlideID } from '../../editor';
import { updateTextContent, updateTextObjectStyle } from '../../functions/object';
import { Font } from '../../types/objects';
import { Presentation } from '../../types/presentation';
import { Slide } from '../../types/slide';
import styles from './TextStylePanel.module.css';

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 200;

type TextStylePanelProps = {
    presentation: Presentation
    selectedIds: string[]
}

function TextStylePanel({ presentation, selectedIds }: TextStylePanelProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID);
    const selectedObject = activeSlide && selectedIds.length === 1 ? activeSlide.objects.find(obj => obj.id === selectedIds[0]) : undefined;
    const textObject = selectedObject && selectedObject.type === 'text' ? selectedObject : undefined;

    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState('16');
    const [fontColor, setFontColor] = useState('#000000');

    useEffect(() => {
        if (!textObject) return;
        setFontFamily(textObject.font.family);
        setFontSize(String(textObject.font.size));
        setFontColor(textObject.font.color);
    }, [textObject?.id]);

    if (!textObject) {
        return null;
    }

    const objectId = textObject.id;
    const font = textObject.font;

    const updateActiveSlide = (update: (slide: Slide) => Slide) => {
        dispatch((prev) => ({
            presentation: {
                ...prev.presentation,
                slides: prev.presentation.slides.map((slide) =>
                    slide.id === prev.activeSlideID ? update(slide) : slide
                ),
            },
        }));
    };

    const applyFont = (newFont: Font) => {
        updateActiveSlide((slide) => updateTextObjectStyle(slide, objectId, newFont));
    };

    const handleFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const family = e.target.value;
        setFontFamily(family);
        applyFont({ ...font, family });
    };

    const isValidSize = (size: number) =>
        Number.isFinite(size) && size >= MIN_FONT_SIZE && size <= MAX_FONT_SIZE;

    const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFontSize(value);
        const size = Number(value);
        if (value !== '' && isValidSize(size)) {
            applyFont({ ...font, size });
        }
    };

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const color = e.target.value;
        setFontColor(color);
        applyFont({ ...font, color });
    };

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        updateActiveSlide((slide) => updateTextContent(slide, objectId, content));
    };

    const changeSize = (delta: number) => {
        const size = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, font.size + delta));
        setFontSize(String(size));
        applyFont({ ...font, size });
    };

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
                        disabled={font.size <= MIN_FONT_SIZE}
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
                        disabled={font.size >= MAX_FONT_SIZE}
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