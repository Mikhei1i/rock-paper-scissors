let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    ties: 0,
  };

  updateScoreElement();

  let autoPlayActive = false
  let intervalID;

  function autoPlay() {
    if (!autoPlayActive) {
      intervalID = setInterval(function() {
        playerMove = pickComputerMove()
        playGame(playerMove)
      }, 1000)

      document.querySelector('.js-auto').innerHTML = 'Stop Play'

      autoPlayActive = true
    } else {
      clearInterval(intervalID);
      
      document.querySelector('.js-auto').innerHTML = 'Auto Play'
      autoPlayActive = false
    }

  }

  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";

    if (playerMove === "scissors") {
      if (computerMove === "rock") {
        result = "You lose.";
      } else if (computerMove === "paper") {
        result = "You win.";
      } else if (computerMove === "scissors") {
        result = "Tie.";
      }
    } else if (playerMove === "paper") {
      if (computerMove === "rock") {
        result = "You win.";
      } else if (computerMove === "paper") {
        result = "Tie.";
      } else if (computerMove === "scissors") {
        result = "You lose.";
      }
    } else if (playerMove === "rock") {
      if (computerMove === "rock") {
        result = "Tie.";
      } else if (computerMove === "paper") {
        result = "You lose.";
      } else if (computerMove === "scissors") {
        result = "You win.";
      }
    }

    if (result === "You win.") {
      score.wins += 1;
    } else if (result === "You lose.") {
      score.loses += 1;
    } else if (result === "Tie.") {
      score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElement();
    showResult();
    showMoves();

    function showResult() {
      document.querySelector(".js-result").innerHTML = `${result}`;
    }

    function showMoves() {
      document.querySelector(".js-moves").innerHTML = `You 
  <img src="images/${playerMove}-emoji.png" alt="" class="move-icon" />
  <div class='line'></div>
  <img src="images/${computerMove}-emoji.png" alt="" class="move-icon" />
  computer`;
    }
  }

  function updateScoreElement() {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins: ${score.wins}, Loesses: ${score.loses}, Ties: ${score.ties}.`;
  }

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = "paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = "scissors";
    }

    return computerMove;
  }

document.addEventListener('keydown', (event) => {
  console.log(event.key)
  if (event.key === 'r') {
    playGame('rock')
  } else if (event.key === 'R') {
    playGame('rock')
  }
})