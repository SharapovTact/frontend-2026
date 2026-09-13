type SlideObject = TextObject | ImageObject

type TextObject = BaseSlideObject & {
    content: string
    font: Font
}

type Font = {
    size: number
    family: string
    color: string
}

type ImageObject = BaseSlideObject & {
    src: string
}

type BaseSlideObject = Object & {
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
    id: string
    type: string
}

export {
    TextObject,
    Font,
    ImageObject,
    BaseSlideObject,
    Position,
    Size,
    Object,
    SlideObject,
}