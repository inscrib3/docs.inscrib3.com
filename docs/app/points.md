---
title: "Points and Mainnet migration"
description: "How Inscrib3 points are earned, ranked, made idempotent, and migrated from Mutinynet to Mainnet."
---

# Points and Mainnet migration

The Mutinynet release includes a public points program for participation in permissionless liquidity and settled swaps. Your score, breakdown, rank, and the live Top 5 are available under **My Activity** after connecting the wallet.

## Earning points

| Eligible event | Points |
| --- | --- |
| Pool reaches `opened` | 10 |
| Swap reaches `settled` | At least 1 |

For swaps in a BTC pool, points scale at **one point per sat-equivalent of protocol fee**, with a minimum of one. When the fee is paid in the token side of a BTC pool, its sat equivalent is calculated from the pool reserves captured for the request. Asset-to-asset swaps currently receive one point until a reliable BTC valuation path is available.

Points are not awarded for quotes, rejected approvals, unfunded requests, failed swaps, refunds, liquidity deposits, or liquidity withdrawals.

## Settlement and duplicate protection

Rewards are created only after the qualifying action settles or a pool opens. Every reward event has a unique network, type, and event ID, so coordinator retries and restarts cannot award the same event twice. Historical opened pools and settled swaps are backfilled.

## How portability works

Points are not bound to the textual `tark1…` Mutinynet address. The backend extracts the wallet's x-only Taproot identity key from its Arkade address. That identity remains stable when the same wallet moves between the Mutinynet `tark` prefix and the Mainnet `ark` prefix.

::: tip MAINNET MIGRATION COMMITMENT
**Points earned in the current Mutinynet release will be migrated to Mainnet.** Connect the Mainnet deployment with the same wallet identity and the migrated score will remain attributable to you.
:::

## What you must preserve

- securely retain the wallet mnemonic and use the same recovered wallet identity on Mainnet;
- do not share the mnemonic or private keys with Inscrib3 or anyone claiming to migrate points;
- keep enough public evidence of activity for your own records, such as request IDs or transaction IDs, although normal migration attribution does not require exposing secrets.

Changing to an unrelated wallet creates a different identity and cannot automatically inherit another wallet's points. Inscrib3 will never ask for a seed phrase to perform the migration.

## Leaderboard

The leaderboard ranks aggregate scores by wallet identity. It displays an abbreviated recent address for readability, while attribution uses the underlying identity key. Scores are public participation data and should not be treated as money, equity, or a guaranteed future entitlement.
