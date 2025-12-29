# Form

Form component provides a wrapper around react-hook-form with simplified API.
Handles form state management and validation automatically.

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `ReactNode` |  | Form content to be rendered |
| onSubmit | `formState: T => any` |  | Callback function triggered when form is submitted with valid data |
| useForm | `UseFormReturn<T>` |  | Optional external form methods from react-hook-form |
| className | `string` |  | Additional CSS class name |
| mode | `enum` |  |  |
| disabled | `boolean` |  |  |
| reValidateMode | `enum` |  |  |
| defaultValues | `AsyncDefaultValues<T> | { [x: string]: any; } | (BrowserNativeObject | NestedValue) & FieldValues | { ...; }` |  |  |
| values | `FieldValues` |  |  |
| errors | `FieldErrors<T>` |  |  |
| resetOptions | `Partial<{ keepDirtyValues: boolean; keepErrors: boolean; keepDirty: boolean; keepValues: boolean; keepDefaultValues: boolean; keepIsSubmitted: boolean; keepIsSubmitSuccessful: boolean; keepTouched: boolean; keepIsValidating: boolean; keepIsValid: boolean; keepSubmitCount: boolean; }>` |  |  |
| resolver | `Resolver<T, any>` |  |  |
| context | `any` |  |  |
| shouldFocusError | `boolean` |  |  |
| shouldUnregister | `boolean` |  |  |
| shouldUseNativeValidation | `boolean` |  |  |
| progressive | `boolean` |  |  |
| criteriaMode | `enum` |  |  |
| delayError | `number` |  |  |
