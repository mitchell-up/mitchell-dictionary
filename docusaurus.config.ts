import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mitchell Dictionary',
  tagline: 'Web Frontend Tech Dictionary and Blog',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mitchell-up.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/mitchell-dictionary',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'mitchell-up', // Usually your GitHub org/user name.
  projectName: 'mitchell-dictionary', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // editUrl: 'https://github.com/mitchell-up',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '모든 포스트',
          blogSidebarCount: 'ALL',
          truncateMarker: /<!--*truncate*-->/,
          feedOptions: {
            type: 'all',
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: blogPosts.filter((item, index) => index < 3),
                ...rest,
              });
            }
          }
          // editUrl: 'https://github.com/mitchell-up',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-QTCKXBPZ9B',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      { name: 'keywords', content: 'frontend,blog,software,react,html,css,javascript,typescript,web,develop' },
      { name: 'robots', content: 'all' },
    ],
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Mitchell',
      logo: {
        alt: 'Mitchell Dictionary Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'dictiondary',
          position: 'left',
          label: 'Dictionary',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/mitchell-up',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/facebook/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mitchell Dictionary. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
