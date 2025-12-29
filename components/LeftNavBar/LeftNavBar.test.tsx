import React from 'react';
import { render, screen } from '@testing-library/react';
import { MdHome } from 'react-icons/md';
import userEvent from '@testing-library/user-event';
import LeftNavBar from '.';
import styles from './LeftNavBar.module.scss';
import { vi } from 'vitest';

describe('LeftNavBar', () => {
    it('renders all sub components correctly', () => {
        render(
            <LeftNavBar>
                <LeftNavBar.Header title={<span>Test Header</span>} />
                <LeftNavBar.Content>
                    <LeftNavBar.Nav>
                        <LeftNavBar.NavItem icon={<MdHome />} label={<span>Home</span>} />
                    </LeftNavBar.Nav>
                </LeftNavBar.Content>
                <LeftNavBar.Footer>Test Footer</LeftNavBar.Footer>
            </LeftNavBar>,
        );

        expect(screen.getByText('Test Header')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });

    it('handles active state and click events correctly', async () => {
        const handleClick = vi.fn();
        render(
            <LeftNavBar>
                <LeftNavBar.Content>
                    <LeftNavBar.Nav>
                        <LeftNavBar.NavItem
                            icon={<MdHome />}
                            label={<span>Home</span>}
                            active={true}
                            onClick={handleClick}
                        />
                    </LeftNavBar.Nav>
                </LeftNavBar.Content>
            </LeftNavBar>,
        );

        const navItem = screen.getByRole('menuitem', { name: /home/i });
        await userEvent.click(navItem);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('toggles between expanded and collapsed states', async () => {
        render(
            <LeftNavBar>
                <LeftNavBar.Header />
                <LeftNavBar.Content>
                    <LeftNavBar.Nav>
                        <LeftNavBar.NavItem icon={<MdHome />} label={<span>Home</span>} />
                    </LeftNavBar.Nav>
                </LeftNavBar.Content>
            </LeftNavBar>,
        );

        const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
        const navBar = document.querySelector(`.${styles.leftNavBar}`);

        expect(navBar).toHaveClass(styles.expanded);
        expect(navBar).not.toHaveClass(styles.collapsed);

        await userEvent.click(toggleButton);

        expect(navBar).not.toHaveClass(styles.expanded);
        expect(navBar).toHaveClass(styles.collapsed);
    });

    it('can start in collapsed state', () => {
        render(
            <LeftNavBar defaultExpanded={false}>
                <LeftNavBar.Header title={<span>Test Header</span>} />
                <LeftNavBar.Content>
                    <LeftNavBar.Nav>
                        <LeftNavBar.NavItem icon={<MdHome />} label={<span>Home</span>} />
                    </LeftNavBar.Nav>
                </LeftNavBar.Content>
            </LeftNavBar>,
        );

        const navBar = document.querySelector(`.${styles.leftNavBar}`);
        expect(navBar).not.toHaveClass(styles.expanded);
        expect(navBar).toHaveClass(styles.collapsed);
    });

    it('renders ProfileInfo when user details are provided', () => {
        render(
            <LeftNavBar>
                <LeftNavBar.Footer name="John Doe" email="john@example.com" imageSrc="https://example.com/avatar.jpg" />
            </LeftNavBar>,
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
});
