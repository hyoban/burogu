---
title: 同步你的 memos 到 Notion
permalink: memos-to-notion
description: ""
cover: ""
publish: true
date: 2023/5/25 17:23:25
updated: 2023/5/25 17:23:25
tags:
---

## 前言

[memos][] 是一个自部署的笔记软件，一直以来有很多人希望它的数据可以和其它平台互通。
为此我写了个小网站 [kirika][]，可以将不同的笔记平台的数据互相转换。
目前它主要支持 memos 相关的转换。

## 如何导入 memos 到 Notion

![](https://image.hyoban.cc/file/3aded9b5dd2a277dc7e70.png)

在 kirika 上，你只需要填入三个必备的参数，就可以将 memos 的数据导入到 Notion 中。

1. `OpenAPI` ：在你自部署的 memos 中，点击 Settings，就能找到
1. `Notion Database ID`
   1. 在 Notion 中，创建一个新的页面
   1. 在 Add new 的选项中，选择 `Table`
   1. 在右侧的 Select data source，选择 `New database`
   1. 在形如 `https://www.notion.so/99e5dcb11e9a477d863ba8626ebbc074?v=57ad18eb19fd4ba19733f318d9f5460c` 的 URL 中复制出 ? 之前的部分，作为 Notion Database ID
1. `Notion Token`
   1. 访问 [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   1. 点击 `New integration`
   1. 填写 Name，点击 `Submit`
   1. 点击 `Show`，复制出 Notion Token
1. 连接 Notion Integration 和 Notion Database
   1. 在 Notion 页面右上角，点击 `...`
   1. 鼠标向下移动到 `Add connections`
   1. 在输入框中搜索刚刚创建的 Notion Integration 的名字并选择
   1. 点击 `Confirm` 来允许读取此数据库

如此，你再回到 kirika 的页面，点击 `Convert`，就可以开始导入了。

## 等等，说好的同步呢

> 这不是导入吗，怎么变成同步了？要怎么让它定时执行来同步呢？

实际上 kirika 网页做的事情也就只是调用后台的接口而已。
你可以不通过网页，使用 curl 脚本来调用。

在点击 `Convert` 之后，你会在下方看到对应请求的 curl 命令，点击 `Copy` 来复制出来。

![](https://image.hyoban.cc/file/b95e8a36399c614c57519.png)

这之后你就可以将脚本用你喜欢的定时任务工具来执行了。

## 使用青龙来定时同步

要安装青龙，请参考 [青龙 Github][]。

首先创建脚本文件

![](https://image.hyoban.cc/file/5eb658745a1936fa8eb03.png)

粘贴刚刚复制的 curl 命令，点击右上角保存。

新建任务，使用 task 加上脚本路径来执行脚本，再设定 cron 表达式来定时执行。
比如 `0 0/5 * * * ?` 表示每 5 分钟执行一次，你可以在网络上搜到 cron 表达式生成器。

![](https://image.hyoban.cc/file/6d22a5043ae7e63c732bf.png)

## 使用 Raycast 来定时同步

在 Raycast 中，你可以使用 `Create Script Command` 来创建一个脚本命令。
注意 Mode 选择 inline，这样就可以设定脚本的刷新时间来自动执行。

![](https://image.hyoban.cc/file/726169f67aa82f447bb76.png)

创建完成之后，你打开刚刚创建的脚本，将刚刚复制的 curl 命令粘贴进去，保存。
然后你就可以在 Raycast 中使用这个命令来执行同步了。

[memos]: https://github.com/usememos/memos
[kirika]: https://github.com/hyoban/kirika
[青龙 Github]: https://github.com/whyour/qinglong
