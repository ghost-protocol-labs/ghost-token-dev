import { signer } from "./ghost";

export async function daoPropose(args: string[]) {
  console.log("DAO propose with args:", args);
  return "tx_digest";
}

export async function daoVote(args: string[]) {
  console.log("DAO vote with args:", args);
  return "tx_digest";
}

export async function daoExecute(args: string[]) {
  console.log("DAO execute with args:", args);
  return "tx_digest";
}
