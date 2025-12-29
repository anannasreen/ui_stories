import React from 'react';
import { render, screen } from '@testing-library/react';
import EventInfo from './index';
import styles from './EventInfo.module.scss';

describe('EventInfo Component', () => {
    it('renders text correctly', () => {
        const text = 'Test Content';
        render(<EventInfo text={text} />);
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('renders with default props', () => {
        render(<EventInfo text="Test" />);
        const container = screen.getByTestId('event-info-container');
        const wrapper = screen.getByTestId('event-info-wrapper');

        expect(container).toHaveClass(styles.normal);
        expect(wrapper).toHaveClass(styles.wrapper);
        expect(container).not.toHaveClass(styles.muted);
    });

    it('renders with icon in right position by default', () => {
        const text = 'Test Content';
        const testIcon = <span>Icon</span>;
        render(<EventInfo text={text} icon={testIcon} />);

        const wrapper = screen.getByTestId('event-info-wrapper');
        const textElement = screen.getByText(text);
        const iconElement = screen.getByText('Icon');
        expect(wrapper.firstChild).toBe(textElement);
        expect(iconElement).toBeInTheDocument();
    });

    it('renders with icon in left position when specified', () => {
        const text = 'Test Content';
        const testIcon = <span>Icon</span>;
        render(<EventInfo text={text} icon={testIcon} iconPosition="left" />);

        const wrapper = screen.getByTestId('event-info-wrapper');
        const textElement = screen.getByText(text);
        const iconElement = screen.getByText('Icon');
        expect(wrapper.lastChild).toBe(textElement);
        expect(iconElement).toBeInTheDocument();
    });

    it('applies correct severity class', () => {
        render(<EventInfo text="Test" severity="critical" />);
        const container = screen.getByTestId('event-info-container');
        expect(container).toHaveClass(styles.critical);
    });

    it('renders without icon when not provided', () => {
        render(<EventInfo text="Test" />);
        const wrapper = screen.getByTestId('event-info-wrapper');
        expect(wrapper.children).toHaveLength(1);
        expect(wrapper.textContent).toBe('Test');
    });

    it('applies muted styles when muted prop is true', () => {
        render(<EventInfo text="Test" muted={true} />);
        const container = screen.getByTestId('event-info-container');
        expect(container).toHaveClass(styles.muted);
    });

    it('combines muted state with severity', () => {
        render(<EventInfo text="Test" severity="critical" muted={true} />);
        const container = screen.getByTestId('event-info-container');
        expect(container).toHaveClass(styles.critical);
        expect(container).toHaveClass(styles.muted);
    });

    it('combines muted state with variant', () => {
        render(<EventInfo text="Test" variant="title" muted={true} />);
        const container = screen.getByTestId('event-info-container');
        expect(container).toHaveClass(styles.title);
        expect(container).toHaveClass(styles.muted);
    });
});
