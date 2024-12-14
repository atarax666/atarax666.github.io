// Переменные
let currentImageIndex = 0;
const images = ["images/dessert.jpg", "images/forest.jpg", "images/cd.jpg", "images/beach.jpg", "images/cn.jpg"];
let notifications = [
    "Завтра ожидается дождь.",
    "Сильный ветер в полдень.",
    "Похолодание к вечеру.",
    "Местами снег.",
    "Мороз до -20°С.",
    "Гроза ночью.",
    "Жара днем.",
    "Туман утром.",
    "Дождь вечером.",
    "Солнечно в обед."
];
let cartItems = [];
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

setInterval(addNotification, 5000);

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
let cart = {};

// Обновление отображения корзины
function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");

    // Очистка предыдущих данных
    cartItemsList.innerHTML = "";
    let totalPrice = 0;

    // Добавление каждого товара в список корзины
    for (const [itemName, itemDetails] of Object.entries(cart)) {
        const li = document.createElement("li");
        li.textContent = `${itemName} (${itemDetails.count} шт.) - ${itemDetails.totalPrice} ₽`;
        cartItemsList.appendChild(li);
        totalPrice += itemDetails.totalPrice;
    }

    // Обновление общей цены
    cartTotalPrice.textContent = totalPrice.toFixed(2);
}

// Обработка перетаскивания товара
function addToCart(event) {
    event.preventDefault();

    // Получение данных о товаре
    const itemName = event.dataTransfer.getData("itemName");
    const itemPrice = parseFloat(event.dataTransfer.getData("itemPrice"));

    if (!itemName || isNaN(itemPrice)) {
        console.error("Ошибка получения данных о товаре.");
        return;
    }

    // Проверка: если товар уже есть в корзине
    if (cart[itemName]) {
        cart[itemName].count++;
        cart[itemName].totalPrice += itemPrice;
    } else {
        cart[itemName] = { count: 1, totalPrice: itemPrice };
    }

    updateCart(); // Обновление отображения корзины
}

// Разрешить перетаскивание
function allowDrop(event) {
    event.preventDefault();
}

// Начало перетаскивания
function drag(event) {
    const itemName = event.target.getAttribute("data-name");
    const itemPrice = event.target.getAttribute("data-price");

    event.dataTransfer.setData("itemName", itemName);
    event.dataTransfer.setData("itemPrice", itemPrice);
}
