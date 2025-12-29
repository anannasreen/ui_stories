import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from './index';
import styles from './Text.module.scss';

describe('Text Component', () => {
    it('renders with default variant', () => {
        render(<Text>Default Text</Text>);
        const element = screen.getByText('Default Text');
        expect(element.tagName.toLowerCase()).toBe('div');
        expect(element).toHaveClass(styles.bodyLgRegular);
    });

    it('renders with custom HTML tag', () => {
        render(<Text as="h1">Heading Text</Text>);
        const element = screen.getByText('Heading Text');
        expect(element.tagName.toLowerCase()).toBe('h1');
    });

    it('applies custom className', () => {
        const customClass = 'custom-class';
        render(<Text className={customClass}>Custom Class Text</Text>);
        expect(screen.getByText('Custom Class Text')).toHaveClass(customClass);
    });

    // Test heading variants
    describe('Heading Variants', () => {
        it('renders heading-display variant', () => {
            render(<Text variant="heading-display">Display Heading</Text>);
            expect(screen.getByText('Display Heading')).toHaveClass(styles.headingDisplay);
        });

        it('renders heading-title variant', () => {
            render(<Text variant="heading-title">Title Heading</Text>);
            expect(screen.getByText('Title Heading')).toHaveClass(styles.headingTitle);
        });

        it('renders heading variants', () => {
            const headingTests = [
                { variant: 'heading-h1', tag: 'h1', className: styles.headingH1 },
                { variant: 'heading-h2', tag: 'h2', className: styles.headingH2 },
                { variant: 'heading-h3', tag: 'h3', className: styles.headingH3 },
                { variant: 'heading-h4', tag: 'h4', className: styles.headingH4 },
                { variant: 'heading-h5', tag: 'h5', className: styles.headingH5 },
                { variant: 'heading-h6', tag: 'h6', className: styles.headingH6 },
            ] as const;

            headingTests.forEach(({ variant, tag, className }) => {
                render(
                    <Text variant={variant} as={tag}>
                        {`${tag} Heading`}
                    </Text>,
                );
                const element = screen.getByText(`${tag} Heading`);
                expect(element.tagName.toLowerCase()).toBe(tag);
                expect(element).toHaveClass(className);
            });
        });
    });

    // Test body text variants
    describe('Body Text Variants', () => {
        const bodyTests = [
            { variant: 'body-xxl-regular', className: 'bodyXxlRegular' },
            { variant: 'body-xxl-med', className: 'bodyXxlMed' },
            { variant: 'body-xxl-bold', className: 'bodyXxlBold' },
            { variant: 'body-xl-regular', className: 'bodyXlRegular' },
            { variant: 'body-xl-med', className: 'bodyXlMed' },
            { variant: 'body-xl-bold', className: 'bodyXlBold' },
            { variant: 'body-lg-regular', className: 'bodyLgRegular' },
            { variant: 'body-lg-med', className: 'bodyLgMed' },
            { variant: 'body-lg-bold', className: 'bodyLgBold' },
            { variant: 'body-md-regular', className: 'bodyMdRegular' },
            { variant: 'body-md-med', className: 'bodyMdMed' },
            { variant: 'body-md-bold', className: 'bodyMdBold' },
            { variant: 'body-sm-regular', className: 'bodySmRegular' },
            { variant: 'body-sm-med', className: 'bodySmMed' },
            { variant: 'body-sm-bold', className: 'bodySmBold' },
        ] as const;

        bodyTests.forEach(({ variant, className }) => {
            it(`renders ${variant} variant`, () => {
                render(<Text variant={variant}>Body Text</Text>);
                expect(screen.getByText('Body Text')).toHaveClass(styles[className]);
            });
        });

        it('renders body-xs-regular variant', () => {
            render(<Text variant="body-xs-regular">XS Text</Text>);
            expect(screen.getByText('XS Text')).toHaveClass(styles.bodyXsRegular);
        });

        it('renders body-sm-md-upper-case variant', () => {
            render(<Text variant="body-sm-md-upper-case">Uppercase Text</Text>);
            expect(screen.getByText('Uppercase Text')).toHaveClass(styles.bodySmMdUpperCase);
        });
    });

    // Test combinations
    it('combines variant styles with custom className', () => {
        const customClass = 'custom-class';
        render(
            <Text variant="heading-display" className={customClass}>
                Combined Styles
            </Text>,
        );
        const element = screen.getByText('Combined Styles');
        expect(element).toHaveClass(styles.headingDisplay);
        expect(element).toHaveClass(customClass);
    });
});
