"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const holeInfoEl = document.getElementById("hole-info");
const totalParEl = document.getElementById("total-par");
const diceEl = document.querySelector(".dice");
const btnRoll0 = document.getElementById("btn--roll-0");
const btnRoll1 = document.getElementById("btn--roll-1");
const btnNew = document.getElementById("btn--new");
const btnEnd = document.getElementById("btn--end");
const btnAuto1 = document.getElementById("btn--auto-1");

// Global variables
let scores, currentScores, activePlayer, playing, currentPar, swings, totalPar, holeNumber, finishedHoles;
let againstComputer = false;

// Add event listeners to choose the opponent and start the game
document.getElementById("play-person").addEventListener("click", function () {
	againstComputer = false;
	hideInstructionsPopup();
	init(false);
});
document.getElementById("play-computer").addEventListener("click", function () {
	againstComputer = true;
	hideInstructionsPopup();
	init(true);
});

const init = function (isAgainstComputer) {
	againstComputer = isAgainstComputer;
	scores = [0, 0];
	currentScores = [0, 0];
	swings = [0, 0];
	activePlayer = 0;
	playing = true;
	totalPar = 0;
	holeNumber = 1;
	finishedHoles = [false, false];

	diceEl.classList.add("hidden");
	updateUI();
	newHole();

	btnRoll0.textContent = "Swing";
	btnRoll1.textContent = "Waiting...";
	updateUIForOpponent();
};

btnNew.addEventListener("click", init);