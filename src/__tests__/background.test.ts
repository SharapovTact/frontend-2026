import {describe, it, expect} from 'vitest';
import {setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground} from '../functions/background'
import {generateId} from '../functions/common'
import {slide1, createPresentationWithSlides} from './mock';
import {SolidBackground, ImageBackground, GradientBackground, Slide} from '../types/presentation'

describe('background actions', () => {
    it('sets colors background action', () => {
        const color: string = 'black'
        
        const changedSlide = setSlideBackgroundColor(slide1, color)
        const background = changedSlide.background as SolidBackground

        expect(background.color).toEqual('black')
    })

    it('sets src background action', () => {
        const src: string = 'https://cats.ru/wp-content/uploads/2018/11/cat08.jpg'

        const changedSlide = setSlideBackgroundImage(slide1, src)
        const background = changedSlide.background as ImageBackground

        expect(background.src).toEqual(src)
    })

    it('sets gradient background', () => {
        const colors: string[] = ['white', 'gray', 'black']

        const changedSlide = setSlideBackgroundGradient(slide1, colors)
        const background = changedSlide.background as GradientBackground

        expect(background.colors).toEqual(colors)
    })

    it('clears background', () => {
        const slide: Slide = slide1

        const changedSlide = clearSlideBackground(slide)
        const background = changedSlide.background as SolidBackground

        expect(background.color).toEqual('white')
    })
})