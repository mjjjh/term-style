# @myuym/term-style

一个轻量级、零依赖的 Node.js 终端输出美化库，通过**链式调用 API** 让命令行输出更加丰富多彩。

[English](./README.md) | 简体中文

## 目录

- [安装](#安装)
- [快速开始](#快速开始)
- [API 文档](#api-文档)
  - [颜色](#颜色)
  - [样式](#样式)
  - [RGB/HEX 自定义颜色](#rgbhex-自定义颜色)
  - [日志快捷方法](#日志快捷方法)
  - [盒子输出](#盒子输出)
  - [进度条](#进度条)
  - [加载动画](#加载动画)
  - [表格输出](#表格输出)
  - [工具方法](#工具方法)
- [TypeScript 支持](#typescript-支持)
- [兼容性](#兼容性)
- [许可证](#许可证)

## 安装

```bash
npm install @myuym/term-style
```

## 快速开始

```typescript
import t from 'term-style';

// 简单颜色
t.red('红色文本')
t.green.log('绿色文本')  // .log() 直接打印

// 链式调用
t.bold.red('粗体红色')
t.italic.underline.cyan('斜体下划线青色')
t.bgYellow.black.bold('黄底黑字粗体')

// 日志快捷方法
t.success('操作成功!')
t.error('操作失败!')
```

## API 文档

### 颜色

#### 前景色 (8 色)

```typescript
t.black('黑色')
t.red('红色')
t.green('绿色')
t.yellow('黄色')
t.blue('蓝色')
t.magenta('品红')
t.cyan('青色')
t.white('白色')
```

#### 亮色前景色 (高亮版本)

```typescript
t.brightBlack('亮黑色')
t.gray('灰色')       // gray 是 brightBlack 的别名
t.grey('灰色')       // grey 是 brightBlack 的别名
t.brightRed('亮红色')
t.brightGreen('亮绿色')
t.brightYellow('亮黄色')
t.brightBlue('亮蓝色')
t.brightMagenta('亮品红')
t.brightCyan('亮青色')
t.brightWhite('亮白色')
```

#### 背景色

背景色使用 `bg` 前缀：

```typescript
t.bgBlack('黑色背景')
t.bgRed('红色背景')
t.bgGreen('绿色背景')
t.bgYellow('黄色背景')
t.bgBlue('蓝色背景')
t.bgMagenta('品红背景')
t.bgCyan('青色背景')
t.bgWhite('白色背景')
```

#### 亮色背景

```typescript
t.bgBrightBlack('亮黑色背景')
t.bgGray('灰色背景')     // bgGray 是 bgBrightBlack 的别名
t.bgBrightRed('亮红色背景')
t.bgBrightGreen('亮绿色背景')
t.bgBrightYellow('亮黄色背景')
t.bgBrightBlue('亮蓝色背景')
t.bgBrightMagenta('亮品红背景')
t.bgBrightCyan('亮青色背景')
t.bgBrightWhite('亮白色背景')
```

#### 组合前景色和背景色

```typescript
t.bgRed.white('红底白字')
t.bgBlue.yellow('蓝底黄字')
t.bgGreen.black.bold('绿底黑字粗体')
```

### 样式

支持以下文本样式，可链式组合：

```typescript
t.bold('粗体文本')
t.dim('变暗文本')
t.italic('斜体文本')
t.underline('下划线文本')
t.blink('闪烁文本')
t.inverse('反色文本')        // 交换前景色和背景色
t.hidden('隐藏文本')         // 隐藏文本（常用于密码输入）
t.strikethrough('删除线文本')
```

#### 组合多种样式

```typescript
t.bold.italic.red('粗体斜体红色')
t.underline.bgYellow.blue('下划线黄底蓝字')
t.bold.italic.underline.strikethrough.magenta('所有样式组合')
```

### RGB/HEX 自定义颜色

支持 24 位真彩色（需要终端支持）：

```typescript
// RGB 颜色
t.rgb(255, 100, 50)('自定义 RGB 颜色')
t.rgb(0, 255, 128).log('直接打印 RGB 颜色')

// HEX 颜色
t.hex('#FF6432')('HEX 颜色')
t.hex('#9B59B6').log('直接打印 HEX 颜色')

// RGB 背景
t.bgRgb(100, 200, 255)('RGB 背景色')
t.bgRgb(50, 100, 150).white('RGB 背景配白色文本')

// HEX 背景
t.bgHex('#0064C8')('HEX 背景色')
t.bgHex('#FF5500').black.bold('HEX 背景配黑色粗体文本')
```

> **注意**: RGB/HEX 颜色需要终端支持真彩色（24 位）。如果不支持，将自动降级处理。

### 日志快捷方法

预格式化的日志方法，带有图标，适合快速输出状态信息：

```typescript
t.success('操作成功完成!')   // ✓ 绿色
t.error('操作失败!')         // ✗ 红色
t.warn('警告信息!')          // ⚠ 黄色
t.info('提示信息')           // ℹ 蓝色
t.debug('调试详情')          // ⚙ 灰色
```

输出示例：
```
✓ 操作成功完成!
✗ 操作失败!
⚠ 警告信息!
ℹ 提示信息
⚙ 调试详情
```

### 盒子输出

创建带边框的盒子，用于突出显示重要信息：

#### 简单用法

```typescript
t.box('简单的盒子')
```

```
┌────────────────────┐
│简单的盒子            │
└────────────────────┘
```

#### 完整配置

```typescript
t.box({
  title: '重要提示',
  borderColor: 'cyan',
  borderStyle: 'double',
  padding: 1
}, '这是重要信息\n支持多行\n\n用于突出显示关键内容')
```

```
╔══════════ 重要提示 ═══════════╗
║                               ║
║ 这是重要信息                   ║
║ 支持多行                       ║
║                               ║
║ 用于突出显示关键内容           ║
║                               ║
╚═══════════════════════════════╝
```

#### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `''` | 盒子标题，显示在顶部边框中 |
| `borderColor` | `string` | `''` | 边框颜色，支持所有命名颜色 |
| `borderStyle` | `string` | `'single'` | 边框样式 |
| `padding` | `number` | `0` | 内边距 |
| `margin` | `number` | `0` | 外边距 |
| `width` | `number` | 自动 | 固定宽度 |

#### 边框样式

```typescript
// 单线 (默认)
t.box({ borderStyle: 'single' }, '单线边框')
// ┌──────┐
// │内容  │
// └──────┘

// 双线
t.box({ borderStyle: 'double' }, '双线边框')
// ╔══════╗
// ║内容  ║
// ╚══════╝

// 圆角
t.box({ borderStyle: 'round' }, '圆角边框')
// ╭──────╮
// │内容  │
// ╰──────╯

// 粗线
t.box({ borderStyle: 'bold' }, '粗线边框')
// ┏━━━━━━┓
// ┃内容  ┃
// ┗━━━━━━┛

// 无边框
t.box({ borderStyle: 'none' }, '无边框')
//  内容
```

#### 多行内容

```typescript
t.box({
  title: '说明',
  borderColor: 'yellow'
}, '第一行\n第二行\n\n空行后的内容')
```

### 进度条

展示任务进度：

```typescript
// 创建进度条
const bar = t.progress.start({
  total: 100,      // 总量，默认 100
  width: 40,       // 进度条宽度，默认 40
  complete: '█',   // 完成字符，默认 █
  incomplete: '░'  // 未完成字符，默认 ░
});

// 更新进度
bar.update(50);      // 更新到 50
bar.increment();     // 增加 1
bar.increment(5);    // 增加 5

// 完成
bar.complete();
```

完整示例：

```typescript
async function download() {
  const bar = t.progress.start({ total: 100, width: 30 });

  for (let i = 0; i <= 100; i += 2) {
    bar.update(i);
    await sleep(30);
  }

  bar.complete();
}
```

输出效果：
```
██████████████████░░░░░░░░░░░░ 50%
██████████████████████████████ 100%
```

### 加载动画

展示不确定进度的加载状态：

```typescript
// 启动加载动画
const spinner = t.spinner.start('加载中...');

// 更新文本
spinner.update('处理数据...');

// 完成状态
spinner.succeed('完成!');    // ✓ 完成!
spinner.fail('失败!');       // ✗ 失败!
spinner.warn('警告!');       // ⚠ 警告!
spinner.info('信息');        // ℹ 信息

// 停止（不带状态）
spinner.stop();
```

完整示例：

```typescript
async function loadData() {
  const spinner = t.spinner.start('正在加载数据...');

  try {
    await fetchData();
    spinner.succeed('数据加载成功!');
  } catch (error) {
    spinner.fail('数据加载失败!');
  }
}
```

输出效果：
```
⠋ 加载中...
⠙ 加载中...
⠹ 加载中...
✓ 数据加载成功!
```

### 表格输出

格式化输出表格数据：

#### 基本用法

```typescript
t.table.render([
  { name: '张三', age: 28, city: '北京' },
  { name: '李四', age: 32, city: '上海' },
  { name: '王五', age: 25, city: '广州' }
]);
```

```
┌──────┬─────┬────────┐
│ name │ age │ city   │
├──────┼─────┼────────┤
│ 张三 │ 28  │ 北京   │
│ 李四 │ 32  │ 上海   │
│ 王五 │ 25  │ 广州   │
└──────┴─────┴────────┘
```

#### 自定义表头和样式

```typescript
t.table.render([
  { name: '张三', age: 28, city: '北京' },
  { name: '李四', age: 32, city: '上海' }
], {
  headers: ['姓名', '年龄', '城市'],
  borderColor: 'green',
  padding: 1
});
```

```
┌────────┬────────┬──────────┐
│ 姓名   │ 年龄   │ 城市     │
├────────┼────────┼──────────┤
│ 张三   │ 28     │ 北京     │
│ 李四   │ 32     │ 上海     │
└────────┴────────┴──────────┘
```

#### 配置选项

| 选项 | 类型 | 说明 |
|------|------|------|
| `headers` | `string[]` | 自定义表头名称 |
| `borderColor` | `string` | 边框颜色 |
| `padding` | `number` | 单元格内边距，默认 1 |

### 工具方法

#### strip(text)

移除文本中的 ANSI 转义码：

```typescript
const colored = t.bold.red('彩色文本');
console.log(colored);              // \x1b[1;31m彩色文本\x1b[0m
console.log(t.strip(colored));     // 彩色文本
```

#### supportsColor

检测终端是否支持颜色（只读属性）：

```typescript
console.log(t.supportsColor);  // true 或 false
```

#### colorLevel

获取终端颜色支持级别（只读属性）：

```typescript
console.log(t.colorLevel);  // 0, 1, 2, 或 3
```

颜色级别说明：
- `0` - 不支持颜色
- `1` - 支持 16 色
- `2` - 支持 256 色
- `3` - 支持真彩色（24 位 RGB）

## TypeScript 支持

本库使用 TypeScript 编写，提供完整的类型定义：

```typescript
import t, {
  TermStyle,
  StyleChain,
  BoxOptions,
  TableOptions,
  ProgressOptions,
  ProgressBar,
  Spinner
} from '@myuym/term-style';
```

### 类型定义

```typescript
// 盒子配置
interface BoxOptions {
  title?: string;
  borderColor?: string;
  borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'none';
  padding?: number;
  margin?: number;
  width?: number;
}

// 表格配置
interface TableOptions {
  headers?: string[];
  borderColor?: string;
  padding?: number;
}

// 进度条配置
interface ProgressOptions {
  total?: number;
  width?: number;
  complete?: string;
  incomplete?: string;
}

// 进度条实例
interface ProgressBar {
  update(current: number): void;
  increment(delta?: number): void;
  complete(): void;
  stop(): void;
}

// 加载动画实例
interface Spinner {
  text: string;
  update(text: string): void;
  succeed(text?: string): void;
  fail(text?: string): void;
  warn(text?: string): void;
  info(text?: string): void;
  stop(): void;
}
```

## 兼容性

### 运行环境

- Node.js >= 14

### 终端支持

| 终端 | 16 色 | 256 色 | 真彩色 |
|------|-------|--------|--------|
| Windows Terminal | ✓ | ✓ | ✓ |
| CMD | ✓ | ✓ | 部分支持 |
| PowerShell | ✓ | ✓ | ✓ |
| Git Bash | ✓ | ✓ | ✓ |
| WSL | ✓ | ✓ | ✓ |
| VS Code 终端 | ✓ | ✓ | ✓ |
| JetBrains 终端 | ✓ | ✓ | ✓ |

### 颜色检测

库会自动检测终端颜色支持级别，并根据环境变量调整：

- `NO_COLOR=1` - 禁用颜色
- `FORCE_COLOR=1` - 强制启用颜色
- `COLORTERM=truecolor` - 标识支持真彩色

## 常见问题

### 为什么颜色不显示？

1. 检查终端是否支持颜色
2. 确认没有设置 `NO_COLOR` 环境变量
3. 尝试设置 `FORCE_COLOR=1`

### 为什么 RGB 颜色看起来不对？

RGB 颜色需要终端支持真彩色（24 位）。检查：
- `t.colorLevel` 是否为 `3`
- 终端是否支持真彩色

### 如何在 CI/CD 中使用？

```yaml
# GitHub Actions
env:
  FORCE_COLOR: 1
```

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 运行示例
npm run example

# 开发模式（监视文件变化）
npm run dev
```

## 许可证

MIT
