---
title: "Inscrib3 App"
description: "Open-source native liquidity, swaps, pools, token launches and portable rewards on Arkade, currently live on Mutinynet."
---

# Inscrib3 App

Inscrib3 App is an open-source interface for native Bitcoin and Arkade asset liquidity. It connects to Inscrib3 Wallet, quotes covenant-enforced constant-product pools, and submits wallet-funded requests without taking custody of a seed or private key.

::: warning CURRENT NETWORK: MUTINYNET
The public release at [app.mutinynet.inscrib3.com](https://app.mutinynet.inscrib3.com) runs on **Mutinynet**. It is an experimental test environment. Use test funds only; Mutinynet assets and BTC have no mainnet value.
:::

## What is available

- exact-input and exact-output swaps between BTC and Arkade assets;
- Arkade asset-to-asset swaps;
- reserve-based price charts from 1 minute through 30 days;
- permissionless pool creation and asset issuance;
- fixed-supply launches with a BTC bonding curve and atomic graduation into permanent liquidity;
- liquidity deposits and LP redemptions;
- pool search, reserve details, fees, activity, and supply-control warnings;
- wallet-specific activity, portable points, personal rank, and a live leaderboard;
- compact links for sharing a pool, direction, and optional amount.

## Official services

| Service | URL | Purpose |
| --- | --- | --- |
| App | [app.mutinynet.inscrib3.com](https://app.mutinynet.inscrib3.com) | Public Mutinynet interface |
| API | [api.mutinynet.inscrib3.com](https://api.mutinynet.inscrib3.com/health) | Quotes, pool state, activity, and points |
| Wallet | [wallet.inscrib3.com](https://wallet.inscrib3.com) | Wallet PWA; extension installation is required for the full App provider API |
| Docs | [docs.inscrib3.com](https://docs.inscrib3.com) | User and integration documentation |

## Custody model

The App uses the `window.arkade` provider injected by the browser extension. Private keys remain in the wallet. Every sensitive operation opens a wallet approval before anything is signed.

For swaps and liquidity operations, the wallet funds a request-specific covenant that commits to the payout and minimum terms. The coordinator verifies funding and settles compatible requests, but cannot replace the committed payout with its own address.

## Open-source components

The public user-facing components can be inspected independently:

- [App frontend](https://github.com/inscrib3/app.mutinynet.inscrib3.com);
- [Inscrib3 Wallet](https://github.com/inscrib3/arkade-wallet);
- [Documentation](https://github.com/inscrib3/docs.inscrib3.com);
- [Main website](https://github.com/inscrib3/inscrib3.com).

Start with the [Mutinynet setup guide](/app/getting-started), explore the [Bitcoin-native launchpad](/app/launchpad), then read the [risk model](/app/security) before approving a transaction.
