import { describe, it, expect } from 'vitest';
import { renderHotkey } from '../hotkeys';

describe('renderHotkey', () => {
    it('should join array sequences with comma and space', () => {
        const hotkey = {
            sequence: ['Ctrl+A', 'Ctrl+B'],
            name: 'test',
            handler: () => {},
        };
        expect(renderHotkey(hotkey)).toBe('Ctrl+A, Ctrl+B');
    });

    it('should return single sequence as is', () => {
        const hotkey = {
            sequence: 'Ctrl+C',
            name: 'test',
            handler: () => {},
        };
        expect(renderHotkey(hotkey)).toBe('Ctrl+C');
    });

    it('should handle empty array sequence', () => {
        const hotkey = {
            sequence: [],
            name: 'test',
            handler: () => {},
        };
        expect(renderHotkey(hotkey)).toBe('');
    });

    it('should handle array with single item', () => {
        const hotkey = {
            sequence: ['Ctrl+X'],
            name: 'test',
            handler: () => {},
        };
        expect(renderHotkey(hotkey)).toBe('Ctrl+X');
    });
});
