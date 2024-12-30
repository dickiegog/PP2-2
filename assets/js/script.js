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
		if (!gameInProgress) {
			gameInProgress = true;
			gameDisplay.textContent = "Game in Progress...";
			// Additional game start logic from the repository can be added here
		}
	}

	function handleGameReset() {
		initializeGame();
	}

	startButton.addEventListener("click", handleGameStart);
	resetButton.addEventListener("click", handleGameReset);

	initializeGame();
});
