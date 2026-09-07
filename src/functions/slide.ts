import type { Slide } from "../types/presentation";
import type { Presentation } from "../types/presentation";
import  { generateId } from "../functions/common";

function addSlide(presentation: Presentation): Presentation {
    const slide: Slide = {
        id: generateId(),
    };

    let slides: Slide[]
    slides = [...(presentation.slides), slide]

    return {
        ...presentation,
        slides,
    }
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    let newSlides: Slide[] = [...presentation.slides]
    for (let i = newSlides.length - 1; i >= 0; i--) {
        if (slideIds.includes(newSlides[i].id)) {
            newSlides = newSlides.toSpliced(i, 1);
        }
    }
    return {
        ...presentation,
        slides: newSlides
    }
}

export {
    addSlide,
    removeSlides,
}