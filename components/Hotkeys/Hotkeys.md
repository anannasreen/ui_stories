# HotkeyRoot

Root component for hotkey context.
Wrap multiple HotkeyGroup components in this to ensure proper coordination.

```
<HotkeyRoot>
  <HotkeyGroup groupName="navigation" hotkeys={navHotkeys}>
    <App />
  </HotkeyGroup>
</HotkeyRoot>
```



## HotkeyGroup Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| groupName | `string` |  | Name of the hotkey group for organization in overlays |
| hotkeys | `HotkeyMap` |  | Map of hotkey configurations |
| local | `boolean` | `false` | Whether hotkeys should only work when this component is focused |
| children | `ReactNode` |  | Child components |
