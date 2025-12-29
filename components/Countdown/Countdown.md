# Countdown

Countdown component displays a timer counting down to a specified date.

```tsx
// Counts down to 5 minutes from now
const targetDate = new Date(Date.now() + 5 * 60 * 1000);
<Countdown to={targetDate} />
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| to | `Date` |  | Target date to count down to |
