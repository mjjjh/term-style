/**
 * ANSI color codes
 */

// Standard foreground colors (30-37)
export const FOREGROUND = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,

  // Bright foreground colors (90-97)
  brightBlack: 90,
  gray: 90, // alias
  grey: 90, // alias
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,
} as const;

// Standard background colors (40-47)
export const BACKGROUND = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,

  // Bright background colors (100-107)
  bgBrightBlack: 100,
  bgGray: 100, // alias
  bgGrey: 100, // alias
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107,
} as const;

// All named colors combined
export const COLORS = { ...FOREGROUND, ...BACKGROUND } as const;

/** Create 256-color foreground code */
export function color256(n: number): number {
  return 38 + 256 * 256 + 5 * 256 + n; // Returns code for CSI 38;5;{n}m
}

/** Create 256-color background code */
export function bg256(n: number): number {
  return 48 + 256 * 256 + 5 * 256 + n; // Returns code for CSI 48;5;{n}m
}

/** Create RGB foreground codes array */
export function rgbFg(r: number, g: number, b: number): [number, number, number, number, number] {
  return [38, 2, r, g, b]; // CSI 38;2;{r};{g};{b}m
}

/** Create RGB background codes array */
export function rgbBg(r: number, g: number, b: number): [number, number, number, number, number] {
  return [48, 2, r, g, b]; // CSI 48;2;{r};{g};{b}m
}

/** Parse hex color to RGB */
export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

/** Convert RGB to 256 color index (approximation) */
export function rgbTo256(r: number, g: number, b: number): number {
  // 216 color cube: 6 levels per channel
  return 16 + Math.round(r / 255 * 5) * 36
           + Math.round(g / 255 * 5) * 6
           + Math.round(b / 255 * 5);
}

/** Named color map for box/progress borders */
export const NAMED_COLORS = {
  black: '#000000',
  red: '#CD0000',
  green: '#00CD00',
  yellow: '#CDCD00',
  blue: '#0000EE',
  magenta: '#CD00CD',
  cyan: '#00CDCD',
  white: '#E5E5E5',
  gray: '#7F7F7F',
  grey: '#7F7F7F',
  brightRed: '#FF0000',
  brightGreen: '#00FF00',
  brightYellow: '#FFFF00',
  brightBlue: '#5C5CFF',
  brightMagenta: '#FF00FF',
  brightCyan: '#00FFFF',
  brightWhite: '#FFFFFF',
} as const;
