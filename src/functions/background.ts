import type { Presentation, Slide, Background } from "../types/presentation";
import  { generateId } from "../functions/common";

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return {
        ...slide, 
        background: { color },
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return {
        ...slide,
        background: { src: imageUrl },
    }
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {
    return {
        ...slide,
        background: {colors, angle }
    }
}

function clearSlideBackground(slide: Slide): Slide {
    return {
        ...slide,
        background: { color: 'white' }
    }
}

export {
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground,
}