import type { Slide } from "../types/presentation";
import type { Presentation } from "../types/presentation";
import  { generateId } from "../functions/common";

function addSlide(presentation: Presentation, id: string): Presentation {
    const slide: Slide = {
        id,
    };
    return {
        ...presentation,
        slides: [...(presentation.slides), slide],
    }
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.filter(slide => !slideIds.includes(slide.id))
    }
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    const slides = [...presentation.slides]
    const currentIndex = slides.findIndex(slide => slide.id === slideId)

    if (currentIndex == -1) {
        return presentation
    }

    const [movedSlide] = slides.splice(currentIndex, 1);
    slides.splice(newIndex, 0, movedSlide);
    return {
        ...presentation,
        slides,
    }
}

export {
    addSlide,
    removeSlides,
    moveSlide,
}