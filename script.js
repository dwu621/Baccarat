/// Scoreboard components
let bankerWinTotal = 0; 
let tieWinTotal = 0;
let playerWinTotal = 0;
let bankerWinsDisplay = document.querySelector("#banker-total-win");
let tieWinsDisplay = document.querySelector("#tie-total-win");
let playerWinsDisplay = document.querySelector("#player-total-win");

/// Game Table 
let playerMessage = document.querySelector(".player-head");
let bankerMessage = document.querySelector(".banker-head");
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
let playerTotal = 0;
let bankerTotal = 0;
let playerWins = false;
let bankerWins = false;
let tieWins = false;

/// Betting Area
let tieBetInput = document.querySelector("#tie-bet");
let playerBetInput = document.querySelector("#player-bet");
let bankerBetInput = document.querySelector("#banker-bet");
let totalChipDisplay = document.querySelector("#chip-total");

let totalChip = 1000;
let tieBet = 0;
let playerBet = 0;
let bankerBet = 0;

/// Buttons
let rulesBtn =document.querySelector("#rules");
let shuffleBtn = document.querySelector("#shuffle-cards");
let dealHandBtn = document.querySelector("#deal-hand")

const newShoe = async () => {
    dealHandBtn.disabled = false; 
    const response = await axios.get(
        `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`
    )
    shoeId = response.data.deck_id
    console.log(shoeId)
}



const clearTable = () => {
    playerCard1.style.background = "";
    playerCard2.style.background = "";
    playerCard3.style.background = "";
    bankerCard1.style.background = "";
    bankerCard2.style.background = "";
    bankerCard3.style.background = "";
    playerTotalCards = 0;
    bankerTotalCards = 0;
    playerHand = [];
    bankerHand = [];
    playerTotal = 0;
    bankerTotal = 0;
    playerWins = false;
    bankerWins = false;
    tieWins = false;
    playerMessage.innerText = "Player";
    bankerMessage.innerText = "Banker";
    drawFourCard();
}

const drawFourCard = async () => {
    const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${shoeId}/draw/?count=4`
    )
    console.log(response)
    const fourCards = response.data.cards
    console.log(fourCards)
    playerCard1.style.background = `url("${fourCards[0].image}")`
    playerHand.push(fourCards[0].value)
    playerTotalCards++

    bankerCard1.style.background = `url("${fourCards[1].image}")`
    bankerHand.push(fourCards[1].value)
    bankerTotalCards++

    playerCard2.style.background = `url("${fourCards[2].image}")`
    playerHand.push(fourCards[2].value)
    playerTotalCards++
    
    bankerCard2.style.background = `url("${fourCards[3].image}")`
    bankerHand.push(fourCards[3].value)
    bankerTotalCards++
    

    console.log(playerHand)
    console.log(playerTotalCards)
    console.log(bankerHand)
    console.log(bankerTotalCards)
    handTotal();
}

const handTotal = () => {
    for (let i = 0; i < playerHand.length; i++) {
        if (playerHand[i] === "KING" || playerHand[i] === "QUEEN" || playerHand[i] === "JACK") {
            playerTotal += 10;
        } else if (playerHand[i] === "ACE") {
            playerTotal++
        } else {playerTotal += parseInt(playerHand[i])}
    }

    playerTotal = playerTotal % 10;
    console.log(playerTotal)
    
    for (let i = 0; i < bankerHand.length; i++) {
        if (bankerHand[i] === "KING" || bankerHand[i] === "QUEEN" || bankerHand[i] === "JACK") {
            bankerTotal += 10;
        } else if (bankerHand[i] === "ACE") {
            bankerTotal++
        } else {bankerTotal += parseInt(bankerHand[i])}
    }
    bankerTotal = bankerTotal % 10;
    console.log(bankerTotal)
    checkNatural();
}


const checkNatural = () => {
    if (playerTotal >= 8 || bankerTotal >= 8) {
        checkWinner()
    } else {
        console.log('drawthirdcard')
    }
}

const checkWinner = () => {
    if (playerTotal > bankerTotal) {
        playerWins = true;
    } else if (bankerTotal > playerTotal) {
        bankerWins = true;
    } else if (playerTotal === bankerTotal) {
        tieWins = true;
    }
}







const dealHand = () => {
    clearTable();
}


shuffleBtn.addEventListener("click", newShoe)
dealHandBtn.addEventListener("click", dealHand)

























