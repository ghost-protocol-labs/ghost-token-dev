import { multisig } from "../sdk";

const arg = process.argv[2];
const paused = arg === "true";

(async () => {
  try {
    const digest = await multisig.setTransfersPaused(paused);
    console.log(`✅ Transfers ${paused ? "paused" : "unpaused"}. Tx digest:`, digest);
  } catch (err) {
    console.error("❌ Pause/unpause failed:", err);
  }
})();
