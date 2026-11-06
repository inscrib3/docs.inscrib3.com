---
title: "PWA fallback"
description: "Integrate Inscrib3 Wallet without the extension by using a popup and postMessage."
---

# PWA fallback

When `window.arkade` is unavailable, an App can open [Inscrib3 Wallet](https://wallet.inscrib3.com) in a popup. The PWA shows the calling origin, asks the user to create or unlock the wallet when necessary, and presents the operation for approval.

## Available capabilities

| Operation | Parameters | Successful response |
| --- | --- | --- |
| Connect | None | Active Ark address |
| Send BTC | Ark address and satoshis | Txid |

The PWA fallback does not expose the extension's full API. Balance, assets, history, message signing, and settlement require `window.arkade`.

## Flow

### 1. Open the popup

The App opens `wallet.inscrib3.com` with parameters identifying a connection or send request.

### 2. Verify the origin

The PWA derives the origin from `document.referrer`. The values of `arkade_connect_origin` and `arkade_send_origin` are not trusted.

### 3. Get approval

The user creates or unlocks the wallet, reviews the origin, network, account, and request details, then approves or rejects.

### 4. Receive the result

The PWA replies to the opener with `postMessage`, using the verified origin, and closes the popup.

::: warning
Open the popup without `noopener` and without `noreferrer`. If `window.opener` or `document.referrer` is unavailable, the PWA does not enter integration mode.
:::

## When to offer it

```js choose-integration.js
await whenLoaded();

if (window.arkade?.isArkade) {
  await window.arkade.connect();
} else {
  await connectWithPwa();
}
```

Open the popup directly from a click or another user interaction, otherwise the browser may block it.

### [Complete helper](/pwa/popup)

Implement opening, closure detection, and responses.

### [Security and messages](/pwa/messages-security)

Validate the source, origin, and response type.
