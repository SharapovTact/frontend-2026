type Presentation = {
    id: string,
    name: string,
    slides: Slide[],
}

type Slide = {
    id: string
}

type Position = {
    x: number
    y: number
}

type Size = {
    width: number
    height: number
}

type BaseSlideObject = {
    id: string
    position: Position
    size: Size
}

type SolidBackground = {
    color: string
}

type ImageBackground = {
    src: string
}

type Background = SolidBackground | ImageBackground

type TextObject = {
    value: string
    fontSize: integer
    fontFamily: string
    color: string
}

type ImageObject = BaseSlideObject & {
    src: string
}

type SlideObject = TextObject | ImageObject

export {
    type Presentation,
    type Slide,
    type Background,
    type SlideObject,
    type TextObject,
    type ImageObject,
}