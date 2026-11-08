import { getActiveSlideID } from '../../editor';
import { Presentation } from '../../types/presentation';
import { useSelect } from '../Hooks/useSelect';
import styles from './TextStylePanel.module.css';

type TextStylePanelProps = {
    presentation: Presentation;
}

function TextStylePanel({presentation}: TextStylePanelProps) {
    const activeSlideID = getActiveSlideID();
    const activeSlide = presentation.slides.find(s => s.id === activeSlideID)

    const { selectedIds } = useSelect({
        activeSlide
    })

    if (true) { //selectedIds.length == 1
        return (
            <aside className={styles.panel}>
                <div className={styles.field}>
                    <label className={styles.label}>Шрифт:</label>
                    <select className={styles.select} defaultValue="Arial">
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
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
                            defaultValue={16}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Цвет:</label>
                    <input
                        className={styles.colorInput}
                        type="color"
                        defaultValue="#000000"
                    />
                </div>
            </aside>
        )
    }
    
}

export { TextStylePanel };