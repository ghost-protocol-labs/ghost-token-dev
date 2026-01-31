import { TransactionBlock } from "@mysten/sui";
import { signer, ADMIN_CAP_OBJ, TREASURY_OBJ, GHOST_TOKEN } from "./ghost";

export async function setTransfersPaused(paused: boolean) {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::set_paused",
    arguments: [tx.object(ADMIN_CAP_OBJ), tx.object(TREASURY_OBJ), tx.pure(paused)],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}

export async function addExempt(addr: string) {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::add_exempt",
    arguments: [tx.object(ADMIN_CAP_OBJ), tx.object(GHOST_TOKEN), tx.pure(addr)],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}

export async function removeExempt(addr: string) {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::remove_exempt",
    arguments: [tx.object(ADMIN_CAP_OBJ), tx.object(GHOST_TOKEN), tx.pure(addr)],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}

export async function executeMultisigAction(actionName: string, params: any[]) {
  console.log("Multisig action called:", actionName, params);
  // TODO: integrate real Move multisig module
  return "mock_tx_digest";
}
