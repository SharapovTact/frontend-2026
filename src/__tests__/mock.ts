import { Presentation } from "../types/presentation";

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

export {
    nullPresentation,
    createPresentationWithSlides,
    slide1,
}