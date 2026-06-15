document.querySelectorAll('.window').forEach(win => {
  const bar = win.querySelector('.title-bar');
  let dragging = false, ox, oy;
  bar.addEventListener('mousedown', e => {
    dragging = true;
    ox = e.clientX - win.offsetLeft;
    oy = e.clientY - win.offsetTop;
    win.style.zIndex = 1000;
  });
  document.addEventListener('mousemove', e => {
    if (dragging) {
      win.style.left = (e.clientX - ox) + 'px';
      win.style.top = (e.clientY - oy) + 'px';
    }
  });
  document.addEventListener('mouseup', () => dragging = false);
});

function closeWindow(id) {
  document.getElementById(id).style.display = 'none';
}

function openWindow(id) {
  const win = document.getElementById(id);
  win.style.display = 'block';
  win.style.zIndex = 1000;
  hideMenu();
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString(undefined, { weekday:'long', month:'long', day:'numeric' });
  const el = document.getElementById('clock');
  if (el) el.textContent = time;
  const big = document.getElementById('big-clock');
  if (big) big.textContent = time;
  const bigDate = document.getElementById('big-date');
  if (bigDate) bigDate.textContent = date;
}
setInterval(updateClock, 1000);
updateClock();

let calcExpr = '';
function calcInput(v) { calcExpr += v; document.getElementById('calc-display').value = calcExpr; }
function calcEqual() {
  try {
    const result = eval(calcExpr);
    document.getElementById('calc-display').value = result;
    calcExpr = String(result);
  } catch { document.getElementById('calc-display').value = 'Error'; calcExpr = ''; }
}
function calcClear() { calcExpr = ''; document.getElementById('calc-display').value = ''; }

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.innerHTML = `${text}Delete`;
  document.getElementById('todo-list').appendChild(li);
  input.value = '';
}
document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

const wallpapers = {
  space: '', sunset: 'sunset', ocean: 'ocean',
  forest: 'forest', midnight: 'midnight', candy: 'candy'
};
function setWallpaper(name) {
  const desktop = document.getElementById('desktop');
  desktop.className = 'desktop';
  if (wallpapers[name]) desktop.classList.add(wallpapers[name]);
}

const menu = document.getElementById('context-menu');
document.getElementById('desktop').addEventListener('contextmenu', e => {
  e.preventDefault();
  menu.style.display = 'block';
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
});
document.addEventListener('click', hideMenu);
function hideMenu() { menu.style.display = 'none'; }
