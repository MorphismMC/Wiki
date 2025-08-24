import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MorphismMC Wiki",
  description: "MorphismMC开发文档",
  lang: 'zh-CN',

  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "icon.ico" }]
  ],
  ignoreDeadLinks: true,
  
  themeConfig: {
    logo: "/icon/icon.ico",
    nav: [
      { text: '主页', link: '/' },
      { text: '介绍', link: '/introduce' },
      { text: '快速开始', link: '/quick_start' }
    ],

    sidebar: [
      {
        text: 'GTCEu附属开发文档',
        collapsed: false,
        items: [
          { text: '引言', link: '/gtceu/intro' },
          { text: '元物品', link: '/gtceu/chap1-metaitem' }
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
        "https://github.com/MorphismMC/Wiki/edit/main/docs/",
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

  markdown: {
    lineNumbers: true,

    config: (md) => {
      md.use(() => { groupIconMdPlugin })
      md.use(() => { MermaidMarkdown })
    }
  },

  vite: {
    plugins: [
      [MermaidPlugin()]
    ],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    }
  },

  lastUpdated: true
})
