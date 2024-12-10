// ======================== Первая анимация (движение круга) ========================

(function () {
    const canvas1 = document.getElementById('firstAnimationCanvas');
    const ctx1 = canvas1.getContext('2d');

    let ball = {
        x: 50,
        y: 50,
        radius: 20,
        dx: 2,
        dy: 2,
        color: 'red',
        touches: 0
    };

    // Функция для рисования круга
    function drawBall() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // Очистка холста

        // Отрисовываем шар
        ctx1.beginPath();
        ctx1.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx1.fillStyle = ball.color;
        ctx1.fill();
        ctx1.stroke();

        // Пишем количество касаний внутри шара
        ctx1.font = "18px Arial";
        ctx1.fillStyle = 'white';
        ctx1.textAlign = 'center';
        ctx1.fillText(ball.touches, ball.x, ball.y);

        // Проверка на столкновение с вертикальными стенками
        if (ball.x + ball.radius > canvas1.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
            ball.touches++; // Увеличиваем количество касаний
        }

        // Проверка на столкновение с горизонтальными стенками
        if (ball.y + ball.radius > canvas1.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
            ball.touches++; // Увеличиваем количество касаний
        }

        // Обновляем позиции
        ball.x += ball.dx;
        ball.y += ball.dy;

        requestAnimationFrame(drawBall); // Рекурсивный вызов для анимации
    }

    drawBall();
})();

// ======================== Вторая анимация (движение изображения) ========================

(function () {
    const canvas2 = document.getElementById('secondAnimationCanvas');
    const ctx2 = canvas2.getContext('2d');

    const img = new Image();
    img.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpaperscraft.ru%2Fimage%2Fsingle%2Freka_derevia_krasnyj_151405_1920x1080.jpg&f=1&nofb=1&ipt=45ddbd149b4c561bff137e1bc4a74ae250b41cfdcb705761b4b4052b2c94c1a9&ipo=images'; // Здесь ссылка на изображение (поменяйте на нужную)

    let x = canvas2.width; // Начальная позиция изображения за правым краем
    const y = canvas2.height / 2 - 75; // Центрируем изображение по вертикали

    // Функция для рисования изображения с эффектом бегущей строки
    function drawImage() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Очистка холста

        // Отрисовываем изображение
        ctx2.drawImage(img, x, y, 200, 150); // Изображение теперь фиксированного размера 150x150

        // Бегущая строка эффекта для изображения
        x -= 2; // Смещаем изображение влево
        if (x + 200 < 0) { // Когда изображение выходит за пределы, сбрасываем его
            x = canvas2.width;
        }

        requestAnimationFrame(drawImage); // Рекурсивный вызов для анимации
    }

    img.onload = () => {
        drawImage(); // Запуск анимации после загрузки изображения
    };
})();

// ======================== Третья анимация (движение трех шаров с подсчетом касаний) ========================

(function () {
    const canvas3 = document.getElementById('thirdAnimationCanvas');
    const ctx3 = canvas3.getContext('2d');

    const balls = [
        { x: 50, y: 50, radius: 20, dx: 2, dy: 2, color: 'red', touches: { vertical: 0, horizontal: 0 } },
        { x: 100, y: 100, radius: 20, dx: -2, dy: -2, color: 'green', touches: { vertical: 0, horizontal: 0 } },
        { x: 150, y: 150, radius: 20, dx: 3, dy: -3, color: 'blue', touches: { vertical: 0, horizontal: 0 } }
    ];

    // Функция для обновления счетчиков касаний
    function updateTouchCounts() {
        document.getElementById('red-ball-touch-count').textContent = 
            `Красный шар🔴 - касания вертикальных стенок: ${balls[0].touches.vertical}, горизонтальных стенок: ${balls[0].touches.horizontal}`;
        document.getElementById('green-ball-touch-count').textContent = 
            `Зеленый шар🟢 - касания вертикальных стенок: ${balls[1].touches.vertical}, горизонтальных стенок: ${balls[1].touches.horizontal}`;
        document.getElementById('blue-ball-touch-count').textContent = 
            `Синий шар🔵 - касания вертикальных стенок: ${balls[2].touches.vertical}, горизонтальных стенок: ${balls[2].touches.horizontal}`;
    }

    // Функция для рисования шаров
    function drawBalls() {
        ctx3.clearRect(0, 0, canvas3.width, canvas3.height); // Очистка холста

        // Отрисовываем каждый шар
        balls.forEach(ball => {
            ctx3.beginPath();
            ctx3.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx3.fillStyle = ball.color;
            ctx3.fill();
            ctx3.stroke();

            // Пишем количество касаний внутри шара (всего)
            const totalTouches = ball.touches.vertical + ball.touches.horizontal;
            ctx3.font = "18px Arial";
            ctx3.fillStyle = 'white';
            ctx3.textAlign = 'center';
            ctx3.fillText(`${totalTouches}`, ball.x, ball.y);

            // Проверка на столкновение с вертикальными стенками
            if (ball.x + ball.radius > canvas3.width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx;
                ball.touches.vertical++; // Увеличиваем количество вертикальных касаний
            }

            // Проверка на столкновение с горизонтальными стенками
            if (ball.y + ball.radius > canvas3.height || ball.y - ball.radius < 0) {
                ball.dy = -ball.dy;
                ball.touches.horizontal++; // Увеличиваем количество горизонтальных касаний
            }

            // Обновляем позиции
            ball.x += ball.dx;
            ball.y += ball.dy;
        });

        updateTouchCounts(); // Обновляем счетчики касаний
        requestAnimationFrame(drawBalls); // Рекурсивный вызов для анимации
    }

    drawBalls(); // Запуск анимации
})();
