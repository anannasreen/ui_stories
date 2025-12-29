import { createContext } from 'react';

import { FrameType } from './types';

export type Api = (id: string, frame?: FrameType | null, finalContent?: React.ReactNode) => void;
const framerApiContext = createContext<Api | null>(null);

export default framerApiContext;
