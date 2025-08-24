import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid'
import { en } from './config/en'
import { zh } from './config/zh'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: 'icon.ico' }]
  ],
  title: 'MorphismMC Wiki',
  themeConfig: {
    logo: '/icon/icon.ico',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MorphismMC/Wiki' }
    ],
    footer: {
      message: 'Released under the Creative Commons Zero v1.0 Universal License.',
      copyright: 'Copyright © 2024-2025 MorphismMC'
    },
  },
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,

    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },

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
  locales: {
    root: { label: "English", ...en },
    zh: { label: "简体中文", ...zh },
  }
});
