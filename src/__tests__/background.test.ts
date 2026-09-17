import { describe, it, expect } from 'vitest';
import { setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground } from '../functions/background'
import { createEmptySlide } from './mock';
import { GradientBackground, ImageBackground, Slide, SolidBackground } from '../types/slide';

describe('background actions', () => {
    it('sets colors background action', () => {
        const color: string = 'black'
        const slide = createEmptySlide('1')

        const changedSlide = setSlideBackgroundColor(slide, color)
        const background = changedSlide.background as SolidBackground

        expect(background.color).toEqual('black')
        expect(changedSlide).not.toBe(slide)
        expect(slide.background).not.toBe(changedSlide.background)
    })

    it('sets src background action', () => {
        const src: string = 'https://cats.ru/wp-content/uploads/2018/11/cat08.jpg'
        const slide = createEmptySlide('1')

        const changedSlide = setSlideBackgroundImage(slide, src)
        const background = changedSlide.background as ImageBackground

        expect(background.src).toEqual(src)
        expect(changedSlide).not.toBe(slide)
        expect(slide.background).not.toBe(changedSlide.background)
    })

    it('sets gradient background', () => {
        const colors: string[] = ['white', 'gray', 'black']
        const slide = createEmptySlide('1')

        const changedSlide = setSlideBackgroundGradient(slide, colors)
        const background = changedSlide.background as GradientBackground

        expect(background.colors).toEqual(colors)
        expect(changedSlide).not.toBe(slide)
        expect(background.colors).not.toBe(colors)
    })

    it('clears background', () => {
        const slide = createEmptySlide('1')

        const changedSlide = clearSlideBackground(slide)
        const background = changedSlide.background as SolidBackground

        expect(background.color).toEqual('white')
        expect(changedSlide).not.toBe(slide)
    })
})