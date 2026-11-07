---
title: "Installation and usage"
description: "Install the recommended browser extension or open Inscrib3 Wallet instantly on the web."
---

# Installation and usage

::: tip Choose how you use Inscrib3 Wallet
For the most integrated experience, [install the browser extension](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg). Prefer not to install anything? [Open the web wallet](https://wallet.inscrib3.com) and start directly in your browser.
:::

## Browser extension

The extension is the recommended way to use Inscrib3 Wallet on Chrome, Brave, and other Chromium-based browsers. It stays one click away in the browser toolbar and lets supported Bitcoin applications request wallet connections and transactions with explicit approval.

### Install from the Chrome Web Store

Open [Inscrib3 Wallet on the Chrome Web Store](https://chromewebstore.google.com/detail/inscrib3/hafphignbjdmblopkophkohgnphalclg), select **Add to Chrome**, and confirm the installation. In other Chromium-based browsers, the button label may differ.

Once installed, pin the extension from the browser toolbar for quick access.

### Install manually from GitHub

GitHub releases also include an archive for Chromium browsers.

#### 1. Download the release

Download the latest ZIP from [GitHub Releases](https://github.com/inscrib3/arkade-wallet/releases).

#### 2. Verify the archive

Check the file against the `SHA256SUMS` included in the release.

```bash
shasum -a 256 -c SHA256SUMS
```

#### 3. Open extensions

Visit `chrome://extensions` or `brave://extensions` and enable Developer mode.

#### 4. Load the extension

Extract the ZIP, select **Load unpacked**, and choose the extracted directory.

## Web wallet

Open [wallet.inscrib3.com](https://wallet.inscrib3.com) to use Inscrib3 Wallet immediately without installing an extension. The web wallet runs in the browser and can be installed on the device as a PWA when supported.

### 1. Open the wallet

Visit [wallet.inscrib3.com](https://wallet.inscrib3.com) in a compatible browser.

### 2. Create or restore

Create a new wallet or restore one with an existing mnemonic phrase.

### 3. Keep a backup

Store the mnemonic phrase offline. Anyone who has it can control the funds.

### 4. Install if desired

Use your browser's install command to add the web wallet to your home screen or desktop.

::: info
The extension and web wallet use separate browser storage. Creating or restoring a wallet in one does not automatically make it available in the other.
:::

::: tip
To integrate an App, continue to the [`window.arkade` overview](/provider/overview).
:::
