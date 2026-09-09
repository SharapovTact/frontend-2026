import {describe, it, expect} from 'vitest';
import {setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground} from '../functions/background'
import {generateId} from '../functions/common'
import {slide1, createPresentationWithSlides} from './mock';

describe('background actions', () => {
    it('sets colors background action', () => {
        const color: string = 'black'
        
        const changedSlide = setSlideBackgroundColor(slide1, color)

        expect(changedSlide.background.color).toEqual('black')
    })

    it('sets src background action', () => {
        const src: string = 'https://cats.ru/wp-content/uploads/2018/11/cat08.jpg'

        const changedSlide = setSlideBackgroundImage(slide1, src)

        expect(changedSlide.background.src).toEqual(src)
    })

    it('sets gradient background', () => {
        const colors: string[] = ['white', 'gray', 'black']

        const changedSlide = setSlideBackgroundGradient(slide1, colors)

        expect(changedSlide.background.colors).toEqual(colors)
    })

    it('clears background', () => {
        const slide: Slide = slide1

        const changedSlide = clearSlideBackground(slide)

        expect(changedSlide.background.color).toEqual('white')
    })
})