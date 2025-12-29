import React, { useRef } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
    useRunningAverage,
    useViewportSize,
    useTrackUserActivity,
    useFrozenScrollView,
    useItemSizes,
    useRenderBasedDynamicItemSize,
    useRefBasedDynamicItemSize,
} from '../hooks';
import { Orientation } from '../types';
import { overrideProperties } from '../../../utils/tests/dom';
import { vi } from 'vitest';

describe('useRunningAverage', () => {
    it('should return NaN if uninitialized and no value was passed', () => {
        const { result } = renderHook(() => useRunningAverage());
        const [getAverage] = result.current;
        expect(getAverage()).toBe(NaN);
    });

    it('should return the initial value before initialization', () => {
        const { result } = renderHook(() => useRunningAverage(42));
        const [getAverage] = result.current;
        expect(getAverage()).toBe(42);
    });

    it('should update the average', () => {
        const { result } = renderHook(() => useRunningAverage(42));
        const [getAverage, update] = result.current;
        act(() => {
            update(1);
        });

        act(() => {
            update(2);
        });

        act(() => {
            update(3);
        });

        expect(getAverage()).toBe(2);
    });
});

describe('useViewportSize', () => {
    it('horizontal', () => {
        const domNode = document.createElement('div');
        overrideProperties(domNode, { clientWidth: 500 });
        const { result } = renderHook(() => {
            const scrollRef = useRef(domNode);
            return useViewportSize({ orientation: Orientation.Horizontal, scrollRef });
        });

        const [size] = result.current;
        expect(size).toBe(500);
    });

    it('vertical', () => {
        const domNode = document.createElement('div');
        overrideProperties(domNode, { clientHeight: 500 });
        const { result } = renderHook(() => {
            const scrollRef = useRef(domNode);
            return useViewportSize({ orientation: Orientation.Vertical, scrollRef });
        });

        const [size] = result.current;
        expect(size).toBe(500);
    });
});

describe('useTrackUserActivity', () => {
    it('mouse down', () => {
        const { result } = renderHook(() => useTrackUserActivity());
        const [activity, eventHandlers] = result.current;
        expect(activity.current).toBe(false);
        act(() => {
            eventHandlers.onMouseDown();
        });
        expect(activity.current).toBe(true);
    });

    it('mouse up', () => {
        const { result } = renderHook(() => useTrackUserActivity());
        const [activity, eventHandlers] = result.current;
        expect(activity.current).toBe(false);
        act(() => {
            eventHandlers.onMouseDown();
        });
        expect(activity.current).toBe(true);
        act(() => {
            eventHandlers.onMouseUp();
        });
        expect(activity.current).toBe(false);
    });

    it('wheel', () => {
        const { result } = renderHook(() => useTrackUserActivity());
        const [activity, eventHandlers] = result.current;
        expect(activity.current).toBe(false);
        act(() => {
            eventHandlers.onWheel();
        });
        expect(activity.current).toBe(true);
    });
});

