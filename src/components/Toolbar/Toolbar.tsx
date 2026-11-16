import type { Presentation } from '../../types/presentation';
import { createSlide, createTextObject, setPreviewMode } from '../../editor';
import { usePicture } from '../Hooks/usePicture.tsx';
import styles from './Toolbar.module.css';
import { usePdfExport } from '../Hooks/usePdfExport.tsx';

type ToolbarProps = {
    presentation: Presentation;
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}
function Toolbar({ presentation, canUndo, canRedo, onUndo, onRedo }: ToolbarProps) {
    const { fileInputRef, handleAddPictureClick, handleFileChange } = usePicture()
    const { exportToPdf } = usePdfExport()

    return (
        <header className={styles.toolbar}>
            <div className={styles.title}>
                {presentation.name}
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.button}
                    onClick={onUndo}
                    disabled={!canUndo}>
                    ↩ Отменить
                </button>
                <button
                    className={styles.button}
                    onClick={onRedo}
                    disabled={!canRedo}>
                    ↪ Повторить
                </button>
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
                    onClick={handleAddPictureClick}>
                    + Картинка
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
                <button
                    className={styles.button}
                    onClick={() => exportToPdf(presentation)}>
                    Экспорт PDF
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