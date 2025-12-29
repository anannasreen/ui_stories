# Accordion

Accordion component for displaying collapsible content sections

The Accordion provides an accessible way to show and hide content sections,
built with react-aria-components for complete accessibility support.

```tsx
<Accordion
  items={[
    {
      id: "1",
      title: "Section 1",
      children: <p>Content for section 1</p>
    },
    {
      id: "2",
      title: "Section 2",
      children: <p>Content for section 2</p>
    }
  ]}
  allowsMultipleExpanded={true}
/>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| items | `AccordionItemProps[]` |  | The items to display in the accordion |
| isDisabled | `boolean` |  | Whether the accordion is disabled |
| defaultExpandedKeys | `Iterable<Key>` |  | Default expanded keys |
| customIcon | `ReactNode` |  | Custom icon component |
| allowsMultipleExpanded | `boolean` | `true` | Whether multiple items can be expanded at the same time |
