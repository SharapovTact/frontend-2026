import { dispatch, getActiveSlideID } from '../../editor';
import { updateTextContent, updateTextObjectStyle } from '../../functions/object';
import { Font } from '../../types/objects';
import { Presentation } from '../../types/presentation';
import { Slide } from '../../types/slide';
import styles from './TextStylePanel.module.css';

type TextStylePanelProps = {
    presentation: Presentation
    selectedIds: string[]
}

function TextStylePanel({ presentation, selectedIds }: TextStylePanelProps) {
    const activeSlideID = getActiveSlideID()
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID)

    if (!activeSlide || selectedIds.length !== 1) {
        return null
    }

    const selectedObject = activeSlide.objects.find(obj => obj.id === selectedIds[0])

    if (!selectedObject || selectedObject.type !== 'text') {
        return null
    }

    const { font, content } = selectedObject

    const updateActiveSlide = (update: (slide: Slide) => Slide) => {
        dispatch((prev) => ({
            presentation: {
                ...prev.presentation,
                slides: prev.presentation.slides.map((slide) =>
                    slide.id === prev.activeSlideID ? update(slide) : slide
                ),
            },
        }))
    }

    const changeFont = (newFont: Font) => {
        updateActiveSlide((slide) => updateTextObjectStyle(slide, selectedObject.id, newFont))
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        updateActiveSlide((slide) => updateTextContent(slide, selectedObject.id, newContent))
    }

    const handleFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changeFont({ ...font, family: e.target.value })
    }

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const size = Number(e.target.value)
        if (!size || size < 8 || size > 200) return
        changeFont({ ...font, size })
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeFont({ ...font, color: e.target.value })
    }

    return (
        <aside className={styles.panel}>

            <div className={styles.field}>
                <label className={styles.label}>Шрифт:</label>
                <select
                    className={styles.select}
                    value={font.family}
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
                    <input
                        className={styles.sizeInput}
                        type="number"
                        min={8}
                        max={200}
                        value={font.size}
                        onChange={handleSizeChange}
                    />
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Цвет:</label>
                <input
                    className={styles.colorInput}
                    type="color"
                    value={font.color}
                    onChange={handleColorChange}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label}>Текст:</label>
                <textarea
                    className={styles.textArea}
                    value={content}
                    onChange={handleContentChange}
                    rows={3}
                />
            </div>
        </aside>
    )
}

export { TextStylePanel }