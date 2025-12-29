import { render, screen } from '@testing-library/react';
import EventDetails from '.';
import React from 'react';

describe('EventDetails', () => {
    it('should render title and description when provided', () => {
        render(<EventDetails title="Test title">Test description</EventDetails>);
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getByText('Test title')).toBeInTheDocument();
    });
});
