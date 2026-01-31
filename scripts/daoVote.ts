import { dao } from "../sdk";

const command = process.argv[2]; // "propose" | "vote" | "execute"
const args = process.argv.slice(3);

if (!command) {
  console.error("Usage: ts-node daoVote.ts <propose|vote|execute> [args...]");
  process.exit(1);
}

(async () => {
  try {
    let digest;
    switch (command) {
      case "propose":
        digest = await dao.daoPropose(args);
        break;
      case "vote":
        digest = await dao.daoVote(args);
        break;
      case "execute":
        digest = await dao.daoExecute(args);
        break;
      default:
        throw new Error("Invalid DAO command: propose | vote | execute");
    }
    console.log(`✅ DAO ${command} executed. Tx digest:`, digest);
  } catch (err) {
    console.error("❌ DAO action failed:", err);
  }
})();
