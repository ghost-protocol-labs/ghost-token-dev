import { transferTokens } from "../sdk/transfer";

const recipient = process.argv[2];
const amount = BigInt(process.argv[3] || "0");

(async () => {
  try {
    const tx = await transferTokens(recipient, amount);
    console.log("✅ Transfer success:", tx);
  } catch (err) {
    console.error(err);
  }
})();
