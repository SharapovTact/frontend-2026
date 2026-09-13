import { Slide } from "./slide"

type Presentation = {
    id: string,
    name: string,
    slides: Slide[],
    activeSlide?: string,
}

export {
    type Presentation,
}