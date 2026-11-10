---
title: "Building products on Bitcoin"
description: "Inscrib3 turns protocols and infrastructure into useful, accessible, open-source Bitcoin applications."
---

# Building products on Bitcoin

Inscrib3 is an independent team exploring the potential of Bitcoin's output architecture. Our next generation of products is built with [Arkade](https://arkadeos.com), an open execution environment for programmable Bitcoin applications.

::: info
Bitcoin is the foundation, Arkade provides the execution environment, and Inscrib3 builds the products. We are not creating another blockchain.
:::

### [Discover Inscrib3](/inscrib3/about)

Where we come from, what we build, and where we are going.

### [Integrate the wallet](/getting-started/quickstart)

Choose between the `window.arkade` provider and the PWA fallback.

## Inscrib3 Wallet

[Inscrib3 Wallet](https://wallet.inscrib3.com) is your gateway to programmable Bitcoin: a self-custodial wallet built with Arkade, available as a browser extension and an installable PWA.

### [Install the browser extension](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg)

The recommended experience for Chrome, Brave, and other Chromium-based browsers. Keep Inscrib3 Wallet one click away and connect directly to supported Bitcoin applications.

### [Open the web wallet](https://wallet.inscrib3.com)

Start immediately without installing anything. The web wallet runs in your browser and can be installed as a PWA on supported devices.

Both options are self-custodial: keys remain on the user's device.

### [Open source](https://github.com/inscrib3/arkade-wallet)

Public, verifiable code open to contributions.

### [Create and manage Arkade assets](/wallet/assets)

Issue fixed or reissuable assets, control future supply, and permanently burn units from the wallet.

::: warning
Inscrib3 Wallet is experimental software that can move real Bitcoin. Do not deposit more than you can afford to lose.
:::

## For developers

An App can communicate with the wallet in two ways:

| Mode | Transport | Capabilities | When to use it |
| --- | --- | --- | --- |
| Extension | `window.arkade` | Full provider API | When the extension is installed |
| PWA | Popup and `postMessage` | Connect and send BTC to Ark addresses | As a fallback without the extension |

### [Go to the quickstart](/getting-started/quickstart)

Implement provider detection and the PWA fallback.
