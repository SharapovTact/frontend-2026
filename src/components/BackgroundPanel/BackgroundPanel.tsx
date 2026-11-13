import { useState } from 'react';
import { getActiveSlideID } from '../../editor';
import { Presentation } from '../../types/presentation';
import { useBackground } from '../Hooks/useBackground';
import { usePicture } from '../Hooks/usePicture';
import styles from './BackgroundPanel.module.css';

type BackgroundPanelProps = {
    presentation: Presentation
    selectedIds: string[]
}

function BackgroundPanel({ presentation, selectedIds }: BackgroundPanelProps) {
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
    const [firstColor, setFirstColor] = useState('#ffffff')
    const [secondColor, setSecondColor] = useState('#000000')
    const [angle, setAngle] = useState(180)

    const activeSlideID = getActiveSlideID()
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID)
    const { fileInputRef, handleBackgroundClick, handleFileChange } = usePicture()
    const { setColorInputRef, handleGradientApply, handleClearBackground } = useBackground()

    if (!activeSlide || selectedIds.length > 0) {
        return null
    }

    return (
        <aside className={styles.panel}>
            <button type="button" className={styles.toggle}>
                Фон слайда
            </button>

            <div className={styles.content}>
                <div className={styles.field}>
                    <label className={styles.label}>Цвет:</label>
                    <input
                        className={styles.colorInput}
                        type="color"
                        defaultValue="#ffffff"
                        ref={setColorInputRef}
                    />
                </div>

                <div className={styles.field}>
                    <button type="button" className={styles.button}
                        onClick={handleBackgroundClick}>
                        Добавить фоновое изображение
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>

                <div className={styles.gradient}>
                    <span className={styles.label}>Градиент:</span>
                    <select className={styles.select} defaultValue="linear"
                    onChange={(e) => setGradientType(e.target.value as 'linear' | 'radial')}>
                        <option value="linear">Линейный</option>
                        <option value="radial">Радиальный</option>
                    </select>
                    <input className={styles.colorInput} type="color" defaultValue="#ffffff"
                        onChange={(e) => setFirstColor(e.target.value)} />
                    <input className={styles.colorInput} type="color" defaultValue="#000000"
                        onChange={(e) => setSecondColor(e.target.value)} />
                    <label className={styles.label}>Угол:</label>
                    <input
                        className={styles.angleInput}
                        type="number"
                        min={0}
                        max={360}
                        defaultValue={180}
                        onChange={(e) => setAngle(Number(e.target.value))}
                    />
                    <span className={styles.label}>°</span>
                    <button type="button" className={styles.button}
                        onClick={() => handleGradientApply(gradientType, firstColor, secondColor, angle)}>
                        Применить
                    </button>
                </div>

                <div className={styles.field}>
                    <button type="button" className={`${styles.button} ${styles.dangerButton}`}
                    onClick={handleClearBackground}>
                        Убрать фон
                    </button>
                </div>
            </div>
        </aside>
    )
}

export { BackgroundPanel }