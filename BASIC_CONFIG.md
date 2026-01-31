# A **Sui (Move) token** for **GHOST**

Below is a **clean, standard Sui coin implementation**.

---

## 📦 Token Details

* **Token name:** GHOST
* **Symbol:** GHOST
* **Decimals:** 9 (Sui standard, can change)
* **Coin type (after publish):**
  `0x<package_id>::ghost::GHOST`

---

## 🧠 Move Coin Module (Sui)

```move
module ghost::ghost {

    use sui::coin;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// Marker struct for the GHOST coin
    struct GHOST has drop {}

    /// Initializes the GHOST coin
    public fun init(ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<GHOST>(
            GHOST {},                 // witness
            9,                         // decimals
            b"GHOST",                  // symbol
            b"GHOST",                  // name
            b"GHOST Token on Sui",     // description
            option::none(),            // icon URL (optional)
            ctx
        );

        // Transfer treasury cap to publisher
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));

        // Freeze metadata so it can’t be changed later (optional but recommended)
        coin::freeze_metadata(metadata);
    }
}
```

---

## 🚀 How to Deploy on Sui

```bash
sui move new ghost
cd ghost
```

Replace the generated module with the code above, then:

```bash
sui move publish
```

After publishing, Sui will output:

* **Package ID**
* **TreasuryCap object ID**
* **Coin type**

Your final coin type will look like:

```
0xPACKAGE_ID::ghost::GHOST
```

---

## 🪙 Minting Tokens (Example)

```bash
sui client call \
  --package 0xPACKAGE_ID \
  --module coin \
  --function mint \
  --type-args 0xPACKAGE_ID::ghost::GHOST \
  --args TREASURY_CAP_ID AMOUNT RECIPIENT_ADDRESS
```

---

## ⚠️ Important Note About the Address You Gave

```
0x615326bcb0896338ddefe033771f875a4565f649c8d70395da24318c72ac25de
```

On **Sui**, this **cannot be the token address itself** like ERC-20.
It *can* be:

* TreasuryCap owner
* Package publisher
* Initial mint recipient

If you want the token **controlled or minted to that address**, tell me 👍

---

## Want Next?

I can:

* Add **mint/burn controls**
* Lock minting forever
* Add **vesting**
* Generate **sui client commands**
* Create a **mainnet-ready** version
* Add **token icon metadata**

Just say the word 👻
