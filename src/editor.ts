import { createTestPresentation } from './data'
import { generateId } from './functions/common'
import { addImageObject } from './functions/object'
import { addSlide } from './functions/slide'
import { ImageObject, SlideObject, TextObject } from './types/objects'
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

const defaultPresentation: Presentation = createTestPresentation()

type ViewModel = {
  isPreviewMode: boolean
  activeSlideID: string
  presentation: Presentation
}

let viewModel: ViewModel = {
  isPreviewMode: false,
  activeSlideID: '1',
  presentation: defaultPresentation,
}

type ViewModelModifier = (prev: ViewModel) => Partial<ViewModel>

function dispatch(modifier: ViewModelModifier): void {
  const updates = modifier(viewModel)
  viewModel = { ...viewModel, ...updates }
  callChangeHandler()
}

function setInitialState(presentation: Presentation): void {
  dispatch(() => ({
    presentation,
    activeSlideID: presentation.slides[0]?.id ?? '1',
  }))
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

function createSlide(): void {
  dispatch((prev) => ({
    presentation: addSlide(prev.presentation, generateId()),
  }))
}

function createImageObject(): void {
  dispatch((prev) => {
    const newImage: ImageObject = {
      id: generateId(),
      type: 'image',
      src: 'https://img.magnific.com/free-photo/close-up-adorable-kitten-looking-up_23-2150782225.jpg?semt=ais_incoming&w=740&q=80',
      position: { x: 100, y: 100 },
      size: { width: 300, height: 300 },
    }

    const updatedSlides = prev.presentation.slides.map((slide) => {
      if (slide.id === prev.activeSlideID) {
        return {
          ...slide,
          objects: [...slide.objects, newImage],
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
  createImageObject,
  createTextObject,
}