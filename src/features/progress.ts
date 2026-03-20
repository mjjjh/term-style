/**
 * Progress bar feature
 */

import { CURSOR_START, CLEAR_LINE, HIDE_CURSOR, SHOW_CURSOR } from '../core/ansi';
import type { ProgressOptions, ProgressBar, ProgressState } from '../types';

/** Default progress bar format */
function defaultFormat(state: ProgressState, width: number, complete: string, incomplete: string): string {
  const percent = Math.min(100, Math.max(0, state.percent));
  const completed = Math.round(percent / 100 * width);
  const incompleteWidth = width - completed;

  return `${complete.repeat(Math.max(0, completed))}${incomplete.repeat(Math.max(0, incompleteWidth))} ${percent.toFixed(0)}%`;
}

/** Create a progress bar */
export function createProgressBar(options: ProgressOptions = {}): ProgressBar {
  const {
    total = 100,
    width = 40,
    complete = '\u2588', // █
    incomplete = '\u2591', // ░
  } = options;

  let current = 0;
  let isComplete = false;
  const stream = process.stdout;

  function render() {
    const percent = total > 0 ? (current / total) * 100 : 0;
    const state: ProgressState = { total, current, percent };

    const output = defaultFormat(state, width, complete, incomplete);
    stream.write(CURSOR_START + CLEAR_LINE + output);
  }

  return {
    update(value: number): void {
      if (isComplete) return;
      current = Math.min(total, Math.max(0, value));
      render();
    },

    increment(delta: number = 1): void {
      if (isComplete) return;
      current = Math.min(total, current + delta);
      render();
    },

    complete(): void {
      if (isComplete) return;
      isComplete = true;
      current = total;
      render();
      stream.write('\n');
    },

    stop(): void {
      if (isComplete) return;
      isComplete = true;
      stream.write('\n');
    },
  };
}

/** Spinner presets */
export const SPINNER_PRESETS = {
  dots: {
    interval: 80,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  },
  line: {
    interval: 130,
    frames: ['-', '\\', '|', '/'],
  },
  pipe: {
    interval: 100,
    frames: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
  },
  star: {
    interval: 70,
    frames: ['✶', '✸', '✹', '✺', '✹', '✸'],
  },
  arrow: {
    interval: 100,
    frames: ['→', '↘', '↓', '↙', '←', '↖', '↑', '↗'],
  },
} as const;

import type { Spinner, SpinnerPreset, SpinnerFrames } from '../types';

/** Create a spinner */
export function createSpinner(text: string = '', preset: SpinnerPreset = 'dots'): Spinner {
  const frames = SPINNER_PRESETS[preset];
  let frameIndex = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let spinnerText = text;
  let isComplete = false;
  const stream = process.stdout;

  stream.write(HIDE_CURSOR);

  function render() {
    const frame = frames.frames[frameIndex];
    stream.write(CURSOR_START + CLEAR_LINE + `${frame} ${spinnerText}`);
    frameIndex = (frameIndex + 1) % frames.frames.length;
  }

  function start() {
    intervalId = setInterval(render, frames.interval);
  }

  function stop(finalIcon: string, finalText?: string) {
    if (isComplete) return;
    isComplete = true;

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    const displayText = finalText !== undefined ? finalText : spinnerText;
    stream.write(CURSOR_START + CLEAR_LINE + `${finalIcon} ${displayText}\n`);
    stream.write(SHOW_CURSOR);
  }

  start();

  return {
    get text() { return spinnerText; },

    update(newText: string): void {
      spinnerText = newText;
    },

    succeed(finalText?: string): void {
      stop('\x1b[32m✓\x1b[0m', finalText);
    },

    fail(finalText?: string): void {
      stop('\x1b[31m✗\x1b[0m', finalText);
    },

    warn(finalText?: string): void {
      stop('\x1b[33m⚠\x1b[0m', finalText);
    },

    info(finalText?: string): void {
      stop('\x1b[34mℹ\x1b[0m', finalText);
    },

    stop(): void {
      if (isComplete) return;
      isComplete = true;

      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }

      stream.write(CURSOR_START + CLEAR_LINE);
      stream.write(SHOW_CURSOR);
    },
  };
}
