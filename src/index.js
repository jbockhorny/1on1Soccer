window.onload = function () {
  setInterval(playIt, 1000 / 30);
}

let playerPosition1 = playPosition2 = 40;
let ballPositionX = ballPositionY = 10;
let speedBallPositionX = speedBallPositionY = 7;
let playerScore1 = playerScore2 = 0;
const canvas = document.getElementById("canvas");
const canvasArea = canvas.getContext("2d");
const canvasWidth = 600;
const canvasHeight = 500;
const midfield = 5;
const ballDiameter = 10;
const goalpostWidth = 5;
const goalpostHeight = 100;
const effectGoalpost = 0.3;
let playerSpeed2 = 2;

canvas.addEventListener('mousemove', function (e) {
  playerPosition1 = e.clientY - goalpostHeight / 2;
});

function playIt() {

  canvasArea.fillStyle = "#286047";
  canvasArea.fillRect(0, 0, canvasWidth, canvasHeight);
  canvasArea.fillStyle = "#ffffff";
  canvasArea.fillRect(canvasWidth / 2 - midfield / 2, 0, midfield, canvasHeight);

  // let contador = 0;
  canvasArea.fillRect(ballPositionX - ballDiameter / 2, ballPositionY - ballDiameter / 2, ballDiameter, ballDiameter)

  //Raquetes
  canvasArea.fillRect(0, playerPosition1, goalpostWidth, goalpostHeight);
  canvasArea.fillRect(canvasWidth - midfield, playPosition2, goalpostWidth, goalpostHeight);

  //Escrever a pontuação dos jogadores
  canvasArea.fillText("Você - " + playerScore1 + " pontos", 100, 100);
  canvasArea.fillText("Computador - " + playerScore2 + " pontos", canvasWidth - 200, 100);

  ballPositionX = ballPositionX + speedBallPositionX;
  ballPositionY = ballPositionY + speedBallPositionY;

  //verifica a lateral superior
  if (ballPositionY < 0 && speedBallPositionY < 0) {
    speedBallPositionY = -speedBallPositionY;
  }
  //verifica a lateral inferior
  if (ballPositionY > canvasHeight && speedBallPositionY > 0) {
    speedBallPositionY = -speedBallPositionY;
  }

  //verifica se o Jogador2 fez um ponto
  if (ballPositionX < 0) {
    if (ballPositionY > playerPosition1 && ballPositionY < playerPosition1 + goalpostHeight) {
      //Rebater a bola
      speedBallPositionX = -speedBallPositionX;

      let differenceY = ballPositionY - (playerPosition1 + goalpostHeight / 2);
      speedBallPositionY = differenceY * effectGoalpost;
    } else {
      //playerScore2
      playerScore2 = playerScore2 + 1;
      //colocar a bola no centro
      ballPositionX = canvasWidth / 2;
      ballPositionY = canvasHeight / 2;
      speedBallPositionX = - speedBallPositionX;
      speedBallPositionY = 3;
    }
  }
  //verifica se o jogador1 fez playerScore1
  if (ballPositionX > canvasWidth) {
    if (ballPositionY > playPosition2 && ballPositionY < playPosition2 + goalpostHeight) {
      //Rebater a bola

      speedBallPositionX = -speedBallPositionX;
      let differenceY = ballPositionY - (playPosition2 + goalpostHeight / 2);
      speedBallPositionY = differenceY * effectGoalpost;

    } else {
      //Pontos do Jogador 1
      playerScore1 = playerScore1 + 1;
      //colocar a bola no centro
      ballPositionX = canvasWidth / 2;
      ballPositionY = canvasHeight / 2;
      speedBallPositionX = - speedBallPositionX;
      speedBallPositionY = 3;

    }
  }
  //Atualiza a posição do Jogador 2
  if (playPosition2 + goalpostHeight / 2 < ballPositionY) {
    playPosition2 = playPosition2 + playerSpeed2;
  } else {
    playPosition2 = playPosition2 - playerSpeed2;
  }
}

