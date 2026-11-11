---
title: "Swaps and price charts"
description: "How Inscrib3 App quotes, protects, settles, and rewards swaps on Mutinynet."
---

# Swaps and price charts

## Select a route

Choose the asset you pay and the asset you receive. The App selects an active pool for the pair and supports both:

- **exact input:** enter what you pay and receive an estimated output;
- **exact output:** enter what you want to receive and obtain the required input.

All contract arithmetic uses integer raw units. Display decimals are applied only for human-readable amounts and charts.

## Review the quote

Before approving, check:

| Field | Meaning |
| --- | --- |
| Total fee | LP fee plus protocol fee |
| LP fee | Portion retained by pool reserves for liquidity providers |
| Protocol fee | Portion accumulated in the stable Treasury Vault |
| Price impact | Difference caused by the trade relative to current reserves |
| Slippage protection | Minimum acceptable output protection |
| Carrier fee | Additional technical satoshis required for some asset-to-asset operations |
| Points earned | Reward preview, awarded only after settlement |

Permissionless pools can choose their fee within contract constraints. The common default is **1.00% total**: **0.70% LP** and **0.30% protocol**. Always trust the values shown for the selected pool rather than assuming the default.

## Settlement states

1. `pending-funding` — the request exists but funding has not been confirmed;
2. `funded` — the covenant request is funded and waiting for a compatible sweep;
3. `sweeping` — settlement is being constructed or submitted;
4. `settled` — output was delivered and points were awarded;
5. `refunded` or `failed` — settlement did not complete; inspect the displayed transaction or error.

Settlement is asynchronous. Use **My Activity** rather than submitting duplicates.

## Price charts

Charts are built from historical reserve snapshots. They normalize asset decimals and show **base asset per quote asset**, with timeframes from `1m` through `30d`; `15m` is the default.

Reserve-derived spot price is not an external oracle and does not guarantee execution at that value. A large trade changes reserves and can have significant price impact.

## Share a swap

**Copy link** creates a URL that can preserve the pool, direction, and optional input or output. A shared link pre-fills the interface but never bypasses wallet review or approval.
