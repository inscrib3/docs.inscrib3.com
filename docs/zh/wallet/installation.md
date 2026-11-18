---
title: "安装与使用"
description: "安装推荐的浏览器扩展程序或立即在网络上打开 Inscrib3 钱包。"
---

# 安装与使用

::: tip 选择 Inscrib3 钱包的使用方式
为了获得最集成的体验，[安装浏览器扩展](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg)。不想安装任何东西？[打开网页钱包](https://wallet.inscrib3.com)并直接在浏览器中启动。
:::

## 浏览器扩展

该扩展程序是在 Chrome、Brave 和其他基于 Chromium 的浏览器上使用 Inscrib3 钱包的推荐方式。只需在浏览器工具栏中单击一下即可，支持的比特币应用可以在明确批准的情况下请求钱包连接和交易。

### 从 Chrome 网上应用店安装

在Chrome网上应用店打开[Inscrib3钱包](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg)，选择**添加到Chrome**，并确认安装。在其他基于 Chromium 的浏览器中，按钮标签可能有所不同。

安装后，从浏览器工具栏固定扩展程序以便快速访问。

### 从 GitHub 手动安装

GitHub 版本还包括 Chromium 浏览器的存档。

#### 1. 下载版本

从[GitHub Releases](https://github.com/inscrib3/arkade-wallet/releases)下载最新的 ZIP。

#### 2. 验证存档

根据版本中包含的`SHA256SUMS`检查该文件。

```bash
shasum -a 256 -c SHA256SUMS
```

#### 3.开放扩展

访问`chrome://extensions`或`brave://extensions`并启用开发者模式。

#### 4.加载扩展

解压 ZIP，选择 **加载解压**，然后选择解压的目录。

## 网页钱包

打开[wallet.inscrib3.com](https://wallet.inscrib3.com)即可立即使用 Inscrib3 钱包，无需安装扩展。网页钱包在浏览器中运行，如果支持，可以作为 PWA 安装在设备上。

### 1.打开钱包

在兼容浏览器中访问[wallet.inscrib3.com](https://wallet.inscrib3.com)。

### 2. 创建或恢复

创建一个新钱包或使用现有助记词恢复钱包。

### 3.保留备份

离线存储助记词。任何拥有它的人都可以控制资金。

### 4. 如果需要，请安装

使用浏览器的安装命令将网页钱包添加到主屏幕或桌面。

::: info
扩展程序和网页钱包使用单独的浏览器存储。在其中一个中创建或恢复钱包不会自动使其在另一个中可用。
:::

::: tip
要集成应用，请继续查看[`window.arkade`概述](/zh/provider/overview)。
:::
