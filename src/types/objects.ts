type SlideObject = TextObject | ImageObject

type TextObject = BaseSlideObject & {
    content: string
    font: Font
    type: 'text'
}

type Font = {
    size: number
    family: string
    color: string
}

type ImageObject = BaseSlideObject & {
    src: string
    type: 'image'
}

type BaseSlideObject = {
    position: Position
    size: Size
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

export {
    TextObject,
    Font,
    ImageObject,
    BaseSlideObject,
    Position,
    Size,
    SlideObject,
}