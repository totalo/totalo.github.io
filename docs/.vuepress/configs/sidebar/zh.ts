import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    '/zh/java/': [
        {
            text: 'Java基础',
            children: [
                '/zh/java/reference/object.md',
                '/zh/java/reference/collection.md',
            ],
        },
    ],
    '/zh/interview/': [
        {
            text: '技术面试体系',
            children: [
                {
                    text: 'Java面试',
                    link: '/zh/interview/java.md',
                },
                {
                    text: '系统设计',
                    link: '/zh/interview/system-design.md',
                },
                {
                    text: '数据库',
                    link: '/zh/interview/database.md',
                },
                {
                    text: '设计模式',
                    link: '/zh/interview/design-mode.md',
                },
                {
                    text: '计算机网络',
                    link: '/zh/interview/system-network.md',
                },
                {
                    text: '操作系统',
                    link: '/zh/interview/system.md',
                },
                {
                    text: '数据结构与算法',
                    link: '/zh/interview/algorithms.md',
                },
                {
                    text: '开发框架和中间件',
                    link: '/zh/interview/middleware.md',
                },
                {
                    text: '其他',
                    link: '/zh/interview/others.md',
                },
            ],
        },
    ],
    '/zh/reference/': [
        {
            text: 'VuePress 参考',
            collapsible: true,
            children: [
                '/zh/reference/cli.md',
                '/zh/reference/config.md',
                '/zh/reference/frontmatter.md',
                '/zh/reference/components.md',
                '/zh/reference/plugin-api.md',
                '/zh/reference/theme-api.md',
                '/zh/reference/client-api.md',
                '/zh/reference/node-api.md',
            ],
        },
        {
            text: '打包工具参考',
            collapsible: true,
            children: [
                '/zh/reference/bundler/vite.md',
                '/zh/reference/bundler/webpack.md',
            ],
        },
        {
            text: '默认主题参考',
            collapsible: true,
            children: [
                '/zh/reference/default-theme/config.md',
                '/zh/reference/default-theme/frontmatter.md',
                '/zh/reference/default-theme/components.md',
                '/zh/reference/default-theme/markdown.md',
                '/zh/reference/default-theme/styles.md',
                '/zh/reference/default-theme/extending.md',
            ],
        },
        {
            text: '官方插件参考',
            collapsible: true,
            children: [
                {
                    text: '常用功能',
                    children: [
                        '/zh/reference/plugin/back-to-top.md',
                        '/zh/reference/plugin/container.md',
                        '/zh/reference/plugin/external-link-icon.md',
                        '/zh/reference/plugin/google-analytics.md',
                        '/zh/reference/plugin/medium-zoom.md',
                        '/zh/reference/plugin/nprogress.md',
                        '/zh/reference/plugin/register-components.md',
                    ],
                },
                {
                    text: '内容搜索',
                    children: [
                        '/zh/reference/plugin/docsearch.md',
                        '/zh/reference/plugin/search.md',
                    ],
                },
                {
                    text: 'PWA',
                    children: [
                        '/zh/reference/plugin/pwa.md',
                        '/zh/reference/plugin/pwa-popup.md',
                    ],
                },
                {
                    text: '语法高亮',
                    children: [
                        '/zh/reference/plugin/prismjs.md',
                        '/zh/reference/plugin/shiki.md',
                    ],
                },
                {
                    text: '主题开发',
                    children: [
                        '/zh/reference/plugin/active-header-links.md',
                        '/zh/reference/plugin/git.md',
                        '/zh/reference/plugin/palette.md',
                        '/zh/reference/plugin/theme-data.md',
                        '/zh/reference/plugin/toc.md',
                    ],
                },
            ],
        },
    ],
}