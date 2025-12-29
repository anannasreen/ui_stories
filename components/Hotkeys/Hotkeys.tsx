import React, { HTMLProps, ReactNode } from 'react';
import { GlobalHotKeys, HotKeys, configure } from 'react-hotkeys';
import { entries, fromPairs, isArray } from 'lodash';

/**
 * Interface for defining a keyboard shortcut
 */
export interface Hotkey {
    /** A description of the hotkey action */
    name: string;
    /** Key sequence(s) that trigger the hotkey (e.g., 'shift+a', 'ctrl+b') */
    sequence: string | string[];
    /** Function to execute when the hotkey is triggered */
    handler: (keyEvent?: KeyboardEvent | undefined) => void;
}

/**
 * Root component for hotkey context.
 * Wrap multiple HotkeyGroup components in this to ensure proper coordination.
 *
 * ```
 * <HotkeyRoot>
 *   <HotkeyGroup groupName="navigation" hotkeys={navHotkeys}>
 *     <App />
 *   </HotkeyGroup>
 * </HotkeyRoot>
 * ```
 */
export function HotkeyRoot({ children }: { children: ReactNode }) {
    return <GlobalHotKeys>{children}</GlobalHotKeys>;
}

/** Type for mapping hotkey identifiers to their configuration */
export type HotkeyMap = Record<string, Hotkey>;

interface HotkeyGroupProps extends Pick<HTMLProps<HTMLDivElement>, 'style' | 'className'> {
    /** Name of the hotkey group for organization in overlays */
    groupName: string;
    /** Map of hotkey configurations */
    hotkeys: HotkeyMap;
    /** Whether hotkeys should only work when this component is focused */
    local?: boolean;
    /** Child components */
    children?: ReactNode;
}

/**
 * Register a group of hotkeys to perform certain actions.
 *
 * If rendering multiple HotkeyGroups on the same page, be sure to wrap them in a HotkeyRoot,
 * or the HotkeyOverlay will be inaccurate.
 */
export function HotkeyGroup({ hotkeys, groupName, local = false, children, ...etc }: HotkeyGroupProps) {
    const pairs = entries(hotkeys);
    const handlers = fromPairs(
        pairs.map(([key, hotkeyConfig]) => [
            key,
            (e: KeyboardEvent | undefined) => {
                hotkeyConfig.handler(e);
            },
        ]),
    );
    const keyMap = fromPairs(
        pairs.map(([key, { name, sequence }]) => [
            key,
            {
                sequences: (isArray(sequence) ? sequence : [sequence]) || [],
                sequence: '',
                action: 'keydown' as const,
                name,
                group: groupName,
            },
        ]),
    );

    const HotkeysComponent = local ? HotKeys : GlobalHotKeys;

    return (
        <HotkeysComponent
            handlers={handlers}
            keyMap={keyMap}
            // Not updating callbacks when they change is super confusing.
            // Just be careful to properly memoize them.
            allowChanges
            {...etc}
        >
            {children}
        </HotkeysComponent>
    );
}

/**
 * Global configuration for react-hotkeys
 * Prevents hotkeys from firing when focus is in form elements
 */
configure({
    ignoreEventsCondition(e: KeyboardEvent) {
        const source = e.target as HTMLElement | undefined;
        // Matches default ignore criteria
        return (
            ['input', 'select', 'textarea'].includes(source?.tagName?.toLowerCase() || '') ||
            source?.contentEditable === 'true'
        );
    },
});
