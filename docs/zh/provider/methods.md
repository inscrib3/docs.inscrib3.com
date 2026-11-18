---
title: "Provider方法"
description: "参考window.arkade公开的方法及其审批要求。"
---

# Provider方法

每个方法都会返回一个`Promise`。除非另有说明，方法需要连接的源和解锁的钱包。

## 账户和网络

|方法|返回|批准 |
| --- | --- | --- |
|`connect()`|`string[]`包含活跃Ark地址 |仅限每个来源的第一次 |
|`disconnect()`|`true`|没有 |
|`isConnected()`|`boolean`|没有 |
|`getAccounts()`|`string[]`|没有 |
|`getProviderState()`|`ProviderState`|没有 |
|`getAddress()`|活跃Ark地址 |没有 |
|`getBoardingAddress()`|进入Ark的链上地址 |没有 |
|`getXOnlyPublicKey()`|十六进制编码的仅限 x 的公钥 |没有 |
|`getPointsPublicKey()`|稳定的积分和个人资料账户身份；绝不是资金密钥|没有 |
|`getNetwork()`|`NetworkInfo`|没有 |
|`switchNetwork('bitcoin' | 'mutinynet')`|`true`|更改网络时 |

```js account-data.js
const [address, boardingAddress, publicKey, network] = await Promise.all([
  window.arkade.getAddress(),
  window.arkade.getBoardingAddress(),
  window.arkade.getXOnlyPublicKey(),
  window.arkade.getNetwork(),
]);

await window.arkade.switchNetwork('mutinynet');
```

## 余额、资产和历史记录

|方法|返回|
| --- | --- |
|`getBalance()`|可用余额和总余额、VTXO 和寄宿资金 |
|`getAssets()`|持有的Ark资产及其元数据 |
|`getTransactionHistory()`|Ark、链上和闪电交易 |

```js portfolio.js
const [balance, assets, history] = await Promise.all([
  window.arkade.getBalance(),
  window.arkade.getAssets(),
  window.arkade.getTransactionHistory(),
]);
```

## 发送比特币

`sendToAddress(address, amount)`接受 Ark 地址和以聪为单位的正整数金额。每次调用都会打开一个批准窗口。

```js send-bitcoin.js
const txid = await window.arkade.sendToAddress('ark1q…', 1000);
```

::: warning
应用不能将此方法用于链上比特币或闪电目的地。
:::

## 发送资产

`sendAsset(address, assets, bitcoinAmount?)`在同一交易中发送一项或多项资产并可选择发送聪。

```js send-assets.js
const txid = await window.arkade.sendAsset(
  'ark1q…',
  [
    { assetId: 'asset-id', amount: 500 },
  ],
  1000,
);
```

每个资产`amount`使用原始单位而不应用小数。构建界面时，请阅读`metadata.decimals`和`getAssets()`。

## 发行、重新发行和销毁资产

|方法|返回|批准 |
| --- | --- | --- |
|`issueAsset({ amount, controlAssetId?, metadata? })`|`{ arkTxId, assetId }`|每次调用|
|`reissueAsset({ assetId, amount })`|交易ID |每次调用|
|`burnAsset({ assetId, amount })`|交易ID |每次调用|

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

金额是原始单位的正安全整数。重新发行需要活跃钱包持有的相关控制资产；燃烧只需要足够的平衡并永久摧毁单位。

有关控制资产、验证规则和完整示例，请参阅[资产发行、重新发行和销毁](/zh/provider/assets)。

## 沉降

`settle()`更新可花费的 VTXO 并返回批次 txid。每次调用都需要批准。

```js settle.js
const batchTxid = await window.arkade.settle();
```

## 签署消息

`signMessage(message)`使用返回的 BIP86 主根地址的密钥创建 BIP-322 签名。该消息必须是长度不超过 1,024 个字符的非空字符串。

```js sign-message.js
const signed = await window.arkade.signMessage('Sign in to example.com');

console.log(signed.message);
console.log(signed.signature);
console.log(signed.address); // bc1p… or tb1p…
```

每个签名都需要明确的用户批准。
