module.exports = {
  siteName: "Hyoban's Blog",
  siteLanguage: 'zh-Hans',
  description: 'Hyoban 的个人博客，胡乱写些东西',
  shortDescription: 'undefined',
  fullDescription: [
    {
      title: '技能点',
      content: [
        '前端开发者，TypeScript，Next.js，Vue.js',
        '偏好于 jsx 风格，而非模板语法',
        '热爱开源，memos 项目维护者之一',
        '技多不压身，也会写点 Java, Kotlin, Golang, Android',
      ],
    },
    {
      title: '偏好',
      content: [
        'VSCode 是最好滴，站队双空格缩进',
        'PC 用户，使用 WSL2 + Ubuntu',
      ],
    },
  ],
  avatarPath: '/hyoban.png',
  faviconPath: '/favicon.svg',
  links: [
    {
      type: 'GitHub',
      url: 'https://github.com/hyoban',
    },
    {
      type: 'Mastodon',
      url: 'https://elk.zone/mas.to/@hyoban',
    },
  ],
  codeTheme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  siteUrl: 'https://blog.hyoban.cc',
  authorName: 'Hyoban',
  authorLink: 'https://blog.hyoban.cc',
  authorEmail: 'hi@hyoban.cc',
  comment: {
    giscusConfig: {
      repo: 'hyoban/blog-next-notion',
      repositoryId: 'R_kgDOIxobTQ',
      category: 'Announcements',
      categoryId: 'DIC_kwDOIxobTc4CTwZ4',
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      inputPosition: 'bottom',
      lang: 'en',
      darkTheme: 'dark',
    },
  },
  timeZone: 'Asia/Shanghai',
}
