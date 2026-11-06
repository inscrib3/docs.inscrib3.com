---
title: "Installation and usage"
description: "Open the PWA or install the Inscrib3 Wallet browser extension."
---

# Installation and usage

## PWA

The most direct option is to open [wallet.inscrib3.com](https://wallet.inscrib3.com). The PWA runs in the browser and can be installed on the device when supported by the browser.

### 1. Open the wallet

Visit [wallet.inscrib3.com](https://wallet.inscrib3.com) in a compatible browser.

### 2. Create or restore

Create a new wallet or restore one with an existing mnemonic phrase.

### 3. Keep a backup

Store the mnemonic phrase offline. Anyone who has it can control the funds.

### 4. Install if desired

Use your browser's install command to add the PWA to your home screen or desktop.

## Browser extension

Releases include an archive for Chromium browsers. Chrome, Brave, and other Chromium-based browsers are supported. A Firefox build exists but is neither published nor tested.

### 1. Download the release

Download the latest ZIP from [GitHub Releases](https://github.com/inscrib3/arkade-wallet/releases).

### 2. Verify the archive

Check the file against the `SHA256SUMS` included in the release.

```bash
shasum -a 256 -c SHA256SUMS
```

### 3. Open extensions

Visit `chrome://extensions` or `brave://extensions` and enable Developer mode.

### 4. Load the extension

Extract the ZIP, select **Load unpacked**, and choose the extracted directory.

::: tip
To integrate an App, continue to the [`window.arkade` overview](/provider/overview).
:::
