/**
 * ANSI escape code utilities
 */

/** Reset all styles */
export const RESET = '\x1b[0m';

/** Create ANSI code from single code */
export function ansi(code: number): string {
  return `\x1b[${code}m`;
}

/** Create ANSI code from multiple codes */
export function ansiCodes(...codes: number[]): string {
  return `\x1b[${codes.join(';')}m`;
}

/** Wrap text with ANSI codes */
export function wrap(text: string, codes: number[]): string {
  if (codes.length === 0) return text;
  return `${ansiCodes(...codes)}${text}${RESET}`;
}

/** Move cursor to beginning of line */
export const CURSOR_START = '\r';

/** Clear entire line */
export const CLEAR_LINE = '\x1b[2K';

/** Clear from cursor to end of line */
export const CLEAR_LINE_END = '\x1b[0K';

/** Hide cursor */
export const HIDE_CURSOR = '\x1b[?25l';

/** Show cursor */
export const SHOW_CURSOR = '\x1b[?25h';

/** Move cursor up N lines */
export function cursorUp(n: number = 1): string {
  return `\x1b[${n}A`;
}

/** Move cursor down N lines */
export function cursorDown(n: number = 1): string {
  return `\x1b[${n}B`;
}

/** Move cursor forward N columns */
export function cursorForward(n: number = 1): string {
  return `\x1b[${n}C`;
}

/** Move cursor backward N columns */
export function cursorBackward(n: number = 1): string {
  return `\x1b[${n}D`;
}

/** Move cursor to specific position */
export function cursorTo(x: number, y?: number): string {
  return y !== undefined ? `\x1b[${y};${x}H` : `\x1b[${x}G`;
}

/** Save cursor position */
export const SAVE_CURSOR = '\x1b[s';

/** Restore cursor position */
export const RESTORE_CURSOR = '\x1b[u';

/** Get terminal width */
export function getTerminalWidth(): number {
  return process.stdout.columns || 80;
}

/** Get terminal height */
export function getTerminalHeight(): number {
  return process.stdout.rows || 24;
}

/** Check if stdout supports color */
export function supportsColor(): boolean {
  if (process.env.NO_COLOR) return false;
  if (process.env.FORCE_COLOR) return true;
  return process.stdout.isTTY === true;
}

/** Check if terminal supports true color (24-bit) */
export function supportsTrueColor(): boolean {
  if (!supportsColor()) return false;
  const colorterm = process.env.COLORTERM;
  return colorterm === 'truecolor' || colorterm === '24bit';
}

/** Check if terminal supports 256 colors */
export function supports256Color(): boolean {
  if (!supportsColor()) return false;
  if (supportsTrueColor()) return true;
  const term = process.env.TERM || '';
  return term.includes('256color') || term.includes('256');
}

/** Color level: 0 = none, 1 = 16 colors, 2 = 256 colors, 3 = true color */
export function getColorLevel(): 0 | 1 | 2 | 3 {
  if (!supportsColor()) return 0;
  if (supportsTrueColor()) return 3;
  if (supports256Color()) return 2;
  return 1;
}
