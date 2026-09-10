import {describe, it, expect} from 'vitest';
import {addTextObject, addImageObject, removeObject, moveObject, updateTextObjectStyle, resizeObject} from '../functions/object'
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
        expect(updatedSlide.objects[0]).toMatchObject({ // TODO чем отличается toMatchObject от toEqual
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

        const newSlide = removeObject(slide, 'textId1') //TODO проверить что у оригинального слайда объектов не убавилось
        
        expect(newSlide.objects.find(obj => obj.id == 'textId1')).toBeUndefined()
    })
    it('moves object', () => {
        const slide = createSlideWithObjects()
        const newPosition = {x: 5, y: 8}

        const newSlide = moveObject(slide, 'textId1', newPosition)

        expect(newSlide.objects[0].position).toEqual(newPosition)
    })
    
    it('resizes object', () => {
        const slide = createSlideWithObjects()
        const newSize = {width: 3, height: 3}

        const newSlide = updateTextObjectStyle(slide, 'textId1', newSize)

        expect(newSlide.objects[0].size).toEqual(newSize)
    })

    it('updates text style', () => {
        const slide = createSlideWithObjects()
        const newStyle = {family: 'Arial', size: 12, color: 'black'}

        const newSlide = updateTextObjectStyle(slide, 'textId1', newStyle)

        expect(newSlide.objects[0].font).toEqual(newStyle)
    })
})