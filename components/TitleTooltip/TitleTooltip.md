# TitleTooltip

A component that wraps children with a tooltip that displays the title text.
This is especially useful for Button components that need tooltips.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | `string` |  | The title text to display in the tooltip |
| children | `ReactElement<DOMAttributes<Element>, string>` |  | The element to wrap with the tooltip |
| className | `string` |  | Optional className for the tooltip |
| delay | `number` | `300` | Delay before showing the tooltip in milliseconds |
| offset | `number` | `8` | Optional offset from the trigger element |
| disabled | `boolean` | `false` | Whether the tooltip is disabled |
| placement | `enum` | `top` | Placement of the tooltip relative to the trigger element |
