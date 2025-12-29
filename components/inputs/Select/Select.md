# Select

Select component provides a dropdown list of options for the user to choose from.

```
<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]}
  value="1"
  onChange={(value) => console.log('Selected value:', value)}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| options | `readonly { value: string; label?: string; icon?: React.ReactNode; }[]` |  | Array of options to display in the select |
| value | `string | GetValue<Options[number], Required>[]` |  | Currently selected value |
| onChange | `value: GetValues<Options[number], Required, Multiple>, event?: ChangeEvent<HTMLSelectElement> => void` |  | Callback when selection changes |
| error | `string` |  | Error message to display below the select |
| required | `boolean` |  | Whether the field is required |
| disabled | `boolean` |  | Whether the field is disabled |
| destructive | `boolean` |  | Whether the field is destructive |
| label | `string` |  | Title to show above the select |
| hideLabel | `boolean` | `false` | Hide the label text above the select |
| name | `string` |  | Name of the field when used with react-hook-form |
| placeholder | `string` | `Select` | Placeholder text when no option is selected |
| multiple | `boolean` |  | Whether to allow multiple selections |
| id | `string` | `nanoid()` | Optional ID for the form group |
| icon | `React.ReactNode` |  | Icon to display next to the select |
| className | `string` |  | CSS class name to apply to the select |
| width | `string` |  | Use this prop to set an accessible width corresponding to the expected length of the values. |
| autoFocus | `boolean` |  | Whether to focus the input when clicking the container |
