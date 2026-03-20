# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-20

### Added

- **Chainable API** - Proxy-based infinite chaining for colors and styles
- **Colors** - 16 foreground colors + 16 background colors
- **Bright colors** - Bright variants for all base colors
- **RGB/HEX support** - Custom colors with `rgb()`, `hex()`, `bgRgb()`, `bgHex()`
- **Text styles** - bold, dim, italic, underline, blink, inverse, hidden, strikethrough
- **Log shortcuts** - `success()`, `error()`, `warn()`, `info()`, `debug()` with icons
- **Box output** - Bordered boxes with 5 styles (single, double, round, bold, none)
- **Progress bar** - Determinate progress display with customizable characters
- **Spinner** - Animated loading indicator with 5 presets (dots, line, pipe, star, arrow)
- **Table output** - Auto-calculated column widths with border support
- **Utilities** - `strip()` for removing ANSI codes, `supportsColor`, `colorLevel`
- **TypeScript** - Full type definitions included
- **Zero dependencies** - Lightweight and secure

### Features

- CJK character width support (Chinese, Japanese, Korean)
- Automatic color level detection (0-3)
- Graceful degradation for unsupported terminals
- ESM and CommonJS support
