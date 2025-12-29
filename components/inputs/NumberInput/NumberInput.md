# NumberInput

Just like an HTML `<input type="number">` element, but with optional built-in label and error feedback.
Use a NumberInput when you want to collect a number from the user.

Try to set the width to the expected input length as a hint to the user of how much text to use.

In addition to the documented props, it supports all the props a normal `<input type="number">` would.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| width | `string` |  | A CSS value to set for the width, provided as a convenience for tweaking form layouts. |
| label | `ReactNode` |  | A label for the input. |
| onChange | `newValue: number, e: ChangeEvent<HTMLInputElement> => any` |  | The new numeric value is provided as a convenience for state updaters. |
| value | `number` |  |  |
| id | `string` |  | An ID to be given to the input element. Used to link the label to the input. |
| helpText | `ReactNode` |  | Additional context about this input. Displayed below the input. |
| learnMore | `ReactNode` |  | This node will be rendered in the label row, on the right side of the input.
Use it to link to more detailed information on the input. |
| error | `string | false` |  | A form validation error to display below the input. |
| suffix | `ReactNode` |  | Right-aligned inline helper string or component e.g. unit of measurement or icon |
