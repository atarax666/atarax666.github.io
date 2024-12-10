let captchaType;
let captchaAnswer;

// Генерация капчи
function generateCaptcha() {
    captchaType = Math.random() > 0.5 ? "text" : "math";
    captchaType === "text" ? generateTextCaptcha() : generateMathCaptcha();
    resetCaptchaStyles();
}

// Генерация текстовой капчи на canvas с линиями и разнообразными стилями текста
function generateTextCaptcha() {
    const canvas = document.getElementById("captcha-canvas");
    const context = canvas.getContext("2d");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captchaAnswer = Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join("");

    // Настройки канваса
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f4f4f9";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Добавление линий для усложнения капчи
    for (let i = 0; i < 8; i++) {
        context.beginPath();
        context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.strokeStyle = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
        context.lineWidth = Math.random() * 2 + 1.5;
        context.stroke();
    }

    // Рисуем каждый символ капчи с разным цветом, шрифтом и размером
    for (let i = 0; i < captchaAnswer.length; i++) {
        const fontSize = Math.floor(Math.random() * 10) + 24;
        context.font = `${fontSize}px ${Math.random() > 0.5 ? "Arial" : "Courier New"}`;
        context.fillStyle = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        context.fillText(captchaAnswer[i], 20 + i * 30, canvas.height / 2 + (Math.random() * 20 - 10));
    }

    document.getElementById("captcha-canvas").classList.remove("hidden");
    document.getElementById("captcha-math").classList.add("hidden");
}

// Генерация математической капчи
function generateMathCaptcha() {
    const num1 = Math.floor(Math.random() * 50) + 10;
    const num2 = Math.floor(Math.random() * 50) + 10;
    captchaAnswer = num1 + num2;
    document.getElementById("captcha-math").textContent = `Сколько будет ${num1} + ${num2}?`;

    document.getElementById("captcha-canvas").classList.add("hidden");
    document.getElementById("captcha-math").classList.remove("hidden");
}

// Валидация капчи
function validateCaptcha() {
    const input = document.getElementById("captcha-input").value;
    const captchaContainer = document.getElementById("captcha-container");

    if (input.toString() === captchaAnswer.toString()) {
        document.getElementById("submit-button").disabled = false;
        document.getElementById("error-message").textContent = "Верно!";
        captchaContainer.classList.add("captcha-correct");
        captchaContainer.classList.remove("captcha-incorrect");
    } else {
        document.getElementById("error-message").textContent = "Неверно, попробуйте еще раз.";
        generateCaptcha();  // Перегенерация капчи при ошибке
        captchaContainer.classList.add("captcha-incorrect");
        captchaContainer.classList.remove("captcha-correct");
    }
}

// Сброс стилей капчи
function resetCaptchaStyles() {
    const captchaContainer = document.getElementById("captcha-container");
    captchaContainer.classList.remove("captcha-correct", "captcha-incorrect");
}

// Генерация капчи при загрузке страницы
window.onload = generateCaptcha;
