# CSS Architecture Documentation

This document describes the modular CSS architecture used in the project after splitting the monolithic `globals.css` file.

## Directory Structure

```
src/
├── app/
│   └── globals.css          # Main CSS entry point with imports and global styles
└── styles/
    ├── components/          # Component-specific styles
    │   ├── ui-components.css      # Common UI elements (buttons, inputs, tables)
    │   ├── header.css            # Header component styles
    │   ├── directory-selector.css # Directory selector component styles
    │   ├── path-bar.css          # Path bar component styles
    │   ├── file-actions.css      # File actions sidebar styles
    │   └── file-table.css        # File table component styles
    └── pages/               # Page-specific styles
        ├── login.css             # Login page styles
        └── file-browser.css      # File browser page styles
```

## File Descriptions

### Global Styles (`globals.css`)

- Contains CSS imports for all component and page styles
- Tailwind CSS configuration
- CSS variables for theme colors (light/dark modes)
- Base global styles (html, body, main layout)
- Background gradients and common layout properties

### Component Styles

#### `ui-components.css`

- Common UI elements used across multiple components
- Button styles (`.btn`, `.btn-primary`)
- Input field styles (`.input`)
- Table base styles (`.table`)

#### `header.css`

- Header component layout and styling
- Navigation and logo positioning

#### `directory-selector.css`

- Directory selector component styles
- Button radio groups for view selection
- Info icons and interactive elements

#### `path-bar.css`

- Path navigation component styles
- Path input field styling
- Back button styling

#### `file-actions.css`

- File action sidebar styles
- Action button variants (upload, download, delete, new folder)
- Icon states and hover effects
- Gradient button styles for different actions

#### `file-table.css`

- File table component styles
- Row hover effects
- File/folder icons
- Action button styling within table cells
- Empty state messaging

### Page Styles

#### `login.css`

- Login page specific styles
- Login card layout and animations
- Form input styling
- Logo and branding elements
- Animation keyframes for page transitions

#### `file-browser.css`

- File browser page layout
- Container styling for the main file browser interface
- Layout grids and flexbox arrangements
- Page-specific animations and transitions

## Usage Guidelines

### Importing Styles

All styles are automatically imported through `globals.css`. No additional imports are needed in components.

### Adding New Styles

1. **Component styles**: Add to appropriate component CSS file in `src/styles/components/`
2. **Page styles**: Add to appropriate page CSS file in `src/styles/pages/`
3. **New components**: Create new CSS file and import it in `globals.css`
4. **Global styles**: Add directly to `globals.css` only if truly global

### CSS Class Naming

- Use descriptive class names that reflect the component or element
- Follow existing naming conventions (kebab-case)
- Prefix component-specific classes when necessary to avoid conflicts

### Maintenance Benefits

- **Modularity**: Each component's styles are contained in their own file
- **Maintainability**: Easier to find and modify specific component styles
- **Performance**: Better caching since component styles change less frequently
- **Organization**: Clear separation of concerns between components and pages
- **Scalability**: Easy to add new components without bloating a single CSS file

## Migration Notes

- All existing class names remain unchanged
- No component code changes required
- Styles maintain the same cascade order as the original `globals.css`
- Theme variables and Tailwind integration preserved
