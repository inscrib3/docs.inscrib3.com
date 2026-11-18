---
title: "资产发行、再发行和销毁"
description: "通过 Inscrib3 钱包Provider集成 Arkade 资产生命周期。"
---

# 资产发行、再发行和销毁

扩展Provider和 PWA Provider窗口都公开了 Arkade 资产生命周期的三种方法。来源必须连接，钱包必须解锁，每次调用都需要单独的用户批准。

|方法|目的|返回|
| --- | --- | --- |
|`issueAsset(input)`|创建新资产 |`{ arkTxId, assetId }`|
|`reissueAsset(input)`|添加可再发行资产的供应 |交易ID |
|`burnAsset(input)`|永久摧毁持有的单位|交易ID |

这些方法可通过浏览器扩展中的`window.arkade`获得。它们不是 PWA 弹出协议的一部分。

## 原始单位

所有 API 数量均为原始单位的安全正整数。在调用Provider之前，使用资产的小数位转换用户输入的显示金额。

```js raw-units.js
function toRawUnits(displayAmount, decimals) {
  const raw = Number(displayAmount) * 10 ** decimals;

  if (!Number.isSafeInteger(raw) || raw <= 0) {
    throw new Error('Amount cannot be represented as raw units');
  }

  return raw;
}
```

接受任意精度输入时，避免生产接口的浮点转换。直接解析小数字符串，拒绝多余的小数位。

## 发行资产

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

输入接受：

|领域 |必填 |验证 |
| --- | --- | --- |
|`amount`|是的 |原始单位的正安全整数 |
|`controlAssetId`|没有 | 68 个十六进制字符（34 字节 Arkade 资产 ID）|
|`metadata.name`|没有 | 1–64 个字符 |
|`metadata.ticker`|没有 | 1–16 个字母、数字、`.`、`_`或`-`|
|`metadata.decimals`|没有 | 0 到 18 之间的整数 |
|`metadata.icon`|没有 | HTTP 或 HTTPS URL |

`arkTxId`标识发行交易。`assetId`标识新创建的资产，并且是发送、重新发行和刻录操作所需的。

### 使供应可重新发行

发行时传递现有控制资产的ID：

```js issue-reissuable.js
const result = await window.arkade.issueAsset({
  amount: 100_000,
  controlAssetId: controlAsset.assetId,
  metadata: { name: 'Controlled Token', ticker: 'CTRL', decimals: 2 },
});
```

仅当活跃钱包持有正数量的相关控制资产时，未来的重新发行才会成功。控制关系不能在后面引入。由于控制资产可以转移或分配，应用不得假设原始发行人是唯一能够重新发行的一方。

## 发现补发机构

当资产具有可重新发行供应时，`getAssets()`现在包括`controlAssetId`。要确定活动钱包是否可以重新发行，请验证返回的投资组合是否还包含控制资产的正余额。

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

缺少`controlAssetId`意味着该资产具有固定供应。它的存在本身并不能证明当前钱包持有所需的控制资产。

## 补发供应

```js reissue-asset.js
const txid = await window.arkade.reissueAsset({
  assetId,
  amount: 50_000,
});
```

`assetId`必须是 68 个字符的十六进制 Arkade 资产 ID。`amount`是原始单位的额外供应。重新发行不消耗控制资产。

成功后，重新获取`getAssets()`以及应用显示的任何资产活动。

## 燃烧单位

```js burn-asset.js
const txid = await window.arkade.burnAsset({
  assetId,
  amount: 20_000,
});
```

燃烧会永久销毁活跃钱包持有的单位。它不需要控制资产，但钱包必须持有足够的可消费单位。在 Promise 解决之前永远不要提供成功状态。

::: danger
烧伤无法挽回。显示资产 ID、显示金额、原始金额和活跃网络，并在请求钱包批准之前在您自己的界面中要求明确确认。
:::

## 批准和错误

扩展批准窗口可识别请求来源并显示操作的资产 ID 或发行元数据和原始金额。如果用户拒绝或关闭请求、钱包被锁定、帐户或网络更改、验证失败或 Arkade 交易无法完成，则 Promise 会被拒绝。

独立处理每个调用：

```js asset-operation.js
try {
  const txid = await window.arkade.burnAsset({ assetId, amount: rawAmount });
  await refreshPortfolio();
  showSuccess(txid);
} catch (error) {
  showError(error instanceof Error ? error.message : String(error));
}
```
