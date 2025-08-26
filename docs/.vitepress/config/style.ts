import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid"

export const style = defineConfig({

  markdown: {
    lineNumbers: true,

    config(md) {
      md.use(groupIconMdPlugin)
      md.use(MermaidMarkdown)
    },

    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息"
    }

  },

  vite: {
    plugins: [
      MermaidPlugin(),
      groupIconVitePlugin()
    ],
    optimizeDeps: {
      include: ["mermaid"],
    },
    ssr: {
      noExternal: ["mermaid"],
    }
  }

})