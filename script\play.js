// script/play.js

document.getElementById('startGameBtn').addEventListener('click', function() {
  const code = document.getElementById('gameCodeInput').value.trim().toUpperCase();

  if (!code) {
    alert('Masukkan kode game terlebih dahulu!');
    return;
  }

  const savedData = localStorage.getItem(code);

  if (!savedData) {
    alert('Kode tidak ditemukan!');
    return;
  }

  const gameData = JSON.parse(savedData);

  startPuzzle(gameData);
});

function startPuzzle(gameData) {
  document.getElementById('puzzleSection').style.display = 'block';

  const puzzleGrid = document.getElementById('puzzleGrid');
  const gridSize = gameData.gridSize;
  puzzleGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  const pieces = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    pieces.push(i);
  }

  shuffleArray(pieces);

  pieces.forEach(i => {
    const img = document.createElement('img');
    img.src = gameData.imageUrl;
    img.style.objectFit = 'cover';
    img.draggable = true;
    img.dataset.index = i;

    // Set cropping via object-position
    const x = (i % gridSize) * (100 / (gridSize - 1));
    const y = Math.floor(i / gridSize) * (100 / (gridSize - 1));
    img.style.objectPosition = `${x}% ${y}%`;

    img.addEventListener('dragstart', dragStart);
    img.addEventListener('drop', drop);
    img.addEventListener('dragover', allowDrop);

    puzzleGrid.appendChild(img);
  });

  startTimer(gameData.timer, gameData.description);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let dragged;

function dragStart(e) {
  dragged = e.target;
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (dragged !== e.target) {
    const temp = dragged.src;
    dragged.src = e.target.src;
    e.target.src = temp;

    const tempPos = dragged.style.objectPosition;
    dragged.style.objectPosition = e.target.style.objectPosition;
    e.target.style.objectPosition = tempPos;
  }
}

function startTimer(minutes, description) {
  let seconds = minutes * 60;
  const timerDisplay = document.getElementById('timerDisplay');

  const interval = setInterval(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      showDescription(description);
    }
  }, 1000);
}

function showDescription(description) {
  document.getElementById('descriptionSection').style.display = 'block';
  document.getElementById('descriptionText').textContent = description;
}
