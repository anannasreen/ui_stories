import { useRef, useCallback, useMemo, useState, useLayoutEffect, MutableRefObject, useEffect } from 'react';
import { findIndex, range, sum, get } from 'lodash';
import LRUCache from 'lru-cache';
import { Orientation, SizingBox } from './types';
import type { RefType as ScrollingContainerRef } from './ScrollingContainer';
import { domElementSize, measureReactElement } from './utils';

export const useRunningAverage = (initialValue = NaN, roundUsing = Math.ceil) => {
    const runningSum = useRef(0);
    const runningCount = useRef(0);
    const isInitial = useRef(true);

    const update = useCallback((v: number) => {
        isInitial.current = false;
        runningSum.current += v;
        runningCount.current++;
    }, []);

    const forget = useCallback((v: number) => {
        if (isInitial.current) return;

        runningCount.current--;
        runningSum.current -= v;

        if (runningCount.current === 0) {
            isInitial.current = true;
        }
    }, []);

    const get = useCallback(() => {
        if (isInitial.current) return initialValue;
        const avg = runningSum.current / runningCount.current;
        return roundUsing ? roundUsing(avg) : avg;
    }, [initialValue, roundUsing]);

    const reset = useCallback(() => {
        runningSum.current = 0;
        runningCount.current = 0;
        isInitial.current = true;
    }, []);

    return useMemo(() => [get, update, reset, forget], [get, update, reset, forget]) as [
        typeof get,
        typeof update,
        typeof reset,
        typeof forget,
    ];
};

export const useViewportSize = ({
    orientation,
    scrollRef,
}: {
    orientation: Orientation;
    scrollRef: MutableRefObject<ScrollingContainerRef | null>;
}) => {
    const [viewportSize, setViewportSize] = useState(0);

    useLayoutEffect(() => {
        if (!scrollRef.current) return;
        const syncSize = () =>
            setViewportSize(domElementSize(scrollRef.current, { orientation, box: SizingBox.Client }));

        const observer = new ResizeObserver(() => {
            syncSize();
        });
        observer.observe(scrollRef.current);

        syncSize();

        return () => {
            observer.disconnect();
        };
    }, [orientation]);

    return useMemo(() => [viewportSize], [viewportSize]) as [number];
};

export const useTrackUserActivity = ({ wheelTimeoutMs = 250 } = {}) => {
    const mouseActivity = useRef(false);
    const wheelActivity = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onMouseDown = useCallback(() => {
        mouseActivity.current = true;
    }, []);
    const onMouseUp = useCallback(() => {
        mouseActivity.current = false;
    }, []);

    const onWheel = useCallback(() => {
        if (wheelActivity.current) clearTimeout(wheelActivity.current);
        wheelActivity.current = setTimeout(() => {
            wheelActivity.current = null;
        }, wheelTimeoutMs);
    }, [wheelTimeoutMs]);

    const ref = useMemo(
        () => ({
            get current() {
                return mouseActivity.current || !!wheelActivity.current;
            },
        }),
        [],
    );
    const eventHandlers = useMemo(() => ({ onMouseDown, onMouseUp, onWheel }), [onMouseDown, onMouseUp, onWheel]);

    return useMemo(() => [ref, eventHandlers], [ref, eventHandlers]) as [typeof ref, typeof eventHandlers];
};

