// Функция для центрирования картинки
function centerImage() {
    const img = document.getElementById('center-image');
    const container = document.getElementById('center-container');

    // Вычисляем центральные координаты
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const left = (containerWidth - imgWidth) / 2;
    const top = (containerHeight - imgHeight) / 2;

    img.style.position = 'absolute';
    img.style.left = `${left}px`;
    img.style.top = `${top}px`;
}

// Вывод координат клика
document.addEventListener('click', function (e) {
    const coordinatesDiv = document.getElementById('coordinates');
    coordinatesDiv.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
});

window.onload = centerImage;
window.onresize = centerImage;
