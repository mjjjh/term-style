/**
 * Box/Border output feature
 */

import type { BoxOptions, BorderStyle } from '../types';

/** Border characters for different styles */
const BORDER_CHARS: Record<BorderStyle, { tl: string; tr: string; bl: string; br: string; h: string; v: string }> = {
  single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  round: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  bold: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' },
  none: { tl: ' ', tr: ' ', bl: ' ', br: ' ', h: ' ', v: ' ' },
};

/** Color ANSI codes for borders */
const BORDER_COLORS: Record<string, string> = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  grey: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
};

const RESET = '\x1b[0m';

/** Get color code for border */
function getBorderAnsi(color?: string): string {
  if (!color) return '';
  return BORDER_COLORS[color] || '';
}

/** Calculate display width (excluding ANSI codes) */
function displayWidth(str: string): number {
  // Remove ANSI escape codes
  const stripped = str.replace(/\x1b\[[0-9;]*m/g, '');
  // Handle CJK characters (width = 2)
  let width = 0;
  for (const char of stripped) {
    width += char.charCodeAt(0) > 127 ? 2 : 1;
  }
  return width;
}

/** Pad string to specific display width */
function padToWidth(str: string, width: number): string {
  const current = displayWidth(str);
  if (current >= width) return str;
  return str + ' '.repeat(width - current);
}

/** Render a box */
export function renderBox(content: string, options: BoxOptions = {}): string {
  const {
    title = '',
    borderColor = '',
    borderStyle = 'single',
    padding = 0,
    margin = 0,
    width,
  } = options;

  const border = BORDER_CHARS[borderStyle];
  const colorAnsi = getBorderAnsi(borderColor);

  // Process content lines
  const lines = content.split('\n');

  // Calculate content width
  const contentWidth = width
    ? width - 2 - padding * 2
    : Math.max(...lines.map(l => displayWidth(l)), title ? displayWidth(title) + 2 : 0);

  // Build the box
  const result: string[] = [];
  const marginStr = ' '.repeat(margin);
  const endCode = colorAnsi ? RESET : '';

  // Top border
  let topLine = border.tl + border.h.repeat(contentWidth + padding * 2) + border.tr;
  if (title) {
    const titleText = ` ${title} `;
    topLine = border.tl + border.h.repeat(Math.floor((contentWidth + padding * 2 - displayWidth(titleText)) / 2))
      + titleText + border.h.repeat(contentWidth + padding * 2 - displayWidth(titleText) - Math.floor((contentWidth + padding * 2 - displayWidth(titleText)) / 2))
      + border.tr;
  }
  result.push(marginStr + colorAnsi + topLine + endCode);

  // Padding lines (top)
  for (let i = 0; i < padding; i++) {
    result.push(marginStr + colorAnsi + border.v + ' '.repeat(contentWidth + padding * 2) + border.v + endCode);
  }

  // Content lines
  for (const line of lines) {
    const lineContent = padToWidth(line, contentWidth); // 内容填充到 contentWidth
    const leftPad = ' '.repeat(padding);
    const rightPad = ' '.repeat(padding);
    // 左边框 + 左填充 + 内容 + 右填充 + 右边框
    // 内部总宽度 = contentWidth + padding*2
    result.push(marginStr + colorAnsi + border.v + endCode + leftPad + lineContent + rightPad + colorAnsi + border.v + endCode);
  }

  // Padding lines (bottom)
  for (let i = 0; i < padding; i++) {
    result.push(marginStr + colorAnsi + border.v + ' '.repeat(contentWidth + padding * 2) + border.v + endCode);
  }

  // Bottom border
  result.push(marginStr + colorAnsi + border.bl + border.h.repeat(contentWidth + padding * 2) + border.br + endCode);

  return result.join('\n');
}

/** Print a box to console */
export function box(content: string, options?: BoxOptions): void;
export function box(options: BoxOptions, content: string): void;
export function box(contentOrOptions: string | BoxOptions, optionsOrContent?: BoxOptions | string): void {
  let content: string;
  let options: BoxOptions;

  if (typeof contentOrOptions === 'string') {
    content = contentOrOptions;
    options = (optionsOrContent as BoxOptions) || {};
  } else {
    content = optionsOrContent as string;
    options = contentOrOptions;
  }

  console.log(renderBox(content, options));
}
