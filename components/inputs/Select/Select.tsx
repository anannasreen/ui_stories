import React, { ChangeEvent, useState, useEffect, useRef, useMemo, useCallback, CSSProperties } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import FormGroup from '../FormGroup';
import css from './Select.module.scss';
import { Text } from '@cobalt/ui/components/Text';
import { nanoid } from 'nanoid';
import { PillsList } from '@cobalt/ui/components/inputs/PillsList';
import CheckIcon from '../../assets/check-icon.svg';
import { ComboBox, Input, Button, ListBox, ListBoxItem, Popover, Key, Selection } from 'react-aria-components';
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdSearch } from 'react-icons/md';

type GetValue<T, Required extends boolean> =
    | (T extends { value: infer U } ? U : never)
    | (Required extends true ? never : '');

type GetValues<T, Required extends boolean, Multiple extends Boolean> = Multiple extends true
    ? GetValue<T, Required>[]
    : GetValue<T, Required>;

export type { GetValue, GetValues };

export interface SelectProps<
    Options extends readonly { value: string; label?: string; icon?: React.ReactNode }[],
    Required extends boolean = false,
    Multiple extends boolean = false,
> {
    /** Array of options to display in the select */
    options: Options;
    /** Currently selected value */
    value?: GetValues<Options[number], Required, Multiple>;
    /** Callback when selection changes */
    onChange?: (value: GetValues<Options[number], Required, Multiple>, event?: ChangeEvent<HTMLSelectElement>) => void;
    /** Error message to display below the select */
    error?: string;
    /** Whether the field is required */
    required?: Required;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Whether the field is destructive */
    destructive?: boolean;
    /** Title to show above the select */
    label?: string;
    /** Hide the label text above the select */
    hideLabel?: boolean;
    /** Name of the field when used with react-hook-form */
    name?: string;
    /** Placeholder text when no option is selected */
    placeholder?: string;
    /** Whether to allow multiple selections */
    multiple?: Multiple;
    /** Optional ID for the form group */
    id?: string;
    /** Icon to display next to the select */
    icon?: React.ReactNode;
    /** CSS class name to apply to the select */
    className?: string;
    /** Use this prop to set an accessible width corresponding to the expected length of the values. */
    width?: string;
    /** Whether to focus the input when clicking the container */
    autoFocus?: boolean;
}

/**
 * Select component provides a dropdown list of options for the user to choose from.
 *
 * ```
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *     { value: '3', label: 'Option 3' },
 *   ]}
 *   value="1"
 *   onChange={(value) => console.log('Selected value:', value)}
 * />
 * ```
 */
export default function Select<
    Options extends readonly { value: string; label?: string; icon?: React.ReactNode }[],
    Required extends boolean = false,
    Multiple extends boolean = false,
