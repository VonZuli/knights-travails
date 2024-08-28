import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.getElementById("chessboard");

  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
      const square = document.createElement("div");

      if (i === 0 && j === 0) {
        // Empty top-left corner
        square.classList.add("coordinate");
      } else if (i === 0) {
        square.textContent = j - 1;
        square.classList.add("coordinate");
      } else if (j === 0) {
        square.textContent = i - 1;
        square.classList.add("coordinate");
      } else square.classList.add("square");
      (i + j) % 2 === 0
        ? square.classList.add("light")
        : square.classList.add("dark");

      square.dataset.x = i - 1;
      square.dataset.y = j - 1;

      square.addEventListener("click", () => {
        moveKnight(i - 1, j - 1);
      });

      chessboard.appendChild(square);
    }
  }

  let knightPosition = [0, 0];
  let knightSquare = null;
  updateKnightPosition(knightPosition);

  function updateKnightPosition([x, y]) {
    clearPotentialMoves();
    if (knightSquare) {
      knightSquare.removeEventListener("mouseenter", showPotentialMoves);
      knightSquare.removeEventListener("mouseleave", clearPotentialMoves);
    }
    document.querySelectorAll(".square").forEach((square) => {
      square.classList.remove("knight");
      square.textContent = "";
    });

    knightSquare = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    knightSquare.classList.add("knight");
    knightSquare.textContent = "⚔";

    knightSquare.addEventListener("mouseenter", showPotentialMoves);
    knightSquare.addEventListener("mouseleave", clearPotentialMoves);
  }

  function showPotentialMoves() {
    const x = parseInt(knightSquare.dataset.x);
    const y = parseInt(knightSquare.dataset.y);

    const potentialMoves = getValidKnightMoves(x, y);
    potentialMoves.forEach(([newX, newY]) => {
      const moveSquare = document.querySelector(
        `[data-x="${newX}"][data-y="${newY}"]`
      );
      moveSquare.classList.add("potential-move");
    });
  }

  function clearPotentialMoves() {
    document.querySelectorAll(".potential-move").forEach((square) => {
      square.classList.remove("potential-move");
    });
  }

  function getValidKnightMoves(x, y) {
    const possibleMoves = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ];

    return possibleMoves.filter(([newX, newY]) => {
      return newX >= 0 && newX < 8 && newY >= 0 && newY < 8;
    });
  }

  function moveKnight(x, y) {
    knightPosition = [x, y];
    updateKnightPosition(knightPosition);
  }
});
