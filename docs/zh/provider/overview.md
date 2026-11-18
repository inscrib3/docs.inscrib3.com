---
title: "窗口商场Provider"
description: "将 Inscrib3 钱包扩展注入到您的应用中的 API 集成。"
---

# 窗口商场Provider

Inscrib3 钱包扩展在`window.arkade`注入了一个不可变的Provider。应用可以连接到钱包、读取其状态和余额、请求发送、管理资产以及签署消息。

## 检测

Provider是异步添加的。在`load`事件后或用户单击连接按钮时检查它，而不是仅在启动时检查一次。

```js detect-provider.js
function whenLoaded() {
  if (document.readyState === 'complete') return Promise.resolve();

  return new Promise((resolve) => {
    window.addEventListener('load', resolve, { once: true });
  });
}

await whenLoaded();

if (!window.arkade?.isArkade) {
  // Offer the PWA or ask the user to install the extension.
}
```

## 连接型号

权限与应用的来源相关联并一直保存到：

- App调用`disconnect()`；
- 用户在**设置 → 连接的站点**下撤销该站点。

该连接属于钱包，而不属于某个特定帐户。如果用户更改帐户或网络，​​后续调用将使用新上下文，并且Provider会发出事件。

::: warning
几乎每种方法都首先需要`connect()`。例外情况是`connect`、`disconnect`、`getAccounts`、`isConnected`和`getProviderState`。
:::

## 基本生命周期

```js lifecycle.js
const accounts = await window.arkade.connect();
const state = await window.arkade.getProviderState();

window.arkade.on('accountsChanged', (nextAccounts) => {
  renderAccount(nextAccounts[0] ?? null);
});

// When the user chooses to disconnect the App:
await window.arkade.disconnect();
```

## 批准和锁定

读取钱包数据需要钱包解锁。敏感操作会打开批准窗口，钱包必须在调用之前解锁：批准窗口没有解锁步骤。

### [连接您的应用](/zh/provider/connection)

实现连接、状态和断开连接。

### [探索方法](/zh/provider/methods)

检查每个可用的操作。
