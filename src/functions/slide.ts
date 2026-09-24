import type { Presentation } from "../types/presentation";
import { Slide, SolidBackground } from "../types/slide";

function updatePresentationSlides(
    presentation: Presentation, 
    newSlides: Slide[]
): Presentation {
    return {
        ...presentation,
        slides: newSlides,
    }
}

function addSlide(
    presentation: Presentation, 
    id: string
): Presentation {
    const background: SolidBackground = { color: 'white' }
    const slide: Slide = {
        id,
        background,
        objects: [],
    };
    return updatePresentationSlides(presentation, [...(presentation.slides), slide])
}

function removeSlides(
    presentation: Presentation, 
    slideIds: string[]): Presentation {
    return updatePresentationSlides(
        presentation, 
        presentation.slides.filter(slide => !slideIds.includes(slide.id))
    )
}

function moveSlide(
    presentation: Presentation, 
    slideId: string, 
    newIndex: number
): Presentation {
    const slides = structuredClone(presentation.slides)
    const currentIndex = slides.findIndex(slide => slide.id === slideId)

    if (currentIndex == -1) {
        return presentation
    }

    const [movedSlide] = slides.splice(currentIndex, 1);
    slides.splice(newIndex, 0, movedSlide);
    return updatePresentationSlides(presentation, slides)
}

function duplicateSlide(
    presentation: Presentation,
    slideId: string,
    newSlideId: string
): Presentation {
    const slideIndex = presentation.slides.findIndex(
        slide => slide.id === slideId
    );
    if (slideIndex === -1) {
        return presentation;
    }

    const slide = presentation.slides[slideIndex];
    const clonedSlide = structuredClone(slide);
    clonedSlide.id = newSlideId;

    return {
        ...presentation,
        slides: [
            ...presentation.slides.slice(0, slideIndex + 1),
            clonedSlide,
            ...presentation.slides.slice(slideIndex + 1),
        ],
    };
}

export {
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
}