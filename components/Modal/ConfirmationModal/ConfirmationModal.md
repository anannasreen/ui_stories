# ConfirmationModal

ConfirmationModal component displays a modal dialog that requires user confirmation.
Handles async confirmation/cancellation with loading states and error handling.

```
<ConfirmationModal
  title="Confirm Action"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  confirmText="Delete"
  cancelText="Keep"
>
  Are you sure you want to delete this item?
</ConfirmationModal>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| onConfirm | `() => void) | (() => Promise<any>` |  | Function called when the user confirms the action |
| onCancel | `() => void) | (() => Promise<any>` |  | Function called when the user cancels the action |
| onClose | `result?: any => void` |  | Optional callback when the modal is closed (with either confirm or cancel) |
| confirmText | `string` | `Continue` | Text for the confirm button (defaults to "Continue") |
| cancelText | `string` | `Cancel` | Text for the cancel button (defaults to "Cancel") |
| isOpen | `boolean` |  | Whether the modal is open or closed. |
| title | `ReactNode` |  | A title to be displayed in a header at the top of the modal. Also adds a close button. |
| children | `ReactNode` |  | Content to be displayed inside the modal. |
| className | `string` |  | Will be passed as a class on the modal window container. |
| overlayClassName | `string` |  | CSS class to be applied to the overlay under the modal. |
| shouldCloseOnEsc | `boolean` |  | Close the modal on escape keypress (defaults to true). |
| shouldCloseOnOverlayClick | `boolean` |  | Boolean indicating if the overlay should close the modal. Defaults to true. |
| style | `{ content?: any; overlay?: any; }` |  | Object indicating styles to be used for the modal, divided into overlay and content styles. |
