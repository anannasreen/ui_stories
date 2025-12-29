import { HTMLProps } from 'react';
import { HTMLMotionProps } from 'framer-motion';

export { default as PulseOnChange } from './PulseOnChange';
export { default as FadeOnChange } from './FadeOnChange';

export type SharedAnimatedAndStaticDivProps = Omit<
    HTMLMotionProps<'div'> & HTMLProps<HTMLDivElement>,
    'value' | 'children'
>;
