---
title: "window.arkade provider"
description: "Integrate the API injected into your App by the Inscrib3 Wallet extension."
---

# window.arkade provider

The Inscrib3 Wallet extension injects an immutable provider at `window.arkade`. An App can connect to the wallet, read its state and balance, request sends, manage assets, and sign messages.

## Detection

The provider is added asynchronously. Check for it after the `load` event or when the user clicks the connect button, rather than checking only once at startup.

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

## Connection model

Permission is tied to the App's origin and remains stored until:

- the App calls `disconnect()`;
- the user revokes the site under **Settings → Connected sites**.

The connection belongs to the wallet, not to one specific account. If the user changes account or network, subsequent calls use the new context and the provider emits events.

::: warning
Almost every method requires `connect()` first. The exceptions are `connect`, `disconnect`, `getAccounts`, `isConnected`, and `getProviderState`.
:::

## Essential lifecycle

```js lifecycle.js
const accounts = await window.arkade.connect();
const state = await window.arkade.getProviderState();

window.arkade.on('accountsChanged', (nextAccounts) => {
  renderAccount(nextAccounts[0] ?? null);
});

// When the user chooses to disconnect the App:
await window.arkade.disconnect();
```

## Approvals and locking

Reading wallet data requires the wallet to be unlocked. Sensitive operations open an approval window, and the wallet must be unlocked **before** the call: the approval window has no unlock step.

### [Connect your App](/provider/connection)

Implement connection, state, and disconnection.

### [Explore the methods](/provider/methods)

Review every available operation.
