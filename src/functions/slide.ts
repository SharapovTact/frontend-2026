import type { Slide } from "../types/slide.js";
import type { Presentation } from "../types/presentation.js";
import  { generateId } from "../functions/common.js";


function addSlide(presentation: Presentation, slideName?: string): Presentation {
    const slide: Slide = {
        id: generateId(),
        name: slideName || 'New slide',
    };

    let slides: Slide[]
    if (presentation.slides) {
        slides = [...(presentation.slides), slide]
    }
    else {
        slides = [slide]
    }

    return {
        ...presentation,
        slides,
    }

}