describe('useFrozenScrollView', () => {
    it('frozen', () => {
        const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
        const visibleItems = [{ id: '3' }, { id: '4 ' }];

        const { result } = renderHook(() =>
            useFrozenScrollView({
                items,
                visibleItems,
                frozen: true,
                getItemId: (i) => i.id,
            }),
        );

        expect(result.current.isFrozen).toBe(true);
        expect(result.current.frozenId).toBe('3');
        expect(result.current.frozenIndex).toBe(2);
    });

    it('not frozen', () => {
        const { result } = renderHook(() =>
            useFrozenScrollView({ items: [], visibleItems: [], getItemId: () => '', frozen: false }),
        );
        expect(result.current.isFrozen).toBe(false);
        expect(result.current.frozenId).toBe(null);
        expect(result.current.frozenIndex).toBe(-1);
    });

    describe('items change', () => {
        it('item still exists', () => {
            const visibleItems = [{ id: '3' }, { id: '4 ' }];

            const { result, rerender } = renderHook(
                ({ items }) =>
                    useFrozenScrollView({
                        items,
                        visibleItems,
                        frozen: true,
                        getItemId: (i) => i.id,
                    }),
                {
                    initialProps: {
                        items: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
                    },
                },
            );

            expect(result.current.isFrozen).toBe(true);
            expect(result.current.frozenId).toBe('3');
            expect(result.current.frozenIndex).toBe(2);

            rerender({ items: [{ id: '2' }, { id: '3' }, { id: '4' }] });

            expect(result.current.isFrozen).toBe(true);
            expect(result.current.frozenId).toBe('3');
            expect(result.current.frozenIndex).toBe(1);
        });

        it('item does not exist', () => {
            const visibleItems = [{ id: '3' }, { id: '4 ' }];

            const { result, rerender } = renderHook(
                ({ items }) =>
                    useFrozenScrollView({
                        items,
                        visibleItems,
                        frozen: true,
                        getItemId: (i) => i.id,
                    }),
                {
                    initialProps: {
                        items: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
                    },
                },
            );

            expect(result.current.isFrozen).toBe(true);
            expect(result.current.frozenId).toBe('3');
            expect(result.current.frozenIndex).toBe(2);

            rerender({ items: [{ id: '1' }, { id: '2' }, { id: '4' }] });

            expect(result.current.isFrozen).toBe(true);
            expect(result.current.frozenId).toBe('3');
            expect(result.current.frozenIndex).toBe(-1);
        });
    });

    describe('manual intervention', () => {
        describe('item index', () => {
            it('can set the frozen item index', () => {
                const { result } = renderHook(() =>
                    useFrozenScrollView({
                        items: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
                        visibleItems: [],
                        frozen: true,
                        getItemId: (i) => i.id,
                    }),
                );

                expect(result.current.isFrozen).toBe(false);
                act(() => {
                    result.current.frozenIndex = 2;
                });
                expect(result.current.isFrozen).toBe(true);
                expect(result.current.frozenIndex).toBe(2);
                expect(result.current.frozenId).toBe('3');
            });

            it('does not update if index is not found', () => {
                vi.spyOn(console, 'warn').mockImplementation(() => vi.fn());

                const { result } = renderHook(() =>
                    useFrozenScrollView({
                        items: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
                        visibleItems: [],
                        frozen: true,
                        getItemId: (i) => i.id,
                    }),
                );

                expect(result.current.isFrozen).toBe(false);
                act(() => {
                    result.current.frozenIndex = 22;
                });
                expect(result.current.isFrozen).toBe(false);
                expect(result.current.frozenIndex).toBe(-1);
            });
        });

        describe('item id', () => {
            it('can set the frozen item id', () => {
                const { result } = renderHook(() =>
                    useFrozenScrollView({
                        items: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
                        visibleItems: [],
                        frozen: true,
                        getItemId: (i) => i.id,
                    }),
                );

                expect(result.current.isFrozen).toBe(false);
                act(() => {
                    result.current.frozenId = '4';
                });
                expect(result.current.isFrozen).toBe(true);
                expect(result.current.frozenIndex).toBe(3);
                expect(result.current.frozenId).toBe('4');
            });

            it('throws if the id is not found', () => {
                const { result } = renderHook(() =>
                    useFrozenScrollView({
                        items: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
                        visibleItems: [],
                        frozen: true,
                        getItemId: (i) => i.id,
                    }),
                );

                expect(result.current.isFrozen).toBe(false);
                expect(() => {
                    result.current.frozenId = 'foo';
                }).toThrow();
            });
        });
    });
});

