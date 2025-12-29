import React, { HTMLAttributes, ReactElement, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { isEqual, clamp, get } from 'lodash';
import {
    useViewportSize,
    useTrackUserActivity,
    useFrozenScrollView,
    useItemSizes,
    useRefBasedDynamicItemSize,
} from './hooks';
import ScrollingContainer from './ScrollingContainer';
import type { RefType } from './ScrollingContainer';
import { Orientation } from './types';
import { nanoid } from 'nanoid';

export interface Props<ItemType = any> extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
    /** Array of items to render in the list */
    items: ItemType[];

    /** Index of the first visible item to show on initial load (default: 0) */
    firstVisibleItemIndex?: number;

    /** Should the first visible item be aligned to the center of the viewport? (default: false, aligned to the start) */
    firstVisibleItemCentered?: boolean;

    /** Render function to render each item */
    renderItem: (item: ItemType) => ReactElement;

    /** The size (height for vertical lists, or width for horizontal lists) of a list item.
     * Can be a number, or a function returning a number. If no `itemSize` specified,
     * the item size will be dynamically determined (which can have a performance impact).
     */
    itemSize?: number | ((item: ItemType) => number);

    /** List orientation. Can be either Orientation.Vertical or Orientation.Horizontal */
    orientation?: Orientation;

    /** Make the list scroll right to left (for horizontal lists) or bottom to top (for vertical lists) */
    reversed?: boolean;

    /** Function to get the unique id of each list item */
    getItemId?: (item: ItemType) => string;

    /** Function to get the content has of each list item. Used to check if items have changed. */
    getItemContentHash?: (item: ItemType) => string;

    /** If frozen, the list will attempt to maintain the current scroll view as items are added and removed */
    frozen?: boolean;

    /** Scroll to the beginning of the list when frozen is disabled */
    jumpToStartOnThaw?: boolean;

    /** Expand or shrink the list container to match item heights */
    fitToContent?: boolean;

    /** Number of (invisible) items to render beyond the list boundary. Can help with scrolling performance. */
    overScan?: number;

    /** Called when a user scrolls the list.
     * Offset is always measured from the logical "beginning" of the list.
     *
     * For vertical lists offset is calculated from the top of the list container if the list isn't reversed,
     * and from the bottom of the container if it is.
     *
     * For horizontal lists offset is calculated from the left of the list container if the list isn't reversed,
     * and from the right of the container if it is.
     */
    onScroll?: (offset: number, totalScrollSize: number) => void;

    /** Called when the currently visible list items change. */
    onVisibleItemsChanged?: (visibleItems: ItemType[]) => void;
}

/**
 * A vertical and horizontal list component using virtualized scrolling. Useful for rendering very large lists
 * or lists where the total number of dom nodes rendered needs to be kept to a minimum.
 */
