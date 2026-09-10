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

function addImageObject(
    slide: Slide, 
    id: string,
    imageUrl: string, 
    position: Position,
    size: Size,
): Slide {
    const newObject: ImageObject = {
        id,
        type: 'image',
        src: imageUrl,
        position,
        size
    }
    return {
        ...slide,
        objects: [...slide.objects, newObject]
    }
}

function removeObject(slide: Slide, objectId: string): Slide {
    const objects = [...slide.objects]
    const currentIndex = objects.findIndex(object => object.id === objectId)

    if (currentIndex == -1) {
        return slide
    }

    const [removedObject] = objects.splice(currentIndex, 1);
    return {
        ...slide,
        objects,
    }
}

export {
    addTextObject,
    addImageObject,
    removeObject,
}