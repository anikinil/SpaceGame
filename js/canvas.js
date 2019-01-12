// Initial Canvas Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
const colors = ['#ff5e57', '#3c40c6', '#485460', '#ffa801'];

var scoreStarted = false;
var started = false;
var pause = false;

var asteroidsAdded = false;
var speedIncreased = false;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener('keydown', (e) => {
  if (e.keyCode === 27) { togglePause(); }
  if (e.keyCode === 39) { rightPressed = true; }
  if (e.keyCode === 37) { leftPressed = true; }
  if (e.keyCode === 40) { upPressed = true; }
  if (e.keyCode === 38) { downPressed = true; }
  if (e.keyCode === 32) { spacePressed = true; }
});

addEventListener('keyup', (e) => {
  if (e.keyCode === 39) { rightPressed = false; }
  if (e.keyCode === 37) { leftPressed = false; }
  if (e.keyCode === 40) { upPressed = false; }
  if (e.keyCode === 38) { downPressed = false; }
  if (e.keyCode === 32) { spacePressed = false; }
});

// Implementation
let bg, spaceship;
let shipWidth = shipHeight = 50;
let asteroids = [];

var speed;

let score = new ScoreManager();
let deaths = new DeathManager();

var start, blink;
var lastS = Date.now();

// Initialization
function init() {
  // Draw Background
  bg = new Background(0, 0, canvas.width, canvas.height, '#F5F5F5', 2);

  // Reset Vars
  score.resetScore();
  deaths.resetDeaths();

  // Add Asteroids
  for (let i = 0; i < 8; i++) {
    let color = randomColor(colors);
    let radius = randomIntFromRange(5, 20);
    let y = randomIntFromRange(radius, canvas.height - radius);

    asteroids.push(new Asteroid(canvas.width + radius * 2, y, radius, color, getSpeed(radius)));
  }

  // Add Spaceship
  spaceship = new Spaceship(canvas.width / 2 - shipWidth / 2, canvas.height / 2 - shipHeight / 2, 'Sprites/Spaceship1.png', shipWidth, shipHeight, 5);

  // Start Animation
  return animate();
}

// Animation Loop
function animate() {
  // Update Screen
  frameID = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  if (pause) {
    // Draw stuff on screen
    bg.draw();
    asteroids.forEach(asteroid => { asteroid.draw(); });
    spaceship.bullets.forEach(b => { b.draw(); });
    spaceship.draw();
    score.draw(30, 60);
    deaths.draw(canvas.width - (c.measureText('Deaths: 0').width + 30), 60);

    // Score
    if (scoreStarted) {
      window.clearInterval(scoreHandle);
      scoreStarted = false;
    }

    // Show Pausescreen
    PauseScreen();
  } else {
    // Update stuff
    bg.update();
    asteroids.forEach(asteroid => { asteroid.update(); });
    spaceship.update();

    // --- Shoot ---
    if (Math.floor((Date.now() - lastS) / 1000) > 1 && spacePressed) {
      spaceship.shoot();
      lastS = Date.now();
    }

    // Bullet collision
    asteroids.forEach(a => {
      spaceship.bullets.forEach(b => {
        if (distance(b.x + b.width, b.y + b.height, a.x + a.radius, a.y + a.radius) < b.width + a.radius) {
          var iB = spaceship.bullets.indexOf(b);
          spaceship.bullets.splice(iB, 1);

          a.x = canvas.width + a.radius * 2;
          a.y = randomIntFromRange(0, canvas.height);
          a.color = randomColor(colors);
        }

        if (b.x >= canvas.width) {
          spaceship.bullets.splice(iB, 1);
        }
      });
    });

    // Immunity
    if (Math.floor((Date.now() - start) / 1000) > 1) {
      window.clearInterval(blink);
      spaceship.immune = false;
      spaceship.show = true;
    }

    // Score
    if (!scoreStarted) { scoreHandle = window.setInterval('score.increment(1)', 2500); scoreStarted = true; }

    // Leveling
    if (score.score % 5 === 0 && score.score !== 0 && !asteroidsAdded) { addAsteroids(2); } else if (score.score % 5 === 1) { asteroidsAdded = false; }
    if (score.score % 10 === 0 && score.score !== 0 && !speedIncreased) { increaseSpeed(); } else if (score.score % 10 === 1) { speedIncreased = false; }

    // Draw score/death inf on screen
    score.draw(30, 60);
    deaths.draw(canvas.width - (c.measureText('Deaths: 0').width + 30), 60);

    // Collision
    asteroids.forEach(asteroid => {
      if (!spaceship.immune && !asteroid.collided && distance(spaceship.x + spaceship.width, spaceship.y + spaceship.width, asteroid.x, asteroid.y) < asteroid.radius + spaceship.width) {
        asteroid.collided = true;
        deaths.increment();
        if (deaths.deaths === 5) { stop(); }

        // Immunity
        this.show = false;
        spaceship.immune = true;
        start = Date.now();
        blink = window.setInterval('spaceship.toggleShow()', 300);
      }
    });
  }
}

// Level handling
function increaseSpeed() {
  asteroids.forEach(asteroid => {
    asteroid.speed++;
  });

  return speedIncreased = true;
}

function addAsteroids(num) {
  for (var i = 0; i < num; i++) {
    let color = randomColor(colors);
    let radius = randomIntFromRange(5, 20);
    let y = randomIntFromRange(radius, canvas.height - radius);

    asteroids.push(new Asteroid(canvas.width + radius * 2, y, radius, color, getSpeed(radius)));
  }

  return asteroidsAdded = true;
}

// Reset Asteroids on Restart
function resetAsteroids() {
  asteroids = [];
  for (let i = 0; i < 8; i++) {
    let color = randomColor(colors);
    let radius = randomIntFromRange(5, 20);
    let y = randomIntFromRange(radius, canvas.height - radius);

    asteroids.push(new Asteroid(canvas.width + radius * 2, y, radius, color, getSpeed(radius)));
  }
  return asteroids;
}

var t = 0
function incTimer() {
  t += 1;
}
