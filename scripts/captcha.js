function showCaptcha() {
    const captchaModal = document.getElementById('captchaModal');
    const captchaContent = document.getElementById('captchaContent');

    // Очистить предыдущее содержимое капчи
    captchaContent.innerHTML = '';

    // Случайный выбор капчи
    const captchaTypes = [imageCaptcha, mathCaptcha, sliderCaptcha, arrowCaptcha];
    const randomCaptcha = captchaTypes[Math.floor(Math.random() * captchaTypes.length)];

    // Создать выбранную капчу
    randomCaptcha(captchaContent);

    // Показать модальное окно
    captchaModal.classList.remove('hidden');
}

// Пример: Капча с изображениями
function imageCaptcha(container) {
    container.innerHTML = `
        <h3>Select all images with traffic lights</h3>
        <div class="captcha-images">
            <img class="captcha-item" src="assets/images/traffic1.jpg" />
            <img class="captcha-item" src="assets/images/traffic2.jpg" />
            <img class="captcha-item" src="assets/images/cat.jpg" />
        </div>
        <button id="submitCaptcha">Submit</button>
    `;

    // Логика проверки
    const images = container.querySelectorAll('.captcha-item');
    images.forEach((img) => {
        img.addEventListener('click', () => {
            img.classList.toggle('selected');
        });
    });

    container.querySelector('#submitCaptcha').addEventListener('click', () => {
        alert('Captcha solved!'); // Заглушка
        document.getElementById('captchaModal').classList.add('hidden');
    });
}

// Пример: Математическая капча
function mathCaptcha(container) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;

    container.innerHTML = `
        <h3>Solve: ${num1} + ${num2}</h3>
        <input type="number" id="mathAnswer" />
        <button id="submitCaptcha">Submit</button>
    `;

    container.querySelector('#submitCaptcha').addEventListener('click', () => {
        const userAnswer = parseInt(document.getElementById('mathAnswer').value, 10);
        if (userAnswer === answer) {
            alert('Captcha solved!');
            document.getElementById('captchaModal').classList.add('hidden');
        } else {
            alert('Incorrect! Try again.');
        }
    });
}
function showCaptcha() {
    const captchaModal = document.getElementById('captchaModal');
    const captchaContent = document.getElementById('captchaContent');

    captchaContent.innerHTML = ''; // Очистка предыдущего содержимого
    const captchaTypes = [arrowCaptcha, mathCaptcha, sliderCaptcha, textCaptcha];
    const randomCaptcha = captchaTypes[Math.floor(Math.random() * captchaTypes.length)];

    randomCaptcha(captchaContent);
    captchaModal.classList.remove('hidden');
}

// Капча: Поворот изображения
function arrowCaptcha(container) {
    container.innerHTML = `
        <h3>Разверните предмет по направлению стрелки</h3>
        <div class="arrow-captcha">
            <img id="rotatingObject" src="assets/images/rotate.png" alt="Rotate">
            <div>
                <button id="rotateLeft">⟲</button>
                <button id="rotateRight">⟳</button>
            </div>
        </div>
        <button id="submitCaptcha">Подтвердить</button>
    `;

    const image = document.getElementById('rotatingObject');
    let rotation = 0;

    document.getElementById('rotateLeft').addEventListener('click', () => {
        rotation -= 90;
        image.style.transform = `rotate(${rotation}deg)`;
    });

    document.getElementById('rotateRight').addEventListener('click', () => {
        rotation += 90;
        image.style.transform = `rotate(${rotation}deg)`;
    });

    document.getElementById('submitCaptcha').addEventListener('click', () => {
        if (rotation % 360 === 0) {
            alert('Капча пройдена!');
            document.getElementById('captchaModal').classList.add('hidden');
        } else {
            alert('Попробуйте ещё раз.');
        }
    });
}

// Капча: Решение примера
function mathCaptcha(container) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;

    container.innerHTML = `
        <h3>Решите пример: ${num1} + ${num2}</h3>
        <input type="number" id="mathAnswer">
        <button id="submitCaptcha">Подтвердить</button>
    `;

    document.getElementById('submitCaptcha').addEventListener('click', () => {
        const userAnswer = parseInt(document.getElementById('mathAnswer').value, 10);
        if (userAnswer === answer) {
            alert('Капча пройдена!');
            document.getElementById('captchaModal').classList.add('hidden');
        } else {
            alert('Попробуйте ещё раз.');
        }
    });
}

// Добавьте логику для других капч.
