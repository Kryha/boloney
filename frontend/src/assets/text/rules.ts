export const rules = {
  basicRules: "basic rules",
  basicLeadingTitle: "goal",
  basicRulesParagraphs: [
    "Boloney! is a game of dice and bluffing. To win, outsmart your opponents to be the last player left with dice.",
    "Round by round, you’ll need to bluff the most convincingly and place bids that are right on the money. Make a wrong call, get caught bluffing, or get snaked by the countdown, and you’ll lose a precious die.",
    "Boost your moves with power-ups to see who’s bluffing and who’s for real, or trade them in to gain back dice you’ve lost.",
    "Flex those Boloney!-making muscles, because glory awaits!",
  ],

  settingsTitle: "settings",
  settingsParagraphs: [
    "Multiplayer, max. 7 players per match.",
    "Settings are variable per match, and the match creator controls:",
    "1. How many dice there are in the match (min. 1, max. 10)",
    "2. Which power-ups are available per match",
    "3. How many power-ups are available per match (both starting amount and number of power-ups players accumulate during the match)",
    "4. The probability of players receiving each selected power-up during the match",
  ],
  roundRulesTitle: "round & turn rules",
  roundRulesParagraphs: [
    "at the start of the match, players get their allocated dice and power-ups and the player turn order is decided.",
    "to begin each round, players roll their dice and receive power-ups according to the draw round modifier.",
    "players then take turns to call one or more actions against a countdown (using power-ups or healing a die) until a turn-ending action (making a bid, calling Boloney! or calling Exact) happens.",
    "if you run out of time on your turn, you lose a die, your turn ends and the round ends.",
    "you also lose a die if your Boloney! or Exact call is wrong, or if your opponent calls Boloney! on you and they’ve got it right.",
    "match rounds continue until there’s only one player left standing with dice, who’s crowned the winner.",
  ],
  actionsTitle: "actions",
  actionsFirstSubtitle: "1. Power-up",
  actionsFirstParagraphs: [
    "Power-ups boost your turn, letting you gain more information from other players and make smarter calls to increase your odds of winning.",
    "Each power-up affects the match and its players differently. Multiple power-ups can be used per turn, and using a power-up doesn’t end your turn.",
  ],
  seeAvailablePowerUps: "See available power-ups",

  actionsSecondSubtitle: "2. Heal dice",
  actionsSecondParagraphs: [
    "Player chooses X power-ups from their hand to destroy in exchange for 1 die. You can heal dice to gain up to the number of dice you started the match with, and no more.",
    "Healing dice doesn’t end your turn.",
  ],

  actionsThirdSubtitle: "3. Place a bid",
  //TODO: fix bullet points
  actionsFifthParagraph: "For the starting player, there’s no set bid range. Subsequent bids must be either:",
  actionsBulletPoint1: "Greater in face value and equal in number of dice",
  actionsBulletPoint2: "Greater in number of dice and any face value",
  actionsSixthParagraph: "Placing a bid ends your turn.",

  actionsFourthSubtitle: "4. Call Boloney!",
  actionsThirdParagraphs: [
    "Players can only call Boloney! if there’s already a standing bid. Once a player calls Boloney!, all players’ dice are counted to check the validity of the Boloney! call.",
    "If the amount of dice on the table that match the bid’s face value is less than the last player’s bid, then the Boloney! call is correct, and the last bidding player loses a die.",
    "If the amount of dice on the table that match the bid’s face value is equal to or more than the last player’s bid, then the Boloney! call is incorrect, and the player that called Boloney! loses a die.",
  ],
  actionsTenthParagraph: "The round ends either way, and the player that called Boloney! takes the first turn in the next round.",
  //TODO: More bulletpoints
  actionsEleventhParagraph: "A correct Boloney! call:",

  actionsFirstBulletPoints: [
    "Is when the amount of dice on the table that match the bid’s face value is less than the last player’s bid",
    "Means the last bidding player loses a die",
    "Ends the round",
    "Means the player that called Boloney! takes the first turn in the next round",
  ],
  actionsSixteenthParagraph: "An incorrect Boloney! call:",

  actionsSecondBulletPoints: [
    "Is when the amount of dice on the table that match the bid’s face value is equal to or more than the last player’s bid",
    "Means the player that called Boloney! loses a die",
    "Ends the round",
    "Means the last bidding player takes the first turn in the next round",
  ],
  actionsFifthSubtitle: "5. Call Exact!",
  actionsFourthParagraphs: [
    "Once a player calls Exact, all players’ dice are counted to check the validity of the Exact call.",
    "If the amount of dice on the table that match the bid’s face value exactly matches the last player’s bid, then the Exact call is correct and the calling player receives a number of power-ups depending on the number of dice in play and the number of rounds played. If it doesn’t exactly match, the calling player loses a die.",
    "The round ends either way, and the player that called Exact takes the first turn in the next round.",
  ],
  actionsTwentyFourthParagraph: "A correct Exact call:",

  actionsThirdBulletPoints: [
    "Is when the amount of dice on the table that match the bid’s face value exactly matches the last player’s bid",
    "Means the calling player receives a number of power-ups depending on the number of dice in play and the number of rounds played",
    "Ends the round",
    "Means the player that called Exact takes the first turn in the next round",
  ],
  actionsTwentyNinthParagraph: "An incorrect Exact call:",

  actionsFourthBulletPoints: [
    "Is when the amount of dice on the table that match the bid’s face value doesn’t exactly match the last player’s bid",
    "Means the calling player loses a die",
    "Ends the round",
    "Means the last bidding player takes the first turn in the next round",
  ],
  examplesTitle: "example of bids and calls:",

  examplesParagraphs: ["Total 20 dice", "4 x 5 face", "6 x 3 face", "2 x 1 face", "4 x 2 face"],
  examplesSixthParagraph: "4 x 6 face",
  examplesSeventhParagraph: "Bid: 5 x 5 face",
  examplesEighthParagraph: "Boloney! = correct",
  examplesNinthParagraph: "Exact = correct",
  examplesTenthParagraph: "Bid = 3 x 5 face",
  examplesEleventhParagraph: "Boloney! = incorrect",
  examplesTwelfthParagraph: "Exact = incorrect",
  examplesThirteenthParagraph: "Bid = 4 x 5 face",
  examplesFourteenthParagraph: "Boloney! = incorrect",
  examplesFifteenthParagraph: "Exact = correct",

  noteTitle: "remember:",
  noteParagraph:
    "If you want to use a power-up or heal dice during your turn, you need to make those moves before making a bid, calling Boloney! or calling Exact (as these moves will end your turn).",
};
