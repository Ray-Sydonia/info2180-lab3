document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");
    const statusDisplay = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");
    let currentPlayer = "X";
    const gameState = Array(9).fill(null);

    squares.forEach((square, index) => {
        square.classList.add("square");

        square.addEventListener("mouseover", () => {
            square.classList.add("hover");
        });

        square.addEventListener("mouseout", () => {
            square.classList.remove("hover"); 
        });

        square.addEventListener("click", () => {
            if (!gameState[index]) {
                gameState[index] = currentPlayer;
                square.textContent = currentPlayer;
                square.classList.add(currentPlayer);

                if (Winner(currentPlayer)) {
                    statusDisplay.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
                    statusDisplay.classList.add("you-won"); 
                }
                else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
                
            }
        });
    });

    function Winner(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winningCombinations.some(combo => {
            const[a, b, c] = combo;
            return gameState[a] === player && gameState[b] === player && gameState[c] === player;
        }); 
    } 

    newGameButton.addEventListener("click", () => {
        gameState.fill(null);
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O");
            square.classList.remove("hover");
        });

        statusDisplay.textContent = "Move your mouse over a square and click to play an X or an O.";
        statusDisplay.classList.remove("you-won");
        currentPlayer = "X";
    });
});