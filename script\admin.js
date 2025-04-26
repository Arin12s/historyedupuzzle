// script/admin.j// script/admin.js

let gameData = {};

document.getElementById('createGameForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const imageFile = document.getElementById('puzzleImage').files[0];
  const gridSize = parseInt(document.getElementById('gridSize').value);
  const timer = parseInt(document.getElementById('timer').value);
  const description = document.getElementById('description').value;

  if (!imageFile) {
    alert("Mohon upload gambar puzzle!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const imageUrl = e.target.result;

    const code = generateGameCode();

    gameData = {
      imageUrl,
      gridSize,
      timer,
      description
    };

    localStorage.setItem(code, JSON.stringify(gameData));

    document.getElementById('gameCode').innerHTML = `
      <p>Kode Game: <strong>${code}</strong></p>
      <p>Bagikan kode ini ke siswa!</p>
    `;
  };

  reader.readAsDataURL(imageFile);
});

function generateGameCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return code;
}
