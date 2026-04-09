# @myuym/term-style

Terminal fancy output library with chainable API. Make your CLI output colorful and beautiful.

## Installation

```bash
npm install @myuym/term-style
```

## Quick Start

```typescript
import t from '@myuym/term-style';

// Simple colors
t.red('Red text');
t.green('Green text');
t.blue.log('Blue text printed directly'); // .log() prints to console

// Chain styles
t.bold.red('Bold red text');
t.italic.underline.cyan('Italic underlined cyan');
t.bgYellow.black.bold('Yellow background, black text, bold');
```

## API

### Colors

**Foreground colors:**
- `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- `brightBlack` / `gray` / `grey`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`

**Background colors** (with `bg` prefix):
- `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`
- `bgBrightBlack` / `bgGray`, `bgBrightRed`, `bgBrightGreen`, etc.

```typescript
t.red('Red foreground')
t.bgBlue('Blue background')
t.bgYellow.blue('Yellow background with blue text')
```

### Styles

- `bold` - Bold text
- `dim` - Dimmed text
- `italic` - Italic text
- `underline` - Underlined text
- `blink` - Blinking text
- `inverse` - Swapped foreground/background
- `hidden` - Hidden text
- `strikethrough` - Strikethrough text

```typescript
t.bold('Bold text')
t.bold.italic.underline.red('Multiple styles')
```

### RGB / HEX Colors

```typescript
t.rgb(255, 100, 50)('Custom RGB color')
t.hex('#FF6432')('HEX color')
t.bgRgb(0, 100, 200).white('RGB background')
t.bgHex('#0064C8')('HEX background')
```

### Log Shortcuts

Pre-formatted log methods with icons:

```typescript
t.success('Operation completed!') // ✓ Green
t.error('Something went wrong')   // ✗ Red
t.warn('Warning message')         // ⚠ Yellow
t.info('Information')             // ℹ Blue
t.debug('Debug details')          // ⚙ Gray
```

### Box Output

Create bordered boxes for important content:

```typescript
// Simple box
t.box('Simple content')

// Styled box
t.box({
  title: 'Important',
  borderColor: 'cyan',
  borderStyle: 'double',
  padding: 1
}, 'This is the content\nMultiple lines supported')
```

**Box options:**
- `title` - Optional title shown in top border
- `borderColor` - Color name (red, green, cyan, etc.)
- `borderStyle` - `single` | `double` | `round` | `bold` | `none`
- `padding` - Internal padding (default: 0)
- `margin` - External margin (default: 0)
- `width` - Fixed width

### Progress Bar

```typescript
const bar = t.progress.start({ total: 100 });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  await sleep(50);
}

bar.complete();
```

**Progress options:**
- `total` - Total value (default: 100)
- `width` - Bar width in characters (default: 40)
- `complete` - Character for completed portion (default: █)
- `incomplete` - Character for incomplete portion (default: ░)

### Spinner

```typescript
const spinner = t.spinner.start('Loading...');

// Do some work
await doSomething();

spinner.succeed('Done!');
// Or: spinner.fail('Failed')
// Or: spinner.warn('Warning')
// Or: spinner.info('Info')
```

### Table Output

```typescript
t.table.render([
  { name: 'Alice', age: 28, city: 'Beijing' },
  { name: 'Bob', age: 32, city: 'Shanghai' },
  { name: 'Carol', age: 25, city: 'Guangzhou' }
], {
  headers: ['Name', 'Age', 'City'],
  borderColor: 'green'
});
```

**Table options:**
- `headers` - Custom header labels
- `borderColor` - Border color name
- `padding` - Cell padding (default: 1)
- `columns` - Column definitions with `key`, `header`, `width`, `align`

### Utilities

```typescript
// Strip ANSI codes from a string
const plain = t.strip('\x1b[31mRed\x1b[0m'); // 'Red'

// Check color support
console.log(t.supportsColor); // true/false
console.log(t.colorLevel);    // 0, 1, 2, or 3
```

**Color levels:**
- `0` - No color support
- `1` - 16 colors
- `2` - 256 colors
- `3` - True color (24-bit RGB)

## Examples

```typescript
import t from '@myuym/term-style';

// Header
t.cyan.bold('═══════════════════════════════════════');
t.cyan.bold('  Welcome to My CLI Tool');
t.cyan.bold('═══════════════════════════════════════');
console.log();

// Status messages
t.success('Dependencies installed');
t.warn('Some packages are outdated');
t.error('Build failed');
t.info('See docs for more info');
console.log();

// Box with info
t.box({
  title: 'Configuration',
  borderColor: 'yellow',
  borderStyle: 'round',
  padding: 1
}, 'Environment: production\nDebug: false\nPort: 3000');
console.log();

// Table
t.table.render([
  { file: 'index.ts', size: '2.3 KB', status: 'changed' },
  { file: 'utils.ts', size: '1.1 KB', status: 'unchanged' },
  { file: 'config.json', size: '456 B', status: 'new' }
], {
  headers: ['File', 'Size', 'Status'],
  borderColor: 'cyan'
});
```

## TypeScript

Full TypeScript support with exported types:

```typescript
import t, { BoxOptions, TableOptions, ProgressBar, Spinner } from 'term-style';
```

## License

MIT