describe('useItemSizes', () => {
    describe('fixed size', () => {
        it('sizeAtIndex', () => {
            const { result } = renderHook(() => {
                const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
                return useItemSizes({
                    items,
                    itemSize: 250,
                    getItemId: (i) => i.id,
                });
            });

            act(() => {
                expect(result.current.sizeAtIndex(0)).toBe(250);
            });
        });

        it('offsetLeadingIndex', () => {
            const { result } = renderHook(() => {
                const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
                return useItemSizes({
                    items,
                    itemSize: 250,
                    getItemId: (i) => i.id,
                });
            });

            expect(result.current.offsetSizeLeadingIndex(2)).toBe(500);
        });

        it('indexFromOffset', () => {
            const { result } = renderHook(() => {
                const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
                return useItemSizes({
                    items,
                    itemSize: 250,
                    getItemId: (i) => i.id,
                });
            });

            expect(result.current.indexFromOffset(300)).toBe(1);
        });
    });

    describe('callback size', () => {
        it('sizeAtIndex', () => {
            const { result } = renderHook(() => {
                const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
                return useItemSizes({
                    items,
                    itemSize: (item) => parseInt(item.id, 10) * 100,
                    getItemId: (i) => i.id,
                });
            });

            act(() => {
                expect(result.current.sizeAtIndex(0)).toBe(100);
            });
        });

        it('offsetLeadingIndex', () => {
            const { result } = renderHook(() => {
                const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
                return useItemSizes({
                    items,
                    itemSize: (item) => parseInt(item.id, 10) * 100,
                    getItemId: (i) => i.id,
                });
            });

            expect(result.current.offsetSizeLeadingIndex(2)).toBe(300);
        });

        it('indexFromOffset', () => {
            const { result } = renderHook(() => {
                const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
                return useItemSizes({
                    items,
                    itemSize: (item) => parseInt(item.id, 10) * 100,
                    getItemId: (i) => i.id,
                });
            });

            expect(result.current.indexFromOffset(301)).toBe(2);
        });
    });

    describe('dynamic size', () => {
        // jsdom won't do the actual measuring, but
        // just smoke test that the api and the data piping work as expected

        it('sizeAtIndex', async () => {
            const renderItem = (item: { id: string }) => <div>{item.id}</div>;
            const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

            const { result } = renderHook(() => {
                const [itemSize] = useRenderBasedDynamicItemSize({ orientation: Orientation.Horizontal, renderItem });
                return useItemSizes({
                    items,
                    itemSize,
                    initialEstimatedSize: 30,
                    getItemId: (i) => i.id,
                });
            });

            expect(result.current.sizeAtIndex(0)).toBe(30);
        });

        it('offsetLeadingIndex', () => {
            const renderItem = (item: { id: string }) => <div>{item.id}</div>;
            const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

            const { result } = renderHook(() => {
                const [itemSize] = useRenderBasedDynamicItemSize({ orientation: Orientation.Horizontal, renderItem });
                return useItemSizes({
                    items,
                    itemSize,
                    initialEstimatedSize: 30,
                    getItemId: (i) => i.id,
                });
            });

            expect(result.current.offsetSizeLeadingIndex(2)).toBe(60);
        });

        it('indexFromOffset', () => {
            const renderItem = (item: { id: string }) => <div>{item.id}</div>;
            const items = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

            const { result } = renderHook(() => {
                const [itemSize] = useRenderBasedDynamicItemSize({ orientation: Orientation.Horizontal, renderItem });
                return useItemSizes({
                    items,
                    itemSize,
                    initialEstimatedSize: 30,
                    getItemId: (i) => i.id,
                });
            });

            expect(result.current.indexFromOffset(75)).toBe(2);
        });
    });
});

describe('useRenderBasedDynamicItemSize', () => {
    let rafIds: number[] = [];

    beforeEach(() => {
        rafIds = [];
        // Intercept rAF calls to store their IDs
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
            const rafId = setTimeout(() => cb(performance.now()), 0) as unknown as number;
            rafIds.push(rafId);
            return rafId;
        });
    });

    afterEach(async () => {
        // Clear all rAF callbacks
        rafIds.forEach((id) => {
            window.cancelAnimationFrame(id);
            clearTimeout(id);
        });
        rafIds = [];

        // Clear any remaining timers
        vi.clearAllTimers();

        // Wait for any pending promises and microtasks
        await Promise.resolve();
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Restore all mocks
        vi.restoreAllMocks();
    });

    const renderItem = ({ id }: { id: string }) => <div>{id}</div>;

    it('horizontal', async () => {
        const { result } = renderHook(() =>
            useRenderBasedDynamicItemSize({ orientation: Orientation.Horizontal, renderItem }),
        );
        const [getItemSize] = result.current;

        // Wait for any measurement operations to complete
        await act(async () => {
            const size = await getItemSize({ id: '1' });
            expect(size).toBeDefined();
        });
    });

    it('vertical', async () => {
        const { result } = renderHook(() =>
            useRenderBasedDynamicItemSize({ orientation: Orientation.Vertical, renderItem }),
        );
        const [getItemSize] = result.current;

        // Wait for any measurement operations to complete
        await act(async () => {
            const size = await getItemSize({ id: '1' });
            expect(size).toBeDefined();
        });
    });
});

describe('useRefBasedDynamicItemSize', () => {
    const getItemId = ({ id }: { id: string }) => id;

    it('horizontal', async () => {
        const item = { id: '15' };

        const { result } = renderHook(() =>
            useRefBasedDynamicItemSize({ orientation: Orientation.Horizontal, getItemId }),
        );

        const { declareItem, getItemSize, resolveItemSize } = result.current;

        await act(async () => {
            declareItem(item);
        });

        const itemSize = getItemSize(item);

        await act(async () => {
            resolveItemSize(item, { height: 15, width: 20 });
        });

        await act(async () => {
            expect(await itemSize).toBe(20);
        });
    });

    it('vertical', async () => {
        const item = { id: '15' };

        const { result } = renderHook(() =>
            useRefBasedDynamicItemSize({ orientation: Orientation.Vertical, getItemId }),
        );

        const { declareItem, getItemSize, resolveItemSize } = result.current;

        await act(async () => {
            declareItem(item);
        });

        const itemSize = getItemSize(item);

        await act(async () => {
            resolveItemSize(item, { height: 15, width: 20 });
        });

        await act(async () => {
            expect(await itemSize).toBe(15);
        });
    });
});
