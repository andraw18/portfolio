const head = document.querySelector(".head span");

head.addEventListener("mousemove", e => {
    const r = head.getBoundingClientRect();
    head.style.setProperty("--x", ((e.clientX - r.left) / r.width * 100) + "%");
    head.style.setProperty("--y", ((e.clientY - r.top) / r.height * 100) + "%");
});
