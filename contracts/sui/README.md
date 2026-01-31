# Ghost Token — Sui Move Contract

**Ghost Protocol** native token `GHOST` built on Sui Move, powering cross-chain DeFi with AI governance.

---

## 🌟 Hero Tokenomics

- **Token Name:** GHOST  
- **Alias:** GHOST_TOKEN  
- **Total Supply:** 20,000,000,000 GHOST  
- **Decimals:** 9  
- **Transfer Fee:** 2.5%  
  - 60% burned immediately  
  - 40% goes to treasury  
- **Quarterly Burn:** Treasury burned permissionlessly if ≥ 3,000,000 GHOST, caller rewarded ~1%  
- **Admin Controls:** Pause/unpause transfers, force burn, manage fee exemptions

---

## 📦 Module Structure

```text
ghost::ghost_token
├── GHOST           # Token struct
├── AdminCap        # Admin authority
├── Treasury        # Holds treasury balance, paused state, last burn timestamp
├── ExemptList      # Table of fee-exempt addresses
├── init()          # Mint total supply, setup treasury, admin, metadata
├── transfer()      # Transfer tokens with fee and burn/treasury split
├── quarterly_burn()# Burns treasury >= 3M GHOST, rewards caller
├── set_paused()    # Pause/unpause transfers
├── withdraw_treasury() # Admin withdraws treasury
├── admin_force_burn()  # Admin burns treasury
├── add_exempt()    # Admin adds address to fee exemption
├── remove_exempt() # Admin removes address from fee exemption
````

---

## 🛠 Constants

| Constant             | Value                 | Description                  |
| -------------------- | --------------------- | ---------------------------- |
| `DECIMALS`           | 9                     | Token decimals               |
| `TOTAL_SUPPLY`       | 20,000,000,000 * 10^9 | Full supply                  |
| `FEE_BPS`            | 250                   | 2.5% transfer fee            |
| `BURN_SPLIT_BPS`     | 6,000                 | 60% of fee burned            |
| `TREASURY_SPLIT_BPS` | 4,000                 | 40% goes to treasury         |
| `MIN_QUARTERLY_BURN` | 3,000,000 * 10^9      | Min treasury to trigger burn |
| `CALLER_REWARD_BPS`  | 100                   | 1% caller reward             |

---

## ⚡ Entry Functions

### `init(ctx: &mut TxContext)`

* Mints **full supply** to deployer
* Sets up treasury, admin cap, and fee-exempt table
* Freezes metadata for trust & immutability
* Metadata includes: Name, Symbol, Description, Website, X, Telegram, Icon URL

### `transfer(coin_in, recipient, treasury, exempt, ctx)`

* Transfers `GHOST` to recipient
* Deducts 2.5% fee by default
* Splits fee 60% burn / 40% treasury
* Exempt addresses skip fees

### `quarterly_burn(treasury, clock, ctx)`

* Burns treasury if `balance >= MIN_QUARTERLY_BURN`
* Rewards caller ~1%
* Updates `last_burn_ms` timestamp

### Admin Functions

| Function                                                     | Description                       |
| ------------------------------------------------------------ | --------------------------------- |
| `set_paused(admin, treasury, paused)`                        | Pause/unpause transfers           |
| `withdraw_treasury(admin, treasury, amount, recipient, ctx)` | Admin withdraws tokens            |
| `admin_force_burn(admin, treasury, ctx)`                     | Admin burns entire treasury       |
| `add_exempt(admin, exempt, addr)`                            | Add address to fee exemption      |
| `remove_exempt(admin, exempt, addr)`                         | Remove address from fee exemption |

---

## 🔗 Key Suiscan Objects

| Alias          | Address      | Suiscan Link                                                                                          |
| -------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| GHOST_TOKEN    | 0x6153…25de  | [View](https://suiscan.xyz/object/0x615326bcb0896338ddefe033771f875a4565f649c8d70395da24318c72ac25de) |
| GHOST_TREASURY | 0x2f78…7188  | [View](https://suiscan.xyz/object/0x2f78d0479d20590f8e63581feadf4f6a5b97e96340336e7c3e38ff115e117188) |
| GHOST_GOV      | 0x0897…36d0  | [View](https://suiscan.xyz/object/0x0897bcfef2ec956c0633ac9050e169976bfcdfb6bf87981acba0cff585ca36d0) |
| GHOST_STAKE    | 0x3ccb…80a8  | [View](https://suiscan.xyz/object/0x3ccbdf9ca5a4731b055604297c42b927f1dd28bc85b9fda56b2097c00a7a80a8) |
| GHOST_TEAM     | 0x94a5…f68bc | [View](https://suiscan.xyz/object/0x94a5681ae72bb4df4df9c5e4428dbd7b0157a1dba9206b7861a8912ac8bf68bc) |

---

## 🌐 Official Links

* Website: [https://ghostnetwork.fun](https://ghostnetwork.fun)
* X (Twitter): [https://x.com/ghostnetworkdotfun](https://x.com/ghostnetworkdotfun)
* Telegram: [https://t.me/ghostprotocol_sol](https://t.me/ghostprotocol_sol)

---

## 🛠 Deployment Notes

1. Use **Devnet** first to test `init()`, transfers, and burns.
2. Deploy with **full supply mint** to deployer.
3. Ensure `AdminCap` is held in **multisig** for production.
4. Treasury burns and exemptions can be monitored on **Suiscan**.
5. Integrate CLI via the `ghost-token-sui` SDK for easy minting, transfer, burn, and DAO interactions.

