# HotkeyGroup

Register a group of hotkeys to perform certain actions.

If rendering multiple HotkeyGroups on the same page, be sure to wrap them in a HotkeyRoot,
or the HotkeyOverlay will be inaccurate.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| groupName | `string` |  | Name of the hotkey group for organization in overlays |
| hotkeys | `HotkeyMap` |  | Map of hotkey configurations |
| local | `boolean` | false | Whether hotkeys should only work when this component is focused |
| children | `ReactNode` |  | Child components |
