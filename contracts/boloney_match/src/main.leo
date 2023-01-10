program boloney_match.aleo {
    struct Settings {
        player_amount: u8,
        dice_per_player: u8,
        initial_power_up_amount: u8,
        max_power_up_amount: u8,
        heal_power_up_amount: u8,
        stage_number_divisor: u8,
        draw_round_offset: u8,
    }

    struct PowerUpProbabilityList {
        pu_01: u8,
        pu_02: u8,
        pu_03: u8,
        pu_04: u8,
        pu_05: u8,
        pu_06: u8,
        pu_07: u8,
        pu_08: u8,
        pu_09: u8,
    }

    record BoloneyMatch {
        owner: address,
        gates: u64,
        match_id: field,
        settings: Settings,
        power_ups: PowerUpProbabilityList,
    }

    function get_total_probability(power_ups: PowerUpProbabilityList) -> u8 {
        // TODO: use a loop to add
        let total_probability: u8 = power_ups.pu_01 + 
            power_ups.pu_02 +
            power_ups.pu_03 +
            power_ups.pu_04 +
            power_ups.pu_05 +
            power_ups.pu_06 +
            power_ups.pu_07 +
            power_ups.pu_08 +
            power_ups.pu_09;
        return total_probability;
        
    }

    transition create_match(
        public owner: address,
        public match_id: field, 
        public settings: Settings,
        public power_ups: PowerUpProbabilityList
        ) -> BoloneyMatch {
            let total_probability: u8 = get_total_probability(power_ups);
            assert_eq(total_probability, 100u8);
            
            // TODO: replace address with constant
            return BoloneyMatch {
                owner: owner,
                gates: 0u64,
                match_id: match_id,
                settings: settings,
                power_ups: power_ups,
                // available_power_ups: available_power_ups,
                // power_up_probability: power_up_probability,
            };
    }
}
