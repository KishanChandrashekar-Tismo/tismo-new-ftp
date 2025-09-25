// Type declarations for file-icons-js
declare module "file-icons-js" {
  export function getClass(filename: string): string;
  export function getClassWithColor(filename: string): string;
  export function getColor(filename: string): string;
  export function isMatchedByName(filename: string): boolean;
}
