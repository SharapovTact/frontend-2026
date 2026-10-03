import type { Presentation } from '../types/presentation';
import { setPreviewMode } from '../editor';
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
                <button className={styles.button}>
                    + Слайд
                </button>
                <button className={styles.button}>
                    + Текст
                </button>
                <button className={styles.button}>
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