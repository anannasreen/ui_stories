import React, { createContext, useContext, useState, ReactNode, useEffect, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './LeftNavBar.module.scss';
import Button from '../Button';
import ProfileInfo from '../ProfileInfo';
import Hamburger from '../assets/hamburger.svg';
import Logo from '../assets/logo.svg';

/**
 * Context type for the LeftNavBar component.
 */
interface LeftNavBarContextType {
    /**
     * Whether the navigation bar is currently expanded.
     */
    isExpanded: boolean;
    /**
     * Function to toggle the expanded state.
     */
    toggleExpanded: () => void;
    /**
     * Currently active navigation item.
     */
    activeItem: string | null;
    /**
     * Function to set the active navigation item.
     */
    setActiveItem: (item: string) => void;
}

const LeftNavBarContext = createContext<LeftNavBarContextType | null>(null);

/**
 * Hook to access the LeftNavBar context.
 */
export const useLeftNavBar = () => {
    const context = useContext(LeftNavBarContext);
    if (!context) {
        throw new Error('useLeftNavBar must be used within a LeftNavBar');
    }
    return context;
};

/**
 * Props for the LeftNavBar component.
 */
interface LeftNavBarProps {
    /**
     * Content to be rendered within the navigation bar.
     */
    children: ReactNode;
    /**
     * Whether the navigation bar should be expanded by default.
     */
    defaultExpanded?: boolean;
    /**
     * Additional CSS class names.
     */
    className?: string;
}

/**
 * Composition of the LeftNavBar component.
 */
interface LeftNavBarComposition {
    Header: typeof LeftNavBarHeader;
    Content: typeof LeftNavBarContent;
    Nav: typeof LeftNavBarNav;
    NavItem: typeof LeftNavBarNavItem;
    Footer: typeof LeftNavBarFooter;
}

/**
 * LeftNavBar component.
 */
const LeftNavBar: React.FC<LeftNavBarProps> & LeftNavBarComposition = ({
    children,
    defaultExpanded = true,
    className,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <LeftNavBarContext.Provider value={{ isExpanded, toggleExpanded, activeItem, setActiveItem }}>
            <aside
                className={clsx(styles.leftNavBar, isExpanded ? styles.expanded : styles.collapsed, className)}
                role="complementary"
            >
                {children}
            </aside>
        </LeftNavBarContext.Provider>
    );
};

/**
 * Props for the LeftNavBarHeader component.
 */
interface LeftNavBarHeaderProps {
    /**
     * Title element to display in the header.
     */
    title?: ReactElement;
    /**
     * Additional CSS class names.
     */
    className?: string;
    /**
     * ARIA label for accessibility.
     */
    'aria-label'?: string;
}

/**
 * LeftNavBarHeader component.
 */
const LeftNavBarHeader: React.FC<LeftNavBarHeaderProps> = ({ title, className, 'aria-label': ariaLabel }) => {
    const { toggleExpanded } = useLeftNavBar();

    return (
        <header role="banner" aria-label={ariaLabel} className={clsx(styles.header, className)}>
            <Button
                icon={<Hamburger />}
                onClick={toggleExpanded}
                aria-label="Toggle navigation"
                variant="ghost"
                className={styles.hamburger}
                iconOnly
            />
            <div className={styles.title}>{title ? title : <Logo />}</div>
        </header>
    );
};

/**
 * Props for the LeftNavBarContent component.
 */
interface LeftNavBarContentProps {
    /**
     * Content to be rendered within the main content area.
     */
    children: ReactNode;
    /**
     * Additional CSS class names.
     */
    className?: string;
    /**
     * ARIA label for accessibility.
     */
    'aria-label'?: string;
}

/**
 * LeftNavBarContent component.
 */
const LeftNavBarContent: React.FC<LeftNavBarContentProps> = ({ children, className, 'aria-label': ariaLabel }) => (
    <div role="main" aria-label={ariaLabel} className={clsx(styles.content, className)}>
        {children}
    </div>
);

/**
 * Props for the LeftNavBarNav component.
 */
interface LeftNavBarNavProps {
    /**
     * Nav items to be rendered.
     */
    children: ReactNode;
    /**
     * Additional CSS class names.
     */
    className?: string;
    /**
     * ARIA label for accessibility.
     */
    'aria-label'?: string;
}

/**
 * LeftNavBarNav component.
 */
const LeftNavBarNav: React.FC<LeftNavBarNavProps> = ({ children, className, 'aria-label': ariaLabel }) => (
    <nav role="navigation" aria-label={ariaLabel} className={clsx(styles.nav, className)}>
        {children}
    </nav>
);

/**
 * Props for the LeftNavBarNavItem component.
 */
interface LeftNavBarNavItemProps {
    /**
     * Icon element to display for the navigation item.
     */
    icon: ReactElement;
    /**
     * Label element to display for the navigation item.
     */
    label: ReactElement;
    /**
     * Whether this item is active.
     */
    active?: boolean;
    /**
     * Click handler for the navigation item.
     */
    onClick?: () => void;
    /**
     * Additional CSS class names.
     */
    className?: string;
    /**
     * URL to navigate to when the item is clicked.
     */
    href?: string;
}

/**
 * LeftNavBarNavItem component.
 */
const LeftNavBarNavItem: React.FC<LeftNavBarNavItemProps> = ({
    icon,
    label,
    active: defaultActive = false,
    onClick,
    className,
    href,
}) => {
    const { isExpanded, activeItem, setActiveItem } = useLeftNavBar();
    const isActive = activeItem === label.props.children;

    useEffect(() => {
        if (defaultActive) {
            setActiveItem(label.props.children);
        }
    }, [defaultActive, label, setActiveItem]);

    const handleClick = () => {
        setActiveItem(label.props.children);
        onClick?.();
    };

    const props = {
        icon,
        onClick: handleClick,
        className: clsx(styles.navItem, className),
        color: 'primary' as const,
        variant: isActive ? ('default' as const) : ('ghost' as const),
        title: typeof label.props.children === 'string' ? label.props.children : undefined,
        role: 'menuitem',
        'aria-current': isActive ? ('page' as const) : undefined,
        tabIndex: 0,
        href,
        iconOnly: !isExpanded,
    };

    return <Button {...props}>{isExpanded && label}</Button>;
};

/**
 * Props for the LeftNavBarFooter component.
 */
interface LeftNavBarFooterProps {
    /**
     * Content of the footer. If ProfileInfo props are provided, a ProfileInfo component
     * will be rendered automatically.
     */
    children?: ReactNode;
    /**
     * Additional class name.
     */
    className?: string;
    /**
     * Aria label for the footer.
     */
    'aria-label'?: string;
    /**
     * Name of the user for ProfileInfo
     */
    name?: string;
    /**
     * Email of the user for ProfileInfo
     */
    email?: string;
    /**
     * Source of the user's profile image for ProfileInfo
     */
    imageSrc?: string;
}

/**
 * Footer component for the LeftNavBar.
 * Can render either custom children or a ProfileInfo component with user details.
 */
const LeftNavBarFooter: React.FC<LeftNavBarFooterProps> = ({
    children,
    className,
    'aria-label': ariaLabel = 'Navigation Footer',
    name,
    email,
    imageSrc,
}) => {
    const context = useContext(LeftNavBarContext);
    if (!context) {
        throw new Error('LeftNavBarFooter must be used within a LeftNavBar');
    }
    const { isExpanded } = context;

    const hasProfileInfo = name && email;

    return (
        <footer className={clsx(styles.footer, className)} aria-label={ariaLabel}>
            {hasProfileInfo ? (
                <ProfileInfo name={name!} email={email!} imageSrc={imageSrc} showDetails={isExpanded} />
            ) : (
                children
            )}
        </footer>
    );
};

LeftNavBar.Header = LeftNavBarHeader;
LeftNavBar.Content = LeftNavBarContent;
LeftNavBar.Nav = LeftNavBarNav;
LeftNavBar.NavItem = LeftNavBarNavItem;
LeftNavBar.Footer = LeftNavBarFooter;

export default LeftNavBar;
