import type { HeadConfig } from '@vuepress/core'

export const head: HeadConfig[] = [
    [
        'link',
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: `/images/icons/favicon-16x16.png`,
        },
    ],
    [
        'link',
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: `/images/icons/favicon-32x32.png`,
        },
    ],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'application-name', content: 'totalo\'s blog' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'totalo\'s blog' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    [
        'link',
        { rel: 'apple-touch-icon', href: `/images/icons/apple-touch-icon.png` },
    ],
    [
        'link',
        {
            rel: 'mask-icon',
            href: '/images/icons/safari-pinned-tab.svg',
            color: '#3eaf7c',
        },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    [
        'script',
        {
            crossorigin: 'anonymous',
            async: true,
            src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4545022751103525",
        }
    ],
    [
        'script',
        {},
        `
        var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e58acf9806e55ac523ba77b5a273de3b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        })();
        `
    ]
]