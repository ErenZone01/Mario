const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class create_sprite {
  constructor({ position, velocity }, color) {
    this.position = position;
    this.velocity = velocity;
    this.color = color;
    this.height = 150;
    this.width = 50;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

  }

  update() {
    this.draw();
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;

    if (
      this.position.x + this.width + this.velocity.x >= canvas.width ||
      this.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
  }
}

const player = new create_sprite(
  { position: { x: 0, y: 0 }, velocity: { x: 0, y: 10 } },
  "green"
);

const enemy = new create_sprite(
  { position: { x: 400, y: 0 }, velocity: { x: 0, y: 0 } },
  "yellow"
);

const key = {
  ArrowRigth: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowUp: { pressed: false },
  // ArrowDown: { pressed: false },
};

let lastKey = "";
let attack = false;

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  //player movement
  player.velocity.x = 0;
  if (key.ArrowRigth.pressed && lastKey === "ArrowRight") {
    player.velocity.x = 5;
  } else if (key.ArrowLeft.pressed && lastKey === "ArrowLeft") {
    player.velocity.x = -5;
  }

  //Attack
  if (attack) {
    c.fillStyle = "red";
    c.fillRect(player.position.x + 10, player.position.y, 100, 20);
  }
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      key.ArrowRigth.pressed = true;
      lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      key.ArrowLeft.pressed = true;
      lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      if (player.velocity.y === 0) {
        player.velocity.y = -10;
      }
      break;
    case "Space":
      attack = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
      key.ArrowRigth.pressed = false;
      break;
    case "ArrowLeft":
      key.ArrowLeft.pressed = false;
      break;
    case "space":
      attack = false;
      break;
  }
});

animate();
