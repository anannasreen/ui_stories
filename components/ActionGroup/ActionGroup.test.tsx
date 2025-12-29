import React from 'react';
import { render, screen } from '@testing-library/react';
import ActionGroup from './index';
import Button from '../Button';
import styles from './ActionGroup.module.scss';

describe('ActionGroup', () => {
    it('renders children correctly', () => {
        render(
            <ActionGroup>
                <Button>First</Button>
                <Button>Second</Button>
            </ActionGroup>,
        );
        expect(screen.getByText('First')).toBeInTheDocument();
        expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('applies default horizontal orientation', () => {
        const { container } = render(
            <ActionGroup>
                <Button>Test</Button>
            </ActionGroup>,
        );
        expect(container.firstChild).toHaveClass(styles.actionGroup);
        expect(container.firstChild).not.toHaveClass(styles.vertical);
    });

    it('applies vertical orientation when specified', () => {
        const { container } = render(
            <ActionGroup orientation="vertical">
                <Button>Test</Button>
            </ActionGroup>,
        );
        expect(container.firstChild).toHaveClass(styles.vertical);
    });

    it('applies custom className alongside default classes', () => {
        const { container } = render(
            <ActionGroup className="custom-class">
                <Button>Test</Button>
            </ActionGroup>,
        );
        expect(container.firstChild).toHaveClass(styles.actionGroup);
        expect(container.firstChild).toHaveClass('custom-class');
    });

    it('spreads additional props to div element', () => {
        render(
            <ActionGroup data-testid="test-group" aria-label="Action Group">
                <Button>Test</Button>
            </ActionGroup>,
        );
        const group = screen.getByTestId('test-group');
        expect(group).toHaveAttribute('aria-label', 'Action Group');
    });
});
