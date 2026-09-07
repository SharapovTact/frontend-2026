import type { Slide } from "../types/slide";
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