# Button

A versatile Button component that supports various visual styles, sizes, and icon placements.
Can be rendered as a button or a link based on whether the href prop is provided.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| icon | `React.ReactNode` |  | Optional icon to display in the button |
| iconPosition | `enum` | `start` | Position of the icon relative to button text. Defaults to 'start' |
| children | `React.ReactNode` |  | Button content |
| iconOnly | `boolean` | `false` | Whether to show only the icon without text |
| rounded | `boolean` |  | Whether the button should have rounded corners (useful for icon buttons) |
| href | `string` |  | URL to navigate to when the button is clicked. Renders as a Link instead of a button |
| target | `string` |  | Target attribute for the link when href is provided |
| rel | `string` |  | Rel attribute for the link when href is provided |
| title | `string` |  | Title text to display in a tooltip when hovering over the button |
| download | `string` |  | Download attribute for the link when href is provided |
| color | `enum` | `primary` |  |
| variant | `enum` | `default` |  |
| size | `enum` |  | Size of the button |


## buttonVariants Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color | `enum` | `primary` |  |
| variant | `enum` | `default` |  |
| size | `enum` |  | Size of the button |
| class | `ClassValue` |  |  |
| className | `ClassValue` |  |  |
