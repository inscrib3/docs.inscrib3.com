---
title: "Integrate the popup"
description: "Connect a provider-compatible App to the Inscrib3 Wallet PWA."
---

# Integrate the popup

Open the wallet once, verify the connection response, then keep that exact window as the provider transport. Legacy one-shot sends remain supported, but a provider session is required for full App parity.

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
async function connectWithPwa(network = 'mutinynet') {
  const reply = await walletPopup({ arkade_connect_origin: '1', arkade_connect_network: network });

  if (reply?.type === 'inscrib3:connect') {
    return reply.accounts;
  }

  if (reply?.type === 'inscrib3:connect_rejected') {
    throw new Error('Connection rejected');
  }

  throw new Error('Unrecognized wallet response');
}
```

`arkade_connect_network` accepts `bitcoin` or `mutinynet`. When the active wallet network differs, the approval screen states that approving will switch networks before returning the address.

## Provider session

After `inscrib3:connect`, keep the popup reference and exchange provider messages with that same window:

```js provider-session.js
let id = 0;
const pending = new Map();

function request(walletWindow, method, params) {
  const requestId = `pwa-${++id}`;
  return new Promise((resolve, reject) => {
    pending.set(requestId, { resolve, reject });
    walletWindow.postMessage(
      { type: 'inscrib3:provider_request', request: { id: requestId, method, params } },
      WALLET_ORIGIN,
    );
  });
}

window.addEventListener('message', (event) => {
  if (event.origin !== WALLET_ORIGIN || event.source !== walletWindow) return;
  if (event.data?.type === 'inscrib3:provider_response') {
    const open = pending.get(event.data.id);
    if (!open) return;
    pending.delete(event.data.id);
    event.data.error ? open.reject(new Error(event.data.error)) : open.resolve(event.data.result);
  }
  if (event.data?.type === 'inscrib3:provider_event') emit(event.data.event, event.data.data);
});
```

Method names match the extension RPC, including `arkade_getBalance`, `arkade_getAssets`, `arkade_sendAsset`, `arkade_issueAsset`, `arkade_settle`, and `arkade_switchNetwork`. Read methods answer directly while unlocked. Sends, asset lifecycle operations, settlement, signing, and network changes show an approval screen.

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

## Send Arkade assets

Asset amounts are positive safe integers in raw units. When present, the optional BTC carrier is also a positive safe integer in sats.

```js send-assets-pwa.js
async function sendAssetsWithPwa(address, assets, bitcoinAmount) {
  const reply = await walletPopup({
    arkade_send_asset_origin: '1',
    arkade_send_asset_address: address,
    arkade_send_asset_assets: JSON.stringify(assets),
    ...(bitcoinAmount == null
      ? {}
      : { arkade_send_asset_bitcoin_amount: String(bitcoinAmount) }),
  });

  switch (reply?.type) {
    case 'inscrib3:send_asset':
      return reply.txid;
    case 'inscrib3:send_asset_failed':
      throw new Error(reply.error || 'Asset send failed');
    case 'inscrib3:send_asset_rejected':
      throw new Error('Asset send rejected');
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
The provider session lasts only while the verified wallet window remains open. It never grants background custody: every financial or signing request still requires explicit approval.
:::
