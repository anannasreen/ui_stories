# AudioVolumeControl

Audio volume control component with mute functionality

Provides an interactive volume control interface that includes a slider for volume adjustment
and buttons for quick mute/unmute operations.

```tsx
<AudioVolumeControl
  volume={0.5}
  muted={false}
  onChange={(volume, muted) => {
    console.log(`Volume: ${volume}, Muted: ${muted}`);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| volume | `number` |  | The current volume level, between 0 and 1 |
| muted | `boolean` | `false` | Whether the audio is muted |
| onChange | `volume: number, muted?: boolean => void` | `() => {}` | Callback function that's triggered when volume or mute state changes |
