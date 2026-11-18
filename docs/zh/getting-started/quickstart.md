---
title: "应用快速入门"
description: "通过扩展或 PWA 后备将应用连接到 Inscrib3 钱包。"
---

# 应用快速入门

建议的集成首先尝试扩展Provider，并在`window.arkade`不可用时提供 PWA。

## 先决条件

- 由稳定来源提供的网页；
- Inscrib3 钱包作为[extension](/zh/wallet/installation#browser-extension)或位于[wallet.inscrib3.com](https://wallet.inscrib3.com)；
- 金额表示为**正整数聪**；
- 主网上的`ark1…`Ark 地址或 Mutinynet 上的`tark1…`。

::: warning
应用发起的调用接受Ark地址。这些集成不支持链上和闪电目的地。
:::

## 1.等待Provider

Provider是异步添加的，并且可以从`load`事件中获得，不一定在`DOMContentLoaded`期间获得。

```js provider.js
function whenLoaded() {
  return document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) =>
        window.addEventListener('load', resolve, { once: true }),
      );
}

await whenLoaded();
const hasExtension = window.arkade?.isArkade === true;
```

## 2. 连接扩展程序

`connect()`首次连接源时会打开批准请求。

```js connect.js
if (hasExtension) {
  const [address] = await window.arkade.connect();
  const network = await window.arkade.getNetwork();

  console.log({ address, network: network.network });
}
```

## 3.发送比特币

每次发送都需要明确的用户批准。

```js send.js
const amountSats = 1000;
const txid = await window.arkade.sendToAddress('ark1q…', amountSats);
```

## 4. 添加 PWA 后备

如果缺少Provider，请从用户交互中打开 PWA。请勿使用`noopener`或`noreferrer`：PWA 检查`document.referrer`以识别呼叫来源。

```js pwa-connect.js
const WALLET_ORIGIN = 'https://wallet.inscrib3.com';

function connectWithPwa() {
  const url = `${WALLET_ORIGIN}/?arkade_connect_origin=1`;
  return window.open(url, 'inscrib3-wallet', 'width=380,height=640');
}

connectButton.addEventListener('click', connectWithPwa);
```

使用[complete 弹出帮助程序](/zh/pwa/popup)处理响应、窗口关闭和错误。

## 后续步骤

### [window.arkade API](/zh/provider/methods)

探索方法、返回类型和批准。

### [PWA协议](/zh/pwa/messages-security)

处理每条消息和安全检查。
