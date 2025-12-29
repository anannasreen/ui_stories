# EventCard

EventCard is a compound component for displaying event information with various sections.
It supports different priorities and sizes, and can be composed with several subcomponents.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| priority | `EventPriority` | `normal` | Priority of the event |
| size | `enum` | `large` | Size of the event card |
| children | `React.ReactNode` |  | Children components |
| className | `string` |  | Additional class name |
