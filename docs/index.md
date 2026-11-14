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

## Inscrib3 App — live on Mutinynet

[Inscrib3 App](https://app.mutinynet.inscrib3.com) is the open-source interface for native BTC and Arkade asset swaps, permissionless pools, fixed-supply token launches, liquidity, price history, wallet activity, and portable points.

::: warning MUTINYNET RELEASE
The public App currently runs on **Mutinynet**, not Bitcoin mainnet. Use Mutinynet test funds only. The interface verifies that the App, API, and connected wallet are on the same network before requesting a transaction.
:::

### [Start using the App](/app/getting-started)

Install the wallet extension, switch it to Mutinynet, get test funds, and complete your first action.

### [Understand points and Mainnet migration](/app/points)

Opened pools and launches earn 10 points. Settled pool and launch trades earn points based on protocol fee sats, with a minimum of one point. **Points earned during the Mutinynet release will be migrated to Mainnet** and remain attributable to the same wallet identity.

### [Launch a fixed-supply asset](/app/launchpad)

Model a BTC bonding curve, issue from your own wallet, and graduate atomically into a canonical permanent pool with no administrator-controlled liquidity exit.

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
| PWA | Provider window and `postMessage` | Full public provider API with explicit approvals | As a fallback without the extension |

### [Go to the quickstart](/getting-started/quickstart)

Implement provider detection and the PWA fallback.

## Explore our open-source code

The wallet, App frontend, website, and these docs are public and auditable. See the complete [open-source project directory](/inscrib3/open-source).
