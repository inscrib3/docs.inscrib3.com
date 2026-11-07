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

[Inscrib3 Wallet](https://wallet.inscrib3.com) is the first product in this new chapter: a non-custodial Bitcoin wallet for the Ark protocol, available as a browser extension and an installable PWA.

### Non-custodial

Keys remain on the user's device.

### Two interfaces

A browser extension for Apps and a PWA that runs in the browser.

### [Install the extension](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg)

Get Inscrib3 Wallet from the Chrome Web Store for Chrome, Brave, and other Chromium-based browsers.

### [Open source](https://github.com/inscrib3/arkade-wallet)

Public, verifiable code open to contributions.

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