export default function List<ItemType>({
    items,
    firstVisibleItemIndex = 0,
    firstVisibleItemCentered = false,
    renderItem,
    orientation = Orientation.Horizontal,
    itemSize,
    fitToContent = !itemSize,
    overScan = 0,
    getItemId: externalGetItemId,
    getItemContentHash: externalGetItemContentHash,
    frozen = false,
    jumpToStartOnThaw = false,
    reversed = false,
    onMouseEnter,
    onMouseLeave,
    onScroll: externalOnScroll,
    onVisibleItemsChanged,
    ...etc
}: Props<ItemType>) {
    const getItemId = useMemo(
        () => externalGetItemId || ((item: ItemType) => get(item, 'id') || nanoid()),
        [externalGetItemId],
    );
    const scrollRef = useRef<RefType | null>(null);
    const [userActivity, trackingEventListeners] = useTrackUserActivity();
    const [scrollOffset, setScrollOffset] = useState(0);
    const [contentOffset, setContentOffset] = useState(0);
    const [viewportSize] = useViewportSize({ orientation, scrollRef });
    const [visibleItems, setVisibleItems] = useState<ItemType[]>([]);

    useEffect(() => {
        if (!frozen && jumpToStartOnThaw) {
            setScrollOffset(0);
        }
    }, [frozen, jumpToStartOnThaw]);

    const frozenView = useFrozenScrollView({ items, visibleItems, getItemId, frozen });
    const { getItemSize, declareItem, resolveItemSize } = useRefBasedDynamicItemSize({ orientation, getItemId });

    const { offsetSizeLeadingIndex, sizeAtIndex, indexFromOffset, totalSize } = useItemSizes(
        {
            items,
            itemSize: itemSize || getItemSize,
            getItemId,
            getItemContentHash: externalGetItemContentHash,
        },
        [visibleItems],
    );

    useEffect(() => {
        if (scrollOffset === 0 && contentOffset !== 0) {
            setContentOffset(0);
            externalOnScroll?.(0, totalSize);
        }
    }, [scrollOffset, contentOffset, externalOnScroll, totalSize]);

    const computeFilledViewportIndex = useCallback(
        (leadingIndex) => {
            const HUGE = 10_000;
            let trailingIndex = leadingIndex;

            // account for the hidden portion of partially scrolled visible items
            let remainingViewportCapacity = viewportSize + contentOffset;

            do {
                remainingViewportCapacity -= sizeAtIndex(trailingIndex);
                trailingIndex++;
            } while (remainingViewportCapacity >= 0 && trailingIndex < HUGE);

            if (trailingIndex >= HUGE) {
                console.error(`Could not compute filled viewport size after ${HUGE} iterations`);
            }

            return clamp(trailingIndex, 0, items.length);
        },
        [items, offsetSizeLeadingIndex, sizeAtIndex, viewportSize, contentOffset],
    );

    // update visible items when scroll offset changes
    useEffect(() => {
        if (!viewportSize) return;

        let leadingIndex: number;
        if (frozenView.isFrozen && frozenView.frozenIndex > -1) {
            leadingIndex = frozenView.frozenIndex;
        } else {
            leadingIndex = indexFromOffset(scrollOffset);
        }

        const trailingIndex = computeFilledViewportIndex(leadingIndex) + overScan;

        if (frozenView.isFrozen) {
            const updatedScrollOffset = offsetSizeLeadingIndex(leadingIndex);
            if (updatedScrollOffset !== scrollOffset && !userActivity.current) {
                setScrollOffset(updatedScrollOffset);
            }
        }

        const updatedVisibleItems = items.slice(leadingIndex, trailingIndex);
        if (!isEqual(visibleItems, updatedVisibleItems)) {
            setVisibleItems(updatedVisibleItems);
        }
    }, [
        contentOffset,
        indexFromOffset,
        offsetSizeLeadingIndex,
        computeFilledViewportIndex,
        getItemId,
        items,
        overScan,
        scrollOffset,
        userActivity,
        viewportSize,
        visibleItems,
    ]);

    useEffect(() => {
        if (!onVisibleItemsChanged) return;
        onVisibleItemsChanged(visibleItems.slice(0, visibleItems.length - overScan));
    }, [visibleItems, onVisibleItemsChanged, overScan]);

    // user-initiated scrolling
    const [scrollOffsetBuffer, setScrollOffsetBuffer] = useState<number | null>(null);
    useEffect(() => {
        if (scrollOffsetBuffer === null) return;

        const scrolledIndex = indexFromOffset(scrollOffsetBuffer);
        const updatedContentOffset = scrollOffsetBuffer - offsetSizeLeadingIndex(scrolledIndex);

        setScrollOffset(scrollOffsetBuffer);
        setContentOffset(updatedContentOffset);

        if (frozenView.isFrozen && frozenView.frozenIndex !== scrolledIndex) {
            frozenView.frozenIndex = scrolledIndex;
        }

        setScrollOffsetBuffer(null);
    }, [
        contentOffset,
        scrollOffsetBuffer,
        items,
        computeFilledViewportIndex,
        getItemId,
        indexFromOffset,
        offsetSizeLeadingIndex,
    ]);

    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const onScroll = useCallback(
        (offset) => {
            setUserHasScrolled(true);
            setScrollOffsetBuffer(offset);
            if (externalOnScroll) {
                externalOnScroll(offset, totalSize);
            }
        },
        [externalOnScroll, totalSize],
    );

    const scrollToItem = useCallback(
        (index, centered = false) => {
            if (totalSize === viewportSize) {
                // container doesn't scroll
                setScrollOffsetBuffer(0);
                return;
            }

            let offset = offsetSizeLeadingIndex(clamp(index, 0, items.length - 1));

            if (centered) {
                offset -= (viewportSize - sizeAtIndex(index)) / 2;
            }

            setScrollOffsetBuffer(clamp(offset, 0, totalSize));
        },
        [items.length, offsetSizeLeadingIndex, viewportSize, totalSize, sizeAtIndex],
    );

    useEffect(() => {
        if (userHasScrolled) return;
        if (!firstVisibleItemIndex) return;
        scrollToItem(firstVisibleItemIndex, firstVisibleItemCentered);
    }, [userHasScrolled, firstVisibleItemIndex, firstVisibleItemCentered, scrollToItem]);

    const content = useMemo(
        () =>
            visibleItems.map((item) => {
                if (!itemSize) {
                    declareItem(item);
                }

                return (
                    <div
                        ref={(el) => {
                            if (!el) return;
                            if (!itemSize) {
                                resolveItemSize(item, { height: el.clientHeight, width: el.clientWidth });
                            }
                        }}
                        key={getItemId(item)}
                    >
                        {renderItem(item)}
                    </div>
                );
            }),
        [visibleItems, renderItem, getItemId, itemSize],
    );

    return (
        <div {...etc} data-testid="virtualized-list">
            <ScrollingContainer
                contentOffset={contentOffset}
                fitToContent={fitToContent}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onScroll={onScroll}
                orientation={orientation}
                ref={scrollRef}
                reversed={reversed}
                scrollOffset={scrollOffset}
                scrollSize={totalSize}
                {...trackingEventListeners}
            >
                {content}
            </ScrollingContainer>
        </div>
    );
}
