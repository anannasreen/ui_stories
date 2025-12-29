import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

afterEach(() => {
    cleanup();
});
