---
title: "PWA messages and security"
description: "Reference for postMessage responses and required PWA fallback security checks."
---

# PWA messages and security

The PWA replies with an object in `event.data` before closing. The App must verify the message before using it.

## Message types

| `event.data.type` | Additional fields | Meaning |
| --- | --- | --- |
| `inscrib3:connect` | `accounts: string[]` | Connection approved |
| `inscrib3:connect_rejected` | None | Connection rejected |
| `inscrib3:send` | `txid: string` | Send completed |
| `inscrib3:send_failed` | `error: string` | Send approved but failed |
| `inscrib3:send_rejected` | None | Send rejected |

If the user closes the window, no message is sent. Check `popup.closed` periodically to settle the Promise.

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
- [ ] validate the payload's shape and type;
- [ ] check `popup.closed` and remove the listener and interval;
- [ ] handle rejection, failure, and closure as separate outcomes;
- [ ] validate the address and satoshis before opening;
- [ ] do not assume the PWA and extension contain the same wallet.

## PWA isolation

The wallet is served from a dedicated domain. The application refuses to run on `*.github.io` hosts, where multiple sites under the same account can share an origin. The bundle also uses a Content Security Policy that restricts scripts, workers, and resources to the expected context.

::: info
PWA data belongs to the PWA origin and is separate from extension storage. Connecting through the popup may therefore return a different address from the installed extension.
:::
