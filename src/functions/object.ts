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
    const objects = [...slide.objects]
    const currentIndex = objects.findIndex(object => object.id === objectId)

    if (currentIndex == -1) {
        return slide
    }

    const removedObject = objects.splice(currentIndex, 1); //TODO зачем третий параметр сплайсу
    // TODO сделать удаление через фильтр
    return {
        ...slide,
        objects,
    }
}

function moveObject(
    slide: Slide, 
    objectId: string, 
    position: Position
): Slide {
    const objects = [...slide.objects]
    const currentIndex = objects.findIndex(object => object.id === objectId)

    if (currentIndex == -1) {
        return slide
    }

    objects[currentIndex] = {
        ...objects[currentIndex],
        position
    }

    return {
        ...slide,
        objects
    }
}

function resizeObject(
    slide: Slide,
    objectId: string, 
    size: Size
): Slide {
    const objects = [...slide.objects]
    const currentIndex = objects.findIndex(object => object.id === objectId) //TODO сделать через map, а не через поиск индекса

    if (currentIndex == -1 || objects[currentIndex].type != 'image') {
        return slide
    }

    objects[currentIndex] = {
        ...objects[currentIndex],
        size
    }

    return {
        ...slide,
        objects
    }
}

function updateTextObjectStyle(
    slide: Slide, 
    objectId: string, 
    font: Font
): Slide {
    const objects = [...slide.objects]
    const currentIndex = objects.findIndex(object => object.id === objectId)

    if (currentIndex == -1 || objects[currentIndex].type != 'text') {
        return slide
    }

    objects[currentIndex] = {
        ...objects[currentIndex],
        font
    }

    return {
        ...slide,
        objects
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