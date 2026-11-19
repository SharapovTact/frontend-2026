import { Slide } from "../types/slide"

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return {
        ...slide,
        background: {type: 'solid', color },
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return {
        ...slide,
        background: {type: 'image', src: imageUrl },
    }
}

function setSlideBackgroundGradient(
    slide: Slide,
    colors: string[],
    angle?: number,
    gradientType?: 'linear' | 'radial',
): Slide {
    return {
        ...slide,
        background: { type: 'gradient', colors: [...colors], angle, gradientType }
    }
}

function clearSlideBackground(slide: Slide): Slide {
    return {
        ...slide,
        background: {type: 'solid', color: 'white' }
    }
}

export {
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground,
}