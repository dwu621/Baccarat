/// Scoreboard components
let bankerWinTotal = 0; 
let tieWinTotal = 0;
let playerWinTotal = 0;
let bankerWinsDisplay = document.querySelector("#banker-total-win");
let tieWinDisplay = document.querySelector("#tie-total-win");
let playerWinsDisplay = document.querySelector("#player-total-win");
let resultMessage = document.querySelector("#result-message");

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
let naturalWin = false;
let playerNatural = false;
let bankerNatural = false;
let bothNatural = true;

/// Betting Area
let tieBetInput = document.querySelector(".tie-bet");
let playerBetInput = document.querySelector(".player-bet");
let bankerBetInput = document.querySelector(".banker-bet");
let totalChipDisplay = document.querySelector("#chip-total");

let totalChip = 1000;
let tieBet = 0;
let playerBet = 0;
let bankerBet = 0;
let totalBet = 0;

/// Buttons
let rulesBtn =document.querySelector("#rules");
let shuffleBtn = document.querySelector("#shuffle-cards");
let dealHandBtn = document.querySelector("#deal-hand");
let buyInBtn = document.querySelector("#buy-in");

const newShoe = async () => {
    playerCard1.style.background = ""
    playerCard2.style.background = ""
    playerCard3.style.background = ""
    bankerCard1.style.background = ""
    bankerCard2.style.background = ""
    bankerCard3.style.background = ""
    resultMessage.innerText = "Place your bets!"
    playerMessage.innerText = "PLAYER"
    bankerMessage.innerText = "BANKER"
    playerWinsDisplay.innerText = 0
    tieWinDisplay.innerText = 0
    bankerWinsDisplay.innerText = 0
    playerWinTotal = 0
    tieWinTotal = 0
    bankerWinTotal = 0
    dealHandBtn.disabled = false 
    const response = await axios.get(
        `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=8`
    )
    shoeId = response.data.deck_id
}


const clearTable = () => {
    playerCard1.style.background = ""
    playerCard2.style.background = ""
    playerCard3.style.background = ""
    bankerCard1.style.background = ""
    bankerCard2.style.background = ""
    bankerCard3.style.background = ""
    playerTotalCards = 0
    bankerTotalCards = 0
    playerHand = []
    bankerHand = []
    playerTotal = 0
    bankerTotal = 0
    playerWins = false
    bankerWins = false
    tieWins = false
    playerNatural = false
    bankerNatural = false
    bothNatural = false
    naturalWin = false
    drawFourCards()
}


const drawFourCards = async () => {
    const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${shoeId}/draw/?count=4`
    )
    const fourCards = response.data.cards
    if (response.data.success === false || response.data.remaining < 3) {
        dealHandBtn.disabled = true
        alert("Shuffle Cards")
    } else {
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
     handTotal()
    }
}


const handTotal = () => {
    for (let i = 0; i < playerHand.length; i++) {
        if (playerHand[i] === "KING" || playerHand[i] === "QUEEN" || playerHand[i] === "JACK") {
            playerTotal += 10
        } else if (playerHand[i] === "ACE") {
            playerTotal++
        } else {playerTotal += parseInt(playerHand[i])}
    }
    playerTotal = playerTotal % 10
    
    for (let i = 0; i < bankerHand.length; i++) {
        if (bankerHand[i] === "KING" || bankerHand[i] === "QUEEN" || bankerHand[i] === "JACK") {
            bankerTotal += 10
        } else if (bankerHand[i] === "ACE") {
            bankerTotal++
        } else {bankerTotal += parseInt(bankerHand[i])}
    }
    bankerTotal = bankerTotal % 10;
    checkNatural();
}

const checkNatural = () => {
    if (playerTotal >= 8 || bankerTotal >= 8) {
        if (playerTotal >= 8 && bankerTotal >= 8) {
            bothNatural = true
        } else if (playerTotal >= 8) {
            playerNatural = true
        } else if (bankerTotal >= 8) {
            bankerNatural = true
        }
        naturalWin = true;
        checkWinner()
    } else {
        playerDrawThirdCard()
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
    updateScoreBoard()
}

const playerThirdCardTotal = () => {
    playerTotal = 0;
   
    for (let i = 0; i < playerHand.length; i++) {
        if (playerHand[i] === "KING" || playerHand[i] === "QUEEN" || playerHand[i] === "JACK") {
            playerTotal += 10
        } else if (playerHand[i] === "ACE") {
            playerTotal++
        } else {playerTotal += parseInt(playerHand[i])}
    }
    playerTotal = playerTotal % 10
    

}

const bankerThirdCardTotal = () => {
    bankerTotal = 0;
    for (let i = 0; i < bankerHand.length; i++) {
     if (bankerHand[i] === "KING" || bankerHand[i] === "QUEEN" || bankerHand[i] === "JACK") {
         bankerTotal += 10;
     } else if (bankerHand[i] === "ACE") {
         bankerTotal++
     } else {bankerTotal += parseInt(bankerHand[i])}
    }
    bankerTotal = bankerTotal % 10;
  
    
}  


const playerDrawThird = async () => {
    const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${shoeId}/draw/?count=1`
    )
    playerCard3.style.background = `url("${response.data.cards[0].image}")`
    playerHand.push(response.data.cards[0].value)
    playerTotalCards++
     playerThirdCardTotal()
    bankerDrawThirdCard()
}

