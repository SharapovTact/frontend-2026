import {describe, it, expect} from 'vitest';
import {generateId} from '../functions/presentation';

describe('common actions', () => {
    it('generate id', () => {
        const TEST_COUNT = 1000
        const ids = new Set()

        for (let i = 0; i < TEST_COUNT; i++) {
            ids.add(generateId())
        }

        expect(ids.size).toEqual(TEST_COUNT)
    })
})