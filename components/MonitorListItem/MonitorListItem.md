# MonitorListItem

MonitorListItem component provides a list view item with an image, title, status, priority, location, camera, and timestamp.

```
<MonitorListItem
  image="https://example.com/image.jpg"
  issueTitle="Issue 1"
  cameraLocation="Location 1"
  time="2023-01-01T00:00:00.000Z"
  sourceDevice="Device 1"
  eventStatus="active"
  priority="high"
  state="unread"
  href="https://example.com"
  onClick={() => console.log('Item clicked')}
/>
```



## monitorListItemVariants Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| priority | `enum` | `normal` | Priority of the event |
| state | `enum` | `unread` | Current state of the item |
| class | `ClassValue` |  |  |
| className | `ClassValue` |  |  |
