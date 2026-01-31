import { TransactionBlock } from "@mysten/sui";
import { signer, TREASURY_OBJ, ADMIN_CAP_OBJ } from "./ghost";

export async function quarterlyBurnTreasury() {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::quarterly_burn",
    arguments: [tx.object(TREASURY_OBJ)],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}

export async function forceBurnTreasury() {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::admin_force_burn",
    arguments: [tx.object(ADMIN_CAP_OBJ), tx.object(TREASURY_OBJ)],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}

export async function withdrawTreasury(amount: bigint, recipient: string) {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::withdraw_treasury",
    arguments: [tx.object(ADMIN_CAP_OBJ), tx.object(TREASURY_OBJ), tx.pure(amount), tx.pure(recipient)],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}
