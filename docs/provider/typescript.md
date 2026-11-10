---
title: "TypeScript types"
description: "Declare window.arkade and use types that match the extension provider."
---

# TypeScript types

The provider is injected at runtime by the extension. Add a global declaration to your App project for autocomplete and type checking.

```ts arkade-provider.d.ts
export {};

declare global {
  interface Window {
    arkade?: ArkadeProvider;
  }
}

interface ArkadeProvider {
  readonly isArkade: true;

  connect(): Promise<string[]>;
  disconnect(): Promise<void>;
  isConnected(): Promise<boolean>;
  getAccounts(): Promise<string[]>;
  getProviderState(): Promise<ProviderState>;

  getAddress(): Promise<string>;
  getBoardingAddress(): Promise<string>;
  getXOnlyPublicKey(): Promise<string>;
  getBalance(): Promise<BalanceInfo>;
  getNetwork(): Promise<NetworkInfo>;
  getAssets(): Promise<AssetInfo[]>;
  getTransactionHistory(): Promise<TxHistoryEntry[]>;

  sendToAddress(address: string, amount: number): Promise<string>;
  sendAsset(
    address: string,
    assets: Array<{ assetId: string; amount: number }>,
    bitcoinAmount?: number,
  ): Promise<string>;
  issueAsset(input: IssueAssetInput): Promise<IssueAssetResult>;
  reissueAsset(input: AssetOperationInput): Promise<string>;
  burnAsset(input: AssetOperationInput): Promise<string>;
  settle(): Promise<string>;
  signMessage(message: string): Promise<SignedMessage>;

  on(event: ArkadeEvent, callback: (data?: unknown) => void): void;
  off(event: ArkadeEvent, callback: (data?: unknown) => void): void;
}

type ArkadeEvent =
  | 'accountsChanged'
  | 'accountChanged'
  | 'networkChanged'
  | 'lock'
  | 'unlock';
```

## Return types

```ts arkade-types.ts
interface ProviderState {
  isConnected: boolean;
  isUnlocked: boolean;
  network: string | null;
  accounts: string[];
}

interface NetworkInfo {
  network: 'bitcoin' | 'mutinynet' | 'custom';
  displayName: string;
  isTestnet: boolean;
  arkServerUrl: string;
  esploraUrl: string;
}

interface BalanceInfo {
  available: number;
  total: number;
  vtxo: {
    confirmed: number;
    unconfirmed: number;
    total: number;
  };
  boarding: {
    confirmed: number;
    unconfirmed: number;
    total: number;
  };
}

interface AssetInfo {
  assetId: string;
  amount: number;
  displayAmount: number;
  genesisTxid: string;
  metadata?: {
    name?: string;
    ticker?: string;
    decimals?: number;
    icon?: string;
  };
  controlAssetId?: string;
}

interface IssueAssetInput {
  amount: number;
  controlAssetId?: string;
  metadata?: {
    name?: string;
    ticker?: string;
    decimals?: number;
    icon?: string;
  };
}

interface IssueAssetResult {
  arkTxId: string;
  assetId: string;
}

interface AssetOperationInput {
  assetId: string;
  amount: number;
}

interface TxHistoryEntry {
  txid: string;
  type: 'send' | 'receive';
  amount: number;
  status: 'confirmed' | 'pending';
  timestamp: number;
  layer: 'ark' | 'onchain' | 'lightning';
  onchainTxid?: string;
  assets?: Array<{
    assetId: string;
    amount: number;
    isMint?: boolean;
  }>;
}

interface SignedMessage {
  message: string;
  signature: string;
  address: string;
}
```

::: info
A history `txid` may refer to an off-chain Ark transaction that block explorers do not recognize. When available, `onchainTxid` identifies the L1 transaction.
:::
