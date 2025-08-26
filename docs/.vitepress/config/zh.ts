import { type DefaultTheme, defineConfig } from "vitepress"

export const zh = defineConfig({
    lang: "zh-CN",
    themeConfig: {
        nav: [
            { text: "主页", link: "./" },
        ],
        sidebar: {
            "/zh/forge/": forgeSidebar(),
            "/zh/gtceu/": gtceuSidebar(),
            "/zh/mixin/": mixinSidebar(),
        },

        returnToTopLabel: "返回顶部",
        sidebarMenuLabel: "目录",
        outline: {
            label: "当前页大纲",
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
        }
    }
});

function forgeSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "1.12.2",
            collapsed: false,
            items: [
                { text: "引言", link: "./intro" },
                { text: "CoreMod", link: "./core-mod" }
            ]
        }
    ]
};

function mixinSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            items: [
                { text: "引言", link: "./intro" },
                { text: "元物品", link: "./chap1-metaitem" }
            ]
        }
    ]
};

function gtceuSidebar(): DefaultTheme.SidebarItem[] {
    return [
        {
            items: [
                { text: "引言", link: "./intro" },
                { text: "元物品", link: "./chap1-metaitem" }
            ]
        }
    ]
};
