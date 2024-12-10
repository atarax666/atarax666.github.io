window.addEventListener('scroll', function () {
    // Проверяем, находимся ли мы внизу страницы
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        // Динамическое добавление контента
        const newContent = document.createElement('div');
        newContent.textContent = 'Новый контент загружен';
        document.getElementById('contents').appendChild(newContent);
    }
});

document.getElementById('contents').addEventListener('click', function (e) {
    if (e.target && e.target.tagName.toLowerCase() === 'a') {
        const isConfirmed = confirm('Вы действительно хотите покинуть страницу?');
        if (!isConfirmed) {
            e.preventDefault(); // Прерываем переход по ссылке
        }
    }
});
