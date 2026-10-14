import { SlideObject } from "./objects"

type Slide = {
    id: string
    background: Background
    objects: SlideObject[]
}

type Background = SolidBackground | ImageBackground | GradientBackground

type SolidBackground = {
    type: "solid"
    color: string
}

type ImageBackground = {
    type: "image"
    src: string
}

type GradientBackground = {
    type: "gradient"
    colors: string[]
    angle?: number
}

export {
    Slide,
    Background,
    SolidBackground,
    ImageBackground,
    GradientBackground,
}