>({
    options,
    value,
    onChange,
    error,
    required,
    disabled,
    destructive,
    label,
    hideLabel = false,
    name,
    placeholder = 'Select',
    multiple,
    id = nanoid(),
    icon,
    width,
    autoFocus,
    ...selectProps
}: SelectProps<Options, Required, Multiple>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState<string[]>(
        multiple ? (Array.isArray(value) && value.length > 0 ? value : []) : [],
    );
    const [selectedValue, setSelectedValue] = useState<string>(multiple ? '' : (value as string) || '');
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const [visiblePillsCount, setVisiblePillsCount] = useState(1);

    // Update internal state when value prop changes
    useEffect(() => {
        if (multiple) {
            setSelectedValues(Array.isArray(value) && value.length > 0 ? value : []);
        } else {
            setSelectedValue((value as string) || '');
        }
    }, [value, multiple]);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputWrapperRef = useRef<HTMLDivElement>(null);
    const optionsListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen && multiple) {
            setSearchTerm('');
        }
    }, [isOpen]);

    const filteredOptions = useMemo(() => {
        const trimmedSearch = searchTerm.trim().toLowerCase();
        return options.filter((option) => {
            const label = (option.label || option.value).toLowerCase();
            return trimmedSearch === '' || label.includes(trimmedSearch);
        });
    }, [options, searchTerm]);

    useEffect(() => {
        if (isOpen && buttonRef.current && dropdownRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Position the dropdown below the button with fixed positioning
            dropdownRef.current.style.position = 'fixed';
            dropdownRef.current.style.width = `${buttonRect.width}px`;
            dropdownRef.current.style.left = `${buttonRect.left}px`;
            dropdownRef.current.style.top = `${buttonRect.bottom + 10}px`;

            // Adjust position if dropdown would go off screen
            const dropdownHeight = dropdownRef.current.offsetHeight;
            if (buttonRect.bottom + dropdownHeight > viewportHeight) {
                dropdownRef.current.style.top = `${buttonRect.top - dropdownHeight}px`;
            }
        }
    }, [isOpen]);

    const handleScroll = useCallback(() => {
        const optionsList = optionsListRef.current;
        if (!optionsList) return;

        const { scrollTop, scrollHeight, clientHeight } = optionsList;
        setCanScrollUp(scrollTop > 0);
        setCanScrollDown(scrollTop + clientHeight < scrollHeight);
    }, []);

    useEffect(() => {
        const optionsList = optionsListRef.current;
        if (!optionsList) return;

        optionsList.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial scroll state

        return () => {
            optionsList.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const checkScrollState = useCallback(() => {
        const container = optionsListRef.current;
        if (!container) return;

        setCanScrollUp(container.scrollTop > 0);
        setCanScrollDown(container.scrollTop + container.clientHeight < container.scrollHeight);
    }, []);

    useEffect(() => {
        const container = optionsListRef.current;
        if (!container) return;

        container.addEventListener('scroll', checkScrollState);
        return () => container.removeEventListener('scroll', checkScrollState);
    }, [checkScrollState]);

    useEffect(() => {
        const optionsContainer = optionsListRef.current;
        if (optionsContainer) {
            const handleScroll = () => {
                requestAnimationFrame(checkScrollState);
            };

            checkScrollState();
            optionsContainer.addEventListener('scroll', handleScroll);
            return () => optionsContainer.removeEventListener('scroll', handleScroll);
        }
    }, [filteredOptions, isOpen]);

    useEffect(() => {
        if (isOpen) {
            const optionsContainer = optionsListRef.current;
            if (optionsContainer) {
                optionsContainer.scrollTop = 0;
                checkScrollState();
            }
        }
    }, [isOpen]);

    const handleScrollUp = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const optionsContainer = optionsListRef.current;
        if (!optionsContainer) return;

        optionsContainer.scrollTop -= 100;
    };

    const handleScrollDown = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const optionsContainer = optionsListRef.current;
        if (!optionsContainer) return;

        optionsContainer.scrollTop += 100;
    };

    const handleClearAll = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedValues([]);
        onChange?.([] as GetValues<Options[number], Required, Multiple>);
    };

    const handleOptionClick = (value: string) => {
        if (multiple) {
            const newValues = selectedValues.includes(value)
                ? selectedValues.filter((v) => v !== value)
                : [...selectedValues, value];
            setSelectedValues(newValues);
            onChange?.(newValues as GetValues<Options[number], Required, Multiple>);
        } else {
            setSelectedValue(value);
            onChange?.(value as GetValues<Options[number], Required, Multiple>);
            setIsOpen(false);
        }
    };

    const methods = useFormContext();
    const rhfProps = name && methods ? methods?.register(name, { required }) : null;

    useEffect(() => {
        if (!inputWrapperRef.current || !multiple) return;

        const calculateVisiblePills = () => {
            const container = inputWrapperRef.current;
            if (!container) return;

            const containerWidth = container.clientWidth;
            const pillElements = container.querySelectorAll('[data-testid="pill"]');

            if (selectedValues.length === 0) {
                setVisiblePillsCount(1);
                return;
            }

            let totalWidth = 0;
            let visibleCount = 0;
            const moreIndicatorWidth = 80; // Width for "+N more"
            const inputMinWidth = 100; // Minimum width for input
            const availableWidth =
                containerWidth - inputMinWidth - (selectedValues.length > 1 ? moreIndicatorWidth : 0);

            // Calculate how many pills can fit
            pillElements.forEach((pill, index) => {
                if (index >= selectedValues.length) return;
                const pillWidth = pill.getBoundingClientRect().width + 8; // Add gap

                if (totalWidth + pillWidth <= availableWidth) {
                    totalWidth += pillWidth;
                    visibleCount++;
                }
            });

            setVisiblePillsCount(Math.max(1, visibleCount));
        };

        // Initial calculation
        calculateVisiblePills();

        // Recalculate on resize
        const observer = new ResizeObserver(calculateVisiblePills);
        observer.observe(inputWrapperRef.current);

        return () => observer.disconnect();
    }, [multiple, selectedValues.length]);

    return (
        <FormGroup
            id={id}
            error={error}
            required={required}
            {...(rhfProps && { ...rhfProps })}
            {...selectProps}
            disabled={disabled}
            style={{ width }}
        >
            <ComboBox
                className={clsx(css.selectContainer, {
                    [css.selected]: isOpen,
                    [css.disabled]: disabled,
                    [css.destructive]: destructive,
                })}
                defaultItems={options}
                selectedKey={multiple ? undefined : selectedValue}
                onSelectionChange={(selection: Key | null) => {
                    if (typeof selection === 'string') {
                        handleOptionClick(selection);
                        if (!multiple) {
                            setSearchTerm('');
                        }
                    }
                }}
                isDisabled={disabled}
                onOpenChange={setIsOpen}
                inputValue={searchTerm}
                onInputChange={setSearchTerm}
                data-testid="select-container"
                aria-label={label || `${placeholder} selection`}
            >
                <Button
                    ref={buttonRef}
                    className={clsx(css.container, {
                        [css.selected]: isOpen,
                        [css.disabled]: disabled,
                        [css.destructive]: destructive,
                    })}
                    isDisabled={disabled}
                    data-testid="select-button"
                >
                    <div className={css.inputContainer}>
                        {!hideLabel && label && (
                            <Text
                                variant="body-sm-med"
                                className={clsx(css.label, {
                                    [css.disabled]: disabled,
                                    [css.destructive]: destructive,
                                })}
                                aria-label={label}
                            >
                                {label}
                            </Text>
                        )}
                        <div className={css.searchContainer}>
                            <div className={css.inputWrapper} ref={inputWrapperRef}>
                                {multiple ? (
                                    <div className={css.search} data-testid="pills-list">
                                        {selectedValues.slice(0, visiblePillsCount).map((value) => {
                                            const option = options.find((opt) => opt.value === value);
                                            return (
                                                <PillsList
                                                    key={value}
                                                    items={[
                                                        {
                                                            id: value,
                                                            label: option?.label || value,
                                                        },
                                                    ]}
                                                    onDelete={(item) => {
                                                        const newValues = selectedValues.filter((v) => v !== item.id);
                                                        setSelectedValues(newValues);
                                                        onChange?.(
                                                            newValues as GetValues<Options[number], Required, Multiple>,
                                                        );
                                                    }}
                                                    size="small"
                                                    disabled={disabled}
                                                    data-testid="pill"
                                                    className={css.pill}
                                                />
                                            );
                                        })}
                                        {selectedValues.length > visiblePillsCount && (
                                            <PillsList
                                                items={[
                                                    {
                                                        id: 'more',
                                                        label: `+${selectedValues.length - visiblePillsCount} more`,
                                                    },
                                                ]}
                                                disabled={disabled}
                                                data-testid="more-pill"
                                                readOnly
                                                className={css.pill}
                                                size="small"
                                            />
                                        )}
                                        <Input
                                            className={clsx(css.searchInput, {
                                                [css.destructive]: destructive,
                                            })}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder={selectedValues.length ? '' : placeholder}
                                            disabled={disabled}
                                            data-testid="select-input"
                                        />
                                    </div>
                                ) : (
                                    <div className={css.search}>
                                        <Input
                                            className={clsx(css.searchInput, {
                                                [css.destructive]: destructive,
                                            })}
                                            value={
                                                isOpen || searchTerm
                                                    ? searchTerm
                                                    : (selectedValue &&
                                                          options.find((opt) => opt.value === selectedValue)?.label) ||
                                                      ''
                                            }
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder={placeholder}
                                            disabled={disabled}
                                            data-testid="select-input"
                                            autoFocus={autoFocus}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={css.iconContainer}>
                                {isOpen ? (
                                    <MdSearch className={css.icon} />
                                ) : (
                                    <MdKeyboardArrowDown className={css.icon} />
                                )}
                            </div>
                        </div>
                    </div>
                </Button>
                <Popover>
                    <div
                        ref={dropdownRef}
                        className={clsx(css.dropdownContainer, {
                            [css.scrollUp]: canScrollUp,
                            [css.scrollDown]: canScrollDown,
                        })}
                        onMouseDown={(e) => {
                            // Prevent mousedown from closing the dropdown
                            e.preventDefault();
                        }}
                    >
                        {canScrollUp && (
                            <button
                                className={clsx(css.scrollButton, css.scrollUp)}
                                onClick={handleScrollUp}
                                type="button"
                                tabIndex={-1}
                                aria-label="Scroll up"
                            >
                                <MdKeyboardArrowUp size={16} />
                            </button>
                        )}
                        {multiple && selectedValues.length > 0 && (
                            <div className={css.clearAllContainer}>
                                <button className={css.clearAllButton} onClick={handleClearAll} disabled={disabled}>
                                    <Text variant="body-md-med">Clear All</Text>
                                </button>
                            </div>
                        )}
                        <ListBox
                            ref={optionsListRef}
                            className={css.optionsList}
                            onScroll={handleScroll}
                            selectionMode={multiple ? 'multiple' : 'single'}
                            selectedKeys={multiple ? selectedValues : selectedValue ? [selectedValue] : undefined}
                            defaultSelectedKeys={multiple ? undefined : selectedValue ? [selectedValue] : undefined}
                            disallowEmptySelection={!multiple}
                            shouldFocusWrap
                            autoFocus
                            onSelectionChange={(selection: Selection) => {
                                if (typeof selection === 'string') {
                                    handleOptionClick(selection);
                                    if (!multiple) {
                                        setSearchTerm('');
                                    }
                                } else if (selection instanceof Set) {
                                    const selectedKey = Array.from(selection)[0]?.toString();
                                    if (selectedKey) {
                                        handleOptionClick(selectedKey);
                                        if (!multiple) {
                                            setSearchTerm('');
                                        }
                                    }
                                }
                            }}
                        >
                            {filteredOptions.map((option) => (
                                <ListBoxItem
                                    key={option.value}
                                    id={option.value}
                                    textValue={option.label || option.value}
                                    className={clsx(css.option, {
                                        [css.selected]: multiple
                                            ? selectedValues.includes(option.value)
                                            : selectedValue === option.value,
                                        [css.destructive]: destructive,
                                    })}
                                >
                                    <div className={css.optionContent}>
                                        {option.icon && <span className={css.optionIcon}>{option.icon}</span>}
                                        <Text variant="body-md-med">{option.label || option.value}</Text>
                                    </div>
                                    {multiple && selectedValues.includes(option.value) && (
                                        <CheckIcon className={css.icon} />
                                    )}
                                </ListBoxItem>
                            ))}
                        </ListBox>
                        {canScrollDown && (
                            <button
                                className={clsx(css.scrollButton, css.scrollDown)}
                                onClick={handleScrollDown}
                                type="button"
                                tabIndex={-1}
                                aria-label="Scroll down"
                            >
                                <MdKeyboardArrowDown className={css.icon} />
                            </button>
                        )}
                    </div>
                </Popover>
            </ComboBox>
        </FormGroup>
    );
}
