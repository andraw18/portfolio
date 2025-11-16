/* === MENU POPUP === */
const menuBtn = document.getElementById("menuBtn");
const popupMenu = document.getElementById("popupMenu");
const popupClose = document.getElementById("popupClose");

menuBtn.onclick = () => popupMenu.classList.add("show");
popupClose.onclick = () => popupMenu.classList.remove("show");
popupMenu.querySelectorAll("a").forEach(a =>
  a.onclick = () => popupMenu.classList.remove("show")
);

/* === SLIDER === */
const slider = document.getElementById("caseSlider");

if (slider) {
  const imgs = [...slider.querySelectorAll("img")];
  const dotsWrap = document.getElementById("caseDots");
  const title = document.getElementById("caseTitle");

  const titles = [
    "АЛЬФА ПРОЕКТ БАНК",
    "PROJEKT TWO",
    "BRUNO SURASKI"
  ];

  let current = 0;

  imgs.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.onclick = () => setSlide(i);
    dotsWrap.appendChild(d);
  });

  function setSlide(i) {
    imgs[current].classList.remove("active");
    dotsWrap.children[current].classList.remove("active");

    current = i;

    imgs[current].classList.add("active");
    dotsWrap.children[current].classList.add("active");
    title.textContent = titles[current];
  }

  setInterval(() => setSlide((current + 1) % imgs.length), 6000);
}

/* === HEADLINE LIGHT FOLLOW === */
const head = document.querySelector(".head span");
head.addEventListener("mousemove", (e) => {
  const r = head.getBoundingClientRect();
  head.style.setProperty("--x", ((e.clientX - r.left) / r.width * 100) + "%");
  head.style.setProperty("--y", ((e.clientY - r.top) / r.height * 100) + "%");
});

