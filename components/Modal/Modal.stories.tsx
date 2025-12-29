import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FaTimes } from 'react-icons/fa';
import Modal from './Modal';
import Button from '../Button';
import Select from '../inputs/Select/Select';
import { PillsList } from '../inputs/PillsList/PillsList';
import { Text } from '../Text';
import { Divider } from '../Divider';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate = ({ title, content, ...args }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
                {content}
            </Modal>
        </div>
    );
};

export const Default: Story = {
    render: () => (
        <ModalTemplate
            title="Default Modal"
            content={
                <div style={{ padding: '10px' }}>
                    <p>This is a basic modal with a title and content.</p>
                    <p>It demonstrates the default styling and behavior.</p>
                </div>
            }
        />
    ),
};

export const WithoutTitle: Story = {
    render: () => (
        <ModalTemplate
            content={
                <div style={{ padding: '10px' }}>
                    <p>This modal has no title, showing how it looks without a header.</p>
                    <p>It still maintains the same functionality and close behavior.</p>
                </div>
            }
        />
    ),
};

export const NonDismissable: Story = {
    render: () => (
        <ModalTemplate
            title="Requires Interaction"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            content={
                <div style={{ padding: '10px' }}>
                    <p>
                        This modal requires interacting with its content to close it, and can't be dismissed with escape
                        or an outside click
                    </p>
                </div>
            }
        />
    ),
};

export const CustomStyling: Story = {
    render: () => (
        <ModalTemplate
            title="Custom Styled Modal"
            className="custom-modal-class"
            style={{
                content: {
                    maxWidth: '400px',
                    background: '#f5f5f5',
                    border: '2px solid #333',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
            }}
            content={
                <div style={{ padding: '10px' }}>
                    <p>This modal demonstrates custom styling options.</p>
                    <p>You can customize both the modal and overlay appearance.</p>
                </div>
            }
        />
    ),
};

export const WithFooterAndLongContent: Story = {
    render: () => (
        <ModalTemplate
            title="Modal with Footer and Long Content"
            content={
                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                        {Array.from({ length: 25 }).map((_, i) => (
                            <p key={i}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        ))}
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

export const FilterModal: Story = {
    render: () => {
        const FilterModalTemplate = () => {
            const [isOpen, setIsOpen] = useState(false);

            // Define filter group options
            const filterGroupOptions = [
                { value: 'default', label: 'Select Or Add A New Filter Group Name' },
                { value: 'regions', label: 'Regions' },
                { value: 'cities', label: 'Cities' },
                { value: 'events', label: 'Events' },
            ];

            // Define pill items for each category
            const regionPills = [{ id: 'na', label: 'North America' }];

            const cityPills = [
                { id: 'phx', label: 'Phoenix, AZ' },
                { id: 'nyc', label: 'New York, NY' },
            ];

            const eventPills = [{ id: 'all', label: 'All Events' }];

            return (
                <div>
                    <Button onClick={() => setIsOpen(true)}>Open Filter Modal</Button>
                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title="Filter Event Listings"
                        style={{
                            content: {
                                width: '350px',
                                maxWidth: '95vw',
                            },
                        }}
                    >
                        <div style={{ padding: '0 0 16px 0' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <Select
                                    options={filterGroupOptions}
                                    placeholder="Select Or Add A New Filter Group Name"
                                />
                            </div>

                            <div style={{ backgroundColor: 'white', padding: '10px' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <Text variant="body-sm-med" style={{ marginBottom: '8px' }}>
                                        Regions
                                    </Text>
                                    <PillsList
                                        items={regionPills}
                                        onDelete={(item) => console.log(`Remove ${item.label}`)}
                                    />
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <Text variant="body-sm-med" style={{ marginBottom: '8px' }}>
                                        Cities
                                    </Text>
                                    <PillsList
                                        items={cityPills}
                                        onDelete={(item) => console.log(`Remove ${item.label}`)}
                                    />
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <Text variant="body-sm-med" style={{ marginBottom: '8px' }}>
                                        Events
                                    </Text>
                                    <PillsList
                                        items={eventPills}
                                        onDelete={(item) => console.log(`Remove ${item.label}`)}
                                    />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'flex-end',
                                width: '100%',
                                padding: '12px',
                            }}
                        >
                            <Button color="secondary" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => {
                                    console.log('Saving filters');
                                    setIsOpen(false);
                                }}
                            >
                                Save Filters
                            </Button>
                        </div>
                    </Modal>
                </div>
            );
        };

        return <FilterModalTemplate />;
    },
};
