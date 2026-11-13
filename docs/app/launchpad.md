---
title: "Bitcoin-native launchpad"
description: "Create fixed-supply Arkade assets, trade on a BTC bonding curve, and graduate atomically into permanent liquidity."
---

# Bitcoin-native launchpad

The Inscrib3 launchpad lets a wallet create a fixed-supply Arkade asset, open a BTC bonding curve, and graduate into a permanent full-range pool. Asset issuance, launch funding, buys, and sells are approved and signed in Inscrib3 Wallet. The App never receives a seed phrase or private key.

::: warning MUTINYNET ONLY
The public launchpad is experimental and currently runs on **Mutinynet**. Test BTC and assets have no mainnet value. Review every wallet approval and verify the asset ID.
:::

## Launch lifecycle

| Phase | What happens |
| --- | --- |
| `preparing` | The wallet issues the unique control asset and fixed token supply, then prepares the atomic launch bootstrap. |
| `curve` | Buyers and sellers trade against the BTC bonding curve. |
| `graduating` | The final fill is being reconciled if settlement was interrupted. It is not a separate user-funded market. |
| `pool` | The launch has atomically moved into its canonical permanent pool. |
| `failed` or `rescued` | A failed or recovered launch is terminal and is not presented as an active market. |

The canonical pool cannot be opened early. The unique control asset remains in the curve covenant, and the covenant permits the transition to the immutable pool script only when the token reserve reaches the amount reserved for graduation.

## Creating a launch

Open **Launches → Create a launch**, then:

1. choose a launch ID, display name, ticker, description, and token decimals;
2. enter the fixed raw supply, virtual BTC, and graduation threshold;
3. review creator and protocol fee rates;
4. simulate the exact curve terms before creating any funding request;
5. approve issuance of the unique control asset and token supply in the wallet;
6. approve the atomic bootstrap that opens the curve and pays the launch creation fee.

The current Mutinynet launch creation fee is **10,000 sats**. The deployment configuration and wallet approval are authoritative.

Names and tickers are **not unique**. A token's verifiable identity is its full `assetId`; the launch ID, control asset, and covenant addresses identify the associated launch state.

## Bonding curve

Curve pricing uses a constant-product invariant:

```text
(virtual BTC + real BTC reserve) × token reserve = k
```

Virtual BTC affects pricing but is not a real covenant balance and cannot be withdrawn. Real BTC is the settled reserve contributed by buyers, net of the applicable fees and refunds.

Before funding a trade, the detail page shows the exact integer quote, output, fees, and whether the buy reaches graduation. The wallet funds a payout-bound request covenant; the coordinator cannot replace the committed receiver or minimum output.

### Final buy and refund

The final buyer does not need to purchase more tokens than remain available on the curve. If the submitted BTC exceeds the amount needed to reach the reserved token balance, settlement performs a partial fill and returns the unused BTC to the buyer in the same atomic transition.

## Atomic graduation

When the curve reaches its reserved token balance, the final trade and graduation occur in one transaction:

- the curve state is consumed;
- the remaining reserved tokens and real BTC move to the predetermined pool script;
- the canonical permanent pool becomes the next state;
- any final-fill refund is paid;
- there is no intermediate state in which another party can capture the official reserves.

The permanent launch pool is a constant-product, full-range market with no LP token, deposit branch, or withdrawal branch. Its principal liquidity cannot be removed through the launch covenant. Trading continues through the same launch detail page after graduation.

## Canonical and external markets

Inscrib3 blocks launch assets from generic pool creation in its official API and interface. This check happens before pool control, LP, or ledger assets are issued and before a bootstrap address is returned.

The underlying assets and generic AMM covenants remain permissionless. A holder can still transfer tokens to contracts or markets outside Inscrib3. Such a market:

- is not the canonical launch pool;
- does not hold the launch control asset or graduation reserves;
- cannot alter the curve or canonical graduation;
- may have unrelated liquidity, fees, security, and pricing.

This product-level restriction protects the official user experience without introducing an authorized factory, administrator key, or permissioned AMM covenant.

## Fees and platform revenue

Each launch records immutable fee terms. The current creation form defaults to:

- **0.70% creator fee**, paid to the configured creator fee vault;
- **0.30% protocol fee**, paid to the Inscrib3 protocol vault;
- **10,000 sats creation fee**, paid when the launch opens.

The displayed terms and wallet transaction must be reviewed before signing. Protocol fees continue on both the curve and permanent pool. Inscrib3 does not take custody of the trading principal or permanent pool reserves.

## Points and activity

- an opened launch earns **10 points**;
- a settled launch trade earns one point per sat of protocol fee, with a minimum of one;
- failed, unfunded, or refunded requests do not earn points;
- eligible referral actions earn one idempotent referral point.

Launch buys and sells appear in **My Activity** with launch ID, venue, amount, status, transaction, and points. See [Points and Mainnet migration](/app/points).

## Discovery and charts

The launch catalog supports newest, trending, and graduation-progress views. **On Fire** identifies the most active launch in the last 24 hours when at least three settled trades exist.

The launch detail chart forms a continuous price history across the bonding curve and permanent pool. It labels each venue and marks graduation. Curve prices include virtual BTC for pricing; pool prices use real reserves.

## Recovery and safe retries

Funding and settlement are asynchronous. The App stores resumable launch progress locally and the API journals funding, opening, settlement, refunds, and reconciliation.

If a payment was sent:

- do not issue the assets again;
- do not fund a second request to replace it;
- retry registration or opening with the saved transaction ID;
- use the refund action only when the request is eligible;
- check **My Activity** and the launch status after recovery.

Continue with [App risks and troubleshooting](/app/security) before funding a launch.
