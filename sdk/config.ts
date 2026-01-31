import dotenv from "dotenv";
dotenv.config();

const NETWORKS: Record<string, string> = {
  devnet: process.env.DEVNET_RPC || "https://fullnode.devnet.sui.io:443",
  testnet: process.env.TESTNET_RPC || "https://fullnode.testnet.sui.io:443",
  mainnet: process.env.MAINNET_RPC || "https://fullnode.mainnet.sui.io:443",
};

export function getActiveRpc(): string {
  const net = process.env.SUI_NETWORK || "devnet";
  return NETWORKS[net];
}

export function getActiveKey(): string {
  const key = process.env.SUI_PRIVATE_KEY;
  if (!key) throw new Error("SUI_PRIVATE_KEY not set in .env");
  return key;
}
