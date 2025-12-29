import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MdHome, MdPerson, MdSettings, MdHelp } from 'react-icons/md';
import LeftNavBar from './index';

const meta: Meta<typeof LeftNavBar> = {
    title: 'Components/LeftNavBar',
    component: LeftNavBar,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div style={{ height: '100vh', display: 'flex' }}>
                <Story />
                <div style={{ flex: 1, padding: '1rem' }}>
                    <h1>Main Content Area</h1>
                    <p>This is where your main content would go.</p>
                </div>
            </div>
        ),
    ],
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LeftNavBar>;

const NavigationContent = () => {
    const [selectedItem, setSelectedItem] = useState('Home');

    return (
        <>
            <LeftNavBar.Header />
            <LeftNavBar.Content>
                <LeftNavBar.Nav>
                    <LeftNavBar.NavItem
                        icon={<MdHome size={24} />}
                        label={<span>Home</span>}
                        active={selectedItem === 'Home'}
                        onClick={() => setSelectedItem('Home')}
                    />
                    <LeftNavBar.NavItem
                        icon={<MdPerson size={24} />}
                        label={<span>Profile</span>}
                        active={selectedItem === 'Profile'}
                        onClick={() => setSelectedItem('Profile')}
                    />
                    <LeftNavBar.NavItem
                        icon={<MdSettings size={24} />}
                        label={<span>Settings</span>}
                        active={selectedItem === 'Settings'}
                        onClick={() => setSelectedItem('Settings')}
                    />
                    <LeftNavBar.NavItem
                        icon={<MdHelp size={24} />}
                        label={<span>Help</span>}
                        active={selectedItem === 'Help'}
                        onClick={() => setSelectedItem('Help')}
                        href="https://example.com"
                    />
                </LeftNavBar.Nav>
            </LeftNavBar.Content>
            <LeftNavBar.Footer name="John Doe" email="john.doe@example.com" />
        </>
    );
};

export const Expanded: Story = {
    render: () => (
        <div style={{ height: '100%' }}>
            <LeftNavBar defaultExpanded={true}>
                <NavigationContent />
            </LeftNavBar>
        </div>
    ),
};

export const Collapsed: Story = {
    render: () => (
        <div style={{ height: '100%' }}>
            <LeftNavBar defaultExpanded={false}>
                <NavigationContent />
            </LeftNavBar>
        </div>
    ),
};
