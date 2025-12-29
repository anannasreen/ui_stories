# Group

MultiToggleGroup component.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| className | `string` |  | styles for the element |
| isDisabled | `boolean` |  | set the disabled state for all group options |
| children | `React.ReactNode` |  | toggle group choices |
| orientation | `enum` | horizontal | orientation of the toggle group |
| fullWidth | `boolean` |  | whether the group should take up full width |
| size | `enum` | small | size variant of the buttons |
| onSelectionChange | `(keys: Set<Key>) => void` |  | callback when selection changes |
| selectedKeys | `Set<Key>` |  | current selected keys |
| defaultSelectedKeys | `Set<Key>` |  | default selected keys |
| selectionMode | `enum` | single | selection mode |
