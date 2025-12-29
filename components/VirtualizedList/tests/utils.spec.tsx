import React from 'react';
import { measureReactElement, getScrollOffset, setScrollOffset, domElementSize } from '../utils';
import { Orientation, SizingBox } from '../types';
import { overrideProperties } from '../../../utils/tests/dom';

describe('domElementSize', () => {
    describe('client', () => {
        it('vertical', () => {
            const el = document.createElement('div');
            overrideProperties(el, { clientHeight: 300 });
            expect(
                domElementSize(el, {
                    orientation: Orientation.Vertical,
                    box: SizingBox.Client,
                }),
            ).toBe(300);
        });

        it('horizontal', () => {
            const el = document.createElement('div');
            overrideProperties(el, { clientWidth: 300 });
            expect(
                domElementSize(el, {
                    orientation: Orientation.Horizontal,
                    box: SizingBox.Client,
                }),
            ).toBe(300);
        });
    });
    describe('scroll', () => {
        it('vertical', () => {
            const el = document.createElement('div');
            overrideProperties(el, { scrollHeight: 300 });
            expect(
                domElementSize(el, {
                    orientation: Orientation.Vertical,
                    box: SizingBox.Scroll,
                }),
            ).toBe(300);
        });

        it('horizontal', () => {
            const el = document.createElement('div');
            overrideProperties(el, { scrollWidth: 300 });
            expect(
                domElementSize(el, {
                    orientation: Orientation.Horizontal,
                    box: SizingBox.Scroll,
                }),
            ).toBe(300);
        });
    });

    describe('offset', () => {
        it('vertical', () => {
            const el = document.createElement('div');
            overrideProperties(el, { offsetHeight: 300 });
            expect(
                domElementSize(el, {
                    orientation: Orientation.Vertical,
                    box: SizingBox.Offset,
                }),
            ).toBe(300);
        });

        it('horizontal', () => {
            const el = document.createElement('div');
            overrideProperties(el, { offsetWidth: 300 });
            expect(
                domElementSize(el, {
                    orientation: Orientation.Horizontal,
                    box: SizingBox.Offset,
                }),
            ).toBe(300);
        });
    });
});

describe('getScrollOffset', () => {
    it('empty', () => {
        expect(getScrollOffset(null, { orientation: Orientation.Horizontal, reversed: false })).toBeUndefined();
    });

    describe('horizontal', () => {
        it('non-reversed', () => {
            const el = document.createElement('div');
            overrideProperties(el, { scrollLeft: 300 });

            expect(getScrollOffset(el, { orientation: Orientation.Horizontal, reversed: false })).toBe(300);
        });
        it('reversed', () => {
            const el = document.createElement('div');
            overrideProperties(el, {
                scrollWidth: 800,
                clientWidth: 500,
                scrollLeft: 100,
            });

            expect(getScrollOffset(el, { orientation: Orientation.Horizontal, reversed: true })).toBe(200);
        });
    });

    describe('vertical', () => {
        it('non-reversed', () => {
            const el = document.createElement('div');
            overrideProperties(el, { scrollTop: 300 });

            expect(
                getScrollOffset(el, {
                    orientation: Orientation.Vertical,
                    reversed: false,
                }),
            ).toBe(300);
        });
        it('reversed', () => {
            const el = document.createElement('div');
            overrideProperties(el, {
                scrollHeight: 800,
                clientHeight: 500,
                scrollTop: 100,
            });

            expect(
                getScrollOffset(el, {
                    orientation: Orientation.Vertical,
                    reversed: true,
                }),
            ).toBe(200);
        });
    });
});

describe('setScrollOffset', () => {
    it('empty', () => {
        expect(setScrollOffset(null, 100, { orientation: Orientation.Horizontal, reversed: false })).toBeUndefined();
    });

    describe('horizontal', () => {
        it('non-reversed', () => {
            const el = document.createElement('div');
            setScrollOffset(el, 300, { orientation: Orientation.Horizontal, reversed: false });
            expect(getScrollOffset(el, { orientation: Orientation.Horizontal, reversed: false })).toBe(300);
        });
        it('reversed', () => {
            const el = document.createElement('div');
            overrideProperties(el, {
                scrollWidth: 800,
                clientWidth: 500,
            });

            setScrollOffset(el, 200, { orientation: Orientation.Horizontal, reversed: true });
            expect(getScrollOffset(el, { orientation: Orientation.Horizontal, reversed: true })).toBe(200);
        });
    });

    describe('vertical', () => {
        it('non-reversed', () => {
            const el = document.createElement('div');
            setScrollOffset(el, 300, { orientation: Orientation.Vertical, reversed: false });

            expect(
                getScrollOffset(el, {
                    orientation: Orientation.Vertical,
                    reversed: false,
                }),
            ).toBe(300);
        });
        it('reversed', () => {
            const el = document.createElement('div');
            overrideProperties(el, {
                scrollHeight: 800,
                clientHeight: 500,
            });

            setScrollOffset(el, 200, { orientation: Orientation.Vertical, reversed: true });

            expect(
                getScrollOffset(el, {
                    orientation: Orientation.Vertical,
                    reversed: true,
                }),
            ).toBe(200);
        });
    });
});

describe('measureReactElements', () => {
    it("doesn't explode", async () => {
        // js dom won't actually render this correctly,
        // but at the very least we can make sure that the fn mechanics
        // and api don't explode
        const el = <div style={{ height: 300, width: 200 }} />;
        const measurements = await measureReactElement(el);
        expect(measurements).toEqual({ height: 0, width: 0 });
    });
});
