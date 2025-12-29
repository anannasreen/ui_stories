# DateTimePicker

DateTimePicker component provides a native datetime picker input with customizable min/max bounds.
Automatically constrains date selection between 2016-01-01 and one year from now by default.

```
<DateTimePicker
  label="Event Date & Time"
  value={eventDateTime}
  onChange={setEventDateTime}
  min={new Date()}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| label | `ReactNode` |  | A label for the input. |
| value | `Date` |  | Current date and time value |
| onChange | `newValue: Date, e: ChangeEvent<HTMLInputElement> => void` |  | Callback function when date/time changes |
| width | `string` |  | Width of the input field |
| min | `Date` |  | Minimum allowed date (defaults to 2016-01-01) |
| max | `Date` |  | Maximum allowed date (defaults to one year from now) |
| disabled | `boolean` |  | A boolean value to specify if component is disabled. |
| id | `string` | `nanoid()` | An ID to be given to the input element. Used to link the label to the input. |
| helpText | `ReactNode` |  | Additional context about this input. Displayed below the input. |
| error | `string | false` |  | A form validation error to display below the input. |
| isSearchInput | `boolean` |  | Whether to show the search icon |
| prefixIcon | `ReactNode` |  | Custom prefix icon to show before the input text |
| suffix | `ReactNode` |  | Text or element to display after the input |
| learnMore | `ReactNode` |  | Additional element to display below the helpText, useful for links or additional information |
