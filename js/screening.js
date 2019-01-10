// Components
let startscreen = document.getElementById('startscreen');
let endscreen = document.getElementById('endscreen');
let game = document.querySelector('canvas');
let scoreLbl = document.getElementById('score');

// Start / Pause / End game
function StartGame() { started = true; return init(), game.style.display = 'block', startscreen.style.display = 'none', endscreen.style.display = 'none'; }
function togglePause() { if (started) { pause = !pause; }}
function stop() { return cancelAnimationFrame(frameID), c.clearRect(0, 0, canvas.width, canvas.height), EndScreen(); }

// Pausescreen
function PauseScreen() {
  c.fillStyle = 'rgba(52, 73, 94, 0.5)';
  c.font = '150px Verdana';
  return c.fillText('Pause', canvas.width / 2 - c.measureText('Pause').width / 2, canvas.height / 2);
}

// Endscreen
function EndScreen() {
  pause = false;
  started = false;
  game.style.display = 'none';
  startscreen.style.display = 'none';
  endscreen.style.display = 'block';
  scoreLbl.innerHTML = 'Score:  ' + score.score;
}
