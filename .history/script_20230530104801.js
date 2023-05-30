document.addEventListener("DOMContentLoaded", () => {
  const pong = document.getElementById("pong");
  const paddleA = document.getElementById("paddleA");
  const paddleB = document.getElementById("paddleB");
  const ball = document.getElementById("ball");

  let paddleA_Y = 160; // Posisi awal paddle A
  let paddleB_Y = 160; // Posisi awal paddle B
  let ball_X = 390; // Posisi awal bola X
  let ball_Y = 190; // Posisi awal bola Y
  let speed_X = 2; // Kecepatan horizontal bola
  let speed_Y = 2; // Kecepatan vertikal bola

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
      ball_X <= 15 && // Bola berada di sebelah kiri paddle A
      ball_Y + 15 >= paddleA_Y && // Bola berada di bawah paddle A
      ball_Y <= paddleA_Y + 60 // Bola berada di atas paddle A
    ) {
      speed_X *= -1;
    }

    // Mengecek tumbukan bola dengan paddle B
    if (
      ball_X >= 770 && // Bola berada di sebelah kanan paddle B
      ball_Y + 15 >= paddleB_Y && // Bola berada di bawah paddle B
      ball_Y <= paddleB_Y + 60 // Bola berada di atas paddle B
    ) {
      speed_X *= -1;
    }

    requestAnimationFrame(update);
  }

  // Menggerakkan paddle A sesuai dengan posisi mouse
  pong.addEventListener("mousemove", (e) => {
    paddleA_Y = e.clientY - pong.offsetTop - 30;
  });

  // Memulai permainan
  update();
});
