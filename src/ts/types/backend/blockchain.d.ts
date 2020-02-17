import { BLOCKCHAIN } from '../constants';
import { CoinInfo } from '../networks/coinInfo';
import { AccountAddresses, FeeLevel } from '../account';
import { BlockbookTransaction, RippleLibTransaction } from './transactions';

export interface BlockchainInfo {
    coin: CoinInfo;
    url: string;
    blockHash: string;
    blockHeight: number;
    decimals: number;
    name: string;
    shortcut: string;
    testnet: boolean;
    version: string;
    misc?: {
        reserve?: string;
    };
}

export interface BlockchainBlock {
    blockHash: string;
    blockHeight: number;
    coin: CoinInfo;
}

export interface BlockchainError {
    coin: CoinInfo;
    error: string;
}

// copy-paste from blockchain-link
export interface BlockchainLinkInput {
    addresses: string[];
    // amount: string,
    // fee: string,
    // total: string,
}

export interface BlockchainLinkOutput {
    addresses: string[];
    // amount: string,
}

export interface BlockchainLinkToken {
    name: string;
    shortcut: string;
    value: string;
}

export interface BlockchainLinkTransaction {
    type: 'send' | 'recv';
    timestamp?: number;
    blockHeight?: number;
    blockHash?: string;
    descriptor: string;
    inputs: BlockchainLinkInput[];
    outputs: BlockchainLinkOutput[];

    hash: string;
    amount: string;
    fee: string;
    total: string;

    tokens?: BlockchainLinkToken[];
    sequence?: number; // eth: nonce || ripple: sequence
}
// copy-paste from blockchain-link end

export interface BlockchainNotification {
    coin: CoinInfo;
    notification: BlockchainLinkTransaction;
}

export interface BlockchainSubscribeAccount {
    descriptor: string;
    addresses?: AccountAddresses; // bitcoin addresses
}

export interface BlockchainSubscribe {
    accounts: BlockchainSubscribeAccount[];
    coin: string;
}

export interface BlockchainSubscribed {
    subscribed: boolean;
}

export interface BlockchainDisconnect {
    coin: string;
}

export interface BlockchainDisconnected {
    disconnected: boolean;
}

export interface BlockchainGetTransactions {
    coin: string;
    txs: string[];
}

export type BlockchainTransactions = Array<
    | {
          type: 'blockbook';
          tx: BlockbookTransaction;
      }
    | {
          type: 'ripple';
          tx: RippleLibTransaction;
      }
>;

export interface BlockchainEstimateFee {
    coin: string;
    request?: {
        blocks?: number[];
        specific?: {
            conservative?: boolean;
            data?: string;
            from?: string;
            to?: string;
            txsize?: number;
        };
        feeLevels?: 'preloaded' | 'smart';
    };
}

export interface BlockchainEstimatedFee {
    blockTime: number;
    minFee: number;
    maxFee: number;
    levels: FeeLevel[];
}

export type BlockchainEvent =
    | {
          type: typeof BLOCKCHAIN.CONNECT;
          payload: BlockchainInfo;
      }
    | {
          type: typeof BLOCKCHAIN.ERROR;
          payload: BlockchainError;
      }
    | {
          type: typeof BLOCKCHAIN.BLOCK;
          payload: BlockchainBlock;
      }
    | {
          type: typeof BLOCKCHAIN.NOTIFICATION;
          payload: BlockchainNotification;
      };
