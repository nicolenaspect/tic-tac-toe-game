const gameBoard = (function () {
  const gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const isCellActive = (row, col) => gameboard[row][col] === null;
  const markCell = (row, col, mark) =>
    isCellActive(row, col) && (gameboard[row][col] = mark);
  return {
    isCellActive,
    markCell,
  };
})();

const Player = function (name, mark) {
  this.name = name;
  this.mark = mark;
};

const gameController = (function () {
  let currentPlayer;
  let player1;
  let player2;
  const startGame = (player1, player2) => {
    currentPlayer = player1;
  };
  const switchPlayer = (player1, player2) => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };
  const makeMove = (row, col) => {
    if (gameBoard.isCellActive(row, col)) {
      if (gameBoard.markCell(row, col, currentPlayer.mark)) {
        switchPlayer();
      } else {
        console.log("Invalid move.");
      }
    }
  };
  const checkForWin = () => {
    const checkLine = (a, b, c) => {
      return a !== null && a === b && b === c;
    };
    for (let i = 0; i < 3; i++) {
      if (
        checkLine(
          gameBoard.isCellActive(i, 0),
          gameBoard.isCellActive(i, 1),
          gameBoard.isCellActive(i, 2)
        ) ||
        checkLine(
          gameBoard.isCellActive(0, i),
          gameBoard.isCellActive(1, i),
          gameBoard.isCellActive(2, i)
        )
      ) {
        console.log(`Player ${currentPlayer.name} wins!`);
        return true;
      }
    }

    if (
      checkLine(
        gameBoard.isCellActive(0, 0),
        gameBoard.isCellActive(1, 1),
        gameBoard.isCellActive(2, 2)
      ) ||
      checkLine(
        gameBoard.isCellActive(0, 2),
        gameBoard.isCellActive(1, 1),
        gameBoard.isCellActive(2, 0)
      )
    ) {
      console.log(`Player ${currentPlayer.name} wins!`);

      return true;
    }

    return false;
  };
  const getCurrentPlayer = () => currentPlayer;
  return {
    startGame,
    makeMove,
    checkForWin,
    getCurrentPlayer,
  };
})();

function logResult(description, expectedResult, actualResult) {
  console.log(
    `${description}: ${expectedResult === actualResult ? "Pass" : "Fail"}`
  );
}

// Test game sequence
const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");

gameController.startGame(player1, player2);
logResult(
  "getCurrentPlayer after startGame",
  player1,
  gameController.getCurrentPlayer()
);

// Simulate a game with moves
gameController.makeMove(0, 0);
gameController.makeMove(1, 1);
gameController.makeMove(0, 1);
gameController.makeMove(1, 0);
gameController.makeMove(0, 2);

// Add more moves or actions as needed

// Check for win at the end
logResult("checkForWin at the end", true, gameController.checkForWin());
