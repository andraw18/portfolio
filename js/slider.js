const slider = document.getElementById("caseSlider");

if (slider) {
    const imgs = [...slider.querySelectorAll("img")];
    const dots = document.getElementById("caseDots");
    const title = document.getElementById("caseTitle");

    const titles = [
        "АЛЬФА ПРОЕКТ БАНК",
        "PROJEKT TWO",
        "BRUNO SURASKI"
    ];

    let cur = 0;

    imgs.forEach((_, i) => {
        const d = document.createElement("div");
        d.className = "dot" + (i === 0 ? " active" : "");
        d.onclick = () => set(i);
        dots.appendChild(d);
    });

    function set(i) {
        imgs[cur].classList.remove("active");
        dots.children[cur].classList.remove("active");
        cur = i;
        imgs[cur].classList.add("active");
        dots.children[cur].classList.add("active");
        title.textContent = titles[cur];
    }

    setInterval(() => set((cur + 1) % imgs.length), 6000);
}
