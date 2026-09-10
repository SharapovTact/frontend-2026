import {Presentation, Slide} from "../types/presentation"
import {addTextObject} from "../functions/object"

const nullPresentation: Presentation = {
    name: 'test',
    id: '1',
    slides: [],
}

const slide1: Slide = { id: '1', background: {color: 'white'}, objects: [] }
const slide2: Slide = { id: '2', background: {color: 'white'}, objects: [] }
const slide3: Slide = { id: '3', background: {color: 'white'}, objects: [] }


function createPresentationWithSlides(): Presentation {
    return {
        nullPresentation,
        slides: [slide1, slide2, slide3],
    }
}

function createSlideWithObjects(): Slide {
    const slide1: Slide = { id: '1', background: {color: 'white'}, objects: [] }
    const slide2 = addTextObject(
            slide1,
            'textId1',
            'hello world!',
            {x: 3, y: 3},
            {width: 3, height: 3},
            {family: 'Arial', size: 12, color: 'black'}
        )
    const slide3 = addTextObject(
            slide2,
            'textId2',
            'hello world!',
            {x: 4, y: 1},
            {width: 1, height: 1},
            {family: 'Arial', size: 12, color: 'black'}
        )
    return slide3
}

export {
    nullPresentation,
    createPresentationWithSlides,
    createSlideWithObjects,
    slide1,
}