# File Icons Implementation

This implementation uses the `file-icons-js` package to display appropriate icons based on file types.

## Installation

To install the required package, run:

```bash
npm install file-icons-js
```

## Usage

The file icon system has been implemented with the following components:

### 1. File Icon Utility (`src/lib/fileIcons.ts`)

This utility provides two main functions:

- `getFileIcon(fileName, isFolder)` - Returns CSS class names for styling
- `getFileIconEmoji(fileName, isFolder)` - Returns emoji icons as fallback

### 2. FileTable Component Integration

The `FileTable` component now uses both:

- **Emoji icons** for immediate visual representation
- **CSS classes** for advanced styling and future file-icons-js integration

### 3. CSS Styling (`src/styles/components/file-table.css`)

Added color-coded styling for different file types:

- Images: Green
- PDFs: Red
- Word docs: Blue
- Excel: Green
- Code files: Orange
- Archives: Purple
- Audio: Pink
- Video: Red-Orange
- Folders: Amber
- Text files: Gray

## After Installing file-icons-js

Once the package is installed, update `src/lib/fileIcons.ts`:

```typescript
// Uncomment and modify the getFileIcon function:
export async function getFileIcon(
  fileName: string,
  isFolder: boolean
): Promise<string> {
  if (isFolder) {
    return "icon-folder";
  }

  try {
    const { getClassWithColor } = await import("file-icons-js");
    const iconClass = getClassWithColor(fileName);
    return iconClass || "icon-file-text";
  } catch {
    return getCustomFileIconClass(fileName);
  }
}
```

And update the FileTable component to handle async icon loading if needed.

## Current Implementation

Currently working with:

- ✅ Enhanced emoji icons based on file extensions
- ✅ Color-coded CSS classes for different file types
- ✅ Fallback system for unknown file types
- ✅ Folder vs file differentiation
- 🔄 Ready for file-icons-js integration once installed

## Supported File Types

The current implementation recognizes:

**Images**: jpg, jpeg, png, gif, svg, webp
**Documents**: pdf, doc, docx, txt, rtf  
**Spreadsheets**: xls, xlsx, csv
**Presentations**: ppt, pptx
**Code**: js, ts, jsx, tsx, html, css, scss, json, xml, yml
**Archives**: zip, rar, tar, gz, 7z
**Media**: mp3, wav, flac, mp4, avi, mov
**Executables**: exe, msi, app, deb, rpm

## Benefits

1. **Visual Clarity**: Easy identification of file types at a glance
2. **Extensible**: Easy to add new file types and icons
3. **Performance**: Emoji fallbacks ensure fast loading
4. **Accessibility**: Color and icon combination improves usability
5. **Future-proof**: Ready for advanced icon libraries
