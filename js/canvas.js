(() => {

const cvs = document.getElementById("andMoodFly");
const ctx = cvs.getContext("2d");

let W = window.innerWidth;
let H = window.innerHeight;

function resize(){
  W = window.innerWidth;
  H = window.innerHeight;
  cvs.width = W;
  cvs.height = H;
}
resize();
window.addEventListener("resize", resize);

const MOODS = {
  great:[92,255,184],
  good:[121,168,255],
  ok:[185,190,204],
  bad:[255,107,117]
};

let icons = [];

function noise(x,y){
  return (Math.sin(x*12.9898 + y*78.233) * 43758.5453) % 1;
}

function spawn(m){
  icons.push({
    mood:m,
    x:Math.random()*W,
    y:Math.random()*H,
    vx:(Math.random()-.5)*.2,
    vy:(Math.random()-.5)*.2,
    rot:Math.random()*6.28,
    vr:(Math.random()-.5)*.003,
    scale:0
  });
}

function drawIcon(p, size){
  const [r,g,b] = MOODS[p.mood];
  ctx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
  ctx.lineWidth = 2;

  if(p.mood === "great"){
    ctx.beginPath(); ctx.arc(0,0,size*.34,0,6.28); ctx.stroke();
  }
  else if(p.mood === "good"){
    ctx.beginPath(); ctx.arc(0,0,size*.45,0,6.28); ctx.stroke();
  }
  else if(p.mood === "ok"){
    const s = size*.72, rC = s*.22;
    const x = -s/2, y = -s/2;
    ctx.beginPath();
    ctx.moveTo(x+rC,y);
    ctx.lineTo(x+s-rC,y);
    ctx.quadraticCurveTo(x+s,y,x+s,y+rC);
    ctx.lineTo(x+s,y+s-rC);
    ctx.quadraticCurveTo(x+s,y+s,x+s-rC,y+s);
    ctx.lineTo(x+rC,y+s);
    ctx.quadraticCurveTo(x,y+s,x,y+s-rC);
    ctx.lineTo(x,y+rC);
    ctx.quadraticCurveTo(x,y,x+rC,y);
    ctx.stroke();
  }
  else{
    const L=size*.95,h=L*Math.sqrt(3)/2;
    ctx.beginPath();
    ctx.moveTo(0,h/2);
    ctx.lineTo(-L/2,-h/2);
    ctx.lineTo(L/2,-h/2);
    ctx.closePath();
    ctx.stroke();
  }
}

function render(){
  ctx.clearRect(0,0,W,H);

  icons.forEach(i=>{
    i.scale = Math.min(1,i.scale + .02);
    const n = noise(i.x*.00035, i.y*.00035) * 6.28;
    i.vx += Math.cos(n)*.004;
    i.vy += Math.sin(n)*.004;
    i.x += i.vx;
    i.y += i.vy;

    if(i.x < 20) i.vx = Math.abs(i.vx);
    if(i.x > W-20) i.vx = -Math.abs(i.vx);
    if(i.y < 20) i.vy = Math.abs(i.vy);
    if(i.y > H-20) i.vy = -Math.abs(i.vy);
  });

  icons.forEach(i=>{
    ctx.save();
    ctx.translate(i.x,i.y);
    ctx.scale(i.scale,i.scale);
    ctx.rotate(i.rot += i.vr);
    drawIcon(i, 60);
    ctx.restore();
  });

  requestAnimationFrame(render);
}
render();

/* CURSOR TEXT */
const cT = document.getElementById("cursorText");
let cursorTimeout = null;

document.addEventListener("mousemove", e => {
  if(e.target.closest("a,button,.menu,.subnav,.side,.case,.popup")){
    cT.style.opacity = 0;
    return;
  }

  cT.style.left = e.clientX + "px";
  cT.style.top = e.clientY + "px";
  cT.style.opacity = 1;

  clearTimeout(cursorTimeout);
  cursorTimeout = setTimeout(()=>cT.style.opacity=0,700);
});

/* POPUP MOOD */
function popup(){
  const box = document.createElement("div");
  box.className = "and-overlay";

  box.innerHTML = `
    <div class="and-pop">
      <h3 style="margin:0 0 10px;color:white">Как настроение?</h3>
      <div class="mood-row">
        <button class="mood-btn" data-m="great">☼ Круто</button>
        <button class="mood-btn" data-m="good">● Хорошо</button>
        <button class="mood-btn" data-m="ok">■ Нормально</button>
        <button class="mood-btn" data-m="bad">▲ Так себе</button>
      </div>
    </div>
  `;

  document.body.appendChild(box);

  box.querySelectorAll(".mood-btn").forEach(b => {
    b.onclick = () => {
      spawn(b.dataset.m);
      box.remove();
    };
  });
}

cvs.addEventListener("click", popup);

/* START */
spawn("great");
spawn("good");
spawn("bad");

})();
