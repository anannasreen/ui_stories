# TextInput

TextInput component for collecting user input with various states including default, hover, selected/active, destructive, and disabled.
Supports search functionality with an optional search icon.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| width | `React.CSSProperties` |  | A CSS value to set for the width, provided as a convenience for tweaking form layouts. |
| label | `ReactNode` |  | A label for the input. |
| onChange | `newValue: string, e: ChangeEvent<HTMLInputElement> => any` |  | The new string value is provided as a convenience for state updaters. |
| disabled | `boolean` |  | A boolean value to specify if component is disabled. |
| id | `string` |  | An ID to be given to the input element. Used to link the label to the input. |
| helpText | `ReactNode` |  | Additional context about this input. Displayed below the input. |
| error | `string | false` |  | A form validation error to display below the input. |
| isSearchInput | `boolean` |  | Whether to show the search icon |
| prefixIcon | `ReactNode` |  | Custom prefix icon to show before the input text |
| suffix | `ReactNode` |  | Text or element to display after the input |
| learnMore | `ReactNode` |  | Additional element to display below the helpText, useful for links or additional information |
