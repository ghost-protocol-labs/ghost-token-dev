# Ghost Token SDK & Contracts (Sui Move)

Welcome to **Ghost Protocol's GHOST Token SDK** — a fully-featured **Sui Move implementation** of the native GHOST token, treasury, staking, and DAO governance.

---

## Hero Section / Tokenomics

* **Token:** GHOST
* **Decimals:** 9
* **Total Supply:** 20,000,000,000 (fixed)
* **Transfer Fee:** 2.5% per transfer

  * 60% burned
  * 40% sent to treasury
* **Quarterly Burn:** Treasury burn if ≥ 3,000,000 GHOST; caller gets ~1%
* **Admin Controls:** Pause/unpause transfers, withdraw treasury, manage fee exemptions
* **DAO Governance:** Proposals, voting, execution hooks
* **Multi-network Ready:** Devnet, Testnet, Mainnet

---

## Repository Structure

```
ghost-token-sui/
├── Move.toml                  # Package configuration
├── sources/                   # Sui Move contracts
│   ├── ghost_token.move       # GHOST token logic
│   └── ghost_dao.move         # DAO governance logic
├── assets/                    # Token icons
│   └── GHOST.svg
├── metadata.json              # Token metadata for wallets
├── registry/                  # Wallet/registry submission files
│   ├── sui.coin.json
│   └── tokenlist.json
├── scripts/                   # TypeScript CLI scripts
│   ├── transfer.ts
│   ├── quarterlyBurn.ts
│   ├── forceBurn.ts
│   ├── pauseTransfers.ts
│   ├── manageExempt.ts
│   ├── multisigAdmin.ts
│   └── daoVote.ts
├── sdk/                       # SDK for dApps and CLI
│   ├── config.ts              # Typed addresses config
│   ├── ghost.ts               # Token helper functions
│   └── index.ts               # SDK export
├── .github/workflows/         # CI/CD (Move build + release)
│   └── move.yml
├── tsconfig.json
├── package.json
├── README.md                  # THIS FILE
├── LICENSE
└── contract/README.md         # Contract-specific documentation with hero tokenomics
```

---

## Quick Start

1. **Install Dependencies**

```bash
pnpm install
```

2. **Set Environment Variables** (`.env`)

```env
SUI_NETWORK=devnet
SUI_RPC=https://fullnode.devnet.sui.io
PACKAGE_ID=<your_package_id>
TREASURY_ID=<treasury_object_id>
EXEMPT_ID=<exempt_list_id>
ADMIN_CAP_ID=<admin_cap_id>
```

3. **Run CLI Scripts**

```bash
# Transfer GHOST tokens
pnpm run transfer -- <recipient_address> <amount>

# Trigger Quarterly Burn
pnpm run quarterly-burn

# Admin: Pause Transfers
pnpm run pause-transfers -- true

# Manage Fee Exemptions
pnpm run manage-exempt -- add <address>

# DAO: Vote on Proposal
pnpm run dao-vote -- <proposal_id> true
```

4. **Build SDK for NPM**

```bash
pnpm run build
```

---

## Features

* Fully typed **SDK** for easy integration
* Scripts for **token transfers, burns, and admin control**
* **Multisig support** for treasury and admin actions
* **DAO module** with proposals and voting
* CI ensures **Move build success** before release
* Compatible with **Devnet, Testnet, and Mainnet**

---

## Security Notes

* Use multisig for **AdminCap**
* Protect treasury minimums to ensure quarterly burn can function
* Review DAO voting thresholds before mainnet deployment

---

## Links

* **Website:** [https://ghostnetwork.fun](https://ghostnetwork.fun)
* **X (Twitter):** [https://x.com/ghostnetworkdotfun](https://x.com/ghostnetworkdotfun)
* **Telegram:** [https://t.me/ghostprotocol_sol](https://t.me/ghostprotocol_sol)
* **GitHub:** [https://github.com/ghost-protocol-labs/ghost-token-sui](https://github.com/ghost-protocol-labs/ghost-token-sui)

---

## License

MIT License – see LICENSE
