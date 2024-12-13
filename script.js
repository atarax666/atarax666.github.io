// Галерея
let galleryIndex = 0;
const images = [
    "images/dessert.jpg",
    "images/forest.jpg",
    "images/rain.jpg",
    "images/river.jpg",
    "images/mountain.jpg"
];

function nextImage() {
    galleryIndex = (galleryIndex + 1) % images.length;
    document.querySelector(".gallery-image").src = images[galleryIndex];
}

function prevImage() {
    galleryIndex = (galleryIndex - 1 + images.length) % images.length;
    document.querySelector(".gallery-image").src = images[galleryIndex];
}

// Уведомления
let notifications = [];
const maxNotifications = 15;

function addNotification() {
    if (notifications.length < maxNotifications) {
        const newNotifications = [
            "Завтра дождь в 18:00.",
            "Снег через 2 дня.",
            "Скорость ветра 20 м/с.",
            "Температура упадет до -5°C.",
            "Солнечно в четверг.",
            "Сильный дождь через 3 часа.",
            "Град в субботу.",
            "Штормовой ветер в пятницу."
        ];
        const randomNotification =
            newNotifications[Math.floor(Math.random() * newNotifications.length)];
        notifications.push(randomNotification);

        const notificationCounter = document.getElementById("notification-counter");
        notificationCounter.textContent = notifications.length;
        document.getElementById("notification-icon").classList.remove("inactive");

        updateNotificationList();
    }
}

function updateNotificationList() {
    const notificationList = document.getElementById("notifications-list");
    notificationList.innerHTML = "";
    notifications.forEach((notification, index) => {
        const div = document.createElement("div");
        div.textContent = notification;
        div.onclick = () => {
            notifications.splice(index, 1);
            updateNotificationList();
            const notificationCounter = document.getElementById("notification-counter");
            notificationCounter.textContent = notifications.length;

            if (notifications.length === 0) {
                document.getElementById("notification-icon").classList.add("inactive");
            }
        };
        notificationList.appendChild(div);
    });
}

setInterval(addNotification, 5000);

// Уведомления
function toggleNotifications() {
    const notificationWindow = document.getElementById("notifications-window");
    notificationWindow.style.display =
        notificationWindow.style.display === "block" ? "none" : "block";
}

// Корзина
let totalPrice = 0;
function addToCart(event, itemName, itemPrice) {
    const cartPanel = document.getElementById("cart-items");
    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${itemName} - ${itemPrice}₽`;
    cartPanel.appendChild(itemDiv);

    totalPrice += itemPrice;
    document.getElementById("total-price").textContent = `Итоговая цена: ${totalPrice}₽`;
}

// Гамбургер-меню
function toggleBurgerMenu() {
    const mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
}

// Окно подтверждения при переходе
function confirmExit() {
    return confirm("Вы точно хотите покинуть страницу?");
}