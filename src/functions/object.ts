import { Font, ImageObject, ImagePropeties, Position, Size, SlideObject, TextObject, TextPropeties } from "../types/objects";
import { Slide } from "../types/slide";

function addObjectToSlide(slide: Slide, newObject: SlideObject): Slide {
    return {
        ...slide,
        objects: [...slide.objects, newObject]
    }
}

function updateSlideObjects(slide: Slide, newObjects: SlideObject[]): Slide {
    return {
        ...slide,
        objects: newObjects,
    }
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

function removeObject(slide: Slide, objectId: string): Slide {
    const filteredObjects = slide.objects.filter(object => object.id !== objectId)

    if (filteredObjects.length === slide.objects.length) {
        return slide
    }

    return updateSlideObjects(slide, filteredObjects)
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

    return updateSlideObjects(slide, updatedObjects)
}


function resizeObject(slide: Slide, objectId: string, size: Size): Slide {
    let isModified = false
    const updatedObjects = slide.objects.map(object => {
        if (object.id === objectId && (object.type === 'image' || object.type === 'text')) {
            isModified = true
            return { ...object, size }
        }
        return object
    })

    if (!isModified) {
        return slide
    }

    return updateSlideObjects(slide, updatedObjects)
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

    return updateSlideObjects(slide, updatedObjects)
}

export {
    addTextObject,
    addImageObject,
    removeObject,
    moveObject,
    updateTextObjectStyle,
    resizeObject,
}