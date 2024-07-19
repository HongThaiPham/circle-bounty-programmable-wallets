import {
  Blockchain,
  TransactionState,
  TransactionType,
} from "@circle-fin/user-controlled-wallets";

type CircleHookDataType = {
  subscriptionId: string;
  notificationId: string;
  notificationType: string;
  notification: {
    id: string;
    blockchain?: Blockchain;
    walletId?: string;
    tokenId?: string;
    userId?: string;
    destinationAddress?: string;
    amounts?: string[];
    nftTokenIds?: string[];
    refId?: string;
    state?: TransactionState;
    errorReason?: string;
    transactionType?: TransactionType;
    txHash?: string;
    createDate?: string;
    updateDate?: string;
    errorDetails?: string | null;
  };
  timestamp: string;
  version: number;
};

export default CircleHookDataType;
