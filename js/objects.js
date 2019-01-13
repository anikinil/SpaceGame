// Objects
function Background(x, y, width, height, img, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.sprite = new Image();
  this.sprite.src = img;
  this.speed = speed;

  this.update = () => {
    this.x -= this.speed;

    // if (!(spaceship.y === 0) && upPressed) { this.y -= spaceship.speed * 0.5; }
    // if (rightPressed) { this.x -= spaceship.speed * 0.25; }
    // if (downPressed && !(spaceship.y + spaceship.height >= canvas.height)) { this.y += spaceship.speed * 0.5; }
    // if (leftPressed) { this.x -= spaceship.speed * 0.25; }

    this.draw();
  }

  this.draw = () => {
    c.drawImage(this.sprite, this.x, this.y, this.width, this.height);

    if (this.x + this.width <= 0) {
      this.x = canvas.width;
    }
  }
}

function Asteroid(x, y, radius, color, speed) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.collided = false;
  this.speed = speed;

  this.update = () => {
    this.x -= this.speed;
    this.draw();

    if (this.x <= 0) {
      this.x = canvas.width + this.radius;
      this.y = randomIntFromRange(0, canvas.height);
      this.collided = false;
    }
  }

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}

function Spaceship(x, y, img, width, height, speed) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.sprite = new Image();
  this.sprite.src = img;
  this.speed = speed;
  this.immune = false;
  this.show = true;
  this.bullets = [];

  this.toggleShow = () => { this.show = !this.show; }

  this.shoot = () => {
    var b = new Bullet(this.x + this.width + 10, this.y + this.height - 5, 10, 5, 7);
    this.bullets.push(b);
  }

  this.update = () => {
    this.bullets.forEach(b => { b.update(); })
    if (upPressed) { this.y += this.speed; }
    if (rightPressed) { this.x += this.speed; }
    if (downPressed) { this.y -= this.speed; }
    if (leftPressed) { this.x -= this.speed; }
    if (this.x <= 0) { this.x = 0 } else if (this.x + this.width >= canvas.width) { this.x = canvas.width - this.width; }
    if (this.y <= 0) { this.y = 0 } else if (this.y + this.height >= canvas.height) { this.y = canvas.height - this.height; }
    if (this.show) { this.draw(); }
  }

  this.draw = () => {
    c.drawImage(this.sprite, this.x, this.y);
  }
}

function Bullet(x, y, w, h, speed) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.speed = speed;

  this.update = () => {
    this.x += this.speed;
    this.draw();
  }

  this.draw = () => {
    c.beginPath();
    c.rect(this.x, this.y, this.width, this.height);
    c.fillStyle = '#000';
    c.fill();
    c.closePath();
  }
}

function ScoreManager() {
  this.score = 0;

  this.increment = (num) => {
    this.score += num;
  }

  this.resetScore = () => {
    this.score = 0;
  }

  this.draw = (x, y) => {
    c.font = 'bold 32px Arial';
    c.fillStyle = 'rgba(52, 73, 94, 0.5)';
    c.fillText('Sore: ' + this.score, x, y);
  }
}

function DeathManager() {
  this.deaths = 0;

  this.increment = () => {
    this.deaths += 1;
  }

  this.resetDeaths = () => {
    this.deaths = 0;
  }

  this.draw = (x, y) => {
    c.font = 'bold 32px Arial';
    c.fillStyle = 'rgba(52, 73, 94, 0.5)';
    c.fillText('Deaths: ' + this.deaths, x, y);
  }
}