const bankerDrawThird = async () => {
    const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${shoeId}/draw/?count=1`
    )
    bankerCard3.style.background = `url("${response.data.cards[0].image}")`
    bankerHand.push(response.data.cards[0].value)
    bankerTotalCards++
    bankerThirdCardTotal()
    checkWinner()
}


const playerDrawThirdCard = () => {
    if (playerTotal <= 5) {
        playerDrawThird()
    } else {
        bankerDrawThirdCard()
    }
}

const bankerDrawThirdCard = () => {
    if (!playerHand[2]) {
        if (bankerTotal <= 5) {
            bankerDrawThird()
        } else {
            checkWinner()
        }
    }
    if (playerHand[2]) {
        if (bankerTotal <= 2) {
            bankerDrawThird()
        } else if (bankerTotal === 3) {
            if (playerHand[2] !== "8") {
            bankerDrawThird()
            } else checkWinner()
        } else if (bankerTotal === 4) {
            if (playerHand[2] === "2" || playerHand[2] === "3" || playerHand[2] === "4" || playerHand[2] === "5" || playerHand[2] === "6" || playerHand[2] === "7") {
                bankerDrawThird()
            } else checkWinner()
        } else if (bankerTotal === 5) {
            if (playerHand[2] === "4" || playerHand[2] === "5" || playerHand[2] === "6" || playerHand[2] === "7") {
                bankerDrawThird()
            } else checkWinner()
        } else if (bankerTotal === 6) {
            if (playerHand[2] === "6" || playerHand[2] === "7") {
                bankerDrawThird()
            } else checkWinner()
        } else if (bankerTotal === 7) {
            checkWinner()
        }
    }
}

const bothNaturalMessage = () => {
    playerMessage.innerText = `PLAYER has Natural ${playerTotal}`
    bankerMessage.innerText = `BANKER has Natural ${bankerTotal}`   
}

const regularMessage = () => {
    playerMessage.innerText = `PLAYER has ${playerTotal}`
    bankerMessage.innerText = `BANKER has ${bankerTotal}`
}

const naturalScoreBoard = () => {
    if (playerWins === true) {
        playerWinTotal++
        playerWinsDisplay.innerText = playerWinTotal
        if (bothNatural) {
            bothNaturalMessage()
        } else {
            playerMessage.innerText = `PLAYER has Natural ${playerTotal}`
            bankerMessage.innerText = `BANKER has ${bankerTotal}`
        }
        resultMessage.innerText = `PLAYER wins with Natural ${playerTotal}!`
    } else if (bankerWins === true) {
        bankerWinTotal++
        bankerWinsDisplay.innerText = bankerWinTotal;
        if (bothNatural) {
            bothNaturalMessage()
        } else {
            bankerMessage.innerText = `BANKER has Natural ${bankerTotal}`
            playerMessage.innerText = `PLAYER has ${playerTotal}`
        }
        resultMessage.innerText = `BANKER wins with Natural ${bankerTotal}!`
    } else if (tieWins === true) {
        tieWinTotal++
        tieWinDisplay.innerText = tieWinTotal;
        bothNaturalMessage()
        resultMessage.innerText = `PLAYER and BANKER have Natural ${playerTotal}. It's a Natural tie!`
    }
    payOut()
}

const regularScoreBoard = () => {
    if (playerWins === true) {
        playerWinTotal++
        playerWinsDisplay.innerText = playerWinTotal
        regularMessage()
        resultMessage.innerText = `PLAYER wins with ${playerTotal} over ${bankerTotal}!`     
    } else if (bankerWins === true) {
        bankerWinTotal++
        bankerWinsDisplay.innerText = bankerWinTotal;
        regularMessage()
        resultMessage.innerText = `BANKER wins with ${bankerTotal} over ${playerTotal}!`
    } else if (tieWins === true) {
        tieWinTotal++
        tieWinDisplay.innerText = tieWinTotal;
        regularMessage()
        resultMessage.innerText = `PLAYER and BANKER have ${playerTotal}. It's a tie!`
    } 
    payOut()
}

const updateScoreBoard = () => {
    if (naturalWin) {
        naturalScoreBoard()
    } else {
        regularScoreBoard()
    }
}

const payOut = () => {
    let commission = (bankerBet * 0.05)
    if (playerWins === true) {
        totalChip += playerBet;
        totalChip -= tieBet;
        totalChip -= bankerBet;
    } else if (bankerWins === true) {
        totalChip += (bankerBet - commission)
        totalChip -= tieBet;
        totalChip -= playerBet;
    } else if (tieWins === true) {
        totalChip += (tieBet * 8);
    }
    totalChipDisplay.innerText = `Total Chips: ${totalChip}`
}

const buyIn = () => {
    totalChip += 1000
    totalChipDisplay.innerText = `Total Chips: ${totalChip}`
}

const dealHand = () => {
    tieBet = parseInt(tieBetInput.value)
    playerBet = parseInt(playerBetInput.value)
    bankerBet = parseInt(bankerBetInput.value)
    totalBet = tieBet + playerBet + bankerBet
    if (totalBet === 0) {
        alert("Please place bets!")
    } else if (totalBet > totalChip) {
        alert("Not enough chips. Please buy in!")
    } else clearTable()
    
}


rulesBtn.addEventListener("click", () => {
    window.open('rules.html', '_blank')
})
shuffleBtn.addEventListener("click", newShoe)
dealHandBtn.addEventListener("click", dealHand)
buyInBtn.addEventListener("click", buyIn)




















