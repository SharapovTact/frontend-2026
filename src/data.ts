import { setSlideBackgroundColor, setSlideBackgroundImage } from "./functions/background";
import { addImageObject, addTextObject } from "./functions/object";
import { createPresentation } from "./functions/presentation";
import { Presentation } from "./types/presentation";

function createTestPresentation(): Presentation {
    let presentation = createPresentation('Тестовая презентация', '1')

    let slide1 = presentation.slides[0];
    slide1 = setSlideBackgroundColor(slide1, '#f0f0f0')
    slide1 = addTextObject(
        slide1, 
        '1', 
        { content: 'hello world!',
        position: { x: 3, y: 3 },
        size: { width: 3, height: 3 },
        font: { family: 'Arial', size: 36, color: 'black' }}
    )

    let slide2 = presentation.slides[1];
    slide2 = setSlideBackgroundImage(slide2, 'image.png')
    slide2 = addTextObject(
        slide2, 
        '1', 
        { content: 'Список задач:',
        position: { x: 3, y: 3 },
        size: { width: 3, height: 3 },
        font: { family: 'Arial', size: 12, color: 'black' }}
    )
    slide2 = addTextObject(
        slide2, 
        '2', 
        { content: '- Отдхнуть',
        position: { x: 3, y: 6 },
        size: { width: 3, height: 3 },
        font: { family: 'Arial', size: 12, color: 'black' }}
    )
    slide2 = addTextObject(
        slide2, 
        '3', 
        { content: '- Покушать',
        position: { x: 3, y: 9 },
        size: { width: 3, height: 3 },
        font: { family: 'Arial', size: 12, color: 'black' }}
    )
    slide2 = addTextObject(
        slide2, 
        '4', 
        { content: '- Поспать',
        position: { x: 3, y: 9 },
        size: { width: 3, height: 3 },
        font: { family: 'Arial', size: 12, color: 'black' }}
    )

    let slide3 = presentation.slides[1];
    slide3 = setSlideBackgroundColor(slide3, '#6b3c3c')
    slide3 = addTextObject(
        slide3, 
        '1', 
        { content: 'Фотка',
        position: { x: 3, y: 3 },
        size: { width: 3, height: 3 },
        font: { family: 'Arial', size: 12, color: 'black' }}
    )
    slide3 = addImageObject(
        slide3,
        '2',
        { src: 'image.png',
        position: { x: 1, y: 2 },
        size: { width: 1, height: 1 }}
    )
    
    return presentation;
}

export {
    createTestPresentation,
}