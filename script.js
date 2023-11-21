const gameBoard = (function () {
  const gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]
  const isCellEmpty = (row, col) => gameboard[row][col] === null
  const markCell = (row, col, mark) =>
    isCellEmpty(row, col) && (gameboard[row][col] = mark)
  return {
    isCellEmpty,
    markCell,
  }
})()

const Player = function (name, mark) {
  this.name = name
  this.mark = mark
}

const gameController = (function () {
  let currentPlayer
  const startGame = (player1, player2) => {
    currentPlayer = player1
  }
})()
