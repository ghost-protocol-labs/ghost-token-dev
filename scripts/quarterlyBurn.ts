import { treasury } from "../sdk";

(async () => {
  try {
    // Treasury object and Clock are internally provided in SDK
    const digest = await treasury.quarterlyBurnTreasury();
    console.log("✅ Quarterly burn executed. Tx digest:", digest);
  } catch (err) {
    console.error("❌ Quarterly burn failed:", err);
  }
})();
