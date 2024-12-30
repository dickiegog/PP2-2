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

// Initialize game
const init = function (isAgainstComputer) {
	againstComputer = isAgainstComputer; // Update the againstComputer variable
	scores = [0, 0];
	currentScores = [0, 0];
	swings = [0, 0];
	activePlayer = 0;
	playing = true;
	totalPar = 0; // Initialize overall par to 0
	finishedHoles = [false, false];

	diceEl.classList.add("hidden");
	updateUI();
	newHole();
	// Display instructions popup before starting the game
	const instructionsPopup = document.getElementById(
		"instructions-popup"
	);
	instructionsPopup.classList.remove("hidden");

	// Reset the button text for both players
	btnRoll0.textContent = "Swing";
	btnRoll1.textContent = "Waiting...";
	hideInstructionsPopup();
	// Hide the "Auto" button for player 2 if not playing against the computer
	updateUIForOpponent();
};

// Show the instructions popup at the start
const showInstructionsPopup = function () {
	const instructionsPopup = document.getElementById(
		"instructions-popup"
	);
	instructionsPopup.classList.remove("hidden");
};
const hideInstructionsPopup = function () {
	const instructionsPopup = document.getElementById(
		"instructions-popup"
	);
	instructionsPopup.classList.add("hidden");
};
btnNew.addEventListener("click", init);
