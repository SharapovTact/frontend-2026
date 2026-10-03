import { SlideObject } from "./objects"

type Slide = {
    id: string
    background: Background
    objects: SlideObject[]
}

type Background = SolidBackground | ImageBackground | GradientBackground

type SolidBackground = {
    color: string
}

type ImageBackground = {
    src: string
}

type GradientBackground = {
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