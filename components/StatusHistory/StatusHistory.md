# StatusHistory

StatusHistory component displays a table of status history.

```
<StatusHistory
  data={[
    { id: 1, status: 'Active' },
    { id: 2, status: 'Inactive' },
  ]}
  columns={(column) => [
    column.id('id'),
    column.id('status'),
  ]}
  grow={true}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| data | `T[]` |  | The data to display in the table. |
| columns | `column: ColumnHelper<T> => ColumnDef<T, string>[]` |  | Function that returns column definitions. |
| grow | `boolean` |  | Whether the table should grow to fill available horizontal space. |
