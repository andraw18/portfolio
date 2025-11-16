/* ============================
   CANVAS BACKGROUND + MOOD POPUP
   ============================ */

const cvs = document.getElementById("andMoodFly");
const ctx = cvs.getContext("2d");

let W = 0, H = 0;

function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    cvs.width = W;
    cvs.height = H;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* FIGURE COLORS */
const MOODS = {
    great: [92, 255, 184],
    good:  [121, 168, 255],
    ok:    [185, 190, 204],
    bad:   [255, 107, 117]
};

let icons = [];

/* SIMPLE NOISE */
function noise(x, y) {
    return (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
}

/* CREATE ICON */
function spawn(mood) {
    icons.push({
        mood,
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.003,
        scale: 0
    });
}

/* DRAW SHAPES */
function drawIcon(p, size) {
    const [r, g, b] = MOODS[p.mood];
    ctx.strokeStyle = `rgba(${r},${g},${b},0.9)`;
    ctx.lineWidth = 2;

    if (p.mood === "great") {
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
        ctx.stroke();
    }
    else if (p.mood === "good") {
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
        ctx.stroke();
    }
    else if (p.mood === "ok") {
        const s = size * 0.72;
        const x = -s / 2, y = -s / 2, rC = s * 0.22;

        ctx.beginPath();
        ctx.moveTo(x + rC, y);
        ctx.lineTo(x + s - rC, y);
        ctx.quadraticCurveTo(x + s, y, x + s, y + rC);
        ctx.lineTo(x + s, y + s - rC);
        ctx.quadraticCurveTo(x + s, y + s, x + s - rC, y + s);
        ctx.lineTo(x + rC, y + s);
        ctx.quadraticCurveTo(x, y + s, x, y + s - rC);
        ctx.lineTo(x, y + rC);
        ctx.quadraticCurveTo(x, y, x + rC, y);
        ctx.stroke();
    }
    else if (p.mood === "bad") {
        const L = size * 0.95;
        const h = L * Math.sqrt(3) / 2;

        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(-L / 2, -h / 2);
        ctx.lineTo(L / 2, -h / 2);
        ctx.closePath();
        ctx.stroke();
    }
}

/* MAIN RENDER LOOP */
function render() {
    ctx.clearRect(0, 0, W, H);

    // light gradient background
    const grad = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, Math.min(W, H) * 0.75);
    grad.addColorStop(0, "rgba(40,40,60,0.6)");
    grad.addColorStop(0.4, "rgba(20,20,30,0.25)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // move & draw icons
    icons.forEach(i => {
        i.scale = Math.min(1, i.scale + 0.02);

        const n = noise(i.x * 0.00035, i.y * 0.00035) * Math.PI * 2;
        i.vx += Math.cos(n) * 0.004;
        i.vy += Math.sin(n) * 0.004;

        i.x += i.vx;
        i.y += i.vy;
        i.rot += i.vr;

        if (i.x < 30) i.vx = Math.abs(i.vx);
        if (i.x > W - 30) i.vx = -Math.abs(i.vx);
        if (i.y < 30) i.vy = Math.abs(i.vy);
        if (i.y > H - 30) i.vy = -Math.abs(i.vy);
    });

    icons.forEach(i => {
        ctx.save();
        ctx.translate(i.x, i.y);
        ctx.scale(i.scale, i.scale);
        ctx.rotate(i.rot);
        drawIcon(i, 62);
        ctx.restore();
    });

    requestAnimationFrame(render);
}
render();

/* ========= CURSOR POPUP ========= */
function openMoodPopup() {
    const box = document.createElement("div");
    box.className = "and-overlay";

    box.innerHTML = `
        <div class="and-pop">
            <h3 style="color:white;margin:0 0 14px;">Как настроение?</h3>
            <div class="mood-row">
                <button class="mood-btn" data-m="great">☼ Круто</button>
                <button class="mood-btn" data-m="good">● Хорошо</button>
                <button class="mood-btn" data-m="ok">■ Нормально</button>
                <button class="mood-btn" data-m="bad">▲ Так себе</button>
            </div>
        </div>
    `;

    document.body.appendChild(box);

    box.querySelectorAll(".mood-btn").forEach(btn => {
        btn.onclick = () => {
            spawn(btn.dataset.m);
            box.remove();
        };
    });
}

/* OPEN POPUP BY CLICK */
cvs.addEventListener("click", openMoodPopup);

/* START ICONS */
spawn("great");
spawn("good");
spawn("bad");
