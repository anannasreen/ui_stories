# RangeSlider

RangeSlider component provides a slider with optional numeric input and tick marks.

```
<RangeSlider
  label="RangeSlider"
  defaultValue={0}
  isDisabled={false}
  showSliderInput={true}
  maxValue={100}
  minValue={0}
  step={10}
  showCurrentValue={true}
  showTicks={true}
  onChange={(value) => console.log(value)}
  value={0}
  thumbLabels={['slider-thumb']}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| defaultValue | `number | number[]` | `0` | Slider default value |
| label | `string` |  | Add label for the slider |
| isDisabled | `boolean` |  | Whether the whole Slider is disabled. |
| showSliderInput | `boolean` |  | allows a user to enter a number, and increment or decrement the value using stepper buttons |
| maxValue | `number` | `100` | slider's maximum value |
| minValue | `number` | `0` | slider's minimum value |
| step | `number` | `10` | slider's step value |
| showCurrentValue | `boolean` | `true` | displays the current value of slider as text |
| showTicks | `boolean` |  | displays the slider ticks |
| onChange | `value: number | number[] => void` |  | Handler that is called when the value changes. |
| value | `number | number[]` |  | The current value (controlled) |
| thumbLabels | `string[]` | `['slider-thumb']` | Defines a string label for each thumb |
