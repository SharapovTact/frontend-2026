import type {Presentation} from '../types/presentation.js';
import {describe, it, expect} from 'vitest';

import {loadPresentation, updatePresentationName} from '../functions/presentation.js';
import {createPresentation} from '../functions/presentation.js';
import {savePresentation} from '../functions/presentation.js';


describe('presentation actions', () => {
    it('create presentation', () => {
        const name: string = 'presentation-name'

        const presentation: Presentation = createPresentation(name);

        expect(presentation.name).toEqual(name)
    })
    it('updates presentation name', () => {
        // arrange
        const presentation: Presentation = {
            id: 'presentation-id',
            name: 'my presentation',
        }
        
        // act
        const renamed = updatePresentationName(
            presentation,
            'new presentation',
        )

        // assert
        expect(renamed.name).toEqual('new presentation')
    })
    it('save and load presentation', () => {
        const presentation: Presentation = {
            id: 'presentation-id',
            name: 'my presentation',
        }

        const loadedPresentation: Presentation = 
        loadPresentation(savePresentation(presentation))

        expect(loadedPresentation.id).toEqual(presentation.id);
        expect(loadedPresentation.name).toEqual(presentation.name);
    })
})