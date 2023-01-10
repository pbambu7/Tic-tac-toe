//gameboard
//marker
//track players (who's turn it is)
//track moves (where they go)
//win check
//scoreboard

var markers = ["X", "O"];
var players = [];
var playerTurn = 0;
var totals = [];
var winCodes = [7, 56, 73, 84, 146, 273, 292, 448];
var gameOver;
var activePlayer;

function addPlayers() {
  players[0] = prompt("Enter First Player's Name: ");
  if (players[0] === "" || players[0] === null) {
    players[0] = "Player One";
  }
  players[1] = prompt("Enter First Player's Name: ");
  if (players[1] === "" || players[1] === null) {
    players[1] = "Player Two";
  }
  restartGame();
}

function startGame() {
  var counter = 1;
  var innerDivs = "";
  totals = [0, 0];
  gameOver = false;
  var board = document.getElementById("game-board");

  for (i = 1; i <= 3; i++) {
    innerDivs += '<div id="row-' + i + '">';

    for (j = 1; j <= 3; j++) {
      innerDivs += '<div onclick="playGame(this,' + counter + ');"></div>';
      counter *= 2;
    }
    innerDivs += "</div>";
  }
  board.innerHTML = innerDivs;

  document.getElementById("game-message").innerText =
    "It's " + players[playerTurn] + "'s turn!!";
}

function restartGame() {
  document.getElementById("new-game").style.display = "none";
  document.getElementById("keep-battling").style.display = "none";
  document.getElementById("new-players").style.display = "none";
  document.getElementById("score-cat").innerText = 0;
  document.getElementById("score1").innerText = 0;
  document.getElementById("score2").innerText = 0;
  updatePlayers();
  startGame();
}

function playGame(clicked, divValue) {
  if (!gameOver) {
    //Add X or O to playing field
    clicked.innerText = markers[playerTurn];

    //Increment player totals for win
    totals[playerTurn] += divValue;
    console.log("one: " + totals[0]);
    console.log("two: " + totals[1]);

    //call isWin() function
    if (isWin()) {
      document.getElementById("game-message").innerText =
        players[playerTurn] + " wins!!";
      updateScores(playerTurn);
      document.getElementById("new-game").style.display = "block";
      document.getElementById("keep-battling").style.display = "block";
      document.getElementById("new-players").style.display = "block";
    } else if (gameOver) {
      document.getElementById("game-message").innerText =
        "Oh, snap!! Looks like a Cat's Game!!";
      updateScores(-1);
      document.getElementById("new-game").style.display = "block";
      document.getElementById("keep-battling").style.display = "block";
      document.getElementById("new-players").style.display = "block";
    } else {
      //Switch player turn
      if (playerTurn) playerTurn = 0;
      else playerTurn = 1;

      //Prevent more than one click
      clicked.onclick = "";

      document.getElementById("game-message").innerText =
        "It's " + players[playerTurn] + "'s turn!!";
    }
  }
}

function isWin() {
  for (i = 0; i < winCodes.length; i++) {
    if ((totals[playerTurn] & winCodes[i]) == winCodes[i]) {
      gameOver = true;
      return true;
    }
  }
  if (totals[0] + totals[1] == 511) {
    gameOver = true;
  }
}

function updateScores(player) {
  activePlayer = player + 1;
  try {
    if (player === -1) {
      document.getElementById("score-cat").innerText++;
    } else {
      document.getElementById("score" + activePlayer).innerText++;
    }
  } catch (err) {}
}

function updatePlayers() {
  try {
    document.getElementById("name-1").innerText = players[0];
    document.getElementById("name-2").innerText = players[1];
  } catch (err) {}
}