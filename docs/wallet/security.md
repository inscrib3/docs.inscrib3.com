---
title: "Security and risk model"
description: "Essential guidance for using and integrating Inscrib3 Wallet responsibly."
---

# Security and risk model

Inscrib3 Wallet is non-custodial: keys never leave the device. This removes custody by Inscrib3, but makes protecting the seed and reviewing requests essential.

::: danger
Losing the mnemonic phrase may make funds unrecoverable. Exposing it allows third parties to control them.
:::

## For users

- download the extension only from official releases and verify `SHA256SUMS`;
- store the mnemonic phrase offline and never enter it into websites or Apps;
- check the origin, network, address, and amount in every approval window;
- use only funds you can afford to lose;
- keep the wallet updated: only the latest release is supported.

## For developers

- never request the user's mnemonic phrase;
- check the active network before building a transaction;
- express all BTC amounts as positive integer satoshis;
- assume every approval can be rejected and handle errors;
- always verify `event.origin` and `event.source` in the PWA fallback;
- never use `*` as the target origin for messages.

## Unilateral exit

The wallet can recover funds on-chain without the Ark server's cooperation. This is an emergency path: every off-chain step behind the coins must be published on-chain, and fees may exceed a small balance. Settling first reduces the path to one recent VTXO and can limit costs.

## Report a vulnerability

Do not open a public issue for security problems. Use the repository's [private vulnerability reporting](https://github.com/inscrib3/arkade-wallet/security/advisories/new) and include the affected component, reproduction steps, and potential impact.

::: info
The project does not offer a bug bounty. Vulnerabilities in the Ark protocol, Ark server, or external dependencies should be reported to their respective projects.
:::
