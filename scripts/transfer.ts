import { SuiClient } from '@mysten/sui/client';
import { TransactionBlock } from '@mysten/sui/transactions';

const client = new SuiClient({ url: 'https://fullnode.mainnet.sui.io' });

export async function transfer(coinId: string, recipient: string) {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: `${process.env.PACKAGE_ID}::ghost_token::transfer`,
    arguments: [tx.object(coinId), tx.pure(recipient), tx.object(process.env.TREASURY_ID!), tx.object(process.env.EXEMPT_ID!)],
  });
  return client.signAndExecuteTransactionBlock({ transactionBlock: tx });
}