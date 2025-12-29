# Table

Table component provides a styled table with consistent border collapse.
Use with TableHeaderCell, TableCell, and TableRow components for a complete table.

```
<Table width="100%">
  <thead>
    <tr>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Email</TableHeaderCell>
    </tr>
  </thead>
  <tbody>
    {data.map(row => (
      <TableRow
        key={row.id}
        zebraStriped={true}
        deletable={true}
        onDelete={() => handleDelete(row.id)}
      >
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
      </TableRow>
    ))}
  </tbody>
</Table>
```

