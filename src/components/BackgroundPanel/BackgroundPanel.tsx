import { getActiveSlideID } from '../../editor';
import { Presentation } from '../../types/presentation';
import styles from './BackgroundPanel.module.css';

type BackgroundPanelProps = {
    presentation: Presentation
    selectedIds: string[]
}

function BackgroundPanel({ presentation, selectedIds }: BackgroundPanelProps) {
    const activeSlideID = getActiveSlideID()
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID)

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
                    />
                </div>

                <div className={styles.field}>
                    <button type="button" className={styles.button}>
                        Добавить фоновое изображение
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                    />
                </div>

                <div className={styles.gradient}>
                    <span className={styles.label}>Градиент:</span>
                    <select className={styles.select} defaultValue="linear">
                        <option value="linear">Линейный</option>
                        <option value="radial">Радиальный</option>
                    </select>
                    <input className={styles.colorInput} type="color" defaultValue="#ffffff" />
                    <input className={styles.colorInput} type="color" defaultValue="#000000" />
                    <label className={styles.label}>Угол:</label>
                    <input
                        className={styles.angleInput}
                        type="number"
                        min={0}
                        max={360}
                        defaultValue={180}
                    />
                    <span className={styles.label}>°</span>
                    <button type="button" className={styles.button}>
                        Применить
                    </button>
                </div>

                <div className={styles.field}>
                    <button type="button" className={`${styles.button} ${styles.dangerButton}`}>
                        Убрать фон
                    </button>
                </div>
            </div>
        </aside>
    )
}

export { BackgroundPanel }