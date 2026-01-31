import { multisig } from "../sdk";

const action = process.argv[2]; // "add" | "remove"
const addr = process.argv[3];

if (!action || !addr) {
  console.error("Usage: ts-node manageExempt.ts <add|remove> <address>");
  process.exit(1);
}

(async () => {
  try {
    let digest;
    if (action === "add") {
      digest = await multisig.addExempt(addr);
    } else if (action === "remove") {
      digest = await multisig.removeExempt(addr);
    } else {
      throw new Error("Invalid action. Use 'add' or 'remove'.");
    }
    console.log(`✅ ${action} exempt for ${addr}. Tx digest:`, digest);
  } catch (err) {
    console.error("❌ Exempt management failed:", err);
  }
})();
