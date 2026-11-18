---
title: "基于比特币构建产品"
description: "Inscrib3 将协议和基础设施转变为有用、可访问、开源的比特币应用。"
---

# 基于比特币构建产品

Inscrib3 是一个独立团队，致力于探索比特币输出架构的潜力。我们的下一代产品基于 [Arkade](https://arkadeos.com) 构建——一个面向可编程比特币应用的开放执行环境。

::: info
比特币是基础，Arkade 提供执行环境，Inscrib3 构建产品。我们不会创建另一个区块链。
:::

### [发现Inscrib3](/zh/inscrib3/about)

我们从哪里来，我们建造什么，我们要去哪里。

### [集成钱包](/zh/getting-started/quickstart)

在`window.arkade`Provider和 PWA 后备之间进行选择。

## Inscrib3 应用 — 已在 Mutinynet 上线

[Inscrib3 App](https://app.mutinynet.inscrib3.com)是原生 BTC 和 Arkade 资产互换、无需许可池、固定供应代币发行、流动性、价格历史记录、钱包活动和可移植积分的开源接口。

::: warning MUTINYNET 发布
公共应用目前在 **Mutinynet** 上运行，而不是比特币主网上。仅使用 Mutinynet 测试资金。在请求交易之前，该接口会验证应用、API 和连接的钱包是否位于同一网络上。
:::

### [开始使用App](/zh/app/getting-started)

安装钱包扩展，将其切换到 Mutinynet，获取测试资金，并完成您的第一个操作。

### [了解积分和主网迁移](/zh/app/points)

开放池和启动可赚取 10 积分。结算池和启动交易根据协议费用 sats 赚取积分，至少 1 点。 **Mutinynet 发布期间获得的积分将迁移到主网**，并仍然归属于相同的钱包身份。

### [推出固定供应资产](/zh/app/launchpad)

对 BTC 绑定曲线进行建模，从您自己的钱包中发行，并自动进入规范的永久池，无需管理员控制的流动性退出。

## Inscrib3 钱包

[Inscrib3 Wallet](https://wallet.inscrib3.com)是通往可编程比特币的门户：使用 Arkade 构建的自托管钱包，可作为浏览器扩展和可安装的 PWA 使用。

### [安装浏览器扩展](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg)

Chrome、Brave 和其他基于 Chromium 的浏览器的推荐体验。只需点击一下 Inscrib3 钱包即可直接连接到支持的比特币应用。

### [打开网页钱包](https://wallet.inscrib3.com)

立即启动，无需安装任何东西。网页钱包在您的浏览器中运行，并且可以作为 PWA 安装在支持的设备上。

这两个选项都是自托管的：密钥保留在用户的设备上。

### [开源](https://github.com/inscrib3/arkade-wallet)

公开的、可验证的代码开放供贡献。

### [创建和管理 Arkade 资产](/zh/wallet/assets)

发行固定或可再发行的资产，控制未来的供应，并从钱包中永久销毁单位。

::: warning
Inscrib3 Wallet 是可以移动真实比特币的实验性软件。存入的金额不要超过您可以承受的损失。
:::

## 对于开发者

应用可以通过两种方式与钱包通信：

|模式|通信方式 |能力|何时使用它 |
| --- | --- | --- | --- |
|扩展|`window.arkade`|完整的Provider API |当扩展安装时 |
|渐进式网页应用 |Provider窗口和`postMessage`|具有明确批准的完整公共Provider API |作为没有扩展的后备 |

### [转到快速入门](/zh/getting-started/quickstart)

实施Provider检测和 PWA 后备。

## 探索我们的开源代码

钱包、应用前端、网站和这些文档都是公开且可审计的。完整的[开源项目目录见](/zh/inscrib3/open-source)。
