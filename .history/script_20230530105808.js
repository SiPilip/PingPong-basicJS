document.addEventListener("DOMContentLoaded", () => {
  const pong = document.getElementById("pong");
  const paddleA = document.getElementById("paddleA");
  const paddleB = document.getElementById("paddleB");
  const ball = document.getElementById("ball");
  const startButton = document.getElementById("start-button");
  const playerAScore = document.getElementById("playerA-score");
  const playerBScore = document.getElementById("playerB-score");

  let paddleA_Y = 160; // Posisi awal paddle A
  let paddleB_Y = 160; // Posisi awal paddle B
  let ball_X = 390; // Posisi awal bola X
  let ball_Y = 190; // Posisi awal bola Y
  let speed_X = 2; // Kecepatan horizontal bola
  let speed_Y = 2; // Kecepatan vertikal bola
  let playerAScoreValue = 0;
  let playerBScoreValue = 0;
  let isGameRunning = false;

  function update() {
    // Menggerakkan paddle A dan B
    paddleA.style.top = paddleA_Y + "px";
    paddleB.style.top = paddleB_Y + "px";

    // Menggerakkan bola
    ball_X += speed_X;
    ball_Y += speed_Y;
    ball.style.left = ball_X + "px";
    ball.style.top = ball_Y + "px";

    // Mengecek tumbukan bola dengan dinding atas/bawah
    if (ball_Y > 385 || ball_Y < 0) {
      speed_Y *= -1;
    }

    // Mengecek tumbukan bola dengan paddle A
    if (
      ball_X <= 20 && // Bola berada di sebelah kiri paddle A
      ball_Y + 10 >= paddleA_Y && // Bola berada di bawah paddle A
      ball_Y <= paddleA_Y + 80 // Bola berada di atas paddle A
    ) {
      speed_X *= -1;
    }

    // Mengecek tumbukan bola dengan paddle B
    if (
      ball_X >= 770 && // Bola berada di sebelah kanan paddle B
      ball_Y + 10 >= paddleB_Y && // Bola berada di bawah paddle B
      ball_Y <= paddleB_Y + 80 // Bola berada di atas paddle B
    ) {
      speed_X *= -1;
    }

    // Mengecek gol
    if (ball_X <= 0) {
      playerBScoreValue++;
      resetGame();
    } else if (ball_X >= 790) {
      playerAScoreValue++;
      resetGame();
    }

    // Update skor pada tampilan
    playerAScore.textContent = playerAScoreValue;
    playerBScore.textContent = playerBScoreValue;

    // Melanjutkan permainan jika masih berjalan
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

    // Menghentikan permainan untuk sementara waktu
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

  // Menggerakkan paddle A sesuai dengan posisi mouse
  pong.addEventListener("mousemove", (e) => {
    paddleA_Y = e.clientY - pong.offsetTop - 40;
  });

  // Menggerakkan paddle B secara otomatis
  function autoMovePaddleB() {
    const ballCenter = ball_Y + 5;
    if (ballCenter > paddleB_Y + 40) {
      paddleB_Y += 2;
    } else if (ballCenter < paddleB_Y + 40) {
      paddleB_Y -= 2;
    }
  }

  // Memulai permainan saat tombol "Start Game" ditekan
  startButton.addEventListener("click", startGame);

  // Menggerakkan paddle B secara otomatis setiap 10 milidetik
  setInterval(autoMovePaddleB, 10);
});

document.addEventListener("DOMContentLoaded", () => {
  const pong = document.getElementById("pong");
  const loadingScreen = document.getElementById("loading-screen");
  const startButton = document.getElementById("start-button");

  // Tampilkan layar loading selama 3 detik
  setTimeout(() => {
    loadingScreen.style.animation = "fadeOut 1s forwards";
    startButton.disabled = true;
    startButton.textContent = "Start Game";
  }, 1000);

  // Memulai permainan saat tombol "Start Game" ditekan
  startButton.addEventListener("click", startGame);
});
