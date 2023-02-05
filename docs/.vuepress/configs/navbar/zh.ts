import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarZh: NavbarConfig = [
    {
        text: '😈面试',
        link: '/zh/interview/java.md',
    },
    {
        text: 'Java',
        children: [
            {
                text: '基础',
                children: [
                    '/zh/java/reference/object.md',
                    '/zh/java/reference/collection.md',
                    '/zh/java/reference/io.md',
                ]
            },
            {
                text: '并发',
                children: [
                    
                ]
            },
            {
                text: 'JVM',
                children: [
                    
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