---
title: "集成弹出窗口"
description: "将与Provider兼容的应用连接到 Inscrib3 钱包 PWA。"
---

# 集成弹出窗口

打开钱包一次，验证连接响应，然后保留Provider传输的确切窗口。传统的一次性发送仍受支持，但需要Provider会话才能实现完整的应用功能一致性。

## JavaScript 帮助器

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
请勿将`noopener`或`noreferrer`添加到`window.open`功能中。它们通常是有用的防御，但该协议需要`window.opener`和引用者，并通过在两个窗口中验证来源和来源来进行补偿。
:::

## 连接

`arkade_connect_origin`的值被忽略：参数的存在选择操作，而起源则源自引用者。

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

`arkade_connect_network`接受`bitcoin`或`mutinynet`。当活动钱包网络不同时，批准屏幕会指出批准将在返回地址之前切换网络。

## Provider会话

在`inscrib3:connect`之后，保留弹出引用并与同一窗口交换Provider消息：

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

方法名称与扩展 RPC 匹配，包括`arkade_getBalance`、`arkade_getAssets`、`arkade_sendAsset`、`arkade_issueAsset`、`arkade_settle`和`arkade_switchNetwork`。解锁时直接读取方法答案。发送、资产生命周期操作、结算、签名和网络更改显示批准屏幕。

## 安装的 iOS PWA

当一个已安装的 PWA 打开另一个源时，iOS 可能会分离或替换开启器。检测 iOS 独立模式并使用可见的钱包 iframe，而不是依赖弹出窗口。设置`referrerPolicy="origin"`，将钱包保留在`https://wallet.inscrib3.com`，并在每条消息上验证钱包来源和确切的`iframe.contentWindow`。

在读取现有的第一方存储之前，钱包会通过用户手势请求存储访问 API 权限。切勿在隐藏框架中呈现财务批准：在发送任何状态更改Provider请求之前显示钱包模式，并仅在匹配响应后隐藏它。

为了防止点击劫持，托管钱包仅接受来自官方 Inscrib3 应用来源的嵌入式Provider模式。第三方集成继续使用顶级弹出协议。

## 发送

在打开弹出窗口之前验证金额。它必须以聪表示并且是正整数。

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

## 发送 Arkade 资产

资产金额是以原始单位表示的安全正整数。如果存在，可选的 BTC 载体也是 sat 中的正安全整数。

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

## 通过按钮使用它

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
仅当已验证的钱包窗口保持打开状态时，Provider会话才会持续。它从不授予后台托管权：每项财务或签名请求仍然需要明确批准。
:::
