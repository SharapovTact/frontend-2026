type Presentation = {
    id: string,
    name: string,
    slides: Slide[],
    activeSlide?: string,
}

type Slide = {
    id: string
    background: Background
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

type SlideObject = TextObject | ImageObject

type TextObject = Object & {
    value: string
    fontSize: integer
    fontFamily: string
    color: string
}

type ImageObject = BaseSlideObject & {
    src: string
}

type BaseSlideObject = Object &{
    id: string
    position: Position
    size: Size
}

type Position = {
    x: number
    y: number
}

type Size = {
    width: number
    height: number
}

type Object = {
}

export {
    type Presentation,
    type Slide,
    type Background,
    type SlideObject,
    type TextObject,
    type ImageObject,
}