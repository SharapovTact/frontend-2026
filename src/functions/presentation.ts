import type { Presentation } from "../types/presentation";
import { generateId } from "../functions/common";

function createPresentation(
    name: string = 'test',
    id: string
): Presentation {
    return {
        id,
        name,
        slides: [],
    }
}

function updatePresentationName(
    presentation: Presentation,
    name: string
): Presentation {
    return {
        ...presentation,
        name,
    }
}

function savePresentation(
    presentation: Presentation
): string {
    return JSON.stringify(presentation)
}

function loadPresentation(
    json: string
): Presentation {
    return JSON.parse(json)
}

export {
    updatePresentationName,
    createPresentation,
    savePresentation,
    loadPresentation,
    generateId,
}