import { Presentation } from "../types/presentation"
//Сделать import styles из app.module.css

type AppProps = {
    presentation: Presentation
}

function App({ presentation }: AppProps) {
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export {
    App,
}