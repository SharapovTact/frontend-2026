import type { Presentation } from '../../types/presentation';
import { createImageObject, createSlide, createTextObject, getState, setPreviewMode } from '../../editor';
import styles from './Toolbar.module.css';

type ToolbarProps = {
    presentation: Presentation;
};

function Toolbar({ presentation }: ToolbarProps) {
    return (
        <header className={styles.toolbar}>
            <div className={styles.title}>
                {presentation.name}
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.button}
                    onClick={createSlide}>
                    + Слайд
                </button>
                <button 
                    className={styles.button}
                    onClick={createTextObject}>
                    + Текст
                </button>
                <button 
                    className={styles.button}
                    onClick={createImageObject}>
                    + Картинка
                </button>
                <button
                    className={`${styles.button} ${styles.primaryButton}`}
                    onClick={() => setPreviewMode(true)}
                >
                    Превью
                </button>
            </div>
        </header>
    );
}

export { Toolbar };