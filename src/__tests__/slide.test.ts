import {describe, it, expect} from 'vitest';
import {addSlide, removeSlides} from '../functions/slide'
import {generateId} from '../functions/common'
import {nullPresentation} from './mock';
import {Presentation} from '../types/presentation'

function createTestPresentation(slides: Slide[]): Presentation {
    return {
        nullPresentation,
        slides,
    }
}

describe('slide actions', () => {
    it('adds slide', () => {
        let presentation: Presentation = nullPresentation
        const countSlides = 3;

        presentation = addSlide(presentation, generateId())
        presentation = addSlide(presentation, generateId())
        presentation = addSlide(presentation, generateId())

        expect(presentation.slides.length).toEqual(countSlides)
    })

    it('remove slides', () => {
        const slide1: Slide = { id: '1' }
        const slide2: Slide = { id: '2' }
        const slide3: Slide = { id: '3' }

        const initialPresentation: Presentation = createTestPresentation([slide1, slide2, slide3])
        const idsToRemove = ['2', '3']
        const presentation = removeSlides(initialPresentation, idsToRemove)
        
        expect(presentation.slides).toEqual([slide1])
    })
})