# Progress

`<Progress />` is used to indicate an ongoing process.
Currently, it only supports a circular, indeterminate form.

It defaults to the surrounding `color` value (`currentColor`).

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| borderSize | `string` | ``calc(${size} / 8)`` | CSS value for the thickness of the ring. |
| color | `string` | `currentColor` | CSS value for the color of the ring. |
| duration | `string` | `1s` | CSS value for the length of the animation. |
| size | `string` | `16px` | CSS value for the width & height of the indicator.
The default is meant to match the size of our copy & icons. |
| space | `string` |  | CSS value for the margin around the ring. |
| paused | `boolean` |  | If true, the animation will not run. |
