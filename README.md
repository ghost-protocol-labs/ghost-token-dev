# GHOST Token CLI (TypeScript)

TypeScript CLI tools for deploying, interacting with, and managing the **GHOST Token** on the **Sui blockchain**.

Native token for **Ghost Protocol** — cross-chain DeFi with AI governance.

---

## ⚡ Features

- **Transfer with fee**: 2.5% (60% burned, 40% to treasury)  
- **Exempt addresses**: Skip transfer fees  
- **Quarterly burn**: Permissionless, treasury must be ≥ 3,000,000 GHOST, caller gets ~1% reward  
- **Admin actions**: Force burn, withdraw treasury, pause transfers, manage exemptions  
- **Multi-network support**: Devnet, Testnet, Mainnet  
- **TypeScript & Node 25+ ready**

---

## 🪙 Token Details

| Attribute               | Value                                |
|-------------------------|--------------------------------------|
| Symbol                  | GHOST                                |
| Decimals                | 9                                     |
| Total Supply            | 20,000,000,000 GHOST                 |
| Transfer Fee            | 2.5% (sender pays)                   |
| Fee Allocation          | 60% burned / 40% treasury            |
| Treasury Quarterly Burn | ≥ 3,000,000 GHOST minimum            |
| Admin Controls          | Pause, withdraw, force burn, manage exemptions |

---

## 🛠️ CLI Setup

1. **Install dependencies**

```bash
npm install
````

2. **Build TypeScript**

```bash
npm run build
```

3. **Configure networks** (`scripts/config/devnet.js`, `testnet.js`, `mainnet.js`)

```ts
module.exports = {
  PKG: "<PACKAGE_ID>",
  TREASURY: "<TREASURY_OBJECT_ID>",
  FEE_CONFIG: "<FEE_CONFIG_OBJECT_ID>",
  EXEMPT_LIST: "<EXEMPT_LIST_OBJECT_ID>",
  TREASURY_CAP: "<TREASURY_CAP_OBJECT_ID>",
  ADMIN_CAP: "<ADMIN_CAP_OBJECT_ID>",
  SENDER: "<YOUR_WALLET_ADDRESS>"
};
```

---

## 🚀 Usage

### Transfer Tokens

```bash
npm run transfer -- <network> <coin_id> <recipient>
```

### Fee-Exempt Transfer

```bash
npm run transfer:no-fee -- <network> <coin_id> <recipient>
```

### Quarterly Burn (≥ 3,000,000 GHOST)

```bash
npm run quarterly-burn -- <network>
```

---

## ⚙️ Admin Functions

### Force Burn Treasury

```bash
npm run force-burn -- <network>
```

### Withdraw Treasury

```bash
npm run withdraw-treasury -- <network> <amount> <recipient>
```

### Pause / Unpause Transfers

```bash
npm run pause-transfers -- <network> <true|false>
```

### Manage Fee-Exempt Addresses

```bash
npm run add-exempt -- <network> <address>
npm run remove-exempt -- <network> <address>
```

---

## 📦 Build & Deploy

```bash
# Build TypeScript CLI
npm run build

# Deploy contract
npm run deploy:devnet
npm run deploy:testnet
npm run deploy:mainnet
```

---

## 🔒 Security Notes

* Protect **AdminCap** and **TreasuryCap**
* Use **multisig wallets** for production
* Ensure treasury minimums for quarterly burn

---


## 📎 Links

* Token Icon: `assets/GHOST.svg`
* Solana Program: **GhostFaucet** (Devnet)
* Sui Module: **GhostFaucet** (Devnet)
* Documentation: Coming soon

---

© 2026 Ghost Protocol
