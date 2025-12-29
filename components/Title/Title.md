# Title

Title component sets the document title and optionally renders an h1 heading.
Automatically appends "| library AI" to the document title for consistent branding.

```
<Title>Dashboard</Title>
```

## Props

| Prop     | Type      | Default | Description                                                             |
| -------- | --------- | ------- | ----------------------------------------------------------------------- |
| children | `string`  |         | Text content for both the page title and heading                        |
| headless | `boolean` | `false` | When true, only sets the document title without rendering an h1 element |
