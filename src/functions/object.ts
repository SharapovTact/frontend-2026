import { Font, ImageObject, Position, Size, TextObject } from "../types/objects";
import { Slide } from "../types/slide";

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
        objects: [...slide.objects, newObject] //TODO вынести в функцию. 
        // TODO вынести добавление базового объекта на слайд
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
    const filteredObjects = slide.objects.filter(object => object.id !== objectId)

    if (filteredObjects.length === slide.objects.length) {
        return slide
    }

    return {
        ...slide,
        objects: filteredObjects,
    }
}

function moveObject(
    slide: Slide, 
    objectId: string, 
    position: Position
): Slide {
    let isModified = false;
    const updatedObjects = slide.objects.map(object => {
        if (object.id === objectId) {
            isModified = true
            return { ...object, position }
        }
        return object
    })

    if (!isModified) {
        return slide
    }

    return {
        ...slide,
        objects: updatedObjects
    }
}


function resizeObject(slide: Slide, objectId: string, size: Size): Slide {
    let isModified = false
    const updatedObjects = slide.objects.map(object => {
        if (object.id === objectId && object.type === 'image') {
            isModified = true
            return { ...object, size }
        }
        return object
    })

    if (!isModified) {
        return slide
    }

    return {
        ...slide,
        objects: updatedObjects
    }
}

function updateTextObjectStyle(
    slide: Slide, 
    objectId: string, 
    font: Font
): Slide {
    let isModified = false
    const updatedObjects = slide.objects.map(object => {
        if (object.id === objectId && object.type === 'text') {
            isModified = true
            return { ...object, font }
        }
        return object;
    })

    if (!isModified) {
        return slide;
    }

    return {
        ...slide,
        objects: updatedObjects
    }
}

export {
    addTextObject,
    addImageObject,
    removeObject,
    moveObject,
    updateTextObjectStyle,
    resizeObject,
}