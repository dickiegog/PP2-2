"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const holeInfoEl = document.getElementById("hole-info");
const totalParEl = document.getElementById("total-par");
const diceEl = document.querySelector(".dice");
const btnRoll0 = document.getElementById("btn--roll-0");
const btnRoll1 = document.getElementById("btn--roll-1");
const btnNew = document.querySelector(".btn--new");
const btnEnd = document.querySelector(".btn--end");
const btnAuto1 = document.getElementById("btn--auto-1");

// Global variables
let scores,
	currentScores,
	activePlayer,
	playing = false,
	currentPar,
	swings,
	totalPar,
	holeNumber = 1,
	finishedHoles;
let againstComputer = false; // Add a variable to track if playing against a computer

// Add event listeners
btnAuto1.addEventListener("click", function () {
	if (activePlayer === 1 && !finishedHoles[1] && playing) {
		autoPlay(); // Start auto-play for player 2
	}
});
btnRoll0.addEventListener("click", function () {
	if (activePlayer === 0) rollDice();
});
btnRoll1.addEventListener("click", function () {
	if (activePlayer === 1) rollDice();
});
btnNew.addEventListener("click", function () {
	hideInstructionsPopup();
	init(againstComputer);
});

// Add event listeners to choose the opponent and start the game
document
	.getElementById("play-person")
	.addEventListener("click", function () {
		againstComputer = false;
		hideInstructionsPopup();
		init(false);
	});
document
	.getElementById("play-computer")
	.addEventListener("click", function () {
		againstComputer = true;
		hideInstructionsPopup();
		init(true);
	});
btnEnd.addEventListener("click", function () {
	if (playing) {
		// End the game and check for the winner
		checkForWinner();
		playing = false; // Stop the game
	} else {
		alert("The game is not currently active.");
	}
});

// Initialize game
const init = function (isAgainstComputer) {};
const updateUIForOpponent = function () {
	btnRoll1.style.display = againstComputer
		? "none"
		: "inline-block";
	btnAuto1.style.display = againstComputer
		? "inline-block"
		: "none";
};
const hideInstructionsPopup = function () {
	const instructionsPopup = document.getElementById(
		"instructions-popup"
	);
	instructionsPopup.classList.add("hidden");
};

// Show the instructions popup at the start
const showInstructionsPopup = function () {
	const instructionsPopup = document.getElementById(
		"instructions-popup"
	);
	instructionsPopup.classList.remove("hidden");
};
const updateUI = function () {
	document.getElementById(
		`total--0`
	).textContent = `Scorecard: ${scores[0]}`;
	document.getElementById(
		`total--1`
	).textContent = `Scorecard: ${scores[1]}`;
	document.getElementById(
		`current--0`
	).textContent = `Distance to hole: ${currentScores[0]}00 meters`;
	document.getElementById(
		`current--1`
	).textContent = `Distance to hole: ${currentScores[1]}00 meters`;
	document.getElementById(
		`swings--0`
	).textContent = `Shots from tee: ${swings[0]}`;
	document.getElementById(
		`swings--1`
	).textContent = `Shots from tee: ${swings[1]}`;
	holeInfoEl.textContent = `Hole ${holeNumber} - Par ${currentPar}`;
	totalParEl.textContent = `Overall ${totalPar} Par`;
	const parScore0 = scores[0] - totalPar;
	const parScore1 = scores[1] - totalPar;
	document.getElementById(
		`name--0`
	).textContent = `Player 1: ${
		holeNumber === 1
			? ""
			: parScore0 === 0
			? "Par"
			: parScore0 + " Par"
	}`;
	document.getElementById(
		`name--1`
	).textContent = `Player 2: ${
		holeNumber === 1
			? ""
			: parScore1 === 0
			? "Par"
			: parScore1 + " Par"
	}`;
};
// Change the hole number and par
const newHole = function () {
	currentPar = Math.floor(Math.random() * 3) + 3;
	currentScores = [currentPar, currentPar];
	swings = [0, 0];
	finishedHoles = [false, false];
	updateUI();
};
// Roll the dice to determine swing distance
const rollDice = function () {
	if (playing && !finishedHoles[activePlayer]) {
		const roll = Math.trunc(Math.random() * 6) + 1;
		diceEl.src = `assets/images/dice-${roll}.png`;
		diceEl.classList.remove("hidden");
		swings[activePlayer]++;

		if (roll === 1) {
			displayMessage("Sliced left, FORE!!");
		} else if (roll === 6) {
			displayMessage("Sliced right, FORE!!");
		} else if (roll === 2 || roll === 4) {
			displayMessage("Great shot!");
			currentScores[activePlayer] -= 2; // Decrease distance to hole
		} else if (roll === 3 || roll === 5) {
			displayMessage("Bit short");
			currentScores[activePlayer]--; // Decrease distance to hole
		}

		if (currentScores[activePlayer] <= 0) {
			finishedHoles[activePlayer] = true;
			scores[activePlayer] += swings[activePlayer];
			if (currentScores[activePlayer] <= 0) {
				currentScores[activePlayer] = 0;
				displayMessage("IN THE HOLE!");
				setTimeout(() => {
					diceEl.classList.add("hidden"); // Hide the dice after 2 seconds
				}, 1000);
			}
			switchPlayer(); // Switch player without changing the score
		} else {
			updateUI(); // Update UI if the current score changes
		}
	}
};
// Auto-play for player 2
const autoPlay = function () {
	if (activePlayer === 1 && !finishedHoles[1] && playing) {
		const roll = Math.trunc(Math.random() * 6) + 1;
		diceEl.src = `assets/images/dice-${roll}.png`;
		diceEl.classList.remove("hidden");
		swings[activePlayer]++;

		if (roll === 1) {
			displayMessage("Sliced left, FORE!!");
		} else if (roll === 6) {
			displayMessage("Sliced right, FORE!!");
		} else if (roll === 2 || roll === 4) {
			displayMessage("Great shot!");
			currentScores[activePlayer] -= 2; // Decrease distance to hole
		} else if (roll === 3 || roll === 5) {
			displayMessage("Bit short");
			currentScores[activePlayer]--; // Decrease distance to hole
		}

		if (currentScores[activePlayer] <= 0) {
			finishedHoles[activePlayer] = true;
			scores[activePlayer] += swings[activePlayer];
			if (currentScores[activePlayer] <= 0) {
				currentScores[activePlayer] = 0;
				displayMessage("IN THE HOLE!");
				setTimeout(() => {
					diceEl.classList.add("hidden"); // Hide the dice after 2 seconds
				}, 1000);
			}
			updateUI(); // Update UI after adding to the score
			switchPlayer();
		} else {
			updateUI(); // Update UI if the current score changes
		}

		// Check if player 2 has finished the hole, if not, continue auto-play
		if (!finishedHoles[1]) {
			setTimeout(autoPlay, 1000); // Auto-play with a delay
		}
	}
};

btnNew.addEventListener("click", init);
