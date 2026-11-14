---
title: "PWA messages and security"
description: "Reference for postMessage responses and required PWA fallback security checks."
---

# PWA messages and security

The wallet exchanges objects in `event.data` with its opener. The App must verify every connection response, provider response, and event before using it.

## Message types

| `event.data.type` | Additional fields | Meaning |
| --- | --- | --- |
| `inscrib3:connect` | `accounts: string[]` | Connection and optional network switch approved |
| `inscrib3:connect_failed` | `error: string` | Approved network switch or connection failed |
| `inscrib3:connect_rejected` | None | Connection rejected |
| `inscrib3:send` | `txid: string` | Send completed |
| `inscrib3:send_failed` | `error: string` | Send approved but failed |
| `inscrib3:send_rejected` | None | Send rejected |
| `inscrib3:send_asset` | `txid: string` | Asset send completed |
| `inscrib3:send_asset_failed` | `error: string` | Asset send approved but failed |
| `inscrib3:send_asset_rejected` | None | Asset send rejected |
| `inscrib3:provider_request` | `request: { id, method, params? }` | App-to-wallet provider call |
| `inscrib3:provider_response` | `id`, plus `result` or `error` | Wallet result for one provider call |
| `inscrib3:provider_event` | `event`, optional `data` | Account, network, lock, or unlock event |

If the user closes the provider window, no final message is guaranteed. Check `popup.closed`, reject pending calls, and treat the provider as disconnected.

## Required checks

```js secure-message-handler.js
function onMessage(event) {
  if (event.origin !== 'https://wallet.inscrib3.com') return;
  if (event.source !== popup) return;
  if (!event.data || typeof event.data.type !== 'string') return;

  handleWalletReply(event.data);
}
```

::: danger
Do not accept a message by checking only `event.data.type`. Any page can send a `postMessage` to your window.
:::

## Why the referrer is required

URL parameters are controlled by the opener and only select the request type. The PWA trusts the origin derived from `document.referrer` and:

- refuses popup mode when the referrer is missing or invalid;
- displays that origin on the approval screen;
- sends the response to exactly that origin, never to `*`.

For this reason, do not open the PWA with `noreferrer`, and make sure your site's policy sends at least the origin as the referrer.

## Checklist

- [ ] open the popup from a user gesture;
- [ ] use only `https://wallet.inscrib3.com` as the production wallet origin;
- [ ] do not use `noopener` or `noreferrer` for this popup;
- [ ] verify both `event.origin` and `event.source`;
- [ ] for the iOS embedded fallback, require `event.source === walletIframe.contentWindow` and keep the approval frame visible;
- [ ] validate the payload's shape and type;
- [ ] keep the exact provider window reference, check `popup.closed`, and remove listeners when it closes;
- [ ] handle rejection, failure, and closure as separate outcomes;
- [ ] validate the requested network, address, satoshis, asset IDs, and raw asset amounts before opening;
- [ ] do not assume the PWA and extension contain the same wallet.

## PWA isolation

The wallet is served from a dedicated domain. The application refuses to run on `*.github.io` hosts, where multiple sites under the same account can share an origin. The bundle also uses a Content Security Policy that restricts scripts, workers, and resources to the expected context.

::: info
PWA data belongs to the PWA origin and is separate from extension storage. Connecting through the popup may therefore return a different address from the installed extension.
:::
