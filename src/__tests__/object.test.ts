import { describe, it, expect } from 'vitest';
import { addTextObject, addImageObject, removeObject, moveObject, updateTextObjectStyle, resizeObject } from '../functions/object'
import { slide1, createSlideWithObjects } from './mock';
import { Font, ImageObject, TextObject } from '../types/objects';

describe('object actions', () => {
    it('adds text object', () => {
        const slide = slide1
        const originalObjectsOrder = [...slide.objects]

        const updatedSlide = addTextObject(
            slide,
            'textId1',
            'hello world!',
            { x: 3, y: 3 },
            { width: 3, height: 3 },
            { family: 'Arial', size: 12, color: 'black' }
        )
        const addedObject = updatedSlide.objects.find(obj => obj.id === 'textId1') as TextObject

        expect(updatedSlide.objects.length).toEqual(slide.objects.length + 1)
        expect(addedObject.content).toEqual('hello world!')
        expect(addedObject.font).toEqual({ family: 'Arial', size: 12, color: 'black' })
        expect(updatedSlide).not.toBe(slide)
        expect(updatedSlide.objects).not.toBe(slide.objects)
        expect(slide.objects).toEqual(originalObjectsOrder)
    })

    it('adds image object', () => {
        const slide = slide1
        const originalObjectsOrder = [...slide.objects]

        const updatedSlide = addImageObject(
            slide,
            'imageId1',
            'cats.jpg',
            { x: 3, y: 3 },
            { width: 3, height: 3 }
        )
        const addedObject = updatedSlide.objects.find(obj => obj.id === 'imageId1') as ImageObject

        expect(updatedSlide.objects.length).toEqual(slide.objects.length + 1)
        expect(addedObject.src).toEqual('cats.jpg')
        expect(updatedSlide).not.toBe(slide)
        expect(updatedSlide.objects).not.toBe(slide.objects)
        expect(slide.objects).toEqual(originalObjectsOrder)
    })

    it('removes object', () => {
        const slide = createSlideWithObjects()
        const originalObjectsOrder = [...slide.objects]

        const newSlide = removeObject(slide, 'textId1')

        expect(newSlide.objects.find(obj => obj.id == 'textId1')).toBeUndefined()
        expect(newSlide).not.toBe(slide)
        expect(newSlide.objects).not.toBe(slide.objects)
        expect(slide.objects).toEqual(originalObjectsOrder)
    })

    it('moves object', () => {
        const slide = createSlideWithObjects()
        const originalObjectsOrder = [...slide.objects]
        const newPosition = { x: 5, y: 8 }

        const newSlide = moveObject(slide, 'textId1', newPosition)
        const movedObject = newSlide.objects.find(obj => obj.id === 'textId1')

        expect(movedObject?.position).toEqual(newPosition)
        expect(newSlide).not.toBe(slide)
        expect(newSlide.objects).not.toBe(slide.objects)
        expect(slide.objects).toEqual(originalObjectsOrder)
    })

    it('resizes image object', () => {
        const slide = createSlideWithObjects()
        const originalObjectsOrder = [...slide.objects]
        const newSize = { width: 10, height: 10 }

        const newSlide = resizeObject(slide, 'imageId1', newSize)
        const resizedObject = newSlide.objects.find(obj => obj.id === 'imageId1')

        expect(resizedObject?.size).toEqual(newSize)
        expect(newSlide).not.toBe(slide)
        expect(newSlide.objects).not.toBe(slide.objects)
        expect(slide.objects).toEqual(originalObjectsOrder)
    })

    it('updates text style', () => {
        const slide = createSlideWithObjects()
        const originalObjectsOrder = [...slide.objects]
        const newStyle: Font = { family: 'Arial', size: 12, color: 'black' }

        const newSlide = updateTextObjectStyle(slide, 'textId1', newStyle)
        const updatedTextObject = newSlide.objects.find(obj => obj.id === 'textId1') as TextObject

        expect(updatedTextObject.font).toEqual(newStyle)
        expect(newSlide).not.toBe(slide)
        expect(newSlide.objects).not.toBe(slide.objects)
        expect(slide.objects).toEqual(originalObjectsOrder)
    })
})