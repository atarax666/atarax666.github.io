// Получаем все миниатюры и основное изображение
const thumbnails = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('main-img');

// Добавляем обработчик кликов на миниатюры
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        // При клике меняем источник основного изображения на значение data-large миниатюры
        mainImage.src = this.getAttribute('data-large');
    });
});
