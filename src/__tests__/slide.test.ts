import { describe, it, expect } from 'vitest';
import { addSlide, removeSlides, moveSlide, duplicateSlide } from '../functions/slide'
import { generateId } from '../functions/common'
import { nullPresentation, createPresentationWithSlides } from './mock';
import { Presentation } from '../types/presentation';
import { Slide } from '../types/slide';

describe('slide actions', () => {
    it('add slides', () => {
        const initialPresentation: Presentation = nullPresentation
        const countSlides = 3;
        const originalSlidesOrder = [...initialPresentation.slides]

        let presentation = addSlide(initialPresentation, generateId())
        presentation = addSlide(presentation, generateId())
        presentation = addSlide(presentation, generateId())

        expect(presentation.slides.length).toEqual(countSlides)
        expect(presentation).not.toBe(initialPresentation)
        expect(presentation.slides).not.toBe(initialPresentation.slides)
        expect(initialPresentation.slides).toEqual(originalSlidesOrder)
    })

    it('remove slides', () => {
        const initialPresentation: Presentation = createPresentationWithSlides()
        const originalSlidesOrder = [...initialPresentation.slides]
        const slide: Slide = initialPresentation.slides[0]
        const idsToRemove = ['2', '3']

        const presentation = removeSlides(initialPresentation, idsToRemove)

        expect(presentation.slides).toEqual([slide])
        expect(presentation).not.toBe(initialPresentation)
        expect(presentation.slides).not.toBe(initialPresentation.slides)
        expect(initialPresentation.slides).toEqual(originalSlidesOrder)
    })

    it('moves slides', () => {
        const initialPresentation: Presentation = createPresentationWithSlides()
        const originalSlidesOrder = [...initialPresentation.slides]
        const idToMove = '1'
        const newSlidePlace = 2

        const presentation = moveSlide(initialPresentation, idToMove, newSlidePlace)

        expect(presentation.slides[0].id).toEqual('2')
        expect(presentation.slides[2].id).toEqual('1')
        expect(presentation).not.toBe(initialPresentation)
        expect(presentation.slides).not.toBe(initialPresentation.slides)
        expect(initialPresentation.slides).toEqual(originalSlidesOrder)
    })

    it('duplicates slide', () => {
        const initialPresentation: Presentation = createPresentationWithSlides()
        const originalSlidesOrder = [...initialPresentation.slides]

        const presentation = duplicateSlide(initialPresentation, '1', '4')

        expect(presentation.slides[0].id).toEqual('1')
        expect(presentation.slides[1].id).toEqual('4')
        expect(presentation.slides.length).toEqual(4)
        expect(presentation).not.toBe(initialPresentation)
        expect(presentation.slides).not.toBe(initialPresentation.slides)
        expect(initialPresentation.slides).toEqual(originalSlidesOrder)
    })
})