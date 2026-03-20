/**
 * term-style - Terminal fancy output library
 * Chainable API for colorful terminal output
 */

import { supportsColor, getColorLevel } from './core/ansi';
import { hexToRgb } from './core/colors';
import { box } from './features/box';
import { createProgressBar, createSpinner } from './features/progress';
import { table } from './features/table';
import type { TermStyle, StyleChain, BoxOptions, TableOptions, ProgressOptions, ProgressBar, Spinner } from './types';

// Get terminal color support
const isColorSupported = supportsColor();
const level = getColorLevel();

/** ANSI code map for colors and styles */
const CODE_MAP: Record<string, number> = {
  // Foreground colors
  black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37,
  // Bright foreground
  brightBlack: 90, gray: 90, grey: 90, brightRed: 91, brightGreen: 92, brightYellow: 93,
  brightBlue: 94, brightMagenta: 95, brightCyan: 96, brightWhite: 97,
  // Background colors
  bgBlack: 40, bgRed: 41, bgGreen: 42, bgYellow: 43, bgBlue: 44, bgMagenta: 45, bgCyan: 46, bgWhite: 47,
  // Bright background
  bgBrightBlack: 100, bgGray: 100, bgGrey: 100, bgBrightRed: 101, bgBrightGreen: 102, bgBrightYellow: 103,
  bgBrightBlue: 104, bgBrightMagenta: 105, bgBrightCyan: 106, bgBrightWhite: 107,
  // Styles
  bold: 1, dim: 2, italic: 3, underline: 4, blink: 5, inverse: 7, hidden: 8, strikethrough: 9,
};

/**
 * Create a style chain with accumulated ANSI codes
 */
function createChain(codes: number[]): StyleChain {
  const chain = ((text: string): string => {
    if (codes.length === 0) return text;
    return `\x1b[${codes.join(';')}m${text}\x1b[0m`;
  }) as StyleChain;

  chain.log = (text: string): void => {
    console.log(chain(text));
  };

  chain.ln = (text: string): void => {
    console.log(chain(text));
  };

  return new Proxy(chain, {
    get(target, prop: string) {
      // Handle color/style codes for chaining
      const code = CODE_MAP[prop];
      if (code !== undefined) {
        return createChain([...codes, code]);
      }
      // Return existing methods
      return (target as unknown as Record<string, unknown>)[prop];
    },
  }) as StyleChain;
}

// Strip ANSI codes from string
function strip(text: string): string {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\x1b\[[0-9;]*m/g, '');
}

// Log shortcuts with icons
function success(text: string): void {
  console.log(`\x1b[32m✓\x1b[0m ${text}`);
}

function error(text: string): void {
  console.log(`\x1b[31m✗\x1b[0m ${text}`);
}

function warn(text: string): void {
  console.log(`\x1b[33m⚠\x1b[0m ${text}`);
}

function info(text: string): void {
  console.log(`\x1b[34mℹ\x1b[0m ${text}`);
}

function debug(text: string): void {
  console.log(`\x1b[90m⚙\x1b[0m ${text}`);
}

// Box wrapper
function boxWrapper(content: string, options?: BoxOptions): void;
function boxWrapper(options: BoxOptions, content: string): void;
function boxWrapper(contentOrOptions: string | BoxOptions, optionsOrContent?: BoxOptions | string): void {
  if (typeof contentOrOptions === 'string') {
    box(contentOrOptions, optionsOrContent as BoxOptions);
  } else {
    box(contentOrOptions, optionsOrContent as string);
  }
}

// Create base chain
const baseChain = createChain([]);

// Create the full TermStyle API
const t = new Proxy(baseChain, {
  get(target, prop: string) {
    // Color/style codes - start new chain
    const code = CODE_MAP[prop];
    if (code !== undefined) {
      return createChain([code]);
    }

    // Special methods
    switch (prop) {
      case 'rgb':
        return (r: number, g: number, b: number): StyleChain => {
          if (!isColorSupported || level < 2) return createChain([]);
          return createChain([38, 2, r, g, b]);
        };
      case 'hex':
        return (color: string): StyleChain => {
          if (!isColorSupported) return createChain([]);
          try {
            const [r, g, b] = hexToRgb(color);
            if (level < 2) return createChain([]);
            return createChain([38, 2, r, g, b]);
          } catch {
            return createChain([]);
          }
        };
      case 'bgRgb':
        return (r: number, g: number, b: number): StyleChain => {
          if (!isColorSupported || level < 2) return createChain([]);
          return createChain([48, 2, r, g, b]);
        };
      case 'bgHex':
        return (color: string): StyleChain => {
          if (!isColorSupported) return createChain([]);
          try {
            const [r, g, b] = hexToRgb(color);
            if (level < 2) return createChain([]);
            return createChain([48, 2, r, g, b]);
          } catch {
            return createChain([]);
          }
        };
      case 'success': return success;
      case 'error': return error;
      case 'warn': return warn;
      case 'info': return info;
      case 'debug': return debug;
      case 'box': return boxWrapper;
      case 'progress': return { start: (options?: ProgressOptions) => createProgressBar(options) };
      case 'spinner': return { start: (text?: string) => createSpinner(text) };
      case 'table': return { render: (data: Record<string, unknown>[], options?: TableOptions) => table(data, options) };
      case 'strip': return strip;
      case 'supportsColor': return isColorSupported;
      case 'colorLevel': return level;
      default:
        // Return property from target (like log, ln)
        return (target as unknown as Record<string, unknown>)[prop];
    }
  },
}) as TermStyle;

// Export both default and named
export default t;
export { t as termStyle };
export type { TermStyle, StyleChain, BoxOptions, TableOptions, ProgressOptions, ProgressBar, Spinner };
