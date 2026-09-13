import type { Presentation } from "../types/presentation";
import { Slide, SolidBackground } from "../types/slide";

function updatePresentationSlides(presentation: Presentation, newSlides: Slide[]): Presentation {
    return {
        ...presentation,
        slides: newSlides,
    }
}

function addSlide(presentation: Presentation, id: string): Presentation {
    const background: SolidBackground = { color: 'white' }
    const slide: Slide = {
        id,
        background,
        objects: [],
    };
    return updatePresentationSlides(presentation, [...(presentation.slides), slide])
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    return updatePresentationSlides(presentation, presentation.slides.filter(slide => !slideIds.includes(slide.id)))
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    const slides = [...presentation.slides]
    const currentIndex = slides.findIndex(slide => slide.id === slideId)

    if (currentIndex == -1) {
        return presentation
    }

    const [movedSlide] = slides.splice(currentIndex, 1);
    slides.splice(newIndex, 0, movedSlide);
    return updatePresentationSlides(presentation, slides)
}

function setActiveSlide(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        activeSlide: slideId,
    }
}

function duplicateSlide(
    presentation: Presentation,
    slideId: string,
    newSlideId: string
): Presentation {
    let isModified = false
    const updatedSlides = presentation.slides.reduce<Slide[]>((acc, slide) => {
        if (slide.id === slideId) {
            isModified = true
            const duplicatedSlide = {
                ...structuredClone(slide),
                id: newSlideId,
            }
            acc.push(slide, duplicatedSlide)
        } else {
            acc.push(slide)
        }

        return acc
    }, [])
    if (!isModified) {
        return presentation
    }

    return updatePresentationSlides(presentation, updatedSlides)
}

export {
    addSlide,
    removeSlides,
    moveSlide,
    setActiveSlide,
    duplicateSlide,
}