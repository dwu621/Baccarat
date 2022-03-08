/// Scoreboard components
let bankerWinTotal = 0; 
let tieWinTotal = 0;
let playerWinTotal = 0;
let bankerWinsDisplay = document.querySelector("#banker-total-win");
let tieWinsDisplay = document.querySelector("#tie-total-win");
let playerWinsDisplay = document.querySelector("#player-total-win");


/// Game Table 
let shoeId = null;   
let playerCard1 = document.querySelector("#player-card-1");
let playerCard2 = document.querySelector("#player-card-2");
let playerCard3 = document.querySelector("#player-card-3");
let bankerCard1 = document.querySelector("#banker-card-1");
let bankerCard2 = document.querySelector("#banker-card-2");
let bankerCard3 = document.querySelector("#banker-card-3");

/// Game Flow
let playerTotalCards = 0;
let bankerTotalCards = 0;
let playerHand = [];
let bankerHand = [];
let playerTotal = null;
let bankerTotal = null;
let playerWins = false;
let bankerWins = false;
let tieWins = false;

/// Betting Area
let tieBetInput = document.querySelector("#tie-bet")
let playerBetInput = document.querySelector("#player-bet")
let bankerBetInput = document.querySelector("#banker-bet")
let totalChipDisplay = document.querySelector("#chip-total")

let totalChip = 1000
let tieBet = 0;
let playerBet = 0;
let bankerBet = 0;

/// Buttons
let rulesBtn =document.querySelector("#rules")
let shuffleBtn = document.querySelector("#shuffle-cards")
let dealHandBtn = document.querySelector("#deal-hand")



















