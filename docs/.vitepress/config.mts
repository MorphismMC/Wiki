import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "/Uranus/icon.ico" }]
  ],
  ignoreDeadLinks: true,
  lang: "zh-CN",
  title: "Uranus",
  description: "格雷科技附属开发文档",
  base: "/Uranus/",
  themeConfig: {
    logo: "/icon/icon.ico",
    nav: [
      { text: '主页', link: '/' },
      { text: '介绍', link: '/introduce' },
      { text: '快速开始', link: '/quick_start' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "目录",
    outline: {
      label: "当前页大纲",
    },
    footer: {
      message: 'Released under the Creative Commons Zero v1.0 Universal License.',
      copyright: 'Copyright © 2024-2025 MorphismMC'
    },
    editLink: {
      pattern:
        "https://github.com/MorphismMC/Uranus/edit/main/docs/",
      text: "在Github上编辑该页",
    },
    lastUpdated: {
      text: "上次更新时间",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  lastUpdated: true
})
