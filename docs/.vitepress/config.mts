import { defineConfig } from "vitepress"
import { groupIconMdPlugin } from "vitepress-plugin-group-icons"
import { MermaidMarkdown, MermaidPlugin } from "vitepress-plugin-mermaid"
import { en } from "./config/en"
import { zh } from "./config/zh"
import { style } from "./config/style"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "icon.ico" }]
  ],
  ignoreDeadLinks: true,
  lastUpdated: true,
  title: "MorphismMC Wiki",

  themeConfig: {
    logo: "/img/icon.ico",
    socialLinks: [
      { icon: "github", link: "https://github.com/MorphismMC/Wiki" }
    ],
    footer: {
      message: "Released under the Creative Commons Zero v1.0 Universal License.",
      copyright: "Copyright © 2024-2025 MorphismMC"
    },
  },

  ...style,

  locales: {
    en: { label: "English", ...en },
    zh: { label: "简体中文", ...zh },
  }
});
