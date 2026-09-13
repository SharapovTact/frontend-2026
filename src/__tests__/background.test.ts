import { describe, it, expect } from 'vitest';
import { setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground } from '../functions/background'
import { slide1 } from './mock';
import { GradientBackground, ImageBackground, Slide, SolidBackground } from '../types/slide';

describe('background actions', () => {
    it('sets colors background action', () => {
        const color: string = 'black'

        const changedSlide = setSlideBackgroundColor(slide1, color)
        const background = changedSlide.background as SolidBackground

        expect(background.color).toEqual('black')
        expect(changedSlide).not.toBe(slide1)
        expect(slide1.background).not.toBe(changedSlide.background)
    })

    it('sets src background action', () => {
        const src: string = 'https://cats.ru/wp-content/uploads/2018/11/cat08.jpg'

        const changedSlide = setSlideBackgroundImage(slide1, src)
        const background = changedSlide.background as ImageBackground

        expect(background.src).toEqual(src)
        expect(changedSlide).not.toBe(slide1)
        expect(slide1.background).not.toBe(changedSlide.background)
    })

    it('sets gradient background', () => {
        const colors: string[] = ['white', 'gray', 'black']

        const changedSlide = setSlideBackgroundGradient(slide1, colors)
        const background = changedSlide.background as GradientBackground

        expect(background.colors).toEqual(colors)
        expect(changedSlide).not.toBe(slide1)
        expect(background.colors).not.toBe(colors)
    })

    it('clears background', () => {
        const slide: Slide = slide1

        const changedSlide = clearSlideBackground(slide)
        const background = changedSlide.background as SolidBackground

        expect(background.color).toEqual('white')
        expect(changedSlide).not.toBe(slide)
    })
})