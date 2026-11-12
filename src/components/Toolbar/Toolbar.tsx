import type { Presentation } from '../../types/presentation';
import { createSlide, createTextObject, setPreviewMode } from '../../editor';
import { useAddPicture } from '../Hooks/useAddPicture';
import styles from './Toolbar.module.css';

type ToolbarProps = {
    presentation: Presentation;
}

function Toolbar({ presentation }: ToolbarProps) {
    const { fileInputRef, handleAddPictureClick, handleFileChange } = useAddPicture()

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