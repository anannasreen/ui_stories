# Popover

A Popover component that appears when a trigger element is clicked.
Uses React Aria's Popover component for accessibility.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `ReactElement<DOMAttributes<Element | HTMLOrSVGElement>, string>` |  | The trigger element that will open the popover when clicked |
| content | `ReactNode` |  | Content to be displayed inside the popover |
| onOpenChange | `isOpen: boolean => void` |  | Function that will be called when the popover opens or closes |
| title | `ReactNode` |  | Optional title for the popover |
| className | `string` |  | Optional CSS class for the popover container |
| contentClassName | `string` |  | Optional CSS class for the popover content |
| placement | `enum` | `bottom` | Optional placement of the popover relative to the trigger |
| offset | `number` | `8` | Optional offset of the popover from the trigger |
| style | `{ content?: React.CSSProperties; }` |  | Optional styles to apply to the popover |
| width | `string | number` |  | Optional width for the popover |
| defaultOpen | `boolean` |  | Optional default open state |
