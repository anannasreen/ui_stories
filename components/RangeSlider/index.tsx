import React, { useContext } from 'react';
import {
    Input,
    Label,
    LabelContext,
    NumberField,
    Slider,
    SliderOutput,
    SliderStateContext,
    SliderThumb,
    SliderTrack,
    useSlottedContext,
} from 'react-aria-components';
import styles from './RangeSlider.module.scss';
import { getSliderTickPositions } from '../../utils/common';

const SliderNumberField = () => {
    const state = useContext(SliderStateContext);
    const labelProps = useSlottedContext(LabelContext);

    return (
        <NumberField
            aria-labelledby={labelProps?.id}
            value={state?.values[0]}
            onChange={(v) => state?.setThumbValue(0, v)}
            aria-label="number field"
        >
            <Input className={styles.Input} role="Input" aria-label="input" />
        </NumberField>
    );
};

type RangeSliderProps = {
    /** Slider default value */
    defaultValue?: number | number[];
    /** Add label for the slider */
    label?: string;
    /** Whether the whole Slider is disabled. */
    isDisabled?: boolean;
    /** allows a user to enter a number, and increment or decrement the value using stepper buttons */
    showSliderInput?: boolean;
    /** slider's maximum value */
    maxValue?: number;
    /** slider's minimum value */
    minValue?: number;
    /** slider's step value */
    step?: number;
    /** displays the current value of slider as text */
    showCurrentValue?: boolean;
    /** displays the slider ticks */
    showTicks?: boolean;
    /** Handler that is called when the value changes. */
    onChange?: (value: number | number[]) => void;
    /** The current value (controlled) */
    value?: number | number[];
    /** Defines a string label for each thumb */
    thumbLabels?: string[];
};

/**
 * RangeSlider component provides a slider with optional numeric input and tick marks.
 *
 * ```
 * <RangeSlider
 *   label="RangeSlider"
 *   defaultValue={0}
 *   isDisabled={false}
 *   showSliderInput={true}
 *   maxValue={100}
 *   minValue={0}
 *   step={10}
 *   showCurrentValue={true}
 *   showTicks={true}
 *   onChange={(value) => console.log(value)}
 *   value={0}
 *   thumbLabels={['slider-thumb']}
 * />
 * ```
 */
const RangeSlider = ({
    label,
    defaultValue = 0,
    isDisabled,
    showSliderInput,
    maxValue = 100,
    minValue = 0,
    step = 10,
    showCurrentValue = true,
    showTicks,
    onChange,
    value,
    thumbLabels = ['slider-thumb'],
}: RangeSliderProps) => {
    const tickMarks = getSliderTickPositions(minValue, maxValue, step);

    return (
        <Slider
            defaultValue={defaultValue}
            className={styles.Slider}
            isDisabled={isDisabled}
            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
            maxValue={maxValue}
            minValue={minValue}
            step={step}
            onChange={onChange}
            aria-label="slider"
            value={value}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {label ? <Label className={styles.Label}>{label}</Label> : null}
                {showSliderInput ? (
                    <div className={styles.SliderOutput}>
                        <SliderNumberField />
                    </div>
                ) : showCurrentValue ? (
                    <SliderOutput className={styles.SliderOutput}>
                        {({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(' - ')}
                    </SliderOutput>
                ) : null}
            </div>
            <div style={{ position: 'relative' }}>
                {showTicks &&
                    (tickMarks || []).map(({ tick, tickPosition }) => (
                        <div
                            key={tick}
                            className={styles.TickMark}
                            style={{
                                position: 'absolute',
                                left: `${tickPosition}%`,
                            }}
                            role="separator"
                        />
                    ))}
                <SliderTrack className={styles.SliderTrack}>
                    {({ state }) => (
                        <>
                            {state.values.map((_, i: number) => (
                                <SliderThumb
                                    key={i}
                                    index={i}
                                    aria-label={thumbLabels?.[i]}
                                    className={styles.SliderThumb}
                                />
                            ))}
                        </>
                    )}
                </SliderTrack>
            </div>
        </Slider>
    );
};

export default RangeSlider;
