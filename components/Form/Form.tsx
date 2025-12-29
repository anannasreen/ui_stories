import React, { ReactNode } from 'react';
import { useForm, FormProvider, FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form';

interface Props<T extends FieldValues> extends UseFormProps<T> {
    /** Form content to be rendered */
    children: ReactNode;
    /** Callback function triggered when form is submitted with valid data */
    onSubmit: (formState: T) => any;
    /** Optional external form methods from react-hook-form */
    useForm?: UseFormReturn<T>;
    /** Additional CSS class name */
    className?: string;
}

/**
 * Form component provides a wrapper around react-hook-form with simplified API.
 * Handles form state management and validation automatically.
 */
export default function Form<T extends FieldValues>({
    children,
    onSubmit,
    useForm: externalMethods,
    className,
    ...etc
}: Props<T>) {
    const methods = externalMethods || useForm<T>({ ...etc }); // eslint-disable-line react-hooks/rules-of-hooks

    return (
        <FormProvider {...methods}>
            <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
}
