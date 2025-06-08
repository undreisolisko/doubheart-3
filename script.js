const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const inventory = document.getElementById('inventory');
const minerTip = document.getElementById('minerTip');

// Игровые объекты
const objects = [
  { x: 400, y: 300, img: 'button1.png', name: 'пуговица 1', collected: false },
  { x: 600, y: 350, img: 'button2.png', name: 'пуговица 2', collected: false },
  { x: 500, y: 400, img: 'ring.png', name: 'кольцо', collected: false }
];

const pickaxeImg = new Image();
pickaxeImg.src = 'assets/pickaxe.png';

let mouseX = 0;
let mouseY = 0;

// Загрузка фоновой стены
const wallImg = new Image();
wallImg.src = 'assets/wall.png';

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(wallImg, 0, 0, canvas.width, canvas.height);

  objects.forEach(obj => {
    if (!obj.collected) {
      const img = new Image();
      img.src = `assets/${obj.img}`;
      ctx.drawImage(img, obj.x, obj.y, 50, 50);
    }
  });

  ctx.drawImage(pickaxeImg, mouseX - 25, mouseY - 25, 50, 50);

  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

canvas.addEventListener('click', e => {
  objects.forEach(obj => {
    if (!obj.collected &&
        e.clientX >= obj.x && e.clientX <= obj.x + 50 &&
        e.clientY >= obj.y && e.clientY <= obj.y + 50) {
      obj.collected = true;
      const item = document.createElement('div');
      item.textContent = obj.name;
      inventory.appendChild(item);
      minerTip.textContent = `💡 Ты добыл: ${obj.name}!`;
    }
  });
});

draw();