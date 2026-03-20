/**
 * term-style example - Test all features
 */

import t from './src/index.ts';

console.log('\n=== Basic Colors ===\n');

t.red.log('Red text');
t.green.log('Green text');
t.yellow.log('Yellow text');
t.blue.log('Blue text');
t.magenta.log('Magenta text');
t.cyan.log('Cyan text');
t.white.log('White text');

console.log('\n=== Bright Colors ===\n');

t.brightRed.log('Bright red');
t.brightGreen.log('Bright green');
t.brightYellow.log('Bright yellow');
t.gray.log('Gray text');

console.log('\n=== Background Colors ===\n');

t.bgRed.white.log('Red background, white text');
t.bgBlue.yellow.log('Blue background, yellow text');
t.bgGreen.black.log('Green background, black text');
t.bgMagenta.white.log('Magenta background');

console.log('\n=== Styles ===\n');

t.bold.log('Bold text');
t.italic.log('Italic text');
t.underline.log('Underlined text');
t.strikethrough.log('Strikethrough text');
t.dim.log('Dim text');
t.blink.log('Blinking text');
t.inverse.log('Inversed colors');

console.log('\n=== Chain Styles ===\n');

t.bold.red.log('Bold red');
t.italic.underline.cyan.log('Italic underlined cyan');
t.bgYellow.black.bold.log('Yellow BG, black text, bold');
t.bold.italic.underline.magenta.log('All styles combined');

console.log('\n=== RGB / HEX Colors ===\n');

t.rgb(255, 100, 50).log('Custom RGB (255, 100, 50)');
t.hex('#9B59B6').log('HEX color #9B59B6');
t.bgRgb(100, 200, 255).black.log('RGB background');

console.log('\n=== Log Shortcuts ===\n');

t.success('Operation completed successfully!');
t.error('Something went wrong!');
t.warn('This is a warning!');
t.info('Here is some information');
t.debug('Debug details here');

console.log('\n=== Box Output ===\n');

t.box('Simple box with default settings');

console.log();

t.box({
  title: 'Important Notice',
  borderColor: 'cyan',
  borderStyle: 'double',
  padding: 1
}, 'This is an important message.\nIt can span multiple lines.\n\nUse boxes to highlight key information.');

console.log();

t.box({
  title: 'Success',
  borderColor: 'green',
  borderStyle: 'round',
  padding: 0
}, 'Operation completed! \nGreat job! \n\nCelebrate your success!');

console.log('\n=== Table Output ===\n');

t.table.render([
  { name: 'Alice', age: 28, city: 'Beijing' },
  { name: 'Bob', age: 32, city: 'Shanghai' },
  { name: 'Carol', age: 25, city: 'Guangzhou' }
], {
  headers: ['Name', 'Age', 'City'],
  borderColor: 'green'
});

console.log('\n=== Progress Bar ===\n');

async function testProgress() {
  const bar = t.progress.start({ total: 100, width: 30 });

  for (let i = 0; i <= 100; i += 2) {
    bar.update(i);
    await new Promise(r => setTimeout(r, 30));
  }

  bar.complete();
  console.log('\nProgress complete!\n');
}

console.log('\n=== Spinner ===\n');

async function testSpinner() {
  const spinner = t.spinner.start('Loading data...');

  await new Promise(r => setTimeout(r, 1500));
  spinner.update('Processing data...');

  await new Promise(r => setTimeout(r, 1500));
  spinner.succeed('Data loaded successfully!');
}

(async () => {
  await testProgress();
  await testSpinner();

  console.log('\n=== Utility ===\n');

  const formatted = t.bold.red('Test string');
  console.log('Formatted:', formatted);
  console.log('Stripped:', t.strip(formatted));
  console.log('Color support:', t.supportsColor);
  console.log('Color level:', t.colorLevel);

  console.log('\n=== All tests complete! ===\n');
})();
