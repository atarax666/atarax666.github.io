// Динамическое обновление содержимого
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const scrollIndicator = document.getElementById("scroll-indicator");
    const contentUpdater = document.getElementById("content-updater");

    // Слои двигаются с разной скоростью
    const layer1 = document.getElementById("layer1");
    const layer2 = document.getElementById("layer2");

    layer1.style.transform = `translateY(${scrollPosition * 0.5}px)`; // Медленнее
    layer2.style.transform = `translateY(${scrollPosition * 0.2}px)`; // Самый медленный
    
    // Обновление информации о текущей позиции прокрутки
    scrollIndicator.textContent = `Текущая позиция прокрутки: ${scrollPosition}px`;

    // Динамическое обновление содержимого
    if (scrollPosition > 200) {
        contentUpdater.textContent = "Вы прокрутили больше 200px. Содержимое обновлено!";
    } else {
        contentUpdater.textContent = "Прокрутите вниз, чтобы обновить содержимое.";
    }
});
