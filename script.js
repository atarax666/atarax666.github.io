let captchaType;
let captchaAnswer;

// 1. Функция генерации капчи
function generateCaptcha() {
    captchaType = Math.random() > 0.5 ? "text" : "math";
    captchaType === "text" ? generateTextCaptcha() : generateMathCaptcha();
    resetCaptchaStyles();
}

function generateTextCaptcha() {
    const canvas = document.getElementById("captcha-canvas");
    const context = canvas.getContext("2d");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captchaAnswer = Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f4f4f9";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 8; i++) {
        context.beginPath();
        context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.strokeStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
        context.lineWidth = Math.random() * 2 + 1.5;
        context.stroke();
    }

    for (let i = 0; i < captchaAnswer.length; i++) {
        const fontSize = Math.floor(Math.random() * 10) + 24;
        context.font = `${fontSize}px ${Math.random() > 0.5 ? "Arial" : "Courier New"}`;
        context.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        context.fillText(captchaAnswer[i], 20 + i * 30, canvas.height / 2 + (Math.random() * 20 - 10));
    }
}

function generateMathCaptcha() {
    const num1 = Math.floor(Math.random() * 50) + 10;
    const num2 = Math.floor(Math.random() * 50) + 10;
    captchaAnswer = num1 + num2;
    document.getElementById("captcha-math").textContent = `Сколько будет ${num1} + ${num2}?`;
}

// 2. Валидация капчи
function validateCaptcha() {
    const input = document.getElementById("captcha-input").value;
    const captchaContainer = document.getElementById("captcha-container");

    if (input.toString() === captchaAnswer.toString()) {
        captchaContainer.classList.add("correct");
        captchaContainer.classList.remove("incorrect");
    } else {
        captchaContainer.classList.add("incorrect");
        captchaContainer.classList.remove("correct");
    }
}

function resetCaptchaStyles() {
    const captchaContainer = document.getElementById("captcha-container");
    captchaContainer.classList.remove("correct", "incorrect");
}

// 3. Работа с корзиной


// 4. Фильтрация и сортировка товаров
function applyFilter() {
    const min = document.getElementById("min-value").value;
    const max = document.getElementById("max-value").value;
    const filteredItems = cartItems.filter(item => item.price >= min && item.price <= max);
    document.getElementById("filtered-items").textContent = `Фильтрованные товары: ${filteredItems.map(item => item.name).join(", ")}`;
}

function sortItems(order) {
    const sortedItems = [...cartItems].sort((a, b) => order === "asc" ? a.price - b.price : b.price - a.price);
    document.getElementById("filtered-items").textContent = `Сортированные товары: ${sortedItems.map(item => item.name).join(", ")}`;
}

window.onload = generateCaptcha;

let cartItems = [{ name: "Товар 1", price: 100, quantity: 1 }];

function displayCart() {
    const cartContent = cartItems.map(item => `${item.name} - ${item.quantity} шт.`).join(", ");
    document.getElementById("cart-items").textContent = `Товары: ${cartContent}`;
    document.getElementById("total-price").textContent = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    displayCart();
}

function changeItem() {
    if (cartItems.length) cartItems[0] = { name: "Обновленный товар", price: 120, quantity: 1 };
    displayCart();
}

function clearCart() {
    cartItems = [];
    displayCart();
}

function removeItem() {
    cartItems.shift();
    displayCart();
}

function increaseQuantity() {
    if (cartItems.length) cartItems[0].quantity += 1;
    displayCart();
}

displayCart();
