import {describe, it, expect} from 'vitest';
import {addTextObject, addImageObject, removeObject} from '../functions/object'
import {generateId} from '../functions/common'
import {slide1, createPresentationWithSlides, createSlideWithObjects} from './mock';
import {Presentation} from '../types/presentation'

describe('object actions', () => {
    it('adds text object', () => {
        const slide = slide1

        const updatedSlide = addTextObject(
            slide,
            'textId1',
            'hello world!',
            {x: 3, y: 3},
            {width: 3, height: 3},
            {family: 'Arial', size: 12, color: 'black'}
        )

        expect(updatedSlide.objects.length).toEqual(slide.objects.length + 1)
        expect(updatedSlide.objects[0]).toMatchObject({
            type: 'text',
            id: 'textId1',
            content: 'hello world!',
            position: {x: 3, y: 3},
            size: {width: 3, height: 3},
            font: {family: 'Arial', size: 12, color: 'black'}
        })
    })

    it('adds image object', () => {
        const slide = slide1

        const updatedSlide = addImageObject(
            slide,
            'imageId1',
            'cats.jpg',
            {x: 3, y: 3},
            {width: 3, height: 3}
        )

        expect(updatedSlide.objects.length).toEqual(slide.objects.length + 1)
        expect(updatedSlide.objects[0]).toMatchObject({
            type: 'image',
            id: 'imageId1',
            src: 'cats.jpg',
            position: {x: 3, y: 3},
            size: {width: 3, height: 3},
        })
    })
    it('removes object', () => {
        const slide = createSlideWithObjects()

        const newSlide = removeObject(slide, 'textId1')
        
        expect(newSlide.objects.find(obj => obj.id == 'textId1')).toBeUndefined()
    })
})