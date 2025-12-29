# Portal

Portal component renders its children outside the normal DOM hierarchy.
Creates a separate div element at the end of the document body for the portal content.
Useful for modals, tooltips, and other components that need to visually "break out" of their containers.

Each Portal instance maintains its own DOM element that gets automatically removed on unmount.

```
<Portal>
  <div>This content will be rendered at the end of the body</div>
</Portal>
```

