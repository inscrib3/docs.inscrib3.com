---
title: "Get started on Mutinynet"
description: "Install Inscrib3 Wallet, switch to Mutinynet, connect to the App, and safely try swaps and pools."
---

# Get started on Mutinynet

## 1. Install the browser extension

Install [Inscrib3 Wallet from the Chrome Web Store](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg). The hosted PWA is useful for normal wallet operations, but the App requires the extension's full `window.arkade` provider for swaps, liquidity, issuance, and pool creation.

Back up the wallet mnemonic offline. Never paste it into the App or any website.

## 2. Select Mutinynet

Open wallet settings and select **Mutinynet**. The public App rejects transaction requests when the wallet and API networks do not match.

Mutinynet addresses begin with `tark1…`. A future Mainnet deployment uses a different network prefix, but the portable points identity is derived from the wallet key rather than that prefix.

## 3. Obtain test funds

Use Mutinynet test BTC and test assets only. Confirm they appear as available in the extension before opening the App.

::: danger
Do not send mainnet BTC to Mutinynet addresses. Test assets have no guaranteed value and should never be represented as investments.
:::

## 4. Connect the App

Open [app.mutinynet.inscrib3.com](https://app.mutinynet.inscrib3.com), select **Connect wallet**, review the origin in the extension, and approve the connection.

The header must show **MUTINYNET**. Before every approval, verify the origin, asset, amount, network, and destination shown by the wallet.

## 5. Choose an action

- **Swap:** choose a pair, enter an input or desired output, review fees, impact, slippage, and points, then approve funding.
- **Pools:** inspect reserves, price history, activity, fees, and controlled-supply warnings.
- **Add / Remove:** contribute assets at the pool ratio or redeem LP assets pro rata.
- **Create:** issue an asset or bootstrap a permissionless pool.
- **Activity:** inspect your requests, score, rank, breakdown, and leaderboard.

Requests may remain funded while waiting for a settlement sweep. Do not repeat a request simply because it is not immediate; check its status under **Activity** first.

## Next steps

- [Swaps and price charts](/app/swaps)
- [Pools and liquidity](/app/pools-liquidity)
- [Points and Mainnet migration](/app/points)
- [Risks and troubleshooting](/app/security)
