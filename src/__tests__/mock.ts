import { addImageObject, addTextObject } from "../functions/object"
import { Presentation } from "../types/presentation"
import { Slide } from "../types/slide"

const nullPresentation: Presentation = {
    name: 'test',
    id: '1',
    slides: [],
}

const slide1: Slide = { id: '1', background: { color: 'white' }, objects: [] } 
const slide2: Slide = { id: '2', background: { color: 'white' }, objects: [] }
const slide3: Slide = { id: '3', background: { color: 'white' }, objects: [] }

function createEmptySlide(id: string): Slide {
    return { id, background: { color: 'white' }, objects: [] } 
}

function createPresentationWithSlides(): Presentation {
    return {
        ...nullPresentation,
        slides: [slide1, slide2, slide3],
    }
}

function createSlideWithObjects(id: string): Slide {
    const slide1: Slide = { id, background: { color: 'white' }, objects: [] }
    const slide2 = addTextObject(
        slide1,
        'textId1',
        'hello world!',
        { x: 3, y: 3 },
        { width: 3, height: 3 },
        { family: 'Arial', size: 12, color: 'black' }
    )
    const slide3 = addTextObject(
        slide2,
        'textId2',
        'hello world!',
        { x: 4, y: 1 },
        { width: 1, height: 1 },
        { family: 'Arial', size: 12, color: 'black' }
    )
    const slide4 = addImageObject(
        slide3,
        'imageId1',
        'testURL',
        { x: 1, y: 2 },
        { width: 1, height: 1 }
    )
    return slide4
}

export {
    nullPresentation,
    createPresentationWithSlides,
    createSlideWithObjects,
    createEmptySlide,
}