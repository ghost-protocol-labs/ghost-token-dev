module ghost::ghost_token {

    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::clock::{Self, Clock};
    use sui::option;
    use sui::tx_context;

    /// =====================
    /// CONSTANTS
    /// =====================
    const DECIMALS: u8 = 9;
    const TOTAL_SUPPLY: u64 = 20_000_000_000_000_000_000; // 20B * 10^9

    const FEE_BPS: u64 = 250;        // 2.5%
    const BPS_DENOM: u64 = 10_000;

    const BURN_SPLIT_BPS: u64 = 6_000;      // 60%
    const TREASURY_SPLIT_BPS: u64 = 4_000;  // 40%

    const MIN_QUARTERLY_BURN: u64 = 3_000_000_000_000_000; // 3M * 10^9
    const CALLER_REWARD_BPS: u64 = 100; // ~1%

    /// =====================
    /// TOKEN TYPE
    /// =====================
    struct GHOST has drop {}

    /// =====================
    /// ADMIN CAP
    /// =====================
    struct AdminCap has key {}

    /// =====================
    /// TREASURY
    /// =====================
    struct Treasury has key {
        balance: Coin<GHOST>,
        paused: bool,
        last_burn_ms: u64,
    }

    /// =====================
    /// FEE EXEMPT LIST
    /// =====================
    struct ExemptList has key {
        list: Table<address, bool>,
    }

    /// =====================
    /// INIT / MINT FULL SUPPLY
    /// =====================
    public entry fun init(ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<GHOST>(
            GHOST {},
            DECIMALS,
            b"GHOST",
            b"GHOST",
            b"GHOST Token is the native asset of Ghost Protocol — cross-chain DeFi with AI governance.\n\nWebsite: https://ghostnetwork.fun\nX: https://x.com/ghostnetworkdotfun\nTelegram: https://t.me/ghostprotocol_sol",
            option::some(
                b"https://raw.githubusercontent.com/ghost-protocol-labs/ghost-token-sui/refs/heads/main/assets/GHOST.svg"
            ),
            ctx
        );

        // Freeze metadata
        coin::freeze_metadata(metadata);

        // Mint full supply to deployer
        let supply = coin::mint<GHOST>(TOTAL_SUPPLY, &mut treasury_cap, ctx);

        let treasury = Treasury {
            balance: coin::zero<GHOST>(ctx),
            paused: false,
            last_burn_ms: 0,
        };

        let exempt = ExemptList {
            list: table::new(ctx),
        };

        let admin = AdminCap {};

        // Transfer objects to deployer
        transfer::public_transfer(supply, tx_context::sender(ctx));
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx));
        transfer::public_transfer(admin, tx_context::sender(ctx));

        // Share system objects for global access
        transfer::share_object(treasury);
        transfer::share_object(exempt);
    }

    /// =====================
    /// INTERNAL HELPERS
    /// =====================
    fun is_exempt(exempt: &ExemptList, addr: address): bool {
        table::contains(&exempt.list, addr)
    }

    /// =====================
    /// TRANSFER WITH FEE
    /// =====================
    public entry fun transfer(
        coin_in: Coin<GHOST>,
        recipient: address,
        treasury: &mut Treasury,
        exempt: &ExemptList,
        ctx: &mut TxContext
    ) {
        assert!(!treasury.paused, 0);

        let sender = tx_context::sender(ctx);

        if (is_exempt(exempt, sender)) {
            transfer::public_transfer(coin_in, recipient);
            return;
        };

        let amount = coin::value(&coin_in);
        let fee = amount * FEE_BPS / BPS_DENOM;

        let burn_amt = fee * BURN_SPLIT_BPS / BPS_DENOM;
        let treasury_amt = fee - burn_amt;

        let (fee_coin, remaining) = coin::split(coin_in, fee);
        let (burn_coin, treasury_coin) = coin::split(fee_coin, burn_amt);

        coin::burn(burn_coin);
        treasury.balance = coin::join(treasury.balance, treasury_coin);

        transfer::public_transfer(remaining, recipient);
    }

    /// =====================
    /// QUARTERLY BURN
    /// =====================
    public entry fun quarterly_burn(
        treasury: &mut Treasury,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let bal = coin::value(&treasury.balance);
        assert!(bal >= MIN_QUARTERLY_BURN, 1);

        let reward = bal * CALLER_REWARD_BPS / BPS_DENOM;
        let (reward_coin, burn_coin) = coin::split(treasury.balance, reward);

        coin::burn(burn_coin);
        treasury.balance = coin::zero<GHOST>(ctx);
        treasury.last_burn_ms = clock::now_ms(clock);

        transfer::public_transfer(reward_coin, tx_context::sender(ctx));
    }

    /// =====================
    /// ADMIN FUNCTIONS
    /// =====================
    public entry fun set_paused(
        _: &AdminCap,
        treasury: &mut Treasury,
        paused: bool
    ) {
        treasury.paused = paused;
    }

    public entry fun withdraw_treasury(
        _: &AdminCap,
        treasury: &mut Treasury,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let (out, remaining) = coin::split(treasury.balance, amount);
        treasury.balance = remaining;
        transfer::public_transfer(out, recipient);
    }

    public entry fun admin_force_burn(
        _: &AdminCap,
        treasury: &mut Treasury,
        ctx: &mut TxContext
    ) {
        coin::burn(treasury.balance);
        treasury.balance = coin::zero<GHOST>(ctx);
    }

    public entry fun add_exempt(
        _: &AdminCap,
        exempt: &mut ExemptList,
        addr: address
    ) {
        table::add(&mut exempt.list, addr, true);
    }

    public entry fun remove_exempt(
        _: &AdminCap,
        exempt: &mut ExemptList,
        addr: address
    ) {
        table::remove(&mut exempt.list, addr);
    }
}
