import type { Presentation } from "../types/presentation.js";
import  { generateId } from "../functions/common.js";



function createPresentation(
    name: string
): Presentation {
    const presentation: Presentation = {
        id: generateId(),
        name,
    }
    return presentation
}

function updatePresentationName(
    presentation: Presentation,
    name: string
): Presentation {
    presentation.name = name;
    return presentation;
}

function savePresentation(
    presentation: Presentation
): string {
    const json: string = JSON.stringify(presentation)
    return json
}

function loadPresentation(
    json: string
): Presentation {
    const presentation: Presentation = JSON.parse(json)
    return presentation
}

export {
    updatePresentationName,
    createPresentation,
    savePresentation,
    loadPresentation,
    generateId,
}