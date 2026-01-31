import { TransactionBlock } from "@mysten/sui";
import { signer, GHOST_TOKEN, TREASURY_OBJ } from "./ghost";

export async function transferTokens(recipient: string, amount: bigint) {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::transfer",
    arguments: [
      tx.pure(amount),
      tx.pure(recipient),
      tx.object(TREASURY_OBJ),
      tx.object(GHOST_TOKEN),
    ],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}
