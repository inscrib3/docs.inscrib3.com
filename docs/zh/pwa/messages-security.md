---
title: "PWA 消息和安全"
description: "postMessage 响应和所需的 PWA 后备安全检查的参考。"
---

# PWA 消息和安全

钱包与其开启器交换`event.data`中的对象。应用在使用之前必须验证每个连接响应、Provider响应和事件。

## 消息类型

|`event.data.type`|附加字段 |意义|
| --- | --- | --- |
|`inscrib3:connect`|`accounts: string[]`|连接和可选网络交换机已获批准 |
|`inscrib3:connect_failed`|`error: string`|批准的网络交换机或连接失败 |
|`inscrib3:connect_rejected`|无 |连接被拒绝 |
|`inscrib3:send`|`txid: string`|发送完成 |
|`inscrib3:send_failed`|`error: string`|发送已批准但失败 |
|`inscrib3:send_rejected`|无 |发送被拒绝 |
|`inscrib3:send_asset`|`txid: string`|资产发送完成 |
|`inscrib3:send_asset_failed`|`error: string`|资产发送已获批准但失败 |
|`inscrib3:send_asset_rejected`|无 |资产发送被拒绝 |
|`inscrib3:provider_request`|`request: { id, method, params? }`|应用到钱包Provider的调用 |
|`inscrib3:provider_response`|`id`，加上`result`或`error`|一位Provider通话的钱包结果 |
|`inscrib3:provider_event`|`event`，可选`data`|帐户、网络、锁定或解锁事件 |

如果用户关闭Provider窗口，则无法保证最终消息。检查`popup.closed`，拒绝挂起的呼叫，并将Provider视为已断开连接。

## 必要的检查

```js secure-message-handler.js
function onMessage(event) {
  if (event.origin !== 'https://wallet.inscrib3.com') return;
  if (event.source !== popup) return;
  if (!event.data || typeof event.data.type !== 'string') return;

  handleWalletReply(event.data);
}
```

::: danger
请勿仅通过检查`event.data.type`来接受消息。任何页面都可以将`postMessage`发送到您的窗口。
:::

## 为什么需要推荐人

URL参数由opener控制，仅选择请求类型。 PWA 信任源自`document.referrer`的来源，并且：

- 当引荐来源网址丢失或无效时，拒绝弹出模式；
- 在批准屏幕上显示该来源；
- 将响应发送到确切的来源，而不是`*`。

因此，请勿使用`noreferrer`打开 PWA，并确保您网站的策略至少发送源作为引荐来源网址。

## 清单

- [ ] 通过用户手势打开弹出窗口；
- [ ]仅使用`https://wallet.inscrib3.com`作为生产钱包来源；
- [ ] 请勿在此弹出窗口中使用`noopener`或`noreferrer`；
- [ ] 验证`event.origin`和`event.source`；
- [ ] 对于 iOS 嵌入式后备，需要`event.source === walletIframe.contentWindow`并保持批准框架可见；
- [ ] 验证有效负载的形状和类型；
- [ ] 保留准确的Provider窗口引用，检查`popup.closed`，并在关闭时删除侦听器；
- [ ] 将拒绝、失败和关闭作为单独的结果进行处理；
- [ ] 在打开之前验证请求的网络、地址、聪、资产 ID 和原始资产金额；
- [ ] 不要假设 PWA 和扩展包含相同的钱包。

## PWA 隔离

钱包由专用域提供服务。该应用拒绝在`*.github.io`主机上运行，​​其中同一帐户下的多个站点可以共享源。该捆绑包还使用内容安全策略，将脚本、工作人员和资源限制在预期的上下文中。

::: info
PWA 数据属于 PWA 源，与扩展存储分开。因此，通过弹出窗口进行连接可能会返回与已安装扩展不同的地址。
:::
