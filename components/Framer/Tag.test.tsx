import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tag from './Tag';

describe('Tag', () => {
    it('renders with onlyChild prop', () => {
        render(
            <Tag color="#ff0000" width={100} onlyChild>
                Test Tag
            </Tag>,
        );

        const tag = screen.getByText('Test Tag').parentElement?.parentElement;
        expect(tag).toBeInTheDocument();
    });
});
