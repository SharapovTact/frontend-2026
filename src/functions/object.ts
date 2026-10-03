import { Font, ImageObject, Position, Size, SlideObject, TextObject } from "../types/objects";
import { Slide } from "../types/slide";

function addObjectToSlide(
    slide: Slide, 
    newObject: SlideObject
): Slide {
    return {
        ...slide,
        objects: [...slide.objects, newObject]
    }
}

function updateSlideObjects(
    slide: Slide, 
    newObjects: SlideObject[]
): Slide {
    return {
        ...slide,
        objects: newObjects,
    }
}

type TextPropeties = {
    content: string,
    position: Position,
    size: Size,
    font: Font
}

type ImagePropeties = {
    src: string,
    position: Position,
    size: Size,
}

function addTextObject(
    slide: Slide,
    id: string,
    textPropeties: TextPropeties,
): Slide {
    const newObject: TextObject = {
        id,
        type: 'text',
        content: textPropeties.content,
        position: textPropeties.position,
        size: textPropeties.size,
        font: textPropeties.font
    }
    return addObjectToSlide(slide, newObject)
}

function addImageObject(
    slide: Slide,
    id: string,
    imagePropeties: ImagePropeties
): Slide {
    const newObject: ImageObject = {
        id,
        type: 'image',
        src: imagePropeties.src,
        position: imagePropeties.position,
        size: imagePropeties.size
    }
    return addObjectToSlide(slide, newObject)
}

function removeObject(
    slide: Slide, 
    objectId: string
): Slide {
    const filteredObjects = slide.objects.filter(object => object.id !== objectId)

    if (filteredObjects.length === slide.objects.length) {
        return slide
    }

    return updateSlideObjects(slide, filteredObjects)
}

function updateObjectProperty<T extends SlideObject>(
    slide: Slide,
    objectId: string,
    newProperties: Partial<T>
): Slide {
    let isModified = false;

    const updatedObjects = slide.objects.map(object => {
        if (object.id === objectId) {
            isModified = true
            return { ...object, ...newProperties }
        }
        return object
    })

    if (!isModified) {
        return slide
    }

    return updateSlideObjects(slide, updatedObjects)
}

function moveObject(
    slide: Slide, 
    objectId: string, 
    position: Position
): Slide {
    return updateObjectProperty(slide, objectId, { position });
}

function resizeObject(
    slide: Slide, 
    objectId: string, 
    size: Size
): Slide {
    return updateObjectProperty(slide, objectId, { size });
}

function updateTextObjectStyle(
    slide: Slide, 
    objectId: string, 
    font: Font
): Slide {
    return updateObjectProperty<TextObject>(slide, objectId, { font });
}

export {
    addTextObject,
    addImageObject,
    removeObject,
    moveObject,
    updateTextObjectStyle,
    resizeObject,
}