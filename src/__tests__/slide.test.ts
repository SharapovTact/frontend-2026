import {describe, it, expect} from 'vitest';
import {addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide} from '../functions/slide'
import {generateId} from '../functions/common'
import {nullPresentation} from './mock';
import {Presentation} from '../types/presentation'

function createTestPresentationWithSlides(slides: Slide[]): Presentation {
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
        const initialPresentation: Presentation = createTestPresentationWithSlides([slide1, slide2, slide3])
        const idsToRemove = ['2', '3']

        const presentation = removeSlides(initialPresentation, idsToRemove)
        
        expect(presentation.slides).toEqual([slide1])
    })

    it('moves slides', () => {
        const slide1: Slide = { id: '1' }
        const slide2: Slide = { id: '2' }
        const slide3: Slide = { id: '3' }
        const initialPresentation: Presentation = createTestPresentationWithSlides([slide1, slide2, slide3])
        const idToMove = '1'
        const newSlidePlace = 2

        const presentation = moveSlide(initialPresentation, idToMove, newSlidePlace)
        
        expect(presentation.slides[0].id).toEqual('2')
        expect(presentation.slides[2].id).toEqual('1')
    })

    it('sets active slide', () => {
        const slide1: Slide = { id: '1' }
        const slide2: Slide = { id: '2' }
        const slide3: Slide = { id: '3' }
        const initialPresentation: Presentation = createTestPresentationWithSlides([slide1, slide2, slide3])

        const presentation = setActiveSlide(initialPresentation, '1', '4')

        expect(presentation.activeSlide).toEqual('1')
    })

    it('duplicates slide', () => {
        const slide1: Slide = { id: '1' }
        const slide2: Slide = { id: '2' }
        const slide3: Slide = { id: '3' }
        const initialPresentation: Presentation = createTestPresentationWithSlides([slide1, slide2, slide3])
        
        const presentation = duplicateSlide(initialPresentation, '1', '4')

        expect(presentation.slides[0].id).toEqual('1')
        expect(presentation.slides[1].id).toEqual('4')
        expect(presentation.slides.length).toEqual(4)
    })
})