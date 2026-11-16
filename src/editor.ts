import { createTestPresentation } from './data'
import { generateId } from './functions/common'
import { addImageObject } from './functions/object'
import { addSlide } from './functions/slide'
import { ImageObject, SlideObject, TextObject } from './types/objects'
import type { Presentation } from './types/presentation'
import { Slide } from './types/slide'

const editorChangeHandlers = new Set<() => void>()

function addEditorChangeHandler(handler: () => void): () => void {
  editorChangeHandlers.add(handler)
  return () => {
    editorChangeHandlers.delete(handler)
  }
}

function callChangeHandler(): void {
  editorChangeHandlers.forEach((handler) => handler())
}

const defaultPresentation: Presentation = createTestPresentation()

type ViewModel = {
  isPreviewMode: boolean
  isWrapping: boolean
  activeSlideID: string
  selectedSlideObjectsIds: string[]
  presentation: Presentation
}

let viewModel: ViewModel = {
  isPreviewMode: false,
  isWrapping: false,
  selectedSlideObjectsIds: [],
  activeSlideID: '1',
  presentation: defaultPresentation,
}

let past: Presentation[] = []
let future: Presentation[] = []

type ViewModelModifier = (prev: ViewModel) => Partial<ViewModel>

function dispatch(modifier: ViewModelModifier): void {
  const updates = modifier(viewModel)
  const prevPresentation = viewModel.presentation

  const presentationChanged = (updates.presentation !== undefined) && (updates.presentation !== prevPresentation)
  if (presentationChanged) {
    past = [...past, prevPresentation]
    future = []
  }

  viewModel = { ...viewModel, ...updates }
  callChangeHandler()
}

function setInitialState(presentation: Presentation): void {
  const updates: Partial<ViewModel> = {
    presentation,
    activeSlideID: presentation.slides[0]?.id ?? '1',
  }
  past = []
  future = []
  viewModel = { ...viewModel, ...updates }
  callChangeHandler()
}

function syncViewWithPresentation(presentation: Presentation): Partial<ViewModel> {
  const activeSlide = presentation.slides.find(s => s.id === viewModel.activeSlideID) ?? presentation.slides[0]

  if (!activeSlide) {
    return { presentation, activeSlideID: '', selectedSlideObjectsIds: [] }
  }

  const selectedSlideObjectsIds = viewModel.selectedSlideObjectsIds.filter(id =>
    activeSlide.objects.find(obj => obj.id === id) !== undefined
  )

  return { presentation, activeSlideID: activeSlide.id, selectedSlideObjectsIds }
}

function undo(): void {
  if (past.length === 0) return
  future = [viewModel.presentation, ...future]
  const previous = past[past.length - 1]
  past = past.slice(0, -1)
  viewModel = { ...viewModel, ...syncViewWithPresentation(previous) }
  callChangeHandler()
}

function redo(): void {
  if (future.length === 0) return
  past = [...past, viewModel.presentation]
  const next = future[0]
  future = future.slice(1)
  viewModel = { ...viewModel, ...syncViewWithPresentation(next) }
  callChangeHandler()
}

function getCanUndo(): boolean {
  return past.length > 0
}

function getCanRedo(): boolean {
  return future.length > 0
}

function getState(): Presentation {
  return viewModel.presentation
}

function getPreviewMode(): boolean {
  return viewModel.isPreviewMode
}

function setPreviewMode(state: boolean): void {
  dispatch(() => ({ isPreviewMode: state }))
}

function getActiveSlideID(): string {
  return viewModel.activeSlideID
}

function setActiveSlideID(slideId: string): void {
  dispatch(() => ({ activeSlideID: slideId }))
}

function getWrapperState(): boolean {
  return viewModel.isWrapping
}
function setWrapperState(isWrapping: boolean): void {
  dispatch(() => ({ isWrapping }))
}

function getSelectedSlideObjectsIds(): string[] {
  return viewModel.selectedSlideObjectsIds
}
function setSelectedSlideObjectsIds(selectedSlideObjectsIds: string[]): void {
  dispatch(() => ({ selectedSlideObjectsIds: selectedSlideObjectsIds }))
}

function createSlide(): void {
  dispatch((prev) => ({
    presentation: addSlide(prev.presentation, generateId()),
  }))
}

function createTextObject(): void {
  dispatch((prev) => {
    const newText: TextObject = {
      id: generateId(),
      type: 'text',
      content: 'Новый текст',
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 },
      font: {
        size: 24,
        family: 'Arial',
        color: '#000000',
      },
    }

    const updatedSlides = prev.presentation.slides.map((slide) => {
      if (slide.id === prev.activeSlideID) {
        return {
          ...slide,
          objects: [...slide.objects, newText],
        }
      }
      return slide
    })

    return {
      presentation: {
        ...prev.presentation,
        slides: updatedSlides,
      },
    }
  })
}

export {
  setInitialState,
  getState,
  dispatch,
  addEditorChangeHandler,
  setPreviewMode,
  getPreviewMode,
  setActiveSlideID,
  getActiveSlideID,
  createSlide,
  createTextObject,
  getWrapperState,
  setWrapperState,
  getSelectedSlideObjectsIds,
  setSelectedSlideObjectsIds,
  undo,
  redo,
  getCanUndo,
  getCanRedo,
}