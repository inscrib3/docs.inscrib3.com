import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'Inscrib3 Docs',
  description: 'Open-source products making Bitcoin programmable, built with Arkade.',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.inscrib3.com',
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png', type: 'image/png' }],
    ['meta', { name: 'theme-color', content: '#090909' }],
    ['meta', { property: 'og:site_name', content: 'Inscrib3 Docs' }],
  ],
  themeConfig: {
    logo: '/logo.png',
    siteTitle: false,
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Website', link: 'https://inscrib3.com' },
      { text: 'GitHub', link: 'https://github.com/inscrib3' },
      { text: 'Open wallet', link: 'https://wallet.inscrib3.com' },
    ],
    sidebar: [
      {
        text: 'Get started',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'App quickstart', link: '/getting-started/quickstart' },
        ],
      },
      {
        text: 'Inscrib3',
        items: [
          { text: 'What is Inscrib3', link: '/inscrib3/about' },
          { text: 'Our journey', link: '/inscrib3/journey' },
          { text: 'Vision and direction', link: '/inscrib3/vision' },
        ],
      },
      {
        text: 'Wallet',
        items: [
          { text: 'Overview', link: '/wallet/overview' },
          { text: 'Installation and usage', link: '/wallet/installation' },
          { text: 'Security and risk', link: '/wallet/security' },
        ],
      },
      {
        text: 'window.arkade',
        items: [
          { text: 'Provider overview', link: '/provider/overview' },
          { text: 'Connection and state', link: '/provider/connection' },
          { text: 'Provider methods', link: '/provider/methods' },
          { text: 'Events and errors', link: '/provider/events-errors' },
          { text: 'TypeScript types', link: '/provider/typescript' },
        ],
      },
      {
        text: 'PWA integration',
        items: [
          { text: 'PWA fallback', link: '/pwa/overview' },
          { text: 'Integrate the popup', link: '/pwa/popup' },
          { text: 'Messages and security', link: '/pwa/messages-security' },
        ],
      },
    ],
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/inscrib3' },
      { icon: 'x', link: 'https://x.com/inscrib3' },
    ],
    editLink: {
      pattern: 'https://github.com/inscrib3/docs.inscrib3.com/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Open-source products for programmable Bitcoin.',
      copyright: `Copyright © ${new Date().getFullYear()} Inscrib3`,
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
  },
});
