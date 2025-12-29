import { isArray } from 'lodash';
import { Hotkey } from '../components/Hotkeys/Hotkeys';

export function renderHotkey({ sequence }: Hotkey) {
    return isArray(sequence) ? sequence.join(', ') : sequence;
}
