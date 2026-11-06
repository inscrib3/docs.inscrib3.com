---
title: "App quickstart"
description: "Connect an App to Inscrib3 Wallet through the extension or the PWA fallback."
---

# App quickstart

The recommended integration tries the extension provider first and offers the PWA when `window.arkade` is unavailable.

## Prerequisites

- a web page served from a stable origin;
- Inscrib3 Wallet as an [extension](/wallet/installation#browser-extension) or at [wallet.inscrib3.com](https://wallet.inscrib3.com);
- amounts expressed as **positive integer satoshis**;
- an `ark1…` Ark address on mainnet or `tark1…` on Mutinynet.

::: warning
Calls made by Apps accept Ark addresses. On-chain and Lightning destinations are not supported by these integrations.
:::

## 1. Wait for the provider

The provider is added asynchronously and is available from the `load` event, not necessarily during `DOMContentLoaded`.

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

## 2. Connect the extension

`connect()` opens an approval request the first time an origin connects.

```js connect.js
if (hasExtension) {
  const [address] = await window.arkade.connect();
  const network = await window.arkade.getNetwork();

  console.log({ address, network: network.network });
}
```

## 3. Send Bitcoin

Every send requires explicit user approval.

```js send.js
const amountSats = 1000;
const txid = await window.arkade.sendToAddress('ark1q…', amountSats);
```

## 4. Add the PWA fallback

If the provider is missing, open the PWA from a user interaction. Do not use `noopener` or `noreferrer`: the PWA checks `document.referrer` to identify the calling origin.

```js pwa-connect.js
const WALLET_ORIGIN = 'https://wallet.inscrib3.com';

function connectWithPwa() {
  const url = `${WALLET_ORIGIN}/?arkade_connect_origin=1`;
  return window.open(url, 'inscrib3-wallet', 'width=380,height=640');
}

connectButton.addEventListener('click', connectWithPwa);
```

Use the [complete popup helper](/pwa/popup) to handle responses, window closure, and errors.

## Next steps

### [window.arkade API](/provider/methods)

Explore methods, return types, and approvals.

### [PWA protocol](/pwa/messages-security)

Handle every message and security check.
