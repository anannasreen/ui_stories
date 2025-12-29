# Modal

A general-purpose modal component. It uses react-aria-components
to ensure good accessibility.

Use the `title` prop for a nice default header, or use `<ModalTitle>` and `<ModalCloseButton>` for
accessible custom layouts.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| isOpen | `boolean` |  | Whether the modal is open or closed. |
| title | `ReactNode` |  | A title to be displayed in a header at the top of the modal. Also adds a close button. |
| children | `ReactNode` |  | Content to be displayed inside the modal. |
| className | `string` |  | Will be passed as a class on the modal window container. |
| onClose | `e?: MouseEvent<Element, MouseEvent> => void` |  | Function that will be run when the modal requests to be closed. |
| overlayClassName | `string` |  | CSS class to be applied to the overlay under the modal. |
| shouldCloseOnEsc | `boolean` | `true` | Close the modal on escape keypress (defaults to true). |
| shouldCloseOnOverlayClick | `boolean` | `true` | Boolean indicating if the overlay should close the modal. Defaults to true. |
| style | `{ content?: any; overlay?: any; }` |  | Object indicating styles to be used for the modal, divided into overlay and content styles. |
