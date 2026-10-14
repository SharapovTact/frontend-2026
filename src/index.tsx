import './index.css';

import { createRoot } from 'react-dom/client';
import { App } from './components/App/App.js';
import { addEditorChangeHandler, getState } from './editor.js';
import { createTestPresentation } from './data.js';
import { setInitialState } from './editor.js';

const initialData = createTestPresentation();
setInitialState(initialData);

const root = createRoot(document.getElementById('root')!);
function renderApp(): void {
  const currentPresentation = getState();
  if (currentPresentation) {
    root.render(<App presentation={currentPresentation} />);
  }
}

renderApp();

addEditorChangeHandler(() => {
  renderApp();
});
