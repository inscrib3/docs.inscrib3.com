import { defineConfig } from 'vitepress';

const siteUrl = 'https://docs.inscrib3.com';
const siteDescription = 'Wallet, provider and PWA integration guides for programmable Bitcoin products built with Arkade.';
const chineseSiteDescription = '面向使用 Arkade 构建的可编程比特币产品的钱包、Provider 和 PWA 集成指南。';
const socialImage = `${siteUrl}/social-card.png`;
const chineseRedirect = `(function(){try{var l=(navigator.languages&&navigator.languages[0])||navigator.language||'';var p=location.pathname;var k='inscrib3-docs-locale';if(/^\\/zh(?:\\/|$)/.test(p)){sessionStorage.setItem(k,'zh-CN');return}if(/^zh(?:-|$)/i.test(l)&&!sessionStorage.getItem(k)){sessionStorage.setItem(k,'zh-CN');location.replace('/zh'+(p==='/'?'/':p)+location.search+location.hash)}}catch(e){}})();`;

function getPageUrl(relativePath) {
  const cleanPath = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '');

  return new URL(cleanPath, `${siteUrl}/`).href;
}

const config = defineConfig({
  title: 'Inscrib3 Docs',
  description: 'Open-source products making Bitcoin programmable, built with Arkade.',
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'Inscrib3 文档',
      description: '使用 Arkade 构建、让比特币可编程的开源产品。',
    },
  },
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
    ['script', {}, chineseRedirect],
  ],
  transformHead({ pageData }) {
    const isChinese = pageData.relativePath.startsWith('zh/');
    const isHome = pageData.relativePath === 'index.md' || pageData.relativePath === 'zh/index.md';
    const pageTitle = isHome
      ? isChinese
        ? 'Inscrib3 文档 — 构建于可编程比特币之上'
        : 'Inscrib3 Docs — Build on programmable Bitcoin'
      : `${pageData.title} | ${isChinese ? 'Inscrib3 文档' : 'Inscrib3 Docs'}`;
    const pageDescription = pageData.description || (isChinese ? chineseSiteDescription : siteDescription);
    const pageUrl = getPageUrl(pageData.relativePath);
    const alternatePath = isChinese
      ? pageData.relativePath.replace(/^zh\//, '')
      : `zh/${pageData.relativePath}`;

    return [
      ['link', { rel: 'canonical', href: pageUrl }],
      ['link', { rel: 'alternate', hreflang: isChinese ? 'en' : 'zh-CN', href: getPageUrl(alternatePath) }],
      ['meta', { property: 'og:locale', content: isChinese ? 'zh_CN' : 'en_US' }],
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
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '未找到相关结果',
                resetButtonTitle: '清除搜索',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
    nav: [
      { text: 'Website', link: 'https://inscrib3.com' },
      { text: 'Mutinynet App', link: 'https://app.mutinynet.inscrib3.com' },
      { text: 'Discord', link: 'https://discord.gg/dZ7GSFb2ST' },
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
          { text: 'Use the Mutinynet App', link: '/app/getting-started' },
          { text: 'App quickstart', link: '/getting-started/quickstart' },
        ],
      },
      {
        text: 'Inscrib3 App',
        items: [
          { text: 'App overview', link: '/app/overview' },
          { text: 'Get started on Mutinynet', link: '/app/getting-started' },
          { text: 'Swaps and price charts', link: '/app/swaps' },
          { text: 'Pools and liquidity', link: '/app/pools-liquidity' },
          { text: 'Bitcoin-native launchpad', link: '/app/launchpad' },
          { text: 'Points and Mainnet migration', link: '/app/points' },
          { text: 'Risks and troubleshooting', link: '/app/security' },
        ],
      },
      {
        text: 'Inscrib3',
        items: [
          { text: 'What is Inscrib3', link: '/inscrib3/about' },
          { text: 'Our journey', link: '/inscrib3/journey' },
          { text: 'Vision and direction', link: '/inscrib3/vision' },
          { text: 'Open-source projects', link: '/inscrib3/open-source' },
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
      { icon: 'discord', link: 'https://discord.gg/dZ7GSFb2ST' },
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
    locales: {
      zh: {
        nav: [
          { text: '网站', link: 'https://inscrib3.com' },
          { text: 'Mutinynet 应用', link: 'https://app.mutinynet.inscrib3.com' },
          { text: 'Discord', link: 'https://discord.gg/dZ7GSFb2ST' },
          { text: 'GitHub', link: 'https://github.com/inscrib3' },
          {
            text: '安装扩展程序',
            link: 'https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg',
          },
          { text: '打开网页钱包', link: 'https://wallet.inscrib3.com' },
        ],
        sidebar: [
          {
            text: '开始使用',
            items: [
              { text: '简介', link: '/zh/' },
              { text: '使用 Mutinynet 应用', link: '/zh/app/getting-started' },
              { text: '应用快速入门', link: '/zh/getting-started/quickstart' },
            ],
          },
          {
            text: 'Inscrib3 应用',
            items: [
              { text: '应用概览', link: '/zh/app/overview' },
              { text: '开始使用 Mutinynet', link: '/zh/app/getting-started' },
              { text: '兑换与价格图表', link: '/zh/app/swaps' },
              { text: '流动性池与流动性', link: '/zh/app/pools-liquidity' },
              { text: '比特币原生发行平台', link: '/zh/app/launchpad' },
              { text: '积分与主网迁移', link: '/zh/app/points' },
              { text: '风险与故障排除', link: '/zh/app/security' },
            ],
          },
          {
            text: 'Inscrib3',
            items: [
              { text: '什么是 Inscrib3', link: '/zh/inscrib3/about' },
              { text: '我们的历程', link: '/zh/inscrib3/journey' },
              { text: '愿景与方向', link: '/zh/inscrib3/vision' },
              { text: '开源项目', link: '/zh/inscrib3/open-source' },
            ],
          },
          {
            text: '钱包',
            items: [
              { text: '概览', link: '/zh/wallet/overview' },
              { text: '安装与使用', link: '/zh/wallet/installation' },
              { text: '资产生命周期', link: '/zh/wallet/assets' },
              { text: '安全与风险', link: '/zh/wallet/security' },
            ],
          },
          {
            text: 'window.arkade',
            items: [
              { text: 'Provider 概览', link: '/zh/provider/overview' },
              { text: '连接与状态', link: '/zh/provider/connection' },
              { text: 'Provider 方法', link: '/zh/provider/methods' },
              { text: '资产 API', link: '/zh/provider/assets' },
              { text: '事件与错误', link: '/zh/provider/events-errors' },
              { text: 'TypeScript 类型', link: '/zh/provider/typescript' },
            ],
          },
          {
            text: 'PWA 集成',
            items: [
              { text: 'PWA 后备方案', link: '/zh/pwa/overview' },
              { text: '集成弹窗', link: '/zh/pwa/popup' },
              { text: '消息与安全', link: '/zh/pwa/messages-security' },
            ],
          },
        ],
        outline: {
          level: [2, 3],
          label: '本页内容',
        },
        editLink: {
          pattern: 'https://github.com/inscrib3/docs.inscrib3.com/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: '面向可编程比特币的开源产品。',
          copyright: `版权所有 © ${new Date().getFullYear()} Inscrib3`,
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        lastUpdatedText: '最后更新',
        langMenuLabel: '切换语言',
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        skipToContentLabel: '跳转到内容',
      },
    },
  },
});

config.locales.zh.themeConfig = config.themeConfig.locales.zh;
delete config.themeConfig.locales;

export default config;
