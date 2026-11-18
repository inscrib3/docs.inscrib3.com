---
title: "连接和状态"
description: "管理来源授权、Provider状态和帐户更改。"
---

# 连接和状态

## 连接原点

调用`connect()`以响应明确的用户操作。第一次调用原产地会打开一个批准窗口；后续调用直接返回活动地址，同时权限仍然有效。

```js connect.js
async function connectWallet() {
  if (!window.arkade?.isArkade) {
    throw new Error('Inscrib3 Wallet is unavailable');
  }

  const [address] = await window.arkade.connect();
  return address;
}
```

响应是一个Ark地址数组。在当前版本中，它包含活动地址。

## 读取Provider状态

`getProviderState()`可以在连接之前调用，是初始化接口的最完整方法。

```js provider-state.js
const state = await window.arkade.getProviderState();

if (!state.isConnected) {
  showConnectButton();
} else if (!state.isUnlocked) {
  showUnlockHint();
} else {
  renderWallet(state.accounts[0], state.network);
}
```

```ts
interface ProviderState {
  isConnected: boolean;
  isUnlocked: boolean;
  network: string | null;
  accounts: string[];
}
```

## 无需连接即可使用的方法

|方法|结果 |
| --- | --- |
|`connect()`|请求或重复使用原产地授权 |
|`disconnect()`|撤销当前连接 |
|`isConnected()`|表示来源是否授权 |
|`getAccounts()`|断开连接或锁定时返回空数组 |
|`getProviderState()`|返回连接、锁定、网络和帐户状态 |

## 断开

```js disconnect.js
await window.arkade.disconnect();
clearWalletState();
```

断开连接会发出带有空数组的`accountsChanged`。用户可以通过从钱包设置中撤销该网站来达到相同的结果。

## 对变化做出反应

```js account-events.js
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    showConnectButton();
    return;
  }

  renderAddress(accounts[0]);
  refreshWalletData();
}

window.arkade.on('accountsChanged', handleAccountsChanged);

// When unmounting the component:
window.arkade.off('accountsChanged', handleAccountsChanged);
```

::: tip
在`accountChanged`或`networkChanged`之后，重新获取余额、资产和历史记录，而不是部分更新本地状态。
:::
