import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarZh: NavbarConfig = [
    {
        text: '😈面试',
        link: '/zh/interview/java.md',
    },
    {
        text: '踩的坑',
        link: '/zh/problems/log4j-deadlock.md',
    },
    {
        text: '各种最佳实践',
        link: '/zh/best-practices.md'
    },
    {
        text: 'Java',
        children: [
            {
                text: 'Java面向对象体系和基础',
                children: [
                    '/zh/java/base/object.md',
                    '/zh/java/base/base.md',
                ]
            },
            {
                text: 'Java进阶 - 集合框架',
                children: [
                    '/zh/java/collection/collection.md',
                ]
            },
            {
                text: 'Java进阶 - IO框架',
                children: [
                    '/zh/java/io/io.md',
                ]
            },
            {
                text: 'Java进阶 - 多线程与并发',
                children: [
                    '/zh/java/concurrency/concurrency.md',
                ]
            },
            {
                text: 'Java进阶 - JVM与程序调优',
                children: [
                    '/zh/java/jvm/jvm.md',
                ]
            }
        ]
    },
    {
        text: 'Go',
        children: [
            
        ]
    },
    {
        text: 'Spring',
        children: [
            
        ]
    },
    {
        text: '数据库',
        children: [
            
        ]
    },
    {
        text: '分布式',
        children: [
            
        ]
    },
    {
        text: '算法',
        children: [
            
        ]
    },
    {
        text: '中间件',
        children: [
            '/zh/middleware/reference/shardingsphere.md',
        ]
    }
]