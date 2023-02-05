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
    '/zh/problems/': [
        {
            text: '踩坑备忘录',
            children: [
                '/zh/problems/log4j-deadlock.md',
            ],
        },
    ],
}