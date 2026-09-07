import {describe, it, expect} from 'vitest';
import {addSlide, removeSlides} from '../functions/slide'
import {nullPresentation} from '../functions/mock'
import {Presentation} from '../types/presentation'

describe('slide actions', () => {
    it('add slide', () => {
        let presentation: Presentation = nullPresentation
        const countSlides = 3;

        for (let i = 0; i < countSlides; i++) {
            presentation = addSlide(presentation)
        }

        expect(presentation.slides.length).toEqual(countSlides)
    })

    it('remove slides', () => {
        const slide1: Slide = { id: '1' };
        const slide2: Slide = { id: '2' };
        const slide3: Slide = { id: '3' };

        const initialPresentation: Presentation = {
            ...nullPresentation,
            slides: [slide1, slide2, slide3],
        };
        const idsToRemove = ['2', '3']
        const presentation = removeSlides(initialPresentation, idsToRemove)
        
        expect(presentation.slides).toEqual([slide1])
    })
})