var beginner = prompt(`Are you a beginner? "y" or "n"`, "y")
if (beginner === "y") {
  var options = { level: "beginner",
    hints: true }
}

var canvas = document.getElementById('game');
var gameContext = canvas.getContext('2d');

var Game = require('./game');
var Board = require('./board');
var board = new Board (gameContext, canvas, options);
var game = new Game (board);
board.game = game;
board.createIcons();
setTimeout ( function () {
  board.createNewBoard();
}, 100);
setTimeout ( function () {
  game.updateStatsBoard();
}, 200);

requestAnimationFrame(function gameLoop() {
  if (game.over === true) {
    board.redrawBoard();
    setTimeout ( function () { alert('games over'); }, 100);
  } else if (board.nextTurn === true) {
    board.nextTurn = false;
    board.redrawBoard();
    setTimeout ( function () { requestAnimationFrame (gameLoop); }, 1000);
  } else {
    requestAnimationFrame(gameLoop);
  }
});
