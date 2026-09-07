type Point = {
    x: number,
    y: number,
}

type SlideObject = {
    id: string,
    position: Point,
    type: 'figure' | 'image' | 'text'
}

type Figure = SlideObject & {
    type: 'figure',
    figureType: 'triangle' | 'circle',
    color: string,
}

type Circle = Figure & {
    figure: 'circle',
    radius: number,
}

export {
    type SlideObject,
}