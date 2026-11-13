---
title: "Points and Mainnet migration"
description: "How Inscrib3 points are earned, ranked, made idempotent, and migrated from Mutinynet to Mainnet."
---

# Points and Mainnet migration

The Mutinynet release includes a public points program for participation in permissionless liquidity, launches, and settled trades. Your score, breakdown, rank, and the live Top 5 are available under **My Activity** after connecting the wallet.

## Earning points

| Eligible event | Points |
| --- | --- |
| Pool reaches `opened` | 10 |
| Swap reaches `settled` | At least 1 |
| Launch reaches `opened` | 10 |
| Launch trade reaches `settled` | At least 1 |
| Referred wallet opens a pool or launch, or settles a trade | 1 per action |

For swaps in a BTC pool, points scale at **one point per sat-equivalent of protocol fee**, with a minimum of one. When the fee is paid in the token side of a BTC pool, its sat equivalent is calculated from the pool reserves captured for the request. Asset-to-asset swaps currently receive one point until a reliable BTC valuation path is available.

Launch trade protocol fees are already denominated in satoshis. They earn **one point per sat of protocol fee**, with a minimum of one, on both the bonding curve and permanent pool.

Points are not awarded for quotes, rejected approvals, unfunded requests, failed swaps, refunds, liquidity deposits, or liquidity withdrawals.

## Referrals

Connect the wallet and open **My Activity** to find your personal referral link. Share it directly on X or copy it for Discord.

When another wallet opens the link, the referral code is saved locally and attached to its first eligible action. The relationship then remains associated with that wallet identity. You receive 1 point whenever that wallet successfully opens a pool or launch, or settles a pool or launch trade.

Referral rewards are settlement-only and idempotent. Failed, refunded, repeated, and self-referred actions do not earn points. Referral points migrate to Mainnet with the same wallet identity like the rest of the score.

## Settlement and duplicate protection

Rewards are created only after the qualifying action settles or a pool or launch opens. Every reward event has a unique network, type, and event ID, so coordinator retries and restarts cannot award the same event twice. Historical opened pools, launches, and settled trades are backfilled.

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
