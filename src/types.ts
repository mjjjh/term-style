/**
 * Type definitions for term-style
 */

/** Color level supported by terminal */
export type ColorLevel = 0 | 1 | 2 | 3;

/** Named colors */
export type NamedColor =
  | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white'
  | 'brightBlack' | 'gray' | 'grey' | 'brightRed' | 'brightGreen' | 'brightYellow'
  | 'brightBlue' | 'brightMagenta' | 'brightCyan' | 'brightWhite';

/** Named background colors */
export type NamedBgColor =
  | 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite'
  | 'bgBrightBlack' | 'bgGray' | 'bgGrey' | 'bgBrightRed' | 'bgBrightGreen' | 'bgBrightYellow'
  | 'bgBrightBlue' | 'bgBrightMagenta' | 'bgBrightCyan' | 'bgBrightWhite';

/** Style names */
export type StyleName =
  | 'bold' | 'dim' | 'italic' | 'underline' | 'blink'
  | 'inverse' | 'hidden' | 'strikethrough';

/** All chainable property names */
export type ChainableProp = NamedColor | NamedBgColor | StyleName;

/** Border styles */
export type BorderStyle = 'single' | 'double' | 'round' | 'bold' | 'none';

/** Box options */
export interface BoxOptions {
  title?: string;
  borderColor?: string;
  borderStyle?: BorderStyle;
  padding?: number;
  margin?: number;
  width?: number;
}

/** Progress bar options */
export interface ProgressOptions {
  total?: number;
  width?: number;
  complete?: string;
  incomplete?: string;
}

/** Progress state */
export interface ProgressState {
  total: number;
  current: number;
  percent: number;
}

/** Table column definition */
export interface TableColumn {
  key: string;
  header?: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

/** Table options */
export interface TableOptions {
  headers?: string[];
  columns?: TableColumn[];
  borderColor?: string;
  padding?: number;
}

/** Spinner frames */
export interface SpinnerFrames {
  interval: number;
  frames: string[];
}

/** Spinner presets */
export type SpinnerPreset = 'dots' | 'line' | 'pipe' | 'star' | 'arrow';

/** Progress bar instance */
export interface ProgressBar {
  update(current: number): void;
  increment(delta?: number): void;
  complete(): void;
  stop(): void;
}

/** Spinner instance */
export interface Spinner {
  text: string;
  update(text: string): void;
  succeed(text?: string): void;
  fail(text?: string): void;
  warn(text?: string): void;
  info(text?: string): void;
  stop(): void;
}

/** Style chain function type */
export interface StyleChain {
  (text: string): string;
  log(text: string): void;
  ln(text: string): void;
  // Colors
  black: StyleChain;
  red: StyleChain;
  green: StyleChain;
  yellow: StyleChain;
  blue: StyleChain;
  magenta: StyleChain;
  cyan: StyleChain;
  white: StyleChain;
  // Bright colors
  brightBlack: StyleChain;
  gray: StyleChain;
  grey: StyleChain;
  brightRed: StyleChain;
  brightGreen: StyleChain;
  brightYellow: StyleChain;
  brightBlue: StyleChain;
  brightMagenta: StyleChain;
  brightCyan: StyleChain;
  brightWhite: StyleChain;
  // Background colors
  bgBlack: StyleChain;
  bgRed: StyleChain;
  bgGreen: StyleChain;
  bgYellow: StyleChain;
  bgBlue: StyleChain;
  bgMagenta: StyleChain;
  bgCyan: StyleChain;
  bgWhite: StyleChain;
  // Bright backgrounds
  bgBrightBlack: StyleChain;
  bgGray: StyleChain;
  bgGrey: StyleChain;
  bgBrightRed: StyleChain;
  bgBrightGreen: StyleChain;
  bgBrightYellow: StyleChain;
  bgBrightBlue: StyleChain;
  bgBrightMagenta: StyleChain;
  bgBrightCyan: StyleChain;
  bgBrightWhite: StyleChain;
  // Styles
  bold: StyleChain;
  dim: StyleChain;
  italic: StyleChain;
  underline: StyleChain;
  blink: StyleChain;
  inverse: StyleChain;
  hidden: StyleChain;
  strikethrough: StyleChain;
}

/** Main TermStyle API */
export interface TermStyle extends StyleChain {
  // RGB methods
  rgb(r: number, g: number, b: number): StyleChain;
  hex(color: string): StyleChain;
  bgRgb(r: number, g: number, b: number): StyleChain;
  bgHex(color: string): StyleChain;

  // Log shortcuts
  success(text: string): void;
  error(text: string): void;
  warn(text: string): void;
  info(text: string): void;
  debug(text: string): void;

  // Features
  box(content: string, options?: BoxOptions): void;
  box(options: BoxOptions, content: string): void;

  progress: {
    start(options?: ProgressOptions): ProgressBar;
  };

  spinner: {
    start(text?: string): Spinner;
  };

  table: {
    render(data: Record<string, unknown>[], options?: TableOptions): void;
  };

  // Utilities
  strip(text: string): string;
  readonly supportsColor: boolean;
  readonly colorLevel: ColorLevel;
}

// Internal style code storage
export interface StyleCodes {
  codes: number[];
}
