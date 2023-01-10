program dice.aleo {
    record Dice {
        owner: address,
        gates: u64,
        match_id: field,
        face_amount: u8,
        dice_amount: u32
    }
    
    transition create_dice(owner: address, public match_id: field, dice_amount: u32) -> Dice {
        return Dice {
            owner: owner,
            gates: 0u64,
            match_id: match_id,
            face_amount: 6u8,
            dice_amount: dice_amount
        };
    }

    transition burn_dice(dice: Dice) {
        return;
    }

    transition increment_dice_amount(dice: Dice) -> Dice {
        return Dice {
            owner: dice.owner,
            gates: 0u64,
            match_id: dice.match_id,
            face_amount: dice.face_amount,
            dice_amount: dice.dice_amount + 1u32
        };
    }

    transition decrement_dice_amount(dice: Dice) -> Dice {
        let updated_dice_amount: u32 = dice.dice_amount >= 1u32 ? dice.dice_amount.sub_wrapped(1u32) : 0u32;
        
        return Dice {
            owner: dice.owner,
            gates: 0u64,
            match_id: dice.match_id,
            face_amount: dice.face_amount,
            dice_amount: updated_dice_amount
        };
    }
    
    /* Alternative Dice Implementation with mapping instead of records */
    // On-chain storage of `dice` map,
    // with `address` as the key,
    // and `u8` as the value.
    // mapping dice: address => u8;    
}
