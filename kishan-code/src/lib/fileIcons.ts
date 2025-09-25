// File icon utility using file-icons-js
import { getClassWithColor } from "file-icons-js";

/**
 * Get file icon class based on file name and extension
 * Uses file-icons-js package with fallback to custom mapping
 * @param fileName - The name of the file
 * @param isFolder - Whether the item is a folder
 * @returns CSS class string for the file icon
 */
export function getFileIcon(fileName: string, isFolder: boolean): string {
  if (isFolder) {
    // Use emoji for folders like the selected method
    return "📁";
  }

  try {
    // Use file-icons-js to get the appropriate icon class
    const iconClass = getClassWithColor(fileName);
    return iconClass || getCustomFileIconClass(fileName);
  } catch (error) {
    console.warn("file-icons-js error:", error);
    return getCustomFileIconClass(fileName);
  }
}

/**
 * Custom file icon class mapping (fallback)
 * @param fileName - The name of the file
 * @returns CSS class string for file icon
 */
function getCustomFileIconClass(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  const classMap: Record<string, string> = {
    // Images
    jpg: "icon-file-image",
    jpeg: "icon-file-image",
    png: "icon-file-image",
    gif: "icon-file-image",
    svg: "icon-file-image",
    webp: "icon-file-image",

    // Documents
    pdf: "icon-file-pdf",
    doc: "icon-file-word",
    docx: "icon-file-word",
    txt: "icon-file-text",

    // Spreadsheets
    xls: "icon-file-excel",
    xlsx: "icon-file-excel",
    csv: "icon-file-excel",

    // Code files
    js: "icon-file-code",
    ts: "icon-file-code",
    jsx: "icon-file-code",
    tsx: "icon-file-code",
    html: "icon-file-code",
    css: "icon-file-code",
    scss: "icon-file-code",
    json: "icon-file-code",

    // Archives
    zip: "icon-file-archive",
    rar: "icon-file-archive",
    tar: "icon-file-archive",
    gz: "icon-file-archive",

    // Audio/Video
    mp3: "icon-file-audio",
    wav: "icon-file-audio",
    mp4: "icon-file-video",
    avi: "icon-file-video",
  };

  return classMap[extension] || "icon-file-text";
}

/**
 * Get file icon as Unicode emoji (fallback for simple display)
 * @param fileName - The name of the file
 * @param isFolder - Whether the item is a folder
 * @returns Unicode emoji string
 */
export function getFileIconEmoji(fileName: string, isFolder: boolean): string {
  if (isFolder) {
    return "📁";
  }

  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  // Common file type icons
  const iconMap: Record<string, string> = {
    // Images
    jpg: "🖼️",
    jpeg: "🖼️",
    png: "🖼️",
    gif: "🖼️",
    svg: "🖼️",
    webp: "🖼️",

    // Documents
    pdf: "📄",
    doc: "📝",
    docx: "📝",
    txt: "📄",
    rtf: "📄",

    // Spreadsheets
    xls: "📊",
    xlsx: "📊",
    csv: "📊",

    // Presentations
    ppt: "📊",
    pptx: "📊",

    // Code files
    js: "📜",
    ts: "📜",
    jsx: "📜",
    tsx: "📜",
    html: "🌐",
    css: "🎨",
    scss: "🎨",
    sass: "🎨",
    json: "📋",
    xml: "📋",
    yml: "📋",
    yaml: "📋",

    // Archives
    zip: "📦",
    rar: "📦",
    tar: "📦",
    gz: "📦",
    "7z": "📦",

    // Audio
    mp3: "🎵",
    wav: "🎵",
    flac: "🎵",
    aac: "🎵",

    // Video
    mp4: "🎥",
    avi: "🎥",
    mov: "🎥",
    wmv: "🎥",
    mkv: "🎥",

    // Executables
    exe: "⚙️",
    msi: "⚙️",
    app: "⚙️",
    deb: "⚙️",
    rpm: "⚙️",
  };

  return iconMap[extension] || "📄";
}
