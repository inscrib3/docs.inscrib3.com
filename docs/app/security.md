---
title: "App risks and troubleshooting"
description: "Network checks, transaction review, pool and asset risks, request states, and safe troubleshooting for Inscrib3 App."
---

# App risks and troubleshooting

::: danger EXPERIMENTAL MUTINYNET SOFTWARE
The current App, coordinator, and contracts are early software running on Mutinynet. Use test funds only. Availability, pool state, and APIs may change during testing.
:::

## Before every approval

- use only [app.mutinynet.inscrib3.com](https://app.mutinynet.inscrib3.com);
- confirm the wallet displays **Mutinynet** and a `tark1…` address;
- verify the origin, assets, raw/display amounts, fees, and destination;
- check slippage and price impact;
- verify asset IDs, not only names or tickers;
- read controlled-supply warnings;
- never enter a mnemonic in the App.

## Main risks

- **Experimental contracts:** defects may produce unexpected settlement or refund behavior.
- **Liquidity risk:** thin reserves can produce high price impact.
- **Asset risk:** issuers controlling a `controlAssetId` may create additional supply.
- **Launch risk:** curve parameters, fees, graduation threshold, and reserved liquidity are immutable once funded; a popular name or ticker is not proof of identity or quality.
- **External-market risk:** holders can create markets outside Inscrib3. Only the launch's predetermined permanent pool is canonical.
- **Asynchronous settlement:** funded requests wait for a sweep and are not instant.
- **Infrastructure risk:** the API, Ark server, indexer, or Mutinynet may be unavailable.
- **Testnet resets:** Mutinynet state has no permanence guarantee comparable to Bitcoin mainnet.

## Common problems

### “Switch Inscrib3 Wallet to MUTINYNET”

The extension is on the wrong network. Change its network in wallet settings, then reconnect or refresh.

### A request remains funded

Check **My Activity** and wait for a settlement sweep. Do not create repeated requests unless the first request has reached a terminal state.

### A pool is unavailable

Refresh pool state. The contract, Ark server, API, or required reserves may be temporarily unavailable. Do not infer safety from a pool returning online.

### My points are missing

Only opened pools or launches and settled pool or launch trades qualify. Confirm the action's terminal status and that the connected wallet is the wallet that funded it. Points refresh automatically; use the Activity refresh control if needed.

### A launch payment was sent but opening or trading did not finish

Do not issue another token supply and do not pay a second request. Keep the saved transaction ID, retry the same opening or registration flow, and check the launch and **My Activity** status. Use a refund only when the App reports that the funded request is refundable.

## Verify the implementation

The [App frontend](https://github.com/inscrib3/app.mutinynet.inscrib3.com) and [wallet](https://github.com/inscrib3/arkade-wallet) are open source. Review releases and report security issues privately through the affected repository's security channel rather than publishing an exploit.
