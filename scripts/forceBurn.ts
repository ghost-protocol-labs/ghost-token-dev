import { treasury } from "../sdk";

(async () => {
  try {
    const digest = await treasury.forceBurnTreasury();
    console.log("✅ Treasury force-burn executed. Tx digest:", digest);
  } catch (err) {
    console.error("❌ Force-burn failed:", err);
  }
})();
