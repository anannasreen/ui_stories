import { render, unmountComponentAtNode } from 'react-dom';
import { cloneElement, ReactElement } from 'react';
import { Orientation, SizingBox } from './types';
import { nanoid } from 'nanoid';

export interface ReactElementMeasurement {
    width: number;
    height: number;
}

export type Ruler = [HTMLElement, () => void];

export const getRootRuler = (): Ruler => {
    const ruler = document.createElement('div');
    ruler.style.overflow = 'hidden';
    ruler.style.width = '0px';
    ruler.style.height = '0px';
    ruler.style.position = 'absolute';
    ruler.style.zIndex = '-1';

    document.body.appendChild(ruler);
    const removeRuler = () => {
        document.body.removeChild(ruler);
    };

    return [ruler, removeRuler];
};

export const getRuler = (id?: string): Ruler => {
    const ruler = document.createElement('div');
    ruler.style.display = 'inline-block';
    ruler.id = `ruler-${id || nanoid()}`;

    const removeRuler = () => {
        if (ruler.parentElement) {
            ruler.parentElement.removeChild(ruler);
        }
    };

    return [ruler, removeRuler];
};

export const removeRuler = (ruler: Ruler) => {
    const [_, remove] = ruler;
    remove();
};

export const getRulerDomElement = ([el]: Ruler) => el;

export const measureReactElement = async (
    reactElement: ReactElement,
    externalRootRuler?: ReturnType<typeof getRootRuler>,
) => {
    const rootRuler = externalRootRuler || getRootRuler();
    const ruler = getRuler();
    const $rulerEl = getRulerDomElement(ruler);

    getRulerDomElement(rootRuler).appendChild($rulerEl);

    const measurement = await new Promise<ReactElementMeasurement>((resolve, reject) => {
        try {
            // since jsdom won't do anything for us anyway, and calling ReactDom.render directly
            // in tests will cause an error message
            if (typeof jest !== 'undefined') {
                return resolve({ height: 0, width: 0 });
            }

            render(cloneElement(reactElement, reactElement.props), $rulerEl, () => {
                resolve({
                    height: $rulerEl.clientHeight,
                    width: $rulerEl.clientWidth,
                });
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });

    unmountComponentAtNode($rulerEl);
    removeRuler(ruler);
    if (!externalRootRuler) removeRuler(rootRuler);

    return measurement;
};

const scrollAttrs: Record<Orientation, keyof HTMLElement> = {
    [Orientation.Horizontal]: 'scrollLeft',
    [Orientation.Vertical]: 'scrollTop',
};

const sizeAttrs: Record<SizingBox, Record<Orientation, keyof HTMLElement>> = {
    [SizingBox.Offset]: {
        [Orientation.Horizontal]: 'offsetWidth',
        [Orientation.Vertical]: 'offsetHeight',
    },
    [SizingBox.Client]: {
        [Orientation.Horizontal]: 'clientWidth',
        [Orientation.Vertical]: 'clientHeight',
    },
    [SizingBox.Scroll]: {
        [Orientation.Horizontal]: 'scrollWidth',
        [Orientation.Vertical]: 'scrollHeight',
    },
};

export function domElementSize(
    $el: HTMLElement | null,
    { orientation, box = SizingBox.Offset }: { orientation: Orientation; box: SizingBox },
) {
    if (!$el) return 0;

    const attr = sizeAttrs[box][orientation];
    return $el[attr] as number;
}

export const getScrollOffset = (
    $el: HTMLElement | null,
    { orientation, reversed }: { orientation: Orientation; reversed: boolean },
) => {
    if (!$el) return;

    const domScrollPosition = $el[scrollAttrs[orientation]] as number;

    if (!reversed) {
        return domScrollPosition;
    }

    const scrollSize = domElementSize($el, { orientation, box: SizingBox.Scroll });
    const clientSize = domElementSize($el, { orientation, box: SizingBox.Client });
    return scrollSize - clientSize - domScrollPosition;
};

export const setScrollOffset = (
    $el: HTMLElement | null,
    offset: number,
    { orientation, reversed }: { orientation: Orientation; reversed: boolean },
) => {
    if (!$el) return;

    if (!reversed) {
        ($el as any)[scrollAttrs[orientation]] = offset;
        return;
    }
    const scrollSize = domElementSize($el, { orientation, box: SizingBox.Scroll });
    const clientSize = domElementSize($el, { orientation, box: SizingBox.Client });
    ($el as any)[scrollAttrs[orientation]] = scrollSize - clientSize - offset;
};
