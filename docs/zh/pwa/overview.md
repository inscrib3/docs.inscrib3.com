---
title: "PWA 后备"
description: "通过使用弹出窗口和 postMessage 集成 Inscrib3 钱包，无需扩展。"
---

# PWA 后备

当`window.arkade`不可用时，App可以打开[Inscrib3 Wallet](https://wallet.inscrib3.com)作为Provider窗口。钱包显示呼叫来源，要求用户在必要时创建或解锁它，并为Provider请求和事件保持验证窗口打开。

## 可用功能

|运营|参数|成功回复 |
| --- | --- | --- |
|连接 |可选`bitcoin`或`mutinynet`目标 |已批准网络上的活跃Ark地址 |
|发送比特币 |Ark地址和聪 |交易ID |
|发送资产 |Ark地址、原始资产金额、可选BTC载体 |交易ID |
|读取钱包状态 |地址、网络、余额、资产和历史记录 |Provider兼容的值 |
|资产生命周期|发行、重新发行和刻录 |资产结果或 txid |
|签约并结算 |留言或结算请求 |签名或 txid |
|活动 |帐户、网络、锁定和解锁更改 |供应商活动 |

Provider窗口涵盖公共`window.arkade`API。应用可以将其包装在本地Provider对象中，以便应用代码使用相同的接口（带或不带扩展名）。

在已安装的 iOS PWA 上，跨源`window.opener`不可靠。支持的回退将钱包Provider嵌入可见的跨域模式，验证`event.source === iframe.contentWindow`，并通过存储访问 API 请求第一方钱包存储。浏览器和扩展集成继续使用其现有的Provider窗口。

## 流动

### 1. 打开弹出窗口

该应用使用请求的网络打开`wallet.inscrib3.com`。批准后，同一窗口将承载Provider请求和事件。

### 2. 验证来源

PWA源自`document.referrer`。查询字符串来源标记不受信任。

### 3. 获得批准

用户创建或解锁钱包，检查来源、请求的网络、帐户、资产、原始金额、BTC 载体和目的地（如果适用），然后批准或拒绝。

### 4. 接收结果

钱包使用经过验证的来源以`postMessage`回复开启者。保持Provider窗口打开；关闭它会断开应用的连接。传统的一次性发送在完成后仍然很接近。

::: warning
打开没有`noopener`和`noreferrer`的弹出窗口。如果`window.opener`或`document.referrer`不可用，PWA不会进入集成模式。
:::

## 何时提供

```js choose-integration.js
await whenLoaded();

if (window.arkade?.isArkade) {
  await window.arkade.connect();
} else {
  await connectWithPwa();
}
```

直接通过单击或其他用户交互打开弹出窗口，否则浏览器可能会阻止它。

### [完全帮手](/zh/pwa/popup)

实施打开、关闭检测和响应。

### [安全和消息](/zh/pwa/messages-security)

验证来源、起源和响应类型。
