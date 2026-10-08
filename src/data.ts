import { setSlideBackgroundColor, setSlideBackgroundImage } from "./functions/background";
import { addImageObject, addTextObject } from "./functions/object";
import { createPresentation } from "./functions/presentation";
import { addSlide } from "./functions/slide";
import { Presentation } from "./types/presentation";

function createTestPresentation(): Presentation {
    let presentation = createPresentation('Тестовая презентация', '1')

    presentation = addSlide(presentation, '1')
    let slide1 = presentation.slides[0];
    slide1 = setSlideBackgroundColor(slide1, '#f0f0f0')
    slide1 = addTextObject(
        slide1, 
        '1', 
        { content: 'hello world!',
        position: { x: 3, y: 3 },
        size: { width: 100, height: 100 },
        font: { family: 'Arial', size: 36, color: 'black' }}
    )

    presentation = addSlide(presentation, '2')
    let slide2 = presentation.slides[1];
    slide2 = setSlideBackgroundImage(slide2, 'https://img.magnific.com/free-photo/view-adorable-persian-domestic-cat_23-2151773898.jpg?semt=ais_hybrid&w=740')
    slide2 = addTextObject(
        slide2, 
        '1', 
        { content: 'Список задач:',
        position: { x: 3, y: 15 },
        size: {  width: 300, height: 100 },
        font: { family: 'Arial', size: 36, color: 'green' }}
    )
    slide2 = addTextObject(
        slide2, 
        '2', 
        { content: '- Отдхнуть',
        position: { x: 3, y: 60 },
        size: { width: 150, height: 100 },
        font: { family: 'Arial', size: 24, color: 'white' }}
    )
    slide2 = addTextObject(
        slide2, 
        '3', 
        { content: '- Покушать',
        position: { x: 3, y: 90},
        size: { width: 150, height: 100 },
        font: { family: 'Arial', size: 24, color: ' blue' }}
    )
    slide2 = addTextObject(
        slide2, 
        '4', 
        { content: '- Поспать',
        position: { x: 3, y: 120},
        size: { width: 150, height: 100 },
        font: { family: 'Arial', size: 24, color: 'red' }}
    )

    presentation = addSlide(presentation, '3')
    let slide3 = presentation.slides[2];
    slide3 = setSlideBackgroundColor(slide3, '#6b3c3c')
    slide3 = addTextObject(
        slide3, 
        '1', 
        { content: 'Фотка',
        position: { x: 150, y: 70 },
        size: { width: 100, height: 100 },
        font: { family: 'Arial', size: 24, color: 'white' }}
    )
    slide3 = addImageObject(
        slide3,
        '2',
        { src: 'https://img.magnific.com/free-photo/close-up-adorable-kitten-looking-up_23-2150782225.jpg?semt=ais_incoming&w=740&q=80',
        position: { x: 100, y: 100 },
        size: { width: 300, height: 300 }}
    )
    
    return { 
        ...presentation, 
        slides: [slide1, slide2, slide3]
    }
}

export {
    createTestPresentation,
}