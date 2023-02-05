import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
    '/zh/java/': [
        {
            text: 'Java基础',
            children: [
                {
                    text: '面向对象',
                    link: '/zh/java/base/object.md',
                },
                {
                    text: '语法基础',
                    link: '/zh/java/base/base.md',
                },
                {
                    text: '异常机制',
                    link: '/zh/java/base/exception.md',
                },
                {
                    text: '反射机制',
                    link: '/zh/java/base/reflection.md',
                },
                {
                    text: '注解机制',
                    link: '/zh/java/base/annotation.md',
                },
                {
                    text: '泛型机制',
                    link: '/zh/java/base/generics.md',
                },
                {
                    text: 'SPI机制',
                    link: '/zh/java/base/spi.md',
                },
            ],
        },
        {
            text: '集合框架',
            children: [
            ],
        },
        {
            text: 'IO框架',
            children: [
            ],
        },
        {
            text: '多线程与并发',
            children: [
                
            ],
        },
        {
            text: 'JVM与程序调优',
            children: [
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