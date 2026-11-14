---
title: "PWA fallback"
description: "Integrate Inscrib3 Wallet without the extension by using a popup and postMessage."
---

# PWA fallback

When `window.arkade` is unavailable, an App can open [Inscrib3 Wallet](https://wallet.inscrib3.com) as a provider window. The wallet shows the calling origin, asks the user to create or unlock it when necessary, and keeps the verified window open for provider requests and events.

## Available capabilities

| Operation | Parameters | Successful response |
| --- | --- | --- |
| Connect | Optional `bitcoin` or `mutinynet` target | Active Ark address on the approved network |
| Send BTC | Ark address and satoshis | Txid |
| Send assets | Ark address, raw asset amounts, optional BTC carrier | Txid |
| Read wallet state | Address, network, balances, assets, and history | Provider-compatible values |
| Asset lifecycle | Issue, reissue, and burn | Asset result or txid |
| Sign and settle | Message or settlement request | Signature or txid |
| Events | Account, network, lock, and unlock changes | Provider event |

The provider window covers the public `window.arkade` API. The App can wrap it in a local provider object so application code uses the same interface with or without the extension.

On installed iOS PWAs, cross-origin `window.opener` is not reliable. The supported fallback embeds the wallet provider in a visible cross-origin modal, verifies `event.source === iframe.contentWindow`, and requests first-party wallet storage through the Storage Access API. Browser and extension integrations continue using their existing provider window.

## Flow

### 1. Open the popup

The App opens `wallet.inscrib3.com` with a requested network. After approval, the same window carries provider requests and events.

### 2. Verify the origin

The PWA derives the origin from `document.referrer`. Query-string origin markers are not trusted.

### 3. Get approval

The user creates or unlocks the wallet, reviews the origin, requested network, account, assets, raw amounts, BTC carrier, and destination as applicable, then approves or rejects.

### 4. Receive the result

The wallet replies to the opener with `postMessage`, using the verified origin. Keep the provider window open; closing it disconnects the App. Legacy one-shot sends still close after completion.

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
