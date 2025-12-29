import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkFlowStatus from '.';

describe('WorkFlowStatus', () => {
    const defaultDescription = 'Site filters';

    it('renders included status correctly', () => {
        render(<WorkFlowStatus variant="included" description={defaultDescription} status="person found" />);
        expect(screen.getByText('person found')).toBeInTheDocument();
        expect(screen.getByText(`${defaultDescription}:`)).toBeInTheDocument();
    });

    it('renders checking status correctly', () => {
        render(<WorkFlowStatus variant="checking" description={defaultDescription} status="Checking..." />);
        expect(screen.getByText('Checking...')).toBeInTheDocument();
        expect(screen.getByText(`${defaultDescription}:`)).toBeInTheDocument();
    });

    it('renders unchecked status correctly', () => {
        render(<WorkFlowStatus variant="unchecked" description={defaultDescription} status="Unchecked" />);
        expect(screen.getByText('Unchecked')).toBeInTheDocument();
        expect(screen.getByText(`${defaultDescription}:`)).toBeInTheDocument();
    });
});
