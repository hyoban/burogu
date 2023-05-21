---
title: 聊聊代码格式化
permalink: code-format
description: "如果你想让两个程序员吵起来，就只需要问他们 tab 和 space 谁更好"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/3/24 14:08:25
updated: 2023/3/24 14:08:25
tags:
  - prettier
  - editorconfig
---

## Tab vs Space

首先，我想谈谈我关于使用 Tab 还是 Space 的考虑。我毫无疑问地支持使用 Tab。

我的理由是，Tab 能够自由地控制在编辑器中显示的长度。同时，我们显然不能让所有人都选择二个空格或四个空格缩进。既然如此，为什么不使用 Tab 缩进，然后将显示缩进宽度的选择权交给每个人呢？这样，无论你更喜欢紧凑的代码布局，还是想要增大缩进来尽早发现你代码中的嵌套，都是可以被允许的。

当然，不是所有软件都允许你动态的调整 Tab 的长度，如果它被固定到你不喜欢的宽度，可能会引起你的不适。Space 则没有这个问题。

## Prettier

[prettier](https://prettier.io) 是 nodejs 生态中使用最多的代码格式化工具，可以统一代码风格，比如缩进、引号、分号等。 以下是你需要了解的有关 prettier 的全部内容。

### 设置过程

安装为开发依赖

```bash
ni -D prettier
```

在 `package.json` 中添加脚本和配置，我只设置了去除分号

```json
{
	"scripts": {
		"format": "prettier --write ."
	},
	"prettier": {
		"semi": false
	}
}
```

按需创建 `.prettierignore` 文件，你可以以 `.gitignore` 和 `.eslintignore` 为基础。

安装 [prettier VSCode 插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)，添加配置到 `.vscode/settings.json`。 由于已经配置好 ignore 的规则，我们可以直接设置它为默认格式化器，如有例外的文件类型再自行覆盖。

```json
{
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true
}
```

如此，当你保存文件时，prettier 就会自动帮你格式化代码。

### editorconfig

[editorconfig](https://editorconfig.org) 是一份通用的编辑器配置规范，很多编辑器和工具都支持它的配置项。 取决于你自己，可以设置好一份 `.editorconfig` 文件。

需要注意 windows 和其它系统的换行符不同，为 crlf。

```
root = true

[*]
charset = utf-8
end_of_line = lf
max_line_length = 80
indent_style = tab
# indent_style = space
# indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

它的配置项会被 prettier 识别。安装 [editorconfig VSCode 插件](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 后，也能按配置调整 vscode 的工作区设置。

## Q&A

### 为什么不使用 eslint 来检查代码风格？

1. 要达到 prettier 的格式化效果，需要配置维护大量的 eslint 规则，且存在不易实现的效果。
2. 对于 vue 项目，你可以尝试使用 `@antfu/eslint-config`
3. 代码风格无关代码正确性，eslint 会飘很多红。lint 这个词对于代码风格来说太严格了。
4. 虽然可以在保存时自动修复，但我受不了。

另外，推荐不要结合 eslint 使用 prettier，vscode 明明有 lint 和 formate 各自对应的设置项

### 为何不配置 prettier 的配置项和插件？

1. 就默认的配置而言，去除分号后，代码已经足够美观
2. 就我折腾 prettier 插件的体验来说，只要超过使用一个插件，就很大概率会出现插件冲突的问题

### 如何格式化 import 语句？

推荐使用 vscode 的设置项，它能实现对 import 进行排序，去除未使用的 import 等功能。

```json
{
	"editor.codeActionsOnSave": {
		"source.organizeImports": true
	}
}
```

## 总结

总之，人生苦短，我懒得弄了。

我尝试折腾过 `@ianvs/prettier-plugin-sort-imports` 插件来格式化 import 语句，但它无法处理全部的场景。 我也用过 `prettier-plugin-tailwindcss` 来排序 tailwind 的 classname。 但是它和前者无法共同使用，还会和 `@egoist/tailwindcss-icons` 不相容。

遇到的问题有的有办法规避或者解决，但是需要花时间去排查，我对此感到疲惫。 所以，我不愿意再去追求完美的效果，我可以手动处理这些场景。 对于 prettier 本体来说，开箱即用的体验挺好的。

## 相关链接

1. [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier)
