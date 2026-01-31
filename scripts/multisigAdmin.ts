import { multisig } from "../sdk";

const action = process.argv[2]; // e.g., "execute"
const params = process.argv.slice(3);

if (!action) {
  console.error("Usage: ts-node multisigAdmin.ts <action> [params...]");
  process.exit(1);
}

(async () => {
  try {
    const digest = await multisig.executeMultisigAction(action, params);
    console.log(`✅ Multisig action "${action}" executed. Tx digest:`, digest);
  } catch (err) {
    console.error("❌ Multisig action failed:", err);
  }
})();
