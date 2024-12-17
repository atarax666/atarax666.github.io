// Переменные
let currentImageIndex = 0;
const images = ["images/dessert.jpg", "images/forest.jpg", "images/cd.jpg", "images/beach.jpg", "images/cn.jpg"];

let totalPrice = 0;


// Гамбургер-меню
function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Галерея
let galleryIndex = 0;

// Функция переключения галереи
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGalleryImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGalleryImage();
}

function updateGalleryImage() {
    const galleryImage = document.getElementById("gallery-image");
    galleryImage.src = images[currentImageIndex];
}

// Уведомления
let notifications = [
    "Погода на завтра обновлена!",
    "Ураган приближается к городу.",
    "На следующей неделе снегопад.",
    "Скидка на зонты 20% сегодня!",
    "Гроза ожидается вечером.",
    "Температура упала до -10°C.",
    "Обновление прогноза: без осадков.",
    "Новая функция: уведомления.",
    "На улице сильный ветер.",
    "Солнечная погода до выходных."
];

let currentNotifications = [...notifications];
const maxNotifications = 10;
// Показ уведомлений
function toggleNotifications() {
    const window = document.getElementById("notifications-window");
    const list = document.getElementById("notification-list");
    const count = document.getElementById("notification-count");

    if (window.style.display === "block") {
        window.style.display = "none";
    } else {
        list.innerHTML = "";
        notifications.forEach((note, index) => {
            const li = document.createElement("li");
            li.textContent = note;
            li.onclick = () => removeNotification(index);
            list.appendChild(li);
        });
        window.style.display = "block";
    }

    count.textContent = notifications.length;
}

// Удаление уведомлений
function removeNotification(index) {
    notifications.splice(index, 1);
    toggleNotifications();
    const count = document.getElementById("notification-count");
    count.textContent = notifications.length;

    if (notifications.length === 0) {
        document.getElementById("notifications-window").style.display = "none";
    }
}

function updateNotificationCounter() {
    document.getElementById("notification-counter").textContent = currentNotifications.length;
}

function showNotificationList() {
    const notificationPopup = document.getElementById("notification-list");
    const list = notificationPopup.querySelector("ul");

    list.innerHTML = "";
    currentNotifications.forEach((notif, index) => {
        const li = document.createElement("li");
        li.textContent = notif;
        li.addEventListener("click", () => {
            currentNotifications.splice(index, 1);
            showNotificationList();
            updateNotificationCounter();
        });
        list.appendChild(li);
    });

    notificationPopup.style.display = currentNotifications.length > 0 ? "block" : "none";
}


function addNotification() {
    if (currentNotifications.length < maxNotifications) {
        const newNotification =
            notifications[Math.floor(Math.random() * notifications.length)];
        if (!currentNotifications.includes(newNotification)) {
            currentNotifications.push(newNotification);
        }
        document.getElementById("notification-counter").textContent =
            currentNotifications.length;
    }
}

document.getElementById("notification-btn").addEventListener("click", () => {
    const notificationPopup = document.getElementById("notification-list");
    notificationPopup.style.display =
        notificationPopup.style.display === "block" ? "none" : "block";
    showNotificationList();
});
setInterval(addNotification, 5000);

// Гамбургер-меню
document.getElementById("hamburger").addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("active");
});

// Подтверждение выхода на внешнюю ссылку
function confirmExit(site) {
    return confirm(`Вы точно хотите покинуть страницу текущую страницу и попасть на страницу сайта ${site}?`);
}

// Подтверждение перед просмотром видео
function confirmVideoExit(url) {
    if (confirm("Вы точно хотите покинуть страницу?")) {
        window.location.href = url;
    }
}

// Объект для хранения товаров в корзине
const cartItems = {};

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    const productData = {
        name: event.target.closest(".product").dataset.name,
        price: event.target.closest(".product").dataset.price,
    };
    event.dataTransfer.setData("text", JSON.stringify(productData));
}

function addToCart(event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text"));
    if (!data.name || !data.price) {
        console.error("Ошибка получения данных о товаре");
        return;
    }

    if (!cartItems[data.name]) {
        cartItems[data.name] = { count: 0, price: parseInt(data.price) };
    }
    cartItems[data.name].count += 1;

    updateCart();
}


function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("cart-total-price");

    cartItemsList.innerHTML = "";
    let totalPrice = 0;

    Object.keys(cartItems).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item} - ${cartItems[item].count} шт.`;
        cartItemsList.appendChild(li);
        totalPrice += cartItems[item].count * cartItems[item].price;
    });

    totalPriceElement.textContent = totalPrice;
}