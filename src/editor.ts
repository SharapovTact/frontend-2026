import type { Presentation } from './types/presentation'

let editorChangeHandler: (() => void) | null = null
function addEditorChangeHandler(handler: () => void): void {
  editorChangeHandler = handler
}

function callChangeHandler(): void {
  if (editorChangeHandler) {
    editorChangeHandler()
  }
}

let currentPresentation: Presentation | null = null

type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

let modifierParams: any = null;
function dispatch(modifier: Modifier, params: any = null): void {
  if (!currentPresentation) {
    console.error('State is not initialized! Call setInitialState first.')
    return;
  }

  modifierParams = params
  currentPresentation = modifier(currentPresentation, params)

  callChangeHandler()
}

function setInitialState(presentation: Presentation): void {
  currentPresentation = presentation
}

function getState(): Presentation | null {
  return currentPresentation
}

let isPreviewMode = false
function setPreviewMode(mode: boolean): void {
  isPreviewMode = mode
  callChangeHandler()
}

function getPreviewMode(): boolean {
  return isPreviewMode
}

export { 
  setInitialState, 
  getState, 
  dispatch, 
  addEditorChangeHandler,
  setPreviewMode,
  getPreviewMode,
};
