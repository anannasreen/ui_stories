# FormGroup

FormGroup component provides a container for form elements with optional labels, help text, and validation.

```
<FormGroup
  id="username"
  label="Username"
  helpText="Enter your username"
  error="Username is required"
>
  <input type="text" id="username" name="username" />
</FormGroup>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| id | `string` |  | The ID of the focusable input this FormGroup wraps. |
| helpText | `ReactNode` |  | Help text to be displayed below the input. |
| learnMore | `ReactNode` |  | Learn more text to be displayed above the input. |
| label | `ReactNode` |  | A label to be displayed above the input. |
| suffix | `ReactNode` |  | Right-aligned inline helper string or component e.g. unit of measurement or icon |
| disabled | `boolean` |  | Whether the input is disabled. |
| children | `ReactNode` |  | The child component to be displayed inside the FormGroup. |
| error | `ReactNode` |  | A validation error to be displayed below the input. |
| focusOnClick | `boolean` |  | Whether to focus the input when clicking the container |
