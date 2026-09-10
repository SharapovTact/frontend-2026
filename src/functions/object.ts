import type { Presentation, Slide, Background, Position, Size, Font } from "../types/presentation";
import  { generateId } from "../functions/common";

function addTextObject(
    slide: Slide, 
    id: string,
    content: string, 
    position: Position, 
    size: Size,
    font: Font
): Slide {
    const newObject: TextObject = {
        id,
        type: 'text',
        content,
        position,
        size,
        font
    }
    return {
        ...slide,
        objects: [...slide.objects, newObject]
    }
}

export {
    addTextObject,
}