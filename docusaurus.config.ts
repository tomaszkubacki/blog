import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Tomasz Kubacki',
    tagline: 'Random dev blog',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://tomaszkubacki.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/blog',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'tomaszkubacki', // Usually your GitHub org/user name.
    projectName: 'blog', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],

    presets: [
        [
            'classic',
            {
                blog: {
                    routeBasePath: '/',
                    showReadingTime: true,
                    editUrl:
                        'https://github.com/tomaszkubacki/blog',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'Random dev blog',
            items: [
                {
                    href: 'https://github.com/tomaszkubacki',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'Blog source code',
                            href: 'https://github.com/tomaszkubacki/blog',
                        },

                    ],
                },
                {
                    title: 'Author',
                    items: [
                        {
                            label: 'Github',
                            href: 'https://github.com/tomaszkubacki'
                        },

                    ]
                },
                {
                    title: 'Social',
                    items: [
                        {
                            label: 'Mastodon',
                            href: 'https://mastodon.social/@j23tom'
                        },

                    ]
                }

            ],
            copyright: `Copyright © ${new Date().getFullYear()} Tomasz Kubacki. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