export function useFrozenScrollView<ItemType>({
    items,
    visibleItems,
    getItemId,
    frozen,
}: {
    items: ItemType[];
    visibleItems: ItemType[];
    getItemId: (item: ItemType) => string | null;
    frozen: boolean;
}) {
    // track using id rather than index to attempt to
    // keep freezing stable across changing item size/ordering
    const frozenItemId = useRef<string | null>(null);
    useLayoutEffect(() => {
        if (!visibleItems.length) return;

        if (!frozen) {
            frozenItemId.current = null;
            return;
        }

        if (frozen && frozenItemId.current !== null) return;

        const firstVisible = visibleItems[0];
        if (!firstVisible) {
            frozenItemId.current = null;
            return;
        }

        frozenItemId.current = getItemId(firstVisible);
    }, [frozen, visibleItems, getItemId]);

    // wrap these in refs, so our ref object instance is
    // stable across renders
    const itemsRef = useRef(items);
    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    const getItemIdRef = useRef(getItemId);
    useEffect(() => {
        getItemIdRef.current = getItemId;
    }, [getItemId]);

    const ref = useMemo(
        () => ({
            get frozenId() {
                return frozenItemId.current;
            },
            set frozenId(newId) {
                const newItem = itemsRef.current.filter((item) => getItemIdRef.current(item) === newId)[0];
                if (!newItem) throw new Error(`Could not find item with id "${newId}"`);
                frozenItemId.current = newId;
            },
            get frozenIndex() {
                return findIndex(itemsRef.current, (item) => getItemIdRef.current(item) === frozenItemId.current);
            },
            set frozenIndex(newIndex) {
                if (newIndex < 0) return;

                const newItem = itemsRef.current[newIndex];
                if (newItem) {
                    frozenItemId.current = getItemIdRef.current(newItem);
                } else {
                    console.warn(`Could not find item at index "${newIndex}"`);
                }
            },
            get isFrozen() {
                // we need to be able to check changes within the same render cycle
                return frozenItemId.current !== null;
            },
        }),
        [],
    );

    return ref;
}

export function useItemSizes<ItemType>(
    {
        items,
        itemSize,
        itemSizeTimeoutMs = 500,
        getItemId,
        getItemContentHash: externalGetItemContentHash,
        maxCacheSize = 5000,
        maxCacheAgeMs = 15_000,
        initialEstimatedSize = window.innerWidth / 5,
    }: {
        items: ItemType[];
        getItemId: (item: ItemType) => string;
        getItemContentHash?: (item: ItemType) => string;
        itemSize?: number | ((item: ItemType) => number | Promise<number>);
        itemSizeTimeoutMs?: number;
        maxCacheSize?: number;
        maxCacheAgeMs?: number;
        initialEstimatedSize?: number;
    },
    deps: any[] = [],
) {
    const getItemContentHash = useMemo(
        () => externalGetItemContentHash || ((item: ItemType) => JSON.stringify(item)),
        [externalGetItemContentHash],
    );

    const sizeCache = useRef(new LRUCache<string, number>({ max: maxCacheSize, maxAge: maxCacheAgeMs }));
    const hashCache = useRef(new LRUCache<string, string>({ max: maxCacheSize, maxAge: maxCacheAgeMs }));

    const [getEstimatedItemSize, updateEstimatedItemSize, resetEstimatedItemSize, forgetItemSize] =
        useRunningAverage(initialEstimatedSize);

    const invalidateCache = useCallback(
        (item?: ItemType) => {
            if (!item) {
                sizeCache.current = new LRUCache<string, number>({ max: maxCacheSize, maxAge: maxCacheAgeMs });
                hashCache.current = new LRUCache<string, string>({ max: maxCacheSize, maxAge: maxCacheAgeMs });
                resetEstimatedItemSize();
                return;
            }

            const id = getItemId(item);
            const oldSize = sizeCache.current.get(id);
            if (oldSize) {
                forgetItemSize(oldSize);
            }
            sizeCache.current.del(id);
            hashCache.current.del(id);
        },
        [getItemId],
    );

    const sizeOfItem = useCallback(
        (item: ItemType) => {
            if (typeof itemSize === 'number') {
                // console.debug(`Using fixed item size ${itemSize}`);
                return itemSize;
            }

            if (!item) return getEstimatedItemSize();

            const id = getItemId(item);

            if (sizeCache.current && sizeCache.current.has(id) && hashCache.current && hashCache.current.has(id)) {
                const hash = getItemContentHash(item);
                const oldHash = hashCache.current.get(id);

                if (hash === oldHash) {
                    // console.debug(`Using cached item size for ${id}`);
                    return sizeCache.current.get(id) as number;
                }

                // item changed
                // console.debug(`Content changed. Invalidating item size cache for ${id}`);
                sizeCache.current.del(id);
                hashCache.current.del(id);
            }

            if (typeof itemSize === 'function') {
                const size = itemSize(item);
                const hash = getItemContentHash(item);
                if (typeof size === 'number') {
                    sizeCache.current.set(id, size);
                    hashCache.current.set(id, hash);
                    updateEstimatedItemSize(size);
                    return size;
                }

                if (size instanceof Promise) {
                    Promise.race([
                        size,
                        // TODO: make performance not a PIECE OF SHIT
                        new Promise<number>((resolve) =>
                            setTimeout(() => {
                                resolve(NaN);
                            }, itemSizeTimeoutMs),
                        ),
                    ]).then((resolvedSize) => {
                        if (!sizeCache.current || !hashCache.current || Number.isNaN(resolvedSize)) return;
                        if (resolvedSize) {
                            // console.debug(`Caching resolved size ${resolvedSize} for ${id}`);
                            hashCache.current.set(id, hash);
                            sizeCache.current.set(id, resolvedSize);
                            updateEstimatedItemSize(resolvedSize);
                        } else {
                            if (typeof jest === 'undefined') {
                                console.warn(`Item size for ${id} was 0`);
                            }
                        }
                    });
                }
            }

            // console.debug(`Using estimated item size for ${id}`);
            return getEstimatedItemSize();
        },
        [itemSize, getEstimatedItemSize, getItemId, getItemContentHash, itemSizeTimeoutMs, ...deps],
    );

    const totalSize = useMemo(
        () => Math.round(sum(items.map((item) => sizeOfItem(item)))),
        [sizeOfItem, items, ...deps],
    );

    const sizeAtIndex = useCallback(
        (index) => {
            return sizeOfItem(items[index]);
        },
        [items, sizeOfItem, ...deps],
    );

    const offsetSizeLeadingIndex = useCallback(
        (index) => sum(range(0, index).map((i) => sizeAtIndex(i))),
        [sizeAtIndex, ...deps],
    );

    const indexFromOffset = useCallback(
        (offset) => {
            // TODO: replace this with binary search and a tree that tracks the sums of its descendant nodes
            let totalOffsetSoFar = 0;
            for (const [i, item] of Object.entries(items)) {
                totalOffsetSoFar += sizeOfItem(item);
                if (totalOffsetSoFar >= offset) {
                    return parseInt(i, 10);
                }
            }

            return -1;
        },
        [items, sizeOfItem, ...deps],
    );

    return useMemo(
        () => ({
            sizeAtIndex,
            offsetSizeLeadingIndex,
            indexFromOffset,
            invalidateCache,
            totalSize,
        }),
        [sizeAtIndex, offsetSizeLeadingIndex, indexFromOffset, invalidateCache, totalSize],
    );
}

