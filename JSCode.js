// JSCode.js

document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".button");
    let resetBtn = document.querySelector("#reset");
    let winnerDisplay = document.querySelector("#winner-display");
    let darkModeToggle = document.querySelector("#dark-mode-toggle");
    let turnX = true; // Flag to track current player's turn
    let gameOver = false; // Flag to track if the game is over

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    // Initialize/reset the game
    const initializeGame = () => {
        turnX = true;
        gameOver = false;
        boxes.forEach((box) => {
            box.innerText = "";
            box.disabled = false;
        });
        winnerDisplay.innerText = ""; // Clear winner display
        console.log("Game Reset");
    };

    // Check for a winner
    const checkWinner = () => {
        for (let pattern of winPatterns) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;

            if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
                if (pos1 === "X" && pos2 === "X" && pos3 === "X") {
                    displayWinner("Player 1 WINS!!");
                    break;
                } else if (pos1 === "O" && pos2 === "O" && pos3 === "O") {
                    displayWinner("Player 2 WINS!!");
                    break;
                }
            }
        }
    };

    // Check for a draw
    const checkDraw = () => {
        let allFilled = true;
        boxes.forEach((box) => {
            if (box.innerText === "") {
                allFilled = false;
                return;
            }
        });
        if (allFilled && !gameOver) {
            displayWinner("Nobody Won");
        }
    };

    // Display the winner
    const displayWinner = (winnerMessage) => {
        gameOver = true;
        winnerDisplay.innerText = winnerMessage;
        winnerDisplay.style.animation = "glow 1s ease-in-out infinite alternate";
        boxes.forEach((box) => {
            box.disabled = true;
        });
    };

    // Event listener for each box
    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (!gameOver && box.innerText === "") {
                console.log("Box was clicked");
                box.innerText = turnX ? "X" : "O";
                turnX = !turnX; // Toggle turn
                box.disabled = true;
                checkWinner();
                checkDraw();
            }
        });
    });

    // Event listener for reset button
    resetBtn.addEventListener("click", () => {
        initializeGame();
    });

    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        h1.classList.toggle("dark-mode");
        winnerDisplay.classList.toggle("dark-mode");
        boxes.forEach((box) => box.classList.toggle("dark-mode"));
        resetBtn.classList.toggle("dark-mode");
    });
});
