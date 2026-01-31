import { ghost } from "../sdk";

(async () => {
  try {
    console.log("Minting full GHOST supply...");
    const digest = await ghost.executeMint(); // init() does not require arguments
    console.log("✅ Mint successful. Transaction digest:", digest);
  } catch (err) {
    console.error("❌ Mint failed:", err);
  }
})();
