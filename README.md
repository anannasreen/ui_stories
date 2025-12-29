# cobalt_ui

This is Cobalt AI's design system. It includes React components, utilities, and SCSS styles which define how information should be presented and interacted with on Cobalt websites. Whenever possible, these reusable building blocks should be used by Cobalt engineers when building out UIs, to maintain a consistent look/feel and strong, recognizable branding.

This repository focuses on presentation, and does not address routing, data-fetching, or other aspects of web development. This makes it easier for designers to contribute to the codebase, and maximises the reuse of these base components by decoupling them from specific applications. From time to time, Cobalt frontend engineers should promote patterns which have come to be widely used in `cobalt_code`, and which don't have dependencies on non-design elements, into this design system.

### Technical Requirements:

- No routing logic
- No data fetching
- TypeScript
- SCSS Modules/Tailwind
- Function components & hooks
- Minimal migration from our existing prop schema for existing components
- High standard of accessibility (a11y): ARIA, keyboard navigation, focus management
- React Aria for accessibility (optional)

#### Forbidden:

- Data fetching (GraphQL, REST, etc.)
- Routing logic
- CSS-in-JS with a runtime JS component (e.g. no emotion, styled-components)
- Styled base component libraries (e.g. material ui, ant design). All components should be fully customizable & styleable with CSS, with minimal styling coming from external dependencies.
- Application state management

## Outside Contributors

Thank you for helping Cobalt engineers to create better experiences & delight users!

To make changes, create a pull request againt the `main` branch. This should automatically tag Cobalt frontend reviewers to review your changes.

## Running Locally

- install nix-shell and enter nix-shell in this directory
- run `npm run storybook` to see component examples
