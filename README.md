# Burogu

## 为什么选择 Notion 和 Next.js

### 与其它方案对比

和常规的前后端程序相比

1. 搭建成本低，一键即可部署到 Vercel
2. 专注于界面和功能，内容管理的部分交由 Notion 来完成

和 Hexo 或者 Hugo 等静态站点生成器相比

1. 不用在项目 git 仓库中编写文章
2. 不用每次内容变化时重新构建新的站点（同时也可以静态导出）

### Next.js 加上 Notion 的优势

1. 具备动态获取文章内容能力的同时，性能足够好
2. Notion 的开放 api 体验极其友好，文章内容格式的丰富程度比 markdown 高

## 如何使用这个项目

### 准备好 Notion 数据库

1. 首先准备用于存放博客文章的空数据库，获取到 `NOTION_DATABASE_ID`
2. 创建 [Integrations](https://www.notion.so/my-integrations)，获取 `NOTION_TOKEN`，并连接到创建的数据库

### 开始设置

1. 从我的代码 fork 或者从模板创建项目
2. 按照你的信息修改 `site.config.ts` 中的内容
3. 在 Vercel 中以此仓库创建新的项目
4. 在环境变量中填入 `NOTION_TOKEN` ，`NOTION_DATABASE_ID`

## 使用 static export

在 Next.js 13.3 中，增加了 [static export](https://beta.nextjs.org/docs/configuring/static-export) 的功能。我们可以不借助服务端来部署打包好的静态文件，只是就需要 GitHub Action 配合 Vercel 的 hook 来做定时部署了。

修改 `next.config.js` 来开启 static export，然后参照 [Scheduling Netlify and Vercel builds with Github Actions - Codemzy's Blog](https://www.codemzy.com/blog/scheduling-builds-github-actions) 来设置 GitHub Action.

```js
const nextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
}
module.exports = nextConfig
```
