// Test file for file-icons-js functionality
import { getFileIcon } from "./fileIcons";

// Test the function with various file types
console.log("Testing file-icons-js integration:");
console.log("JavaScript file:", getFileIcon("test.js", false));
console.log("TypeScript file:", getFileIcon("test.ts", false));
console.log("PDF file:", getFileIcon("document.pdf", false));
console.log("Image file:", getFileIcon("image.png", false));
console.log("Folder:", getFileIcon("my-folder", true));
console.log("Unknown file:", getFileIcon("unknown.xyz", false));

export {}; // Make it a module
