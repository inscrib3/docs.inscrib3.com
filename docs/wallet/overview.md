---
title: "Inscrib3 Wallet"
description: "Your self-custodial gateway to programmable Bitcoin, built with Arkade."
---

# Inscrib3 Wallet

Inscrib3 Wallet is your self-custodial gateway to programmable Bitcoin, built with Arkade. Keys remain on the device, and the same experience is available in two formats: a browser extension for App integration and a PWA that runs in or can be installed from the browser.

::: warning
The wallet is experimental software and can move real Bitcoin. It comes with no warranties or guaranteed support.
:::

## Features

- send and receive offchain through Arkade;
- receive and pay over Lightning through atomic swaps;
- enter from on-chain through a boarding address and collaboratively exit to Bitcoin addresses;
- view and send Ark assets;
- multiple accounts, imported seeds, coin control, and auto-lock;
- emergency unilateral exit without the Ark server's cooperation.

## Two modes, one wallet codebase

### Extension

The Manifest V3 extension exposes `window.arkade` to web pages. Requests travel to the background service worker, and sensitive operations require user approval.

### PWA

The PWA holds the wallet directly in its own process and stores data under its own origin. It can be opened normally or as a popup by an App.

::: info
The extension and PWA use separate storage. A user may therefore have different wallets in each mode.
:::

## Networks

Bitcoin mainnet is the default preset. Mutinynet and custom Ark server configurations are also available from settings.

Before sending a request, an App should check the active network:

```js network-check.js
const network = await window.arkade.getNetwork();

if (network.network !== 'bitcoin') {
  throw new Error(`Unsupported network: ${network.displayName}`);
}
```

## Open-source architecture

The repository is a Bun monorepo composed of:

| Path | Responsibility |
| --- | --- |
| `packages/core` | Wallet logic, cryptography, and network configuration |
| `packages/ui` | Shared Vue interface |
| `apps/extension` | WXT Manifest V3 browser extension |
| `apps/pwa` | Vite and Vue PWA |

### [Explore the repository](https://github.com/inscrib3/arkade-wallet)

Browse the source code, releases, and issues for Inscrib3 Wallet.
