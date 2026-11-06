---
title: "Integrate the popup"
description: "A complete implementation for connecting and sending through the Inscrib3 Wallet PWA."
---

# Integrate the popup

Use one helper to open the popup, listen for the response, verify its sender, and detect manual closure.

## JavaScript helper

```js wallet-popup.js
const WALLET_ORIGIN = 'https://wallet.inscrib3.com';

function walletPopup(params) {
  const url = `${WALLET_ORIGIN}/?${new URLSearchParams(params)}`;
  const popup = window.open(
    url,
    'inscrib3-wallet',
    'width=380,height=640',
  );

  if (!popup) {
    return Promise.reject(new Error('Popup blocked by the browser'));
  }

  return new Promise((resolve, reject) => {
    function cleanup() {
      window.removeEventListener('message', onMessage);
      window.clearInterval(closedPoll);
    }

    function onMessage(event) {
      if (event.origin !== WALLET_ORIGIN) return;
      if (event.source !== popup) return;

      cleanup();
      resolve(event.data);
    }

    const closedPoll = window.setInterval(() => {
      if (popup.closed) {
        cleanup();
        reject(new Error('Wallet window closed'));
      }
    }, 500);

    window.addEventListener('message', onMessage);
  });
}
```

::: warning
Do not add `noopener` or `noreferrer` to the `window.open` features. They are normally useful defenses, but this protocol requires both `window.opener` and the referrer, and compensates by verifying origin and source in both windows.
:::

## Connect

The value of `arkade_connect_origin` is ignored: the parameter's presence selects the operation, while the origin is derived from the referrer.

```js connect-pwa.js
async function connectWithPwa() {
  const reply = await walletPopup({ arkade_connect_origin: '1' });

  if (reply?.type === 'inscrib3:connect') {
    return reply.accounts;
  }

  if (reply?.type === 'inscrib3:connect_rejected') {
    throw new Error('Connection rejected');
  }

  throw new Error('Unrecognized wallet response');
}
```

## Send

Validate the amount before opening the popup. It must be expressed in satoshis and be a positive integer.

```js send-pwa.js
async function sendWithPwa(address, amountSats) {
  if (!Number.isSafeInteger(amountSats) || amountSats <= 0) {
    throw new Error('The amount must be a positive integer');
  }

  const reply = await walletPopup({
    arkade_send_origin: '1',
    arkade_send_address: address,
    arkade_send_amount: String(amountSats),
  });

  switch (reply?.type) {
    case 'inscrib3:send':
      return reply.txid;
    case 'inscrib3:send_failed':
      throw new Error(reply.error || 'Send failed');
    case 'inscrib3:send_rejected':
      throw new Error('Send rejected');
    default:
      throw new Error('Unrecognized wallet response');
  }
}
```

## Use it from a button

```js ui.js
connectButton.addEventListener('click', async () => {
  try {
    const [address] = await connectWithPwa();
    renderConnectedAddress(address);
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
  }
});
```

::: info
A PWA connection does not grant the App a persistent permission equivalent to the extension. Every popup presents an explicit request to the user.
:::
