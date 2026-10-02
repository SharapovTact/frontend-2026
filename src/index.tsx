import { createRoot } from 'react-dom/client';
import { App } from './components/App.js';
//import { addEditorChangeHandler } from './editor.js';
import { createTestPresentation } from './data.js';
//import { setInitialState } from './editor.js';

const initialData = createTestPresentation();
//setInitialState(initialData);

const root = createRoot(document.getElementById('root')!);

function renderApp(): void {
  root.render(<App presentation={initialData} />);
}

renderApp();

// addEditorChangeHandler(() => {
//   renderApp();
// });
