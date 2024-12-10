// Обработчик клика по иконке уведомлений
document.getElementById('notification-icon').addEventListener('click', function() {
    const dropdown = document.getElementById('notification-dropdown');
    const newNotificationText = document.getElementById('new-notification-text');
    
    // Показываем или скрываем выпадающий список уведомлений
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
        // Скрываем текст о новом уведомлении
        newNotificationText.style.display = 'none';
    }
});

// Функция для добавления нового уведомления
function addNotification(message) {
    const dropdown = document.getElementById('notification-dropdown');
    const counter = document.getElementById('notification-counter');
    const newNotificationText = document.getElementById('new-notification-text');

    // Создаем новое уведомление
    const notificationItem = document.createElement('div');
    notificationItem.classList.add('notification-item');
    notificationItem.textContent = message;

    // Добавляем уведомление в выпадающий список
    dropdown.appendChild(notificationItem);

    // Увеличиваем счетчик уведомлений
    let currentCount = parseInt(counter.textContent);
    currentCount++;
    counter.textContent = currentCount;

    // Показываем счетчик уведомлений
    counter.style.display = 'block';

    // Показываем текст о новом уведомлении, если он не был скрыт
    if (newNotificationText.style.display === 'none') {
        newNotificationText.style.display = 'block';
    }
}

// Обработчик клика по уведомлению, чтобы уменьшить счетчик
document.getElementById('notification-dropdown').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('notification-item')) {
        // Уменьшаем счетчик при клике на уведомление
        const counter = document.getElementById('notification-counter');
        let currentCount = parseInt(counter.textContent);

        if (currentCount > 0) {
            currentCount--;
            counter.textContent = currentCount;

            // Если нет новых уведомлений, скрываем счетчик
            if (currentCount === 0) {
                counter.style.display = 'none';
            }
        }

        // Удаляем кликнутое уведомление
        e.target.remove();
    }
});

// Пример добавления уведомлений
setTimeout(() => addNotification('Прогноз погоды на сегодня: 5°C и облачно'), 1000);
setTimeout(() => addNotification('Возможен дождь в 18:00'), 3000);
setTimeout(() => addNotification('Температура на завтра - 7°C'), 5000);
