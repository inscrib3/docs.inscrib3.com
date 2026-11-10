---
title: "Asset issuance, reissuance, and burn"
description: "Integrate the Arkade asset lifecycle through the Inscrib3 Wallet provider."
---

# Asset issuance, reissuance, and burn

The extension provider exposes three methods for the Arkade asset lifecycle. The origin must be connected, the wallet must be unlocked, and every call requires a separate user approval.

| Method | Purpose | Returns |
| --- | --- | --- |
| `issueAsset(input)` | Create a new asset | `{ arkTxId, assetId }` |
| `reissueAsset(input)` | Add supply to a reissuable asset | Transaction ID |
| `burnAsset(input)` | Permanently destroy held units | Transaction ID |

These methods are available through `window.arkade` in the browser extension. They are not part of the PWA popup protocol.

## Raw units

All API amounts are positive safe integers in raw units. Convert a user-entered display amount using the asset's decimals before calling the provider.

```js raw-units.js
function toRawUnits(displayAmount, decimals) {
  const raw = Number(displayAmount) * 10 ** decimals;

  if (!Number.isSafeInteger(raw) || raw <= 0) {
    throw new Error('Amount cannot be represented as raw units');
  }

  return raw;
}
```

Avoid floating-point conversion for production interfaces when accepting arbitrary precision input. Parse the decimal string directly and reject excess decimal places.

## Issue an asset

```js issue-asset.js
const { arkTxId, assetId } = await window.arkade.issueAsset({
  amount: 1_000_000,
  metadata: {
    name: 'Example Token',
    ticker: 'EXT',
    decimals: 2,
    icon: 'https://example.com/ext.png',
  },
});
```

The input accepts:

| Field | Required | Validation |
| --- | --- | --- |
| `amount` | Yes | Positive safe integer in raw units |
| `controlAssetId` | No | 68 hexadecimal characters (34-byte Arkade asset ID) |
| `metadata.name` | No | 1–64 characters |
| `metadata.ticker` | No | 1–16 letters, numbers, `.`, `_`, or `-` |
| `metadata.decimals` | No | Integer from 0 to 18 |
| `metadata.icon` | No | HTTP or HTTPS URL |

`arkTxId` identifies the issuance transaction. `assetId` identifies the newly created asset and is required by send, reissue, and burn operations.

### Make supply reissuable

Pass the ID of an existing control asset during issuance:

```js issue-reissuable.js
const result = await window.arkade.issueAsset({
  amount: 100_000,
  controlAssetId: controlAsset.assetId,
  metadata: { name: 'Controlled Token', ticker: 'CTRL', decimals: 2 },
});
```

Future reissuance succeeds only while the active wallet holds a positive amount of the associated control asset. The control relationship cannot be introduced later. Because control assets can be transferred or distributed, Apps must not assume that the original issuer is the only party able to reissue.

## Discover reissuance authority

`getAssets()` now includes `controlAssetId` when an asset has reissuable supply. To determine whether the active wallet can reissue it, verify that the returned portfolio also contains a positive balance for the control asset.

```js can-reissue.js
const assets = await window.arkade.getAssets();
const asset = assets.find(({ assetId }) => assetId === selectedAssetId);

const canReissue = Boolean(
  asset?.controlAssetId &&
  assets.some(({ assetId, amount }) =>
    assetId === asset.controlAssetId && amount > 0,
  ),
);
```

The absence of `controlAssetId` means the asset has fixed supply. Its presence alone does not prove that the current wallet holds the required control asset.

## Reissue supply

```js reissue-asset.js
const txid = await window.arkade.reissueAsset({
  assetId,
  amount: 50_000,
});
```

`assetId` must be a 68-character hexadecimal Arkade asset ID. `amount` is the additional supply in raw units. Reissuance does not consume the control asset.

After success, refetch `getAssets()` and any asset activity shown by the App.

## Burn units

```js burn-asset.js
const txid = await window.arkade.burnAsset({
  assetId,
  amount: 20_000,
});
```

Burning permanently destroys units held by the active wallet. It does not require a control asset, but the wallet must hold enough spendable units. Never offer a success state before the Promise resolves.

::: danger
A burn cannot be undone. Show the asset ID, display amount, raw amount, and active network, and require an explicit confirmation in your own interface before requesting wallet approval.
:::

## Approval and errors

The extension approval window identifies the requesting origin and shows the operation's asset ID or issuance metadata and raw amount. The Promise rejects if the user rejects or closes the request, the wallet is locked, the account or network changes, validation fails, or the Arkade transaction cannot be completed.

Handle each call independently:

```js asset-operation.js
try {
  const txid = await window.arkade.burnAsset({ assetId, amount: rawAmount });
  await refreshPortfolio();
  showSuccess(txid);
} catch (error) {
  showError(error instanceof Error ? error.message : String(error));
}
```
