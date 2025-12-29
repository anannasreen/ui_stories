import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import Form from './Form';

const meta = {
    title: 'Components/Form',
    component: Form,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormFields = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
        <div>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" style={{ display: 'block', width: '100%' }} />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" style={{ display: 'block', width: '100%' }} />
        </div>
        <button type="submit">Submit</button>
    </div>
);

export const BasicForm: Story = {
    args: {
        children: <FormFields />,
        onSubmit: (data) => console.log('Form submitted:', data),
    },
    render: (args) => <Form {...args} />,
};

export const WithValidation: Story = {
    args: {
        children: <FormFields />,
        onSubmit: (data) => console.log('Form submitted with validation:', data),
    },
    render: () => {
        const methods = useForm({
            defaultValues: {
                username: '',
                email: '',
            },
            mode: 'onChange',
        });

        return (
            <Form useForm={methods} onSubmit={(data) => console.log('Form submitted with validation:', data)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            {...methods.register('username', { required: 'Username is required' })}
                            id="username"
                            style={{ display: 'block', width: '100%' }}
                        />
                        {methods.formState.errors.username && (
                            <span style={{ color: 'red', fontSize: '0.875rem' }}>
                                {methods.formState.errors.username.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            {...methods.register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                            id="email"
                            type="email"
                            style={{ display: 'block', width: '100%' }}
                        />
                        {methods.formState.errors.email && (
                            <span style={{ color: 'red', fontSize: '0.875rem' }}>
                                {methods.formState.errors.email.message}
                            </span>
                        )}
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </Form>
        );
    },
};
