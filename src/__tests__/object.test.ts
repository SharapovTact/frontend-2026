import {describe, it, expect} from 'vitest';
import {addTextObject} from '../functions/object'
import {generateId} from '../functions/common'
import {slide1, createPresentationWithSlides} from './mock';
import {Presentation} from '../types/presentation'

describe('object actions', () => {
    it('adds text object', () => {
        const slide = slide1

        const updatedSlide = addTextObject(
            slide,
            'text',
            'hello world!',
            {x: 3, y: 3},
            {width: 3, height: 3},
            {family: 'Arial', size: 12, color: 'black'}
        )

        expect(updatedSlide.objects.length).toEqual(slide.objects.length + 1)
        expect(updatedSlide.objects[0]).toMatchObject({
            type: 'text',
            content: 'hello world!',
            position: {x: 3, y: 3},
            size: {width: 3, height: 3},
            font: {family: 'Arial', size: 12, color: 'black'}
        })
    })
})