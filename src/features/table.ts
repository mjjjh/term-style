/**
 * Table output feature
 */

import type { TableOptions, TableColumn } from '../types';

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

/** Characters for table borders */
const TABLE_CHARS = {
  top: '─',
  topMid: '┬',
  topLeft: '┌',
  topRight: '┐',
  bottom: '─',
  bottomMid: '┴',
  bottomLeft: '└',
  bottomRight: '┘',
  left: '│',
  leftMid: '├',
  mid: '─',
  midMid: '┼',
  right: '│',
  rightMid: '┤',
  middle: '│',
};

/** Calculate display width (excluding ANSI codes, handling CJK) */
function displayWidth(str: string): number {
  const stripped = str.replace(/\x1b\[[0-9;]*m/g, '');
  let width = 0;
  for (const char of stripped) {
    width += char.charCodeAt(0) > 127 ? 2 : 1;
  }
  return width;
}

/** Pad string to specific display width */
function padToWidth(str: string, width: number, align: 'left' | 'center' | 'right' = 'left'): string {
  const current = displayWidth(str);
  if (current >= width) return str;

  const diff = width - current;
  if (align === 'left') {
    return str + ' '.repeat(diff);
  } else if (align === 'right') {
    return ' '.repeat(diff) + str;
  } else {
    const leftPad = Math.floor(diff / 2);
    const rightPad = diff - leftPad;
    return ' '.repeat(leftPad) + str + ' '.repeat(rightPad);
  }
}

/** Get color code */
function getBorderAnsi(color?: string): string {
  if (!color) return '';
  return BORDER_COLORS[color] || '';
}

/** Infer columns from data */
function inferColumns(data: Record<string, unknown>[]): string[] {
  const keys = new Set<string>();
  for (const row of data) {
    Object.keys(row).forEach(key => keys.add(key));
  }
  return Array.from(keys);
}

/** Calculate column widths */
function calculateWidths(data: Record<string, unknown>[], columns: TableColumn[], headers: string[], padding: number): number[] {
  const padStr = ' '.repeat(padding);
  const widths: number[] = columns.map((col, i) => {
    const headerWidth = displayWidth(padStr + (headers[i] || col.header || col.key) + padStr);
    const values = data.map(row => {
      const val = String(row[col.key] ?? '');
      return displayWidth(padStr + val + padStr);
    });
    return Math.max(headerWidth, ...values);
  });
  return widths;
}

/** Render table */
export function renderTable(data: Record<string, unknown>[], options: TableOptions = {}): string {
  const {
    headers,
    columns: explicitColumns,
    borderColor = '',
    padding = 1,
  } = options;

  if (data.length === 0) {
    return '(empty table)';
  }

  const color = getBorderAnsi(borderColor);
  const padStr = ' '.repeat(padding);

  // Determine columns
  const keys = inferColumns(data);
  const columns: TableColumn[] = explicitColumns || keys.map(key => ({ key, align: 'left' as const }));

  // Determine headers
  const headerLabels = headers || columns.map(col => col.header || col.key);

  // Calculate widths
  const widths = calculateWidths(data, columns, headerLabels, padding);

  // Build table
  const lines: string[] = [];
  const C = TABLE_CHARS;

  // Top border
  const topBorder = C.topLeft + widths.map(w => C.top.repeat(w)).join(C.topMid) + C.topRight;
  lines.push(color + topBorder + RESET);

  // Header row
  const headerRow = C.left + columns.map((col, i) =>
    padToWidth(padStr + headerLabels[i] + padStr, widths[i], col.align)
  ).join(C.middle) + C.right;
  lines.push(color + headerRow + RESET);

  // Header separator
  const separator = C.leftMid + widths.map(w => C.mid.repeat(w)).join(C.midMid) + C.rightMid;
  lines.push(color + separator + RESET);

  // Data rows
  for (const row of data) {
    const dataRow = C.left + columns.map((col, i) => {
      const val = String(row[col.key] ?? '');
      return padToWidth(padStr + val + padStr, widths[i], col.align);
    }).join(C.middle) + C.right;
    lines.push(color + dataRow + RESET);
  }

  // Bottom border
  const bottomBorder = C.bottomLeft + widths.map(w => C.bottom.repeat(w)).join(C.bottomMid) + C.bottomRight;
  lines.push(color + bottomBorder + RESET);

  return lines.join('\n');
}

/** Print table to console */
export function table(data: Record<string, unknown>[], options: TableOptions = {}): void {
  console.log(renderTable(data, options));
}
