# PillsList

PillsList component provides a list of pills that can be deleted.

```
<PillsList
  items={[
    { id: '1', label: 'Red' },
    { id: '2', label: 'Green' },
    { id: '3', label: 'Blue' },
  ]}
  onDelete={(item, index) => console.log(`Deleting pill ${item.label} at index ${index}`)}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| items | `PillItem[]` | `[]` | Array of items to display as pills |
| onDelete | `item: PillItem, index: number => void` | `() => {}` | Callback when a pill is deleted |
| disabled | `boolean` | `false` | Whether the pills are disabled |
| readOnly | `boolean` | `false` | Whether the pills are read-only (no delete button) |
| destructive | `boolean` | `false` | Whether to show the pills in a destructive state |
| size | `enum` | `medium` | Size of the pills - 'medium' or 'small' |
