document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.getElementById("start-game");
	const resetButton = document.getElementById("reset-game");
	const gameDisplay =
		document.getElementById("game-display");
	const scoreDisplay =
		document.querySelector("#score-area p");

	let score = 0;

	function updateDisplay(message) {
		gameDisplay.textContent = message;
	}

	function updateScore(newScore) {
		score = newScore;
		scoreDisplay.textContent = `Score: ${score}`;
	}

	startButton.addEventListener("click", () => {
		updateDisplay("Game Started!");
		updateScore(score + 10);
	});

	resetButton.addEventListener("click", () => {
		updateDisplay("Game content will go here");
		updateScore(0);
	});
});
