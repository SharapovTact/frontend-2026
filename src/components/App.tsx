import styles from "./App.module.css";

import { getPreviewMode, setPreviewMode } from "../editor"
import { Presentation } from "../types/presentation"
import { PreviewOverlay } from "./PreviewOverlay"
import { SlideList } from "./SlideList"
import { Toolbar } from "./Toolbar"
import { Workspace } from "./Workspace"

type AppProps = {
    presentation: Presentation
}

function App({ presentation }: AppProps) {
    if (getPreviewMode()) {
        return (
            <PreviewOverlay
                presentation={presentation}
                onClose={() => setPreviewMode(false)}
            />
        )
    }
    return (
        <div className={styles.appContainer}>
            <Toolbar presentation={presentation} />
            <div className={styles.mainArea}>
                <SlideList presentation={presentation} />
                <Workspace presentation={presentation} />
            </div>
        </div>
    );
}

export {
    App,
}