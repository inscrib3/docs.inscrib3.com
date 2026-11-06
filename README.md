# Inscrib3 Docs

Official Inscrib3 documentation, built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages.

## Local development

Requires Node.js 20 or later.

```bash
npm install
npm run docs:dev
```

The documentation is available at `http://localhost:5173`.

## Production build

```bash
npm run docs:build
npm run docs:preview
```

## Deployment

Pushes to `main` run `.github/workflows/deploy-pages.yml` and publish the static build to GitHub Pages.

In the GitHub repository settings, select **GitHub Actions** under **Pages → Build and deployment → Source**. The custom domain is configured by `docs/public/CNAME` as `docs.inscrib3.com`.

Configure the DNS record as:

```text
Type: CNAME
Name: docs
Value: inscrib3.github.io
```

Enable **Enforce HTTPS** in the GitHub Pages settings after the certificate is ready.

## Contents

- Inscrib3's identity, journey, and direction;
- Inscrib3 Wallet overview and security;
- App integration through `window.arkade`;
- PWA integration through a popup and `postMessage`.
