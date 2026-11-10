import { defineConfig } from 'vitepress';

const siteUrl = 'https://docs.inscrib3.com';
const siteDescription = 'Wallet, provider and PWA integration guides for programmable Bitcoin products built with Arkade.';
const socialImage = `${siteUrl}/social-card.png`;

function getPageUrl(relativePath) {
  const cleanPath = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '');

  return new URL(cleanPath, `${siteUrl}/`).href;
}

export default defineConfig({
  lang: 'en-US',
  title: 'Inscrib3 Docs',
  description: 'Open-source products making Bitcoin programmable, built with Arkade.',
  appearance: false,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.inscrib3.com',
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site_name', content: 'Inscrib3 Docs' }],
    ['meta', { property: 'og:image', content: socialImage }],
    ['meta', { property: 'og:image:secure_url', content: socialImage }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Inscrib3 Docs — Build on programmable Bitcoin' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@inscrib3' }],
    ['meta', { name: 'twitter:creator', content: '@inscrib3' }],
    ['meta', { name: 'twitter:image', content: socialImage }],
    ['meta', { name: 'twitter:image:alt', content: 'Inscrib3 Docs — Build on programmable Bitcoin' }],
  ],
  transformHead({ pageData }) {
    const isHome = pageData.relativePath === 'index.md';
    const pageTitle = isHome
      ? 'Inscrib3 Docs — Build on programmable Bitcoin'
      : `${pageData.title} | Inscrib3 Docs`;
    const pageDescription = pageData.description || siteDescription;
    const pageUrl = getPageUrl(pageData.relativePath);

    return [
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
    ];
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'INSCRIB3 / DOCS',
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Website', link: 'https://inscrib3.com' },
      { text: 'GitHub', link: 'https://github.com/inscrib3' },
      {
        text: 'Install extension',
        link: 'https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg',
      },
      { text: 'Open web wallet', link: 'https://wallet.inscrib3.com' },
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
          { text: 'Asset lifecycle', link: '/wallet/assets' },
          { text: 'Security and risk', link: '/wallet/security' },
        ],
      },
      {
        text: 'window.arkade',
        items: [
          { text: 'Provider overview', link: '/provider/overview' },
          { text: 'Connection and state', link: '/provider/connection' },
          { text: 'Provider methods', link: '/provider/methods' },
          { text: 'Asset API', link: '/provider/assets' },
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
