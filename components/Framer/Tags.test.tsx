import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tags from './Tags';
import Tag from './Tag';

describe('Tags', () => {
    it('renders children correctly', () => {
        render(
            <Tags>
                <Tag color="#ff0000" width={100}>
                    Tag 1
                </Tag>
                <Tag color="#00ff00" width={100}>
                    Tag 2
                </Tag>
            </Tags>,
        );

        expect(screen.getByText('Tag 1')).toBeInTheDocument();
        expect(screen.getByText('Tag 2')).toBeInTheDocument();
    });

    it('renders without children', () => {
        render(<Tags data-testid="tags-container" />);
        expect(screen.getByTestId('tags-container')).toBeInTheDocument();
    });

    it('applies custom attributes', () => {
        render(
            <Tags data-testid="tags-container">
                <Tag color="#ff0000" width={100}>
                    Test Tag
                </Tag>
            </Tags>,
        );

        expect(screen.getByTestId('tags-container')).toBeInTheDocument();
    });
});
