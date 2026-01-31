import { JsonRpcProvider, Ed25519Keypair, RawSigner, TransactionBlock } from "@mysten/sui";
import { getActiveRpc, getActiveKey } from "./config";

export const provider = new JsonRpcProvider({ fullnode: getActiveRpc() });
export const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(getActiveKey(), "hex"));
export const signer = new RawSigner(keypair, provider);

export const GHOST_TOKEN = "0x615326bcb0896338ddefe033771f875a4565f649c8d70395da24318c72ac25de";
export const TREASURY_OBJ = "0x2f78d0479d20590f8e63581feadf4f6a5b97e96340336e7c3e38ff115e117188";
export const ADMIN_CAP_OBJ = "0x94a5681ae72bb4df4df9c5e4428dbd7b0157a1dba9206b7861a8912ac8bf68bc";

export async function executeMint() {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: "ghost::ghost_token::init",
    arguments: [],
  });
  const result = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return result.digest;
}
