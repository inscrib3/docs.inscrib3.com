---
title: "Create, reissue, and burn assets"
description: "Manage the full lifecycle of Arkade assets from Inscrib3 Wallet."
---

# Create, reissue, and burn assets

Inscrib3 Wallet can create Arkade assets, increase the supply of assets configured as reissuable, and permanently destroy units held by the active account. These operations are available in both the browser extension and the web wallet.

::: warning
Asset operations broadcast real transactions. Check the active account, network, asset ID, and amount before confirming. Test unfamiliar flows on Mutinynet first.
:::

## Amounts and decimals

Arkade records asset amounts as integer **raw units**. Decimals only control how the wallet displays those units.

For an asset with two decimals:

| Display amount | Raw units |
| ---: | ---: |
| `1.00` | `100` |
| `25.50` | `2,550` |

The wallet shows a raw-unit preview before creating, reissuing, or burning an asset. Decimals do not change the asset's underlying supply.

## Create an asset

From the wallet home screen, select **Create asset**, then provide:

- **Name:** 1–64 characters;
- **Ticker:** 1–16 letters, numbers, dots, underscores, or dashes;
- **Decimals:** an integer from 0 to 18;
- **Initial supply:** a positive amount with no more decimal places than the configured precision;
- **Icon URL:** an optional HTTP or HTTPS image URL.

Review the metadata, displayed supply, raw supply, and reissuance setting before confirming. A successful issuance returns a new 68-character asset ID and a creation transaction that can be opened in the explorer.

::: info
Asset metadata is part of the issuance and cannot be edited from the wallet later. A remote icon URL is controlled by the issuer and may reveal a viewer's IP address when loaded.
:::

## Fixed or reissuable supply

An asset is fixed-supply by default. To allow additional supply, enable **Reissuable supply** during creation and select an existing asset held by the wallet as its **control asset**.

The control asset defines reissuance authority:

- a wallet must hold a positive amount of that control asset to reissue;
- transferring the control asset can transfer reissuance authority;
- if multiple wallets hold units of the control asset, each holder may be able to authorize additional supply;
- the control asset cannot be added or replaced after issuance;
- creating new supply does not consume or burn the control asset.

If the wallet has no asset available for control, first create a fixed-supply asset and then use it as the control asset for a later issuance.

::: danger
Treat the control asset as an administrative key. Losing access to every unit removes your ability to reissue; sending units to another party may give that party the same authority.
:::

## Reissue an asset

Open an asset from the home screen. **Reissue** appears only when the asset was created with a control asset and the active wallet currently holds that control asset.

1. Select **Reissue**.
2. Enter the additional display amount.
3. Verify the raw-unit preview.
4. Select **Confirm reissuance**.

The new units are added to the asset supply and the wallet refreshes its balance and activity. If the required control asset is no longer held, reissuance fails.

## Burn an asset

Any asset units held by the active account can be burned; no control asset is required.

1. Open the asset and select **Burn**.
2. Enter an amount, or select **Max** to use the full held balance.
3. Verify the raw-unit preview.
4. Confirm that the burn is permanent, then select **Permanently burn**.

Burning reduces supply by destroying the selected units. It cannot be reversed, and the amount cannot exceed the wallet's balance.

## App integrations

Connected Apps can request the same operations through `window.arkade`. Every request opens a dedicated approval window in the extension. See the [asset API guide](/provider/assets) for parameters, return values, validation, and examples.

The PWA popup fallback supports only connecting and sending BTC. Users can manage assets directly inside the web wallet, but an external App needs the extension provider to request asset operations.
