console.log("Golf Game Initial!");

document.addEventListener("DOMContentLoaded", () => {
	const startButton = document.querySelector(
		"#controls-area button:nth-child(1)"
	);
	const resetButton = document.querySelector(
		"#controls-area button:nth-child(2)"
	);
	const questionArea = document.querySelector(
		"#question-area"
	);
	const scoreArea = document.querySelector("#score-area p");

	let score = 0;

	startButton.addEventListener("click", () => {
		questionArea.textContent =
			"Game started! Answer the question.";
		score += 10;
		scoreArea.textContent = `Score: ${score}`;
	});

	resetButton.addEventListener("click", () => {
		questionArea.textContent = "Question goes here";
		score = 0;
		scoreArea.textContent = `Score: ${score}`;
	});
});
