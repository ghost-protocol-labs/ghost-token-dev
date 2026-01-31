<p align="center">
  <img src="https://raw.githubusercontent.com/ghost-protocol-labs/ghost-token-sui/refs/heads/main/assets/GHOST.svg" width="150" alt="GHOST Token"/>
</p>

<h1 align="center">Ghost Token Sui SDK</h1>

<p align="center">
  Native token of <strong>Ghost Protocol</strong> — cross-chain DeFi with AI governance
</p>

---

## Tokenomics

| Feature                 | Details |
|-------------------------|---------|
| Token Name              | GHOST |
| Symbol                  | GHOST |
| Total Supply            | 20,000,000,000 |
| Decimals                | 9 |
| Transfer Fee            | 2.5% (sender pays) |
| Fee Split               | 60% burned, 40% treasury |
| Quarterly Burn Threshold| ≥ 3,000,000 GHOST |
| Admin Functions         | Pause/unpause, withdraw treasury, force burn, manage fee exemptions |

---

## Suiscan Links

| Object         | Link |
|----------------|------|
| GHOST Token    | [View](https://suiexplorer.com/object/0x615326bcb0896338ddefe033771f875a4565f649c8d70395da24318c72ac25de) |
| Treasury       | [View](https://suiexplorer.com/object/0x2f78d0479d20590f8e63581feadf4f6a5b97e96340336e7c3e38ff115e117188) |
| DAO            | [View](https://suiexplorer.com/object/0x0897bcfef2ec956c0633ac9050e169976bfcdfb6bf87981acba0cff585ca36d0) |
| Stake          | [View](https://suiexplorer.com/object/0x3ccbdf9ca5a4731b055604297c42b927f1dd28bc85b9fda56b2097c00a7a80a8) |
| Multisig Admin | [View](https://suiexplorer.com/object/0x94a5681ae72bb4df4df9c5e4428dbd7b0157a1dba9206b7861a8912ac8bf68bc) |

---

## CLI Commands

```bash
npm run mint
npm run transfer -- <recipient> <amount>
npm run quarterly-burn
npm run force-burn
npm run pause-transfers -- <true|false>
npm run add-exempt -- <address>
npm run remove-exempt -- <address>
npm run multisig-admin -- <action> [params...]
npm run dao-propose -- <args...>
npm run dao-vote -- <args...>
npm run dao-execute -- <args...>
````

---

## Installation

```bash
npm install ghost-token-sui
```

Set up `.env`:

```env
SUI_NETWORK=devnet
SUI_PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```

---

## SDK Usage

```ts
import { ghost, transfer, treasury, multisig, dao, suiscan } from "ghost-token-sui";

// Mint full supply (deployer)
await ghost.executeMint();

// Transfer tokens
await transfer.transferTokens("0xRecipient", 1000000000n);

// Burn treasury quarterly
await treasury.quarterlyBurnTreasury();

// Pause transfers (admin)
await multisig.setTransfersPaused(true);

// Add exempt address
await multisig.addExempt("0xExemptAddress");

// DAO propose
await dao.daoPropose(["Proposal description"]);
```

---

## Official Links

* Website: [ghostnetwork.fun](https://ghostnetwork.fun)
* X (Twitter): [@ghostnetworkdotfun](https://x.com/ghostnetworkdotfun)
* Telegram: [Ghost Protocol](https://t.me/ghostprotocol_sol)

---

## License

MIT