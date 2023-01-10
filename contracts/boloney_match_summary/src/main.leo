// The 'boloney_match_summary' program.
program boloney_match_summary.aleo {
    // Declared as fild but represents the user ID parsed as numerical values
    struct Ranking {
        first: field,
        second: field,
        third: field,
        forth: field,
        fifth: field,
        sixth: field,
        seventh: field,
    }

    record MatchSummary {
        owner: address,
        gates: u64,
        match_id: field,
        ranking: Ranking,
    }

    transition create_match_summary(
        public owner: address, 
        public match_id: field, 
        public ranking: Ranking
        ) -> MatchSummary {
            return MatchSummary {
                owner: owner,
                gates: 0u64,
                match_id: match_id,
                ranking: ranking,
            };
    }
}
