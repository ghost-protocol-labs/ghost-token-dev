# Ghost Token Contract Documentation

This folder contains the **Sui Move contracts** for the GHOST Token and its DAO governance.

---

## Hero Section / Tokenomics

### GHOST Token – Hero Summary

* **Symbol:** GHOST
* **Decimals:** 9
* **Total Supply:** 20,000,000,000 GHOST (fixed)
* **Transfer Fee:** 2.5% per transaction

  * **60% burned immediately**
  * **40% sent to treasury**
* **Quarterly Burn:** Treasury can be burned if ≥ 3,000,000 GHOST, caller receives ~1%
* **Admin Controls:** Pause transfers, withdraw treasury, manage fee exemptions
* **Multi-network Ready:** Devnet, Testnet, Mainnet

---

## Contract Modules

### 1. ghost_token.move

* Implements the **GHOST token**.
* Handles **minting, transfers, fees, treasury, and quarterly burn**.
* Admin functions for **pausing transfers, forcing burns, managing fee-exempt addresses**.

### 2. ghost_dao.move

* Implements **DAO governance**.
* Basic structure for **proposals, voting, and execution hooks**.
* Can be extended to **token-weighted voting, quorum enforcement, and proposal lifecycle**.

---

## Key Structs

| Struct       | Purpose                                                   |
| ------------ | --------------------------------------------------------- |
| `GHOST`      | Token type                                                |
| `Treasury`   | Holds treasury balance, paused state, last burn timestamp |
| `ExemptList` | Mapping of addresses exempt from fees                     |
| `AdminCap`   | Authority for admin functions                             |
| `Proposal`   | DAO proposals                                             |
| `Dao`        | Holds vector of proposals                                 |

---

## Tokenomics Overview

### Transfers

* 2.5% fee on all transfers (unless sender is exempt)

  * 60% burned, reducing supply
  * 40% added to treasury
* Example: Transfer 1,000 GHOST → 25 GHOST fee

  * Burn: 15 GHOST
  * Treasury: 10 GHOST
  * Recipient receives: 975 GHOST

### Quarterly Burn

* Treasury balance must be ≥ 3,000,000 GHOST
* Burns the **entire treasury balance**
* Caller receives ~1% of the treasury

### Admin Controls

* Pause or unpause transfers
* Withdraw treasury
* Force burn treasury
* Add/remove fee-exempt addresses

---

## Deployment Steps

1. **Init Contract:** Deploy `ghost_token.move` and call `init`
2. **Mint Supply:** Full supply sent to deployer/admin
3. **Treasury & Admin Setup:** AdminCap and TreasuryCap created
4. **DAO Deployment:** Deploy `ghost_dao.move` for proposal management
5. **Wallet Integration:** Connect to scripts / SDK for CLI interactions

---

## Hero Graphic / Tokenomics (ASCII Concept)

```
      ________GHOST TOKEN HERO________
     /                                  \
    |  Total Supply: 20B GHOST           |
    |  Transfer Fee: 2.5%                |
    |    -> 60% Burned                   |
    |    -> 40% Treasury                 |
    |  Quarterly Burn: Treasury ≥ 3M     |
    |    -> Caller Reward: 1%            |
    |  Admin: Pause, Withdraw, Force Burn|
     \__________________________________/
```
