---
title: "Pools and liquidity"
description: "Create pools, add or remove liquidity, understand fees, LP assets, and controlled Arkade supply."
---

# Pools and liquidity

## Constant-product pools

Each pool holds base and quote reserves and prices swaps from their ratio. The initial creator establishes the opening price through the initial reserve ratio. Deeper reserves generally reduce price impact, but do not remove smart-contract, asset, or market risk.

The pool page exposes both normalized spot-price directions, reserves, LP supply, fee accruals, historical charts, and settled activity.

## Add liquidity

Select **Add** from a pool. Enter the base amount; the App calculates the quote amount required at the current reserve ratio and previews the LP assets received. Funding is covenant-bound and settles asynchronously.

Liquidity providers are exposed to both assets and to changes in their relative reserve price. Fees do not guarantee that providing liquidity is profitable.

## Remove liquidity

Select **Remove**, enter the LP amount to redeem, and review the pro-rata base and quote outputs. The request completes after settlement and burns or consumes the redeemed LP position according to the pool contract.

## Create a pool

From **Create → Create pool**:

1. choose distinct base and quote assets;
2. enter initial reserves in display units;
3. review the derived pool ID and display name;
4. choose total and protocol fees within the allowed limits;
5. review initial liquidity, technical carriers, creation fee, and total funding;
6. approve the single atomic bootstrap payment in the wallet.

The current Mutinynet creation fee is **10,000 sats**. Configuration returned by the App is authoritative and may differ on future deployments.

An opened pool earns **10 points**. A request that never reaches `opened` does not earn points.

## Controlled and reissuable assets

An Arkade asset with a `controlAssetId` can be reissued by whoever controls that asset. The App displays a controlled-supply warning because future issuance can materially change pool economics. The warning is informational, not an endorsement or risk score.

Always verify the full asset ID. Names and tickers are not unique identities.
