---
title: "Connection and state"
description: "Manage origin authorization, provider state, and account changes."
---

# Connection and state

## Connect an origin

Call `connect()` in response to a clear user action. The first call for an origin opens an approval window; subsequent calls return the active address directly while the permission remains valid.

```js connect.js
async function connectWallet() {
  if (!window.arkade?.isArkade) {
    throw new Error('Inscrib3 Wallet is unavailable');
  }

  const [address] = await window.arkade.connect();
  return address;
}
```

The response is an array of Ark addresses. In the current version, it contains the active address.

## Read provider state

`getProviderState()` can be called before connecting and is the most complete way to initialize your interface.

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

## Methods available without a connection

| Method | Result |
| --- | --- |
| `connect()` | Requests or reuses authorization for the origin |
| `disconnect()` | Revokes the current connection |
| `isConnected()` | Indicates whether the origin is authorized |
| `getAccounts()` | Returns an empty array when disconnected or locked |
| `getProviderState()` | Returns connection, lock, network, and account state |

## Disconnect

```js disconnect.js
await window.arkade.disconnect();
clearWalletState();
```

Disconnecting emits `accountsChanged` with an empty array. The user can achieve the same result by revoking the site from wallet settings.

## React to changes

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
After `accountChanged` or `networkChanged`, refetch balances, assets, and history instead of partially updating local state.
:::
