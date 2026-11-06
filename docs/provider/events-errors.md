---
title: "Events and errors"
description: "Keep your App synchronized and handle rejections, locked wallets, and context changes."
---

# Events and errors

## Events

Use `on` to register a listener and `off` with the same function to remove it.

| Event | Payload | When it is emitted |
| --- | --- | --- |
| `accountsChanged` | `string[]` | Connection, disconnection, or active address change |
| `accountChanged` | None | Active account change |
| `networkChanged` | `bitcoin`, `mutinynet`, or `custom` | Network change |
| `lock` | None | Manual or automatic wallet lock |
| `unlock` | None | Wallet unlock |

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
`accountsChanged` is scoped to the connected origin. After an account or network change, refetch the data shown by your App.
:::

## Error handling

Every method can reject its Promise with an `Error`. Always handle rejection, approval window closure, and locked state.

```js safe-send.js
try {
  const txid = await window.arkade.sendToAddress(address, amountSats);
  showSuccess(txid);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  showError(message);
}
```

## Recognizable messages

| Message | Meaning |
| --- | --- |
| `Not connected. Call connect() first.` | The origin is not authorized |
| `Wallet is locked` | A read requires an unlocked wallet |
| `Wallet is locked. Open the extension, unlock it, then try again.` | An approval operation began while the wallet was locked |
| `Invalid amount: must be a positive integer` | The amount is zero, negative, or fractional |
| `User rejected the connection request` | The user rejected or closed the connection request |
| `User rejected the transaction` | The user rejected or closed the send request |
| `User rejected the signature request` | The user rejected or closed the signature request |
| `User rejected the settlement` | The user rejected or closed the settlement request |
| `The active account or network changed while this request was open, so nothing was done. Ask the site to try again.` | The context changed during approval |

Opening more than three approval windows for the same origin is also treated as a rejection. Server-side errors, such as insufficient funds or an amount below the minimum, are passed through with their original message.

::: tip
Do not build the whole experience around matching error text. Use known messages for targeted guidance, but always provide a generic fallback and never show success before the Promise resolves.
:::
