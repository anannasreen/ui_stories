# CameraDetailsContainer

A component for displaying camera information in a standardized format.
Shows camera name with status indicator and a fullscreen button.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| cameraName | `string` |  | Name of the camera |
| status | `enum` | `online` | Status of the camera (online, offline) |
| className | `string` |  | Custom class name for additional styling |
| onFullScreenClick | ` => void` |  | Callback function when full screen button is clicked |
