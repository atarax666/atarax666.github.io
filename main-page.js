document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("change", function () {
        if (menuToggle.checked) {
            menu.style.visibility = "visible";
            menu.style.opacity = "1";
        } else {
            menu.style.visibility = "hidden";
            menu.style.opacity = "0";
        }
    });
});

function toggleLike() {
    const button = document.getElementById("like-button");
    button.classList.toggle("liked");
}

let isDrawing = false;

function toggleDrawing() {
    isDrawing = !isDrawing;
    
    const button = document.getElementById("draw-button");
    button.classList.toggle("active");
    
    if (isDrawing) {
        document.addEventListener("mousemove", drawElement);
    } else {
        document.removeEventListener("mousemove", drawElement);
    }
}

function drawElement(event) {
    const element = document.createElement("div");
    element.className = "drawn-element";
    element.style.left = `${event.pageX}px`;
    element.style.top = `${event.pageY}px`;
    document.body.appendChild(element);

    setTimeout(() => element.remove(), 1000);  // Удаляем через 1 секунду
}
