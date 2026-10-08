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

type ViewModel = {
  isPreviewMode: boolean
  activeSlideID: string
}

let viewModel: ViewModel = {
  isPreviewMode: false,
  activeSlideID: '1',
}
//viewModel - объект с промежуточными данными 
//Сделать с viewModel переключение слайдов, создание объектов

function getPreviewMode(): boolean {
  return viewModel.isPreviewMode
}

function setPreviewMode(state: boolean) {
  viewModel.isPreviewMode = state
  callChangeHandler() //TODO придумать так, чтобы не было этой функции
}// TODO может расширить диспатч или создать аналог

function getActiveSlideID(): string {
  return viewModel.activeSlideID
}

function setActiveSlideID(slideId: string) {
  viewModel.activeSlideID = slideId
  callChangeHandler()
}

//TODO доделать создание слайда
function createSlide(presentation: Presentation) { 
  //presentation.slides.append(createEmptySlide())
}

//TODO сделать создание текста (хардкод)
//TODO сделать создание картинки (харкод)

export { 
  setInitialState, 
  getState, 
  dispatch, 
  addEditorChangeHandler,

  setPreviewMode,
  getPreviewMode,
  setActiveSlideID,
  getActiveSlideID,

};
