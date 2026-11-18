---
title: "事件和错误"
description: "保持您的应用同步并处理拒绝、锁定钱包和上下文更改。"
---

# 事件和错误

## 活动

使用`on`注册监听器，并使用`off`使用相同的函数将其删除。

|活动 |有效负载|当它被发射时 |
| --- | --- | --- |
|`accountsChanged`|`string[]`|连接、断开或活动地址更改 |
|`accountChanged`|无 |活跃账户变更 |
|`networkChanged`|`bitcoin`、`mutinynet`或`custom`|网络变革|
|`lock`|无 |手动或自动钱包锁|
|`unlock`|无 |钱包解锁 |

```js events.js
const refresh = () => loadWalletData();
const clear = () => clearSensitiveData();

window.arkade.on('accountChanged', refresh);
window.arkade.on('networkChanged', refresh);
window.arkade.on('unlock', refresh);
window.arkade.on('lock', clear);

function cleanup() {
  window.arkade.off('accountChanged', refresh);
  window.arkade.off('networkChanged', refresh);
  window.arkade.off('unlock', refresh);
  window.arkade.off('lock', clear);
}
```

::: info
`accountsChanged`的范围为连接的原点。帐户或网络更改后，重新获取应用显示的数据。
:::

## 错误处理

每个方法都可以用`Error`拒绝其 Promise。始终处理拒绝、批准窗口关闭和锁定状态。

```js safe-send.js
try {
  const txid = await window.arkade.sendToAddress(address, amountSats);
  showSuccess(txid);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  showError(message);
}
```

## 可识别的消息

|留言 |意义|
| --- | --- |
|`Not connected. Call connect() first.`|产地未经授权|
|`Wallet is locked`|阅读需要解锁钱包 |
|`Wallet is locked. Open the extension, unlock it, then try again.`|钱包被锁定时开始审批操作 |
|`Invalid amount: must be a positive integer`|金额为零、负数或小数 |
|`User rejected the connection request`|用户拒绝或关闭连接请求 |
|`User rejected the transaction`|用户拒绝或关闭了发送请求 |
|`User rejected the signature request`|用户拒绝或关闭签名请求 |
|`User rejected the settlement`|用户拒绝或关闭结算请求 |
|`User rejected the asset issuance`|用户拒绝或关闭发行请求 |
|`User rejected the asset reissuance`|用户拒绝或关闭了重新签发请求 |
|`User rejected the asset burn`|用户拒绝或关闭了刻录请求 |
|`The active account or network changed while this request was open, so nothing was done. Ask the site to try again.`|批准期间上下文发生变化 |

对同一来源打开三个以上审批窗口也视为拒绝。服务器端错误（例如资金不足或金额低于最低金额）将与其原始消息一起传递。

::: tip
不要围绕匹配错误文本构建整个体验。使用已知消息进行有针对性的指导，但始终提供通用后备方案，并且在 Promise 解决之前绝不显示成功。
:::
