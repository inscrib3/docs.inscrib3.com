---
title: "Inscrib3应用"
description: "Arkade 上的开源原生流动性、互换、流动性池、代币发行和便携式奖励，目前在 Mutinynet 上运行。"
---

# Inscrib3应用

Inscrib3 App 是原生比特币和 Arkade 资产流动性的开源界面。它连接到 Inscrib3 钱包，引用契约强制的恒定产品池，并提交钱包资助的请求，而无需托管种子或私钥。

::: warning 当前网络：MUTINYNET
[app.mutinynet.inscrib3.com](https://app.mutinynet.inscrib3.com)的公开版本在 **Mutinynet** 上运行。这是一个实验测试环境。仅使用测试资金； Mutinynet 资产和 BTC 没有主网价值。
:::

## 有什么可用

- BTC 和 Arkade 资产之间的精确输入和精确输出互换；
- Arkade 资产对资产互换；
- 1 分钟至 30 天的基于储备的价格图表；
- 无需许可的流动性池创建和资产发行；
- 推出固定供应量，并具有 BTC 绑定曲线和原子分级永久流动性；
- 流动性存款和有限合伙人赎回；
- 流动性池搜索、储备详情、费用、活动和供应控制警告；
- 钱包特定活动、可携带积分、个人排名和实时排行榜；
- 用于共享池、方向和可选数量的紧凑链接。

## 官方服务

|服务 |网址 |目的|
| --- | --- | --- |
|应用 |[app.mutinynet.inscrib3.com](https://app.mutinynet.inscrib3.com)|公共 Mutinynet 接口 |
|应用接口 |[api.mutinynet.inscrib3.com](https://api.mutinynet.inscrib3.com/health)|行情、流动性池状态、活动和积分 |
|钱包|[wallet.inscrib3.com](https://wallet.inscrib3.com)|钱包PWA；完整的应用Provider API 需要安装扩展 |
|文档 |[docs.inscrib3.com](https://docs.inscrib3.com)|用户和集成文档 |

## 托管模式

该应用使用浏览器扩展注入的`window.arkade`Provider。私钥保留在钱包中。每个敏感操作都会在签名之前打开钱包批准。

对于兑换和流动性操作，钱包为特定请求的契约提供资金，该契约承诺支付和最低条款。协调员验证资金并解决兼容的请求，但不能用自己的地址替换承诺的支出。

## 开源组件

可以独立检查面向公共用户的组件：

- [应用前端](https://github.com/inscrib3/app.mutinynet.inscrib3.com)；
- [Inscrib3钱包](https://github.com/inscrib3/arkade-wallet)；
- [文档](https://github.com/inscrib3/docs.inscrib3.com)；
- [主网站](https://github.com/inscrib3/inscrib3.com)。

从[Mutinynet 设置指南](/zh/app/getting-started)开始，探索[比特币原生发行平台](/zh/app/launchpad)，然后在批准交易之前阅读[风险模型](/zh/app/security)。
