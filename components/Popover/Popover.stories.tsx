import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MdFilterList } from 'react-icons/md';
import Popover from './Popover';
import Button from '../Button';
import Select from '../inputs/Select';
import { Divider } from '../Divider';

// Filter Example Component
interface FilterOption {
    id: string;
    label: string;
}

const regions: FilterOption[] = [
    { id: 'north', label: 'North Region' },
    { id: 'south', label: 'South Region' },
    { id: 'east', label: 'East Region' },
    { id: 'west', label: 'West Region' },
];

const cities: FilterOption[] = [
    { id: 'city1', label: 'New York' },
    { id: 'city2', label: 'Los Angeles' },
    { id: 'city3', label: 'Chicago' },
    { id: 'city4', label: 'Houston' },
];

const events: FilterOption[] = [
    { id: 'alarm', label: 'Alarm Events' },
    { id: 'access', label: 'Access Events' },
    { id: 'system', label: 'System Events' },
    { id: 'user', label: 'User Events' },
];

function FilterExample() {
    const [isOpen, setIsOpen] = useState(false);

    const getFilterContent = () => (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#333',
                    }}
                >
                    Select Region
                </label>
                <div style={{ width: '100%' }}>
                    <Select
                        placeholder="Filter By Regions"
                        options={regions.map((region) => ({ value: region.id, label: region.label }))}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#333',
                    }}
                >
                    Select Cities
                </label>
                <div style={{ width: '100%' }}>
                    <Select
                        placeholder="Filter By Cities"
                        options={cities.map((city) => ({ value: city.id, label: city.label }))}
                    />
                </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#333',
                    }}
                >
                    Select Events
                </label>
                <div style={{ width: '100%' }}>
                    <Select
                        placeholder="Filter By Sites"
                        options={events.map((event) => ({ value: event.id, label: event.label }))}
                    />
                </div>
            </div>

            <Divider />

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginTop: '16px',
                }}
            >
                <Button color="primary" variant="outline" size="small" style={{ whiteSpace: 'nowrap' }}>
                    Save Filters
                </Button>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button color="primary" variant="outline" size="small" style={{ whiteSpace: 'nowrap' }}>
                        Reset Filters
                    </Button>
                    <Button color="primary" size="small" style={{ whiteSpace: 'nowrap' }}>
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <Popover content={getFilterContent()} title="Filter Event Listings" width={380} onOpenChange={setIsOpen}>
            <Button color="primary" variant="ghost" icon={<MdFilterList />} />
        </Popover>
    );
}

// Storybook configuration
const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

const PopoverTemplate = ({ title, content, ...args }: any) => {
    return (
        <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
            <Popover {...args} title={title} content={content}>
                <Button color="primary">Open Popover</Button>
            </Popover>
        </div>
    );
};

export const Default: Story = {
    render: () => (
        <PopoverTemplate
            title="Default Popover"
            content={
                <div>
                    <p>This is a basic popover with a title and content.</p>
                    <p>It demonstrates the default styling and behavior.</p>
                </div>
            }
        />
    ),
};

export const WithoutTitle: Story = {
    render: () => (
        <PopoverTemplate
            content={
                <div>
                    <p>This popover has no title, showing how it looks without a header.</p>
                    <p>It still maintains the same functionality and close behavior.</p>
                </div>
            }
        />
    ),
};

export const CustomStyling: Story = {
    render: () => (
        <PopoverTemplate
            title="Custom Styled Popover"
            style={{
                content: {
                    maxWidth: '300px',
                    background: '#f5f5f5',
                },
            }}
            content={
                <div>
                    <p>This popover demonstrates custom styling options.</p>
                    <p>You can customize the popover appearance.</p>
                </div>
            }
        />
    ),
};

export const WithFooterButtons: Story = {
    render: () => (
        <PopoverTemplate
            title="Popover with Footer"
            content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        <p>This popover includes footer buttons for actions.</p>
                        <p>It demonstrates how to add a footer with action buttons.</p>
                    </div>
                    <Divider />
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Save</Button>
                    </div>
                </div>
            }
        />
    ),
};

export const DifferentPlacements: Story = {
    render: () => (
        <div
            style={{
                padding: '100px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '40px',
                placeItems: 'center',
            }}
        >
            <Popover title="Top Placement" content="This popover appears above the trigger" placement="top">
                <Button color="primary">Top</Button>
            </Popover>

            <Popover title="Bottom Placement" content="This popover appears below the trigger" placement="bottom">
                <Button color="primary">Bottom</Button>
            </Popover>

            <Popover title="Left Placement" content="This popover appears to the left of the trigger" placement="left">
                <Button color="primary">Left</Button>
            </Popover>

            <Popover
                title="Right Placement"
                content="This popover appears to the right of the trigger"
                placement="right"
            >
                <Button color="primary">Right</Button>
            </Popover>
        </div>
    ),
};

export const FilterExampleStory: Story = {
    render: () => <FilterExample />,
};
