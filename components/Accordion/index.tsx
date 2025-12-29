import React, { ReactNode, Key, createRef, forwardRef } from 'react';
import { DisclosureGroup, Disclosure, Button, DisclosurePanel, Heading } from 'react-aria-components';
import { KeyboardProps, useKeyboard } from 'react-aria';
import styles from './Accordion.module.scss';

enum KeyboardEvent {
    HOME = 'Home',
    END = 'End',
}

const ChevronIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

/**
 * Props for an individual Accordion item
 */
export interface AccordionItemProps {
    /** The unique key for the accordion item */
    id: Key;
    /** The title of the accordion item */
    title: ReactNode;
    /** The content of the accordion item */
    children: ReactNode;
    /** Whether the accordion item is disabled */
    isDisabled?: boolean;
    /** Handler that is called when a key is pressed */
    keyboardProps?: KeyboardProps;
}

/**
 * Props for the Accordion component
 */
export interface AccordionProps {
    /** The items to display in the accordion */
    items: AccordionItemProps[];
    /** Whether the accordion is disabled */
    isDisabled?: boolean;
    /** Default expanded keys */
    defaultExpandedKeys?: Iterable<Key>;
    /** Custom icon component */
    customIcon?: ReactNode;
    /** Whether multiple items can be expanded at the same time */
    allowsMultipleExpanded?: boolean;
}

/**
 * Individual accordion item component
 *
 * Renders a single collapsible section with a header and content panel
 */
const AccordionItem = forwardRef<HTMLButtonElement, AccordionItemProps & { customIcon?: ReactNode }>(
    (
        { id, title, children, isDisabled, customIcon, keyboardProps }: AccordionItemProps & { customIcon?: ReactNode },
        forwardedRef,
    ) => {
        return (
            <Disclosure className={styles.Disclosure} id={id} isDisabled={isDisabled}>
                <Heading>
                    <Button
                        className={styles.Button}
                        slot="trigger"
                        {...keyboardProps}
                        ref={forwardedRef}
                        style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                    >
                        {customIcon || <ChevronIcon />}
                        {title}
                    </Button>
                </Heading>
                <DisclosurePanel className={styles.DisclosurePanel}>{children}</DisclosurePanel>
            </Disclosure>
        );
    },
);

/**
 * Accordion component for displaying collapsible content sections
 *
 * The Accordion provides an accessible way to show and hide content sections,
 * built with react-aria-components for complete accessibility support.
 *
 * ```tsx
 * <Accordion
 *   items={[
 *     {
 *       id: "1",
 *       title: "Section 1",
 *       children: <p>Content for section 1</p>
 *     },
 *     {
 *       id: "2",
 *       title: "Section 2",
 *       children: <p>Content for section 2</p>
 *     }
 *   ]}
 *   allowsMultipleExpanded={true}
 * />
 * ```
 */
export const Accordion = ({
    items,
    isDisabled,
    defaultExpandedKeys,
    customIcon,
    allowsMultipleExpanded = true,
}: AccordionProps) => {
    const firstAccordionRef = createRef<HTMLButtonElement>();
    const lastAccordionRef = createRef<HTMLButtonElement>();

    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            event.continuePropagation();
            if (event.key === KeyboardEvent.HOME) {
                event.preventDefault();
                firstAccordionRef?.current?.focus();
            } else if (event.key === KeyboardEvent.END) {
                event.preventDefault();
                lastAccordionRef?.current?.focus();
            }
        },
    });

    return (
        <DisclosureGroup
            defaultExpandedKeys={defaultExpandedKeys}
            allowsMultipleExpanded={allowsMultipleExpanded}
            isDisabled={isDisabled}
        >
            {items.map((item, index) => (
                <AccordionItem
                    key={item.id}
                    {...item}
                    customIcon={customIcon}
                    ref={index === 0 ? firstAccordionRef : index === items.length - 1 ? lastAccordionRef : null}
                    keyboardProps={keyboardProps}
                />
            ))}
        </DisclosureGroup>
    );
};