export function useRenderBasedDynamicItemSize<ItemType>({
    orientation,
    renderItem,
}: {
    orientation: Orientation;
    renderItem: (item: ItemType) => React.ReactElement;
}) {
    const getItemSize = useCallback(
        async (item: ItemType) => {
            const size = await measureReactElement(renderItem(item));
            if (orientation === Orientation.Horizontal) {
                return size.width;
            }
            return size.height;
        },
        [orientation, renderItem],
    );

    return [getItemSize] as [typeof getItemSize];
}

export function useRefBasedDynamicItemSize<ItemType>({
    orientation,
    getItemId,
}: {
    orientation: Orientation;
    getItemId: (item: ItemType) => string;
}) {
    type PendingMeasurement = { promise: Promise<number>; resolve: (size: number) => void };
    const pending = useRef<LRUCache<string, PendingMeasurement>>(new LRUCache({ max: 5000 }));

    const resolveItemSize = useCallback(
        (item: ItemType, { height, width }) => {
            const id = getItemId(item);
            const pendingItem = pending.current.get(id);
            if (pendingItem) {
                if (orientation === Orientation.Horizontal) {
                    pendingItem.resolve(width);
                }
                pendingItem.resolve(height);
            }
        },
        [orientation, getItemId],
    );

    const declareItem = useCallback(
        (item: ItemType) => {
            const id = getItemId(item);
            if (pending.current.get(id)) return;

            const measurement = {} as any;
            measurement.promise = new Promise<number>((resolve) => {
                // eslint-disable-line no-new
                measurement.resolve = resolve;
            });

            pending.current.set(id, measurement as PendingMeasurement);
        },
        [getItemId],
    );

    const getItemSize = useCallback(
        (item: ItemType) => {
            const id = getItemId(item);

            if (!pending.current.get(id)) {
                declareItem(item); // ensures .promise is created
            }

            return pending.current.get(id)!.promise;
        },
        [getItemId, declareItem],
    );

    return useMemo(() => ({ getItemSize, resolveItemSize, declareItem }), [getItemSize, resolveItemSize, declareItem]);
}
