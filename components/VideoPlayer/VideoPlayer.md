# VideoPlayer

VideoPlayer component for playing videos.

```
<VideoPlayer
  videoUrl="https://example.com/video.mp4"
  videoStartTime="2023-01-01T00:00:00"
  showTimestamps={true}
  showFullscreenButton={true}
  width="100%"
  showControls={true}
  aspectRatio="16/9"
  playOnHover={false}
  showMeridiem={true}
  onLoadedMetadata={() => {}}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| videoUrl | `string` |  | URL of the video file to play (MP4 format) |
| videoStartTime | `string` |  | ISO format UTC time string for the video's start time |
| videoEndTime | `string` |  | ISO format UTC time string for the video's end time |
| events | `TimelineEvent[]` | `[]` | Array of timeline events to display on the progress bar |
| showTimestamps | `boolean` | `true` | Whether to show timestamps in the control bar. Default: true |
| showFullscreenButton | `boolean` | `true` | Whether to show the fullscreen toggle button. Default: true |
| width | `string` | `100%` | Width of the video player container. Default: '100%' |
| showControls | `boolean` | `true` | Whether to show the video control bar. Default: true |
| aspectRatio | `string` | `16/9` | Aspect ratio for the video container (e.g., '16/9', '4/3'). Default: '16/9' |
| playOnHover | `boolean` | `false` | Whether to auto-play the video when hovering over it. Default: false |
| showMeridiem | `boolean` | `true` | Whether to show the meridiem (AM/PM) in the time display. Default: true |
| timezone | `string` |  | Timezone to display timestamps in. If not provided, local timezone is used. |
| onLoadedMetadata | ` => void` |  | Callback function called when the video has loaded |
