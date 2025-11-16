const cursorText = document.getElementById("cursorText");
let cursorTimeout = null;

document.addEventListener("mousemove", (e) => {
    if (e.target.closest("a,button,.menu,.subnav,.side,.case,.popup")) {
        cursorText.style.opacity = 0;
        return;
    }

    cursorText.style.left = e.clientX + "px";
    cursorText.style.top = e.clientY + "px";
    cursorText.style.opacity = 1;

    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(() => cursorText.style.opacity = 0, 700);
});
