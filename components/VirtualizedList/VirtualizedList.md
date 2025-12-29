# VirtualizedList

A vertical and horizontal list component using virtualized scrolling. Useful for rendering very large lists
or lists where the total number of dom nodes rendered needs to be kept to a minimum.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| items | `ItemType[]` |  | Array of items to render in the list |
| firstVisibleItemIndex | `number` | 0 | Index of the first visible item to show on initial load (default: 0) |
| firstVisibleItemCentered | `boolean` | false | Should the first visible item be aligned to the center of the viewport? (default: false, aligned to the start) |
| renderItem | `(item: ItemType) => ReactElement<any, string | JSXElementConstructor<any>>` |  | Render function to render each item |
| itemSize | `number | ((item: ItemType) => number)` |  | The size (height for vertical lists, or width for horizontal lists) of a list item.
Can be a number, or a function returning a number. If no `itemSize` specified,
the item size will be dynamically determined (which can have a performance impact). |
| orientation | `enum` | Orientation.Horizontal | List orientation. Can be either Orientation.Vertical or Orientation.Horizontal |
| reversed | `boolean` | false | Make the list scroll right to left (for horizontal lists) or bottom to top (for vertical lists) |
| getItemId | `(item: ItemType) => string` |  | Function to get the unique id of each list item |
| getItemContentHash | `(item: ItemType) => string` |  | Function to get the content has of each list item. Used to check if items have changed. |
| frozen | `boolean` | false | If frozen, the list will attempt to maintain the current scroll view as items are added and removed |
| jumpToStartOnThaw | `boolean` | false | Scroll to the beginning of the list when frozen is disabled |
| fitToContent | `boolean` | !itemSize | Expand or shrink the list container to match item heights |
| overScan | `number` | 0 | Number of (invisible) items to render beyond the list boundary. Can help with scrolling performance. |
| onScroll | `(offset: number, totalScrollSize: number) => void` |  | Called when a user scrolls the list.
Offset is always measured from the logical "beginning" of the list.

For vertical lists offset is calculated from the top of the list container if the list isn't reversed,
and from the bottom of the container if it is.

For horizontal lists offset is calculated from the left of the list container if the list isn't reversed,
and from the right of the container if it is. |
| onVisibleItemsChanged | `(visibleItems: ItemType[]) => void` |  | Called when the currently visible list items change. |
