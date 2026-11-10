---
title: "Provider methods"
description: "Reference for the methods exposed by window.arkade and their approval requirements."
---

# Provider methods

Every method returns a `Promise`. Unless stated otherwise, methods require a connected origin and an unlocked wallet.

## Account and network

| Method | Returns | Approval |
| --- | --- | --- |
| `connect()` | `string[]` containing the active Ark address | First time per origin only |
| `disconnect()` | `true` | No |
| `isConnected()` | `boolean` | No |
| `getAccounts()` | `string[]` | No |
| `getProviderState()` | `ProviderState` | No |
| `getAddress()` | Active Ark address | No |
| `getBoardingAddress()` | On-chain address for entering Ark | No |
| `getXOnlyPublicKey()` | Hex-encoded x-only public key | No |
| `getNetwork()` | `NetworkInfo` | No |

```js account-data.js
const [address, boardingAddress, publicKey, network] = await Promise.all([
  window.arkade.getAddress(),
  window.arkade.getBoardingAddress(),
  window.arkade.getXOnlyPublicKey(),
  window.arkade.getNetwork(),
]);
```

## Balance, assets, and history

| Method | Returns |
| --- | --- |
| `getBalance()` | Available and total balance, VTXOs, and boarding funds |
| `getAssets()` | Held Ark assets and their metadata |
| `getTransactionHistory()` | Ark, on-chain, and Lightning transactions |

```js portfolio.js
const [balance, assets, history] = await Promise.all([
  window.arkade.getBalance(),
  window.arkade.getAssets(),
  window.arkade.getTransactionHistory(),
]);
```

## Send BTC

`sendToAddress(address, amount)` accepts an Ark address and a positive integer amount in satoshis. Every call opens an approval window.

```js send-bitcoin.js
const txid = await window.arkade.sendToAddress('ark1q…', 1000);
```

::: warning
An App cannot use this method for on-chain Bitcoin or Lightning destinations.
:::

## Send assets

`sendAsset(address, assets, bitcoinAmount?)` sends one or more assets and optionally sends satoshis in the same transaction.

```js send-assets.js
const txid = await window.arkade.sendAsset(
  'ark1q…',
  [
    { assetId: 'asset-id', amount: 500 },
  ],
  1000,
);
```

Each asset `amount` uses raw units without applying decimals. Read `metadata.decimals` from `getAssets()` when building your interface.

## Issue, reissue, and burn assets

| Method | Returns | Approval |
| --- | --- | --- |
| `issueAsset({ amount, controlAssetId?, metadata? })` | `{ arkTxId, assetId }` | Every call |
| `reissueAsset({ assetId, amount })` | Transaction ID | Every call |
| `burnAsset({ assetId, amount })` | Transaction ID | Every call |

```js asset-lifecycle.js
const issued = await window.arkade.issueAsset({
  amount: 1_000_000,
  metadata: { name: 'Example Token', ticker: 'EXT', decimals: 2 },
});

const reissuanceTxid = await window.arkade.reissueAsset({
  assetId: issued.assetId,
  amount: 50_000,
});

const burnTxid = await window.arkade.burnAsset({
  assetId: issued.assetId,
  amount: 20_000,
});
```

Amounts are positive safe integers in raw units. Reissuance requires an associated control asset held by the active wallet; burning requires only a sufficient balance and permanently destroys the units.

See [Asset issuance, reissuance, and burn](/provider/assets) for control assets, validation rules, and complete examples.

## Settlement

`settle()` renews spendable VTXOs and returns the batch txid. Every call requires approval.

```js settle.js
const batchTxid = await window.arkade.settle();
```

## Sign a message

`signMessage(message)` creates a BIP-322 signature with the key for the returned BIP86 Taproot address. The message must be a non-empty string no longer than 1,024 characters.

```js sign-message.js
const signed = await window.arkade.signMessage('Sign in to example.com');

console.log(signed.message);
console.log(signed.signature);
console.log(signed.address); // bc1p… or tb1p…
```

Every signature requires explicit user approval.
