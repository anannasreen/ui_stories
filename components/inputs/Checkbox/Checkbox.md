# Checkbox

Checkbox component provides a styled checkbox input with customizable label positioning.
Supports standard checkbox features including checked, unchecked, and indeterminate states.

```
<Checkbox
  label="Accept terms and conditions"
  value={isChecked}
  onChange={setIsChecked}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| id | `string` |  | An ID to be given to the input element. Used to link the label to the input. |
| onChange | `newValue: boolean, e: ChangeEvent<HTMLInputElement> => any` |  | Callback function when the checkbox value changes |
| value | `boolean` |  | The checked state of the checkbox |
| label | `ReactNode` |  | A label for the checkbox. You can specify the position of the label using the `alignLabel` prop |
| alignLabel | `enum` |  | Specify position of label, relative to the checkbox. Defaults to 'right'.

The label should always be aligned on the inside. So when the input is left-aligned,
`alignLabel` should be "right", and vice versa. |
| indeterminate | `boolean` |  | Whether the checkbox should appear in an indeterminate state |
| destructive | `boolean` |  | Whether the checkbox should be rendered in a destructive state |
