# Border

Border component creates a container with customizable borders.
Uses CSS variables to control border thickness and visibility.

```
<Border
  borderContents={<div className="border-element" />}
  thickness={2}
  visible={true}
>
  Content inside the border
</Border>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| thickness | `string | number` | 0 | Border thickness in pixels (number) or CSS value (string) |
| visible | `boolean` | true | Whether the border is visible |
| borderContents | `React.ReactNode` |  | Content to be displayed as the border itself |
