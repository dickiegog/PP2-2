"use strict";

// Selecting elements
const player0El = document.getElementById("player-0");
const player1El = document.getElementById("player-1");
const holeInfoEl = document.getElementById("hole-info");
const btnRoll = document.getElementById("btn-roll");
const btnNew = document.getElementById("btn-new");

// Global variables
let scores, activePlayer, currentHole, playing;

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.getElementById("start-game");
	const resetButton = document.getElementById("reset-game");
	const gameDisplay =
		document.getElementById("game-display");
	const scoreDisplay =
		document.querySelector("#score-area p");

	let score = 0;
	let gameInProgress = false;

	function initializeGame() {
		score = 0;
		gameInProgress = false;
		scoreDisplay.textContent = `Score: ${score}`;
		gameDisplay.textContent =
			"Welcome to Golf Game! Click Start to play.";
	}

	function handleGameStart() {
		gameInProgress = true;
		gameDisplay.textContent = "Game in Progress...";
	}
	function updateGameState(action) {
		if (!gameInProgress) return;

		if (action === "correct") {
			score += 10;
			gameDisplay.textContent = "Good shot!";
		} else {
			gameDisplay.textContent = "Try again!";
		}

		scoreDisplay.textContent = `Score: ${score}`;

		if (score >= 100) {
			gameInProgress = false;
			gameDisplay.textContent =
				"Congratulations! You finished the game.";
		}
	}
	const controlsArea =
		document.getElementById("controls-area");

	function handleUserAction(event) {
		if (!gameInProgress) return;

		const action = event.target.dataset.action;
		if (action) {
			updateGameState(action);
		}
	}

	controlsArea.addEventListener("click", handleUserAction);

	function handleGameReset() {
		initializeGame();
	}

	startButton.addEventListener("click", handleGameStart);
	resetButton.addEventListener("click", handleGameReset);

	initializeGame();
});
