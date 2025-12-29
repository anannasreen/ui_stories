# TextArea

Just like an HTML `<textarea>` element, but with optional built-in label and error feedback.
Use a TextArea in places where we want to capture long form text from a user.

The input can be resized, but by default won't grow beyond the width of its container.

In addition to the documented props, it supports all the props a normal `<textarea>` would.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| width | `string` |  | A CSS value to set for the width, provided as a convenience for tweaking form layouts. |
| label | `ReactNode` |  | A label for the input. |
| onChange | `newValue: string, e: ChangeEvent<HTMLTextAreaElement> => any` |  | The new string value is provided as a convenience for state updaters. |
| id | `string` |  | An ID to be given to the input element. Used to link the label to the input. |
| helpText | `ReactNode` |  | Additional context about this input. Displayed below the input. |
| learnMore | `ReactNode` |  | This node will be rendered in the label row, on the right side of the input.
Use it to link to more detailed information on the input. |
| error | `string | false` |  | A form validation error to display below the input. |
| autoSize | `boolean` |  | Grow textarea automatically to fit content |
