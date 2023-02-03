import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
    {
        text: '😈interview',
        link: '/interview/',
    },
    {
        text: 'Java',
        children: [
            {
                text: 'Base',
                link: '/java/reference/base.md',
                children: [
                    '/java/reference/object.md',
                ]
            },
            {
                text: 'IO',
                link: '/java/reference/io.md',
            },
            {
                text: 'Concurrent',
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
        text: 'Database',
        children: [

        ]
    },
    {
        text: 'Distributed',
        children: [

        ]
    },
    {
        text: 'Algorithm',
        children: [

        ]
    },
    {
        text: 'Middleware',
        children: [

        ]
    }
]