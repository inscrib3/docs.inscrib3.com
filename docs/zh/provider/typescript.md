---
title: "TypeScript 类型"
description: "声明 window.arkade 并使用与扩展Provider匹配的类型。"
---

# TypeScript 类型

Provider由扩展在运行时注入。向您的 App 项目添加全局声明以进行自动完成和类型检查。

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
  getPointsPublicKey(): Promise<string>;
  getBalance(): Promise<BalanceInfo>;
  getNetwork(): Promise<NetworkInfo>;
  switchNetwork(network: 'bitcoin' | 'mutinynet'): Promise<boolean>;
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

## 返回类型

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
一条历史记录`txid`可能指的是区块浏览器无法识别的链下Ark交易。当可用时，`onchainTxid`标识 L1 事务。
:::
