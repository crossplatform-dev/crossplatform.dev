const interpolateData = require('./src/transformers/interpolate-data');
const importCode = require('./src/transformers/import-code');
const partialContent = require('./src/transformers/partial-content');
const fiddleEmbedder = require('./src/transformers/fiddle-embedder.js');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'crossplatform.dev',
  tagline: 'Where questions about crossplatform development get answered',
  url: 'https://crossplatform.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'crossplatform-dev',
  projectName: 'crossplatform.dev',
  themeConfig: {
    navbar: {
      title: 'crossplatform.dev',
      logo: {
        alt: 'crossplatform.dev',
        src: 'img/xplat-icon.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'technologies',
          position: 'left',
          label: 'Technologies',
        },
        {
          type: 'doc',
          docId: 'rendering',
          position: 'left',
          label: 'Rendering strategies',
        },
        {
          type:'doc',
          docId: 'examples',
          position: 'left',
          label: 'Examples'
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/crossplatform-dev/crossplatform.dev',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    announcementBar: {
      id: 'disclaimer',
      content:
        '⚒ This website is a work in progress. If you want to help let us know on <a href="https://github.com/crossplatform-dev/crossplatform.dev">GitHub</a> 🙏',
      backgroundColor: '#fafbfc',
      textColor: '#091E42',
      isCloseable: false,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false
    }
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/intro',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/crossplatform-dev/crossplatform.dev/edit/main/',
          remarkPlugins: [importCode, partialContent, interpolateData, fiddleEmbedder],
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/crossplatform-dev/crossplatform.dev/edit/main/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
