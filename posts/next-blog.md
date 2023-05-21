---
title: 使用 Next.js 来构建博客
permalink: next-blog
description: 支持多种数据源，包括本地 md 文件，和 Notion 数据库中的页面
cover: ""
publish: true
date: 2023/5/13 15:17:25
updated: 2023/5/13 15:17:25
tags:
---

## 使用本地 markdown 文件和 static export

在 Next.js 13.3 中，增加了 [static export][] 的功能，我们可以直接部署打包好的静态文件。

默认情况下，本博客使用本地 markdown 文件来构建页面，博客文章都在 `posts` 目录下。
要创建一个新的文章，需要在文件中使用 frontmatter 来设置文章元信息。

## 使用 Notion Database

### 与其它方案对比

和常规的前后端程序相比

1. 搭建成本低，一键即可部署到 Vercel
2. 专注于界面和功能，内容管理的部分交由 Notion 来完成

和 Hexo 或者 Hugo 等静态站点生成器相比

1. 不用在项目 git 仓库中编写文章
2. 不用每次内容变化时重新构建新的站点

### Next.js 加上 Notion 的优势

1. 具备动态获取文章内容能力的同时，性能足够好
2. Notion 的开放 API 体验极其友好，文章内容格式的丰富程度比 markdown 高

## 如何使用 Notion

### 准备好 Notion 数据库

1. 首先准备用于存放博客文章的空数据库，获取到 `NOTION_DATABASE_ID`
2. 创建 [Integrations][]，获取 `NOTION_TOKEN`，并连接到创建的数据库

### 开始设置

1. 从我的代码 fork 或者从模板创建项目
2. 按照你的信息修改 `config/site.config.ts` 中的内容
3. 在 Vercel 中以此仓库创建新的项目
4. 在环境变量中填入 `NOTION_TOKEN` , `NOTION_DATABASE_ID`

修改 `config/site.config.ts` 中 source 的部分为 `notion`，
删除 `next.config.js` 如下部分来关闭 static export。

```js
const nextConfig = {
	// 删除配置里对应的部分，取消其他部分的注释
	output: "export",
	images: {
		unoptimized: true,
	},
}
module.exports = nextConfig
```

### 推荐的写作模式

在任意其它的页面进行写作，等到完成后，复制或者移动到创建的数据库。

[Integrations]: https://www.notion.so/my-integrations
[static export]: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
