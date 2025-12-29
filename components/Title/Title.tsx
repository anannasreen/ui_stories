import React, { HTMLProps } from 'react';
import { Helmet } from 'react-helmet';

interface Props extends HTMLProps<HTMLHeadingElement> {
    /** Text content for both the page title and heading */
    children: string;
    /** When true, only sets the document title without rendering an h1 element */
    headless?: boolean;
}

/**
 * Title component sets the document title and optionally renders an h1 heading.
 * Automatically appends "| Cobalt AI" to the document title for consistent branding.
 *
 * ```
 * <Title>Dashboard</Title>
 * ```
 */
export default function Title({ children, headless = false, ...etc }: Props) {
    return (
        <>
            <Helmet>
                <title>{children} | Cobalt AI</title>
            </Helmet>
            {!headless && <h1 {...etc}>{children}</h1>}
        </>
    );
}
