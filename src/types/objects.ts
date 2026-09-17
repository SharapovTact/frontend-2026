type SlideObject = TextObject | ImageObject

type TextPropeties = {
    content: string,
    position: Position,
    size: Size,
    font: Font
}

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

type ImagePropeties = {
    src: string,
    position: Position,
    size: Size,
}

type ImageObject = BaseSlideObject & {
    src: string
    type: 'image'
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
    TextPropeties,
    ImagePropeties,
}