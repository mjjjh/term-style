/**
 * ANSI style codes
 */

export const STYLES = {
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  blink: 5,
  inverse: 7,
  hidden: 8,
  strikethrough: 9,
} as const;

export type StyleCode = keyof typeof STYLES;

// Reset codes for each style
export const STYLE_RESET = {
  bold: 22,
  dim: 22,
  italic: 23,
  underline: 24,
  blink: 25,
  inverse: 27,
  hidden: 28,
  strikethrough: 29,
} as const;
