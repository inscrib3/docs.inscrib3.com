---
title: "Inscrib3 钱包"
description: "使用 Arkade 构建的可编程比特币的自托管网关。"
---

# Inscrib3 钱包

Inscrib3 钱包是您使用 Arkade 构建的可编程比特币的自托管网关。密钥保留在设备上，并且以两种格式提供相同的体验：用于应用集成的浏览器扩展和在浏览器中运行或可以从浏览器安装的 PWA。

::: warning
该钱包是实验性软件，可以移动真实的比特币。它不提供任何保证或有保证的支持。
:::

## 特征

- 通过 Arkade 进行链下发送和接收；
- 通过原子交换通过闪电网络接收和支付；
- 通过登机地址从链上进入并协作退出到比特币地址；
- 创建、查看、发送、重新发行和销毁Ark资产；
- 多账户、导入种子、控币、自动锁定；
- 在Ark服务器不配合的情况下紧急单方退出。

## 两种模式，一种钱包代码库

### [管理资产生命周期](/zh/wallet/assets)

创建固定或可重新发行的 Arkade 资产、控制额外供应并永久销毁持有的单位。

### 扩大

Manifest V3 扩展将`window.arkade`公开给网页。请求传输到后台服务人员，敏感操作需要用户批准。

### 渐进式网页应用

PWA 直接将钱包保存在自己的进程中，并将数据存储在自己的来源下。它可以正常打开，也可以通过应用弹出。

::: info
扩展和 PWA 使用单独的存储。因此，用户在每种模式下可能拥有不同的钱包。
:::

## 网络

比特币主网是默认预设。 Mutinynet 和自定义Ark服务器配置也可以从设置中获得。

在发送请求之前，应用应检查活动网络：

```js network-check.js
const network = await window.arkade.getNetwork();

if (network.network !== 'bitcoin') {
  throw new Error(`Unsupported network: ${network.displayName}`);
}
```

## 开源架构

该存储库是一个 Bun monorepo，由以下部分组成：

|路径|责任|
| --- | --- |
|`packages/core`|钱包逻辑、密码学和网络配置 |
|`packages/ui`|共享Vue接口|
|`apps/extension`| WXT Manifest V3 浏览器扩展 |
|`apps/pwa`| Vite 和 Vue PWA |

### [探索存储库](https://github.com/inscrib3/arkade-wallet)

浏览 Inscrib3 钱包的源代码、版本和问题。
