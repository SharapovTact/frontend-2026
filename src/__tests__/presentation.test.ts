import type {Presentation} from '../types/presentation';
import {describe, it, expect} from 'vitest';
import {nullPresentation} from './mock';

import {loadPresentation, updatePresentationName} from '../functions/presentation';
import {createPresentation} from '../functions/presentation';
import {savePresentation} from '../functions/presentation';
import {generateId} from '../functions/common';

describe('presentation actions', () => {
    it('creates presentation', () => {
        const name: string = 'presentation-name'
        const id: string = generateId()

        const presentation: Presentation = createPresentation(name, id);

        expect(presentation.name).toEqual(name)
        expect(presentation.id).toEqual(id)
    })
    it('updates presentation name', () => {
        // arrange
        const presentation: Presentation = nullPresentation 
        
        // act
        const renamed = updatePresentationName(
            presentation,
            'new presentation',
        )

        // assert
        expect(renamed.name).toEqual('new presentation')
    })
    it('save and load presentation', () => {
        const presentation: Presentation = nullPresentation 

        const loadedPresentation: Presentation = 
        loadPresentation(savePresentation(presentation))

        expect(loadedPresentation.id).toEqual(presentation.id);
        expect(loadedPresentation.name).toEqual(presentation.name);
    })
})