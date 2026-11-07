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

The extension is available from the Chrome Web Store for Chrome, Brave, and other Chromium-based browsers. A Firefox build exists but is neither published nor tested.

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

::: tip
To integrate an App, continue to the [`window.arkade` overview](/provider/overview).
:::
