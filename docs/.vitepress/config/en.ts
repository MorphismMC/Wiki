import { type DefaultTheme, defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: "en-US",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/introduce' },
      { text: 'Quick Start', link: '/quick_start' }
    ],
    sidebar: sidebar(),
    returnToTopLabel: "Back to Top",
    sidebarMenuLabel: "Menu",
    outline: {
      label: "Page Outline",
    },
    editLink: {
      pattern:
        "https://github.com/MorphismMC/Wiki/edit/main/docs/",
      text: "Edit this page on GitHub",
    },
    lastUpdated: {
      text: "Last Updated",
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Search Docs",
                buttonAriaLabel: "Search Docs",
              },
              modal: {
                noResultsText: "No results found",
                resetButtonTitle: "Reset search",
                footer: {
                  selectText: "Select",
                  navigateText: "Navigate",
                },
              },
            },
          },
        },
      },
    },
    docFooter: {
      prev: "Previous",
      next: "Next",
    }
  }
})

function sidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Examples',
            items: [
                { text: 'Markdown Examples', link: '/markdown-examples' },
                { text: 'Runtime API Examples', link: '/api-examples' }
            ]
        }
    ]
}
