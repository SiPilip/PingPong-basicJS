document.addEventListener("DOMContentLoaded", () => {
  const pong = document.getElementById("pong");
  const paddleA = document.getElementById("paddleA");
  const paddleB = document.getElementById("paddleB");
  const ball = document.getElementById("ball");
  const startButton = document.getElementById("start-button");
  const playerAScore = document.getElementById("playerA-score");
  const playerBScore = document.getElementById("playerB-score");
  const loadingScreen = document.getElementById("loading-screen");

  let paddleA_Y = 160;
  let paddleB_Y = 160;
  let ball_X = 390;
  let ball_Y = 190;
  let speed_X = 2;
  let speed_Y = 2;
  let playerAScoreValue = 0;
  let playerBScoreValue = 0;
  let isGameRunning = false;

  function update() {
    paddleA.style.top = paddleA_Y + "px";
    paddleB.style.top = paddleB_Y + "px";

    ball_X += speed_X;
    ball_Y += speed_Y;
    ball.style.left = ball_X + "px";
    ball.style.top = ball_Y + "px";

    if (ball_Y > 385 || ball_Y < 0) {
      speed_Y *= -1;
    }

    if (ball_X <= 20 && ball_Y + 10 >= paddleA_Y && ball_Y <= paddleA_Y + 80) {
      speed_X *= -1;
    }

    if (ball_X >= 770 && ball_Y + 10 >= paddleB_Y && ball_Y <= paddleB_Y + 80) {
      speed_X *= -1;
    }

    if (ball_X <= 0) {
      playerBScoreValue++;
      resetGame();
    } else if (ball_X >= 790) {
      playerAScoreValue++;
      resetGame();
    }

    playerAScore.textContent = playerAScoreValue;
    playerBScore.textContent = playerBScoreValue;

    if (isGameRunning) {
      requestAnimationFrame(update);
    }
  }

  function resetGame() {
    ball_X = 390;
    ball_Y = 190;
    speed_X *= -1;
    paddleA_Y = 160;
    paddleB_Y = 160;

    isGameRunning = false;
    startButton.disabled = false;
    startButton.textContent = "Start Game";
  }

  function startGame() {
    isGameRunning = true;
    startButton.disabled = true;
    startButton.textContent = "Game in Progress";
    update();
  }

  function movePaddleA(event) {
    const mouseY = event.clientY - pong.offsetTop;
    if (mouseY >= 0 && mouseY <= 320) {
      paddleA_Y = mouseY;
    }
  }

  function movePaddleB() {
    // Mengikuti gerakan bola dengan gerakan yang lebih alami
    const paddleCenter = paddleB_Y + 40;
    const ballCenter = ball_Y + 5;
    const distance = ballCenter - paddleCenter;

    if (Math.abs(distance) < 10) {
      return; // Jika sudah mendekati posisi bola, biarkan paddle tetap
    }

    let moveAmount = Math.min(4, Math.abs(distance) / 10);

    if (distance < 0) {
      paddleB_Y -= moveAmount;
    } else {
      paddleB_Y += moveAmount;
    }
  }

  pong.addEventListener("mousemove", movePaddleA);

  setTimeout(() => {
    loadingScreen.style.animation = "fadeOut 1s forwards";
    loadingScreen.style.display = "none";
    startButton.disabled = false;
    startButton.textContent = "Start Game";
  }, 3000);

  startButton.addEventListener("click", startGame);

  // Menggerakkan paddle B setiap 10ms
  setInterval(movePaddleB, 10);
});
