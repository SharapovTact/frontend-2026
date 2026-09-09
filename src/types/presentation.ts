type Presentation = {
    id: string,
    name: string,
    slides: Slide[],
}

type Slide = {
    id: string
}

type Background = SolidBackground | ImageBackground

type SolidBackground = {
    color: string
}

type ImageBackground = {
    src: string
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