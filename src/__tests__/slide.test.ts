import {describe, it, expect} from 'vitest';
import {addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide} from '../functions/slide'
import {generateId} from '../functions/common'
import {nullPresentation, createPresentationWithSlides} from './mock';
import {Presentation} from '../types/presentation'


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
        const initialPresentation: Presentation = createPresentationWithSlides()
        const slide: Slide = initialPresentation.slides[0]
        const idsToRemove = ['2', '3']

        const presentation = removeSlides(initialPresentation, idsToRemove)
        
        expect(presentation.slides).toEqual([slide])
    })

    it('moves slides', () => {
        const initialPresentation: Presentation = createPresentationWithSlides()
        const idToMove = '1'
        const newSlidePlace = 2

        const presentation = moveSlide(initialPresentation, idToMove, newSlidePlace)
        
        expect(presentation.slides[0].id).toEqual('2')
        expect(presentation.slides[2].id).toEqual('1')
    })

    it('sets active slide', () => {
        const initialPresentation: Presentation = createPresentationWithSlides()

        const presentation = setActiveSlide(initialPresentation, '1', '4')

        expect(presentation.activeSlide).toEqual('1')
    })

    it('duplicates slide', () => {
        const initialPresentation: Presentation = createPresentationWithSlides()
        
        const presentation = duplicateSlide(initialPresentation, '1', '4')

        expect(presentation.slides[0].id).toEqual('1')
        expect(presentation.slides[1].id).toEqual('4')
        expect(presentation.slides.length).toEqual(4)
    })